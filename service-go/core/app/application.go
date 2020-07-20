package app

import (
	"github.com/gin-gonic/gin"
)

// Run start app
func Run() {
	// log.Logger.Info("haah")
	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	r.Run()
}
