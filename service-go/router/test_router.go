package router

import (
	"magician/api"

	"github.com/gin-gonic/gin"
)

// InitTestRouter for test
func InitTestRouter(routerGroup *gin.RouterGroup) {
	router := routerGroup.Group("test")
	router.GET("hello", api.Test)
}
