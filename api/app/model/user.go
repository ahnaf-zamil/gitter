package model

import (
	"fmt"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
  Id       int64 		`gorm:"primaryKey"`
  Username string 	`gorm:"not null"`
  Email    string 	`gorm:"not null"`
  Password string 	`gorm:"not null"`
  
  Tweets    []Tweet
}

func (u User) String() string {
  return fmt.Sprintf("<User id=%d email=%s>", u.Id, u.Email);
}
