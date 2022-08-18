package model

import (
	"fmt"
)

type TweetLike struct {
	UserId  int64 `gorm:"primaryKey"`
	TweetId int64 `gorm:"primaryKey"`
}

func (p TweetLike) String() string {
	return fmt.Sprintf("<TweetLike userId=%d tweetId=%d>", p.UserId, p.TweetId)
}
