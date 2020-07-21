package core

import "sync"

// Loader interface
type Loader interface {
	Init() (interface{}, error)
}

var coreLoader *CoreLoader
var once sync.Once

// GetCoreLoader 获取核心加载器
func GetCoreLoader() *CoreLoader {
	once.Do(func() {
		coreLoader = new(CoreLoader)
	})
	return coreLoader
}

type CoreLoader struct {
	Loader *[]Loader
}

func (c *CoreLoader) Init() (interface{}, error) {
	return nil, nil
}

func (c *CoreLoader) Register(loader Loader) {
}
