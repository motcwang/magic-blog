package config

import "time"

// Config struct
type Config struct {
	Server Server `yaml:"server"`
	Log    Log    `yaml:"log"`
}

// Server struct
type Server struct {
	Address      string        `yaml:"address"`
	ReadTimeout  time.Duration `yaml:"readTimeout"`
	WriteTimeout time.Duration `yaml:"writeTimeout"`
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
