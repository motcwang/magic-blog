package middleware

import "github.com/gin-gonic/gin"

// RecoveryMiddleware handle panic
func RecoveryMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		defer func() {
			if err := recover(); err != nil {
				// TODO
			}
		}()
		c.Next()
	}
}
