package api

import "github.com/gin-gonic/gin"

// Test for test
func Test(ctx *gin.Context) {
	ctx.JSON(200, gin.H{
		"message": "hello world",
	})
}
