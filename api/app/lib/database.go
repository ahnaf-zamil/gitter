package lib

import (
	"log"

	"gorm.io/gorm"

	"gitter/app/model"
)

var DB *gorm.DB

func CreateSchema(db *gorm.DB) error {
	models := []interface{}{
		(*model.User)(nil),
		(*model.Tweet)(nil),
		(*model.TweetLike)(nil),
	}

	for _, model := range models {
		db.AutoMigrate(&model)
		log.Printf("Migrated table `%T`", model)
	}

	return nil
}
