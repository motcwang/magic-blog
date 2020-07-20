package log

import (
	"fmt"
	"io"
	"magician/common/constants"
	"magician/common/utils"
	"magician/config"
	"os"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	rotatelogs "github.com/lestrrat-go/file-rotatelogs"
	oplogging "github.com/op/go-logging"
)

// Logger 日志对象
var Logger *oplogging.Logger

const (
	defaultFormatter = `%{time:2006/01/02 - 15:04:05.000} %{longfile} %{color:bold}▶ [%{level:.6s}] %{message}%{color:reset}`
	module           = constants.ServerName
)

func init() {
	logConfig := config.CONFIG.Log
	if logConfig.Prefix == "" {
		logConfig.Prefix = "[-]"
	}
	Logger = oplogging.MustGetLogger(module)
	var backends []oplogging.Backend
	registerStdout(logConfig, &backends)
	if fileWriter := registerFile(logConfig, &backends); fileWriter != nil {
		gin.DefaultWriter = io.MultiWriter(fileWriter, os.Stdout)
	}
	oplogging.SetBackend(backends...)

}

func registerStdout(c config.Log, backends *[]oplogging.Backend) {
	if c.Stdout != "" {
		level, err := oplogging.LogLevel(c.Stdout)
		if err != nil {
			fmt.Println(err)
		}
		*backends = append(*backends, createBackend(os.Stdout, c, level))
	}
}

func registerFile(c config.Log, backends *[]oplogging.Backend) io.Writer {
	if c.File != "" {
		if ok, _ := utils.PathExists(c.LogDir); !ok {
			// directory not exist
			fmt.Println("create log directory")
			_ = os.Mkdir(c.LogDir, os.ModePerm)
		}
		fileWriter, err := rotatelogs.New(
			c.LogDir+string(os.PathSeparator)+"%Y-%m-%d-%H-%M.log",
			// generate soft link, point to latest log file
			rotatelogs.WithLinkName(c.LogSoftLink),
			// maximum time to save log files
			rotatelogs.WithMaxAge(7*24*time.Hour),
			// time period of log file switching
			rotatelogs.WithRotationTime(24*time.Hour),
		)
		if err != nil {
			fmt.Println(err)
		}
		level, err := oplogging.LogLevel(c.File)
		if err != nil {
			fmt.Println(err)
		}
		*backends = append(*backends, createBackend(fileWriter, c, level))

		return fileWriter
	}
	return nil
}

func createBackend(w io.Writer, c config.Log, level oplogging.Level) oplogging.Backend {
	backend := oplogging.NewLogBackend(w, c.Prefix, 0)
	stdoutWriter := false
	if w == os.Stdout {
		stdoutWriter = true
	}
	format := getLogFormatter(c, stdoutWriter)
	backendLeveled := oplogging.AddModuleLevel(oplogging.NewBackendFormatter(backend, format))
	backendLeveled.SetLevel(level, module)
	return backendLeveled
}

func getLogFormatter(c config.Log, stdoutWriter bool) oplogging.Formatter {
	pattern := defaultFormatter
	if !stdoutWriter {
		// Color is only required for console output
		// Other writers don't need %{color} tag
		pattern = strings.Replace(pattern, "%{color:bold}", "", -1)
		pattern = strings.Replace(pattern, "%{color:reset}", "", -1)
	}
	if !c.LogFile {
		// Remove %{logfile} tag
		pattern = strings.Replace(pattern, "%{longfile}", "", -1)
	}
	return oplogging.MustStringFormatter(pattern)
}
