package app

import (
	"github.com/gin-gonic/gin"

	"gitter/app/controller"
	"gitter/app/lib"
)

func InitializeRoutes(srv *gin.Engine) {
	users := srv.Group("/users")
	{
		users.POST("/create", controller.CreateUserRoute)
		users.POST("/login", controller.LoginUserRoute)
		users.GET("/@me", lib.CheckAuth(true), controller.GetCurrentUserRoute)
		users.GET("/:username", controller.GetUserProfileRoute)
		users.GET("/:username/tweets", controller.GetUserTweets)
	}

	tweets := srv.Group("/tweets")
	{
		tweets.POST("/create", lib.CheckAuth(true), controller.CreateTweetRoute)
		tweets.GET("/get/:username/:tweet_id", controller.GetTweetRoute)
		tweets.DELETE("/:tweet_id", lib.CheckAuth(true), controller.DeleteTweetRoute)
		tweets.POST("/:tweet_id/like", lib.CheckAuth(true), controller.LikeUnlikeTweetRoute)
		tweets.GET("/:tweet_id/likes", controller.GetLikesForTweet)
	}
}
