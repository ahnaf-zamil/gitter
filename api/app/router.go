package app

import (
	"github.com/gin-gonic/gin"

	"gitter/app/controller"
	"gitter/app/lib"
)

func InitializeRoutes(srv *gin.Engine) {
	users := *srv.Group("/users")
	{
		users.POST("/create", controller.CreateUserRoute)
		users.POST("/login", controller.LoginUserRoute)
		users.GET("/@me", lib.EnsureLoggedIn(), controller.GetCurrentUserRoute)
		users.GET("/:username", controller.GetUserProfileRoute)
	}

	tweets := *srv.Group("/tweets")
	{
		tweets.POST("/create", lib.EnsureLoggedIn(), controller.CreateTweetRoute)
		tweets.GET("/:tweet_id", controller.GetTweetRoute)
		tweets.DELETE("/:tweet_id", lib.EnsureLoggedIn(), controller.DeleteTweetRoute)
	}
}
