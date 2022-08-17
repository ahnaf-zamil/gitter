package main

import (
	"github.com/joho/godotenv"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"

	"gitter/app"
	"gitter/app/lib"

	"github.com/gin-contrib/cors"

	"log"
	"os"
	"fmt"
)

var err error;

func initDB(env string) {
	DB_user := os.Getenv("POSTGRES_USER")
	DB_pass := os.Getenv("POSTGRES_PASS")
	DB_host := os.Getenv("POSTGRES_HOST")
	DB_database := os.Getenv("POSTGRES_DB")
	
	var dbLogger logger.Interface;
	if env == "production" {
		dbLogger = logger.Default.LogMode(logger.Warn)
	} else {
		dbLogger = logger.Default.LogMode(logger.Info);
	}

	dbURL := fmt.Sprintf("postgresql://%s:%s@%s:5432/%s", DB_user, DB_pass, DB_host, DB_database);
	lib.DB, err = gorm.Open(postgres.Open(dbURL), &gorm.Config{
		Logger: dbLogger,
	});
}

func main()  {
	err = godotenv.Load();
	if err != nil {
		log.Fatal("Error loading .env file");
	}

	env := os.Getenv("GO_ENV");
	if env == "" {
		env = "development"
	}
	
	initDB(env);
		
	if len(os.Args) > 1 {
		switch arg := os.Args[1]; arg {
			case "migrate":
				log.Println("Starting database migration");
				err = lib.CreateSchema(lib.DB);
				if err != nil {
					panic(err);
				}
				log.Println("Migration successful");
			default:
				log.Printf("Invalid argument: %s\n", arg);
		}
		return;
	}
	
	if env == "production" {
		gin.SetMode(gin.ReleaseMode);
	}

	srv := gin.Default();  
	srv.Use(cors.Default());
	app.InitializeRoutes(srv);
  srv.Run("0.0.0.0:5000");
}
