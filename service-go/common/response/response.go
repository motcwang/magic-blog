package response

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// Result for api request
func Result(ctx *gin.Context, code int, data interface{}, message string) {
	ctx.JSON(http.StatusOK, Response{
		code,
		data,
		message,
	})
}

// Ok response struct
func Ok(ctx *gin.Context, data interface{}) {
	Result(ctx, SUCCESS, data, "Success")
}

// Failure response struct
func Failure(ctx *gin.Context, code int, message string) {
	Result(ctx, code, map[string]interface{}{}, message)
}
