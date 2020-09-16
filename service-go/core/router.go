package core

import "github.com/gin-gonic/gin"

// IRouter interface
type IRouter interface {
	Register(app *gin.Engine) error
}
