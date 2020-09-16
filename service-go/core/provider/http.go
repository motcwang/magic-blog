package provider

import (
	"magician/core"

	"github.com/gin-gonic/gin"
)

// BuildHTTPHandler to get gin.Engine
func BuildHTTPHandler(r core.IRouter) *gin.Engine {
	app := gin.New()

	// app.Use(middleware.)

	r.Register(app)

	return app
}
