package model

import (
	"fmt"

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
