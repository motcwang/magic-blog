package api

import (
	"magician/core/wrapper/response"
	"magician/service"

	"github.com/gin-gonic/gin"
)

// Test api
type Test struct {
	Test *service.Test
}

// TestFunc for test
func (t *Test) TestFunc(ctx *gin.Context) {
	t.Test.Test()
	// _ = c.ShouldBindJSON(&dict)
	response.Ok(ctx, response.D{
		"message": "hello world",
	})
}
