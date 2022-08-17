package app

import (
	"github.com/gin-gonic/gin"

	"gitter/app/controller"
	"gitter/app/lib"
)

func InitializeRoutes(srv *gin.Engine) {
  users := *srv.Group("/users")
  {
    users.POST("/create", controller.CreateUserRoute);
    users.POST("/login", controller.LoginUserRoute);
    users.GET("/@me", lib.EnsureLoggedIn(), controller.GetCurrentUserRoute);
  }

  tweets := *srv.Group("/tweets")
  {
  	tweets.POST("/create", lib.EnsureLoggedIn(), controller.CreateTweetRoute);
  }
}
