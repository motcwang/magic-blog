package api

import (
	"magician/core/wrapper/response"

	"github.com/gin-gonic/gin"
)

// Test for test
func Test(ctx *gin.Context) {
	// _ = c.ShouldBindJSON(&dict)
	response.Ok(ctx, response.D{
		"message": "hello world",
	})
}
