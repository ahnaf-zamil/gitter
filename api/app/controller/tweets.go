package controller

import (
	"errors"
	"gitter/app/lib"
	"gitter/app/model"
	"net/http"
	"strconv"
	"strings"

	"github.com/bwmarrin/snowflake"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

type CreateTweetBody struct {
	Content string `json:"content" binding:"required"`
}

func CreateTweetRoute(ctx *gin.Context) {
	node, err := snowflake.NewNode(1)
	if err != nil {
		panic(err)
	}

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
		Id:      node.Generate().Int64(),
		Content: requestBody.Content,
		UserID:  user.Id,
	}
	result := lib.DB.Create(&newTweet)
	if result.Error != nil {
		panic(result.Error)
	}

	ctx.JSON(http.StatusCreated, gin.H{"id": strconv.FormatInt(newTweet.Id, 10), "content": newTweet.Content, "createdAt": newTweet.CreatedAt})
	return
}

func GetTweetRoute(ctx *gin.Context) {
	tweetId := ctx.Param("tweet_id")
	username := ctx.Param("username")
	user := lib.GetAuthedUser(ctx)

	author := new(model.User)
	result := lib.DB.Where("username = ?", strings.ToLower(username)).First(&author)
	if result.RowsAffected == 0 {
		ctx.JSON(http.StatusNotFound, gin.H{"message": "User not found"})
		return
	}

	// Fetch tweet
	tweet := new(model.Tweet)
	result = lib.DB.First(&tweet, tweetId)
	if result.RowsAffected == 0 {
		ctx.JSON(http.StatusNotFound, gin.H{"message": "Tweet not found"})
		return
	}

	// Fetching like count
	var likeCount int64
	lib.DB.Model(&model.TweetLike{}).Where("tweet_id = ?", tweet.Id).Count(&likeCount)

	// Checking if user has liked the tweet
	var isLiked int64
	lib.DB.Model(&model.TweetLike{}).Where("user_id = ? AND tweet_id = ?", user.Id, tweet.Id).Count(&isLiked)

	ctx.JSON(http.StatusOK, gin.H{"id": strconv.FormatInt(tweet.Id, 10), "content": tweet.Content, "createdAt": tweet.CreatedAt, "likes": likeCount, "author": author.JSON(false), "isLiked": isLiked != 0})
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
	lib.DB.Delete(&tweet)
	ctx.String(http.StatusNoContent, "")
	return
}

func LikeUnlikeTweetRoute(ctx *gin.Context) {
	tweetId := ctx.Param("tweet_id")

	tweet := new(model.Tweet)
	result := lib.DB.First(&tweet, tweetId)
	if result.RowsAffected == 0 {
		ctx.JSON(http.StatusNotFound, gin.H{"message": "Tweet not found"})
		return
	}

	user := lib.GetAuthedUser(ctx)

	tweetLike := new(model.TweetLike)
	result = lib.DB.Where("user_id = ? AND tweet_id = ?", user.Id, tweet.Id).First(&tweetLike)

	if tweetLike.UserId == 0 {
		// User has not liked tweet
		newTweetLike := &model.TweetLike{
			UserId:  user.Id,
			TweetId: tweet.Id,
		}
		// Create entry to "like" tweet
		result := lib.DB.Create(&newTweetLike)
		if result.Error != nil {
			panic(result.Error)
		}
		ctx.String(http.StatusCreated, "")
		return

	} else {
		// User has already liked tweet
		// Deleting entry to "unlike" tweet

		// Using unscoped for permanent delete
		lib.DB.Unscoped().Delete(&tweetLike)
		ctx.String(http.StatusNoContent, "")
		return
	}
}

func GetLikesForTweet(ctx *gin.Context) {
	tweetId := ctx.Param("tweet_id")

	tweet := new(model.Tweet)
	result := lib.DB.First(&tweet, tweetId)
	if result.RowsAffected == 0 {
		ctx.JSON(http.StatusNotFound, gin.H{"message": "Tweet not found"})
		return
	}

	var likers []model.User
	result = lib.DB.Model(&model.User{}).Select("users.id, users.real_name, users.username").Joins("INNER JOIN tweet_likes ON tweet_likes.user_id = users.id").Where("tweet_likes.tweet_id = ?", tweet.Id).Find(&likers)

	likersJSON := []gin.H{}
	for _, user := range likers {
		likersJSON = append(likersJSON, gin.H{"id": user.Id, "username": user.Username, "name": user.RealName})
	}

	ctx.JSON(http.StatusOK, likersJSON)
	return
}
