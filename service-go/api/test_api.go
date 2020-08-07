package api

import (
	"magician/common/response"

	"github.com/gin-gonic/gin"
)

// Test for test
func Test(ctx *gin.Context) {
	// _ = c.ShouldBindJSON(&dict)
	response.Ok(ctx, gin.H{
		"message": "hello world",
	})
}
