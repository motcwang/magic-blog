package server

import (
	"magician/config"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

// HTTPServer 实例
func HTTPServer(router *gin.Engine, conf config.Server) *http.Server {
	return &http.Server{
		Addr:         conf.Address,
		Handler:      router,
		ReadTimeout:  conf.ReadTimeout * time.Second,
		WriteTimeout: conf.WriteTimeout * time.Second,
	}
}
