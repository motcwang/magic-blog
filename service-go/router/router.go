package router

import "github.com/gin-gonic/gin"

// Register Router
func Register(app *gin.Engine) {
	routerGroup := app.Group("")
	InitTestRouter(routerGroup)
}
