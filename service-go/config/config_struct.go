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
	LogFile     bool   `yaml:"log-file"`
	Stdout      string `yaml:"stdout"`
	File        string `yaml:"file"`
	LogDir      string `yaml:"log-dir"`
	LogSoftLink string `yaml:"log-soft-link"`
}
