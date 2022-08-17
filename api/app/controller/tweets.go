package controller

import (
	"errors"
	"gitter/app/lib"
	"gitter/app/model"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

type CreateTweetBody struct {
	Content string `json:"content" binding:"required"`
}

func CreateTweetRoute(ctx *gin.Context) {
	var requestBody CreateTweetBody
	if err := ctx.ShouldBindJSON(&requestBody); err != nil {
		// Sending only first validation error
		var ve validator.ValidationErrors

		if errors.As(err, &ve) {
			for _, fieldErr := range err.(validator.ValidationErrors) {
				ctx.AbortWithStatusJSON(http.StatusBadRequest,
					gin.H{"error": "Validation failed for field '" + fieldErr.Field() + "'"},
				)
				return
			}
		}
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error() + " while reading body"})
		return
	}

	user := lib.GetAuthedUser(ctx)

	newTweet := &model.Tweet{
		Content: requestBody.Content,
		UserID:  user.Id,
	}
	result := lib.DB.Create(&newTweet)
	if result.Error != nil {
		panic(result.Error)
	}

	ctx.JSON(http.StatusCreated, gin.H{"id": newTweet.Id, "content": newTweet.Content, "createdAt": newTweet.CreatedAt})
	return
}

func GetTweetRoute(ctx *gin.Context) {
	tweetId := ctx.Param("tweet_id")

	tweet := new(model.Tweet)
	result := lib.DB.First(&tweet, tweetId)
	if result.RowsAffected == 0 {
		ctx.JSON(http.StatusNotFound, gin.H{"message": "Tweet not found"})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"id": tweet.Id, "content": tweet.Content, "createdAt": tweet.CreatedAt})
	return
}

func DeleteTweetRoute(ctx *gin.Context) {
	tweetId := ctx.Param("tweet_id")

	tweet := new(model.Tweet)
	result := lib.DB.First(&tweet, tweetId)
	if result.RowsAffected == 0 {
		ctx.JSON(http.StatusNotFound, gin.H{"message": "Tweet not found"})
		return
	}

	user := lib.GetAuthedUser(ctx)

	if user.Id != tweet.UserID {
		ctx.JSON(http.StatusForbidden, gin.H{"message": "You are not the author of this tweet"})
		return
	}
	log.Println("")
	lib.DB.Delete(&tweet)
	ctx.String(http.StatusNoContent, "")
	return
}
