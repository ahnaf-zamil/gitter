package model

import (
	"fmt"

	"gorm.io/gorm"
)

type Tweet struct {
	gorm.Model
	Id      int64  `gorm:"primaryKey"`
	Content string `gorm:"not null"`
	UserID  int64

	// Users who have liked the tweet
	Likers []*User 	 `gorm:"many2many:tweet_likes;"`
}

func (p Tweet) String() string {
	return fmt.Sprintf("<Tweet id=%d>", p.Id)
}
