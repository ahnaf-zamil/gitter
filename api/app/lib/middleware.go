package lib

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func CheckAuth(throw bool) gin.HandlerFunc {
	// Auth requred middleware
	return func(ctx *gin.Context) {
		token, err := ctx.Cookie("auth")

		if err != nil && throw {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
			return
		}

		userId, err := VerifyToken(token)
		if err != nil && throw {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
			return
		}

		// Setting request context
		ctx.Set("user", strconv.Itoa(userId))
	}
}
