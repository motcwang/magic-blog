package router

import "github.com/gin-gonic/gin"

// Get Router
func Get() *gin.Engine {
	r := gin.Default()
	routerGroup := r.Group("")
	InitTestRouter(routerGroup)

	return r
}
