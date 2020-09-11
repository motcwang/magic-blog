package response

import (
	code "magician/common/response_code"

	"net/http"

	"github.com/gin-gonic/gin"
)

// Result for api request
func Result(ctx *gin.Context, code int, data D, message string) {
	ctx.JSON(http.StatusOK, R{
		code,
		data,
		message,
	})
}

// Ok response struct
func Ok(ctx *gin.Context, data D) {
	Result(ctx, code.SUCCESS, data, "Success")
}

// Failure response struct
func Failure(ctx *gin.Context, code int, message string) {
	Result(ctx, code, D{}, message)
}
