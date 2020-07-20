package log

import (
	"magician/common/constants"
	"magician/config"

	oplogging "github.com/op/go-logging"
)

var Logger *oplogging.Logger

func init() {
	config := config.CONFIG.Log
	if config.Prefix == "" {
		config.Prefix = constants.ServerName
	}
}
