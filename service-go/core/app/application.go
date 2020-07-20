package app

import (
	"magician/common/log"

	"github.com/gin-gonic/gin"
)

// Run start app
func Run() {
	log.Logger.Info("info")
	log.Logger.Error("error")
	log.Logger.Warning("warning")
	log.Logger.Debug("debug")

	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	r.Run()
}
