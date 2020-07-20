package config

// Config struct
type Config struct {
	Server Server `yaml:"server"`
	Log    Log    `yaml:"log"`
}

// Server struct
type Server struct {
	Port int `yaml:"port"`
}

// Log struct
type Log struct {
	Prefix      string `yaml:"prefix"`
	LogFile     bool   `yaml:"logFile"`
	Stdout      string `yaml:"stdout"`
	File        string `yaml:"file"`
	LogDir      string `yaml:"logDir"`
	LogSoftLink string `yaml:"logSoftLink"`
}
