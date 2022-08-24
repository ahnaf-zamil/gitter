package model

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Id       int64  `gorm:"primaryKey"`
	RealName string `gorm:"not null"`
	Username string `gorm:"not null;unique"`
	Email    string `gorm:"not null"`
	Password string `gorm:"not null"`

	// User's tweets
	Tweets []Tweet
}

func (u User) String() string {
	return fmt.Sprintf("<User id=%d email=%s>", u.Id, u.Email)
}

func (u User) JSON(includeEmail bool) gin.H {
	var email string = ""
	if includeEmail {
		email = u.Email
	}

	return gin.H{"id": u.Id, "name": u.RealName, "username": u.Username, "email": email}
}
