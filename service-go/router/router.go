package router

import (
	"magician/api"

	"github.com/gin-gonic/gin"
)

// Router for define api
type Router struct {
	Test *api.Test
}

// Register routes
func (r *Router) Register(app *gin.Engine) error {
	routerGroup := app.Group("")
	InitTestRouter(routerGroup, r.Test)
	return nil
}
