package lib

import (
	"gitter/app/model"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetAuthedUser(ctx *gin.Context) (*model.User) {
  strUserId := ctx.GetString("user");
	userId, _ := strconv.Atoi(strUserId);

	existingUser := new(model.User);
	DB.First(&existingUser, userId);	

	// Throwing unauthorized if the user is not in DB
	if existingUser.Id == 0 {
		ctx.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"});
		ctx.Abort();
		return nil;
	}

	return existingUser;
}
