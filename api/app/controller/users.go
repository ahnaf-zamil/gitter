package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"

	"golang.org/x/crypto/bcrypt"

	"gitter/app/lib"
	"gitter/app/model"
)

const JWT_SECRET string = "AMONGUS";

type CreateUserBody struct {
	Username string `json:"username" binding:"required,min=3,max=30"`
	Email string `json:"email" binding:"required,email"`;
	Password string `json:"password" binding:"required,min=8"`;
}

type LoginUserBody struct {
	Email string `json:"email" binding:"required"`;
	Password string `json:"password" binding:"required"`;
}

func CreateUserRoute(ctx *gin.Context) {
	var requestBody CreateUserBody;
	if err := ctx.ShouldBindJSON(&requestBody); err != nil {
		// Sending only first validation error
		for _, fieldErr := range err.(validator.ValidationErrors) {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, 
				gin.H{"error": "Validation failed for field '" + fieldErr.Field() +"'"},
			);
			return;
		}
  }
 	
 	// Generating password hash
	username := requestBody.Username;
	email := requestBody.Email;
	password, _ := bcrypt.GenerateFromPassword([]byte(requestBody.Password), bcrypt.DefaultCost);
	
	// Checking for existing user
	existingUser := new(model.User);
	result := lib.DB.Where("email = ?", email).First(&existingUser);
	if result.RowsAffected > 0 {
		ctx.JSON(http.StatusConflict, gin.H{"message": "User already exists"});
		return;
	}
	
	// Inserting new user in database
	newUser := &model.User{
		Username: username,
		Email: email,
		Password: string(password),
	}
	result = lib.DB.Create(&newUser);
	if result.Error != nil {
		panic(result.Error);
	}

  ctx.String(http.StatusCreated, "");
  return;
}

func LoginUserRoute(ctx *gin.Context) {
	var requestBody LoginUserBody;
	if err := ctx.ShouldBindJSON(&requestBody); err != nil {
		// Sending only first validation error
		for _, fieldErr := range err.(validator.ValidationErrors) {
			ctx.AbortWithStatusJSON(http.StatusBadRequest, 
				gin.H{"error": "Validation failed for field '" + fieldErr.Field() +"'"},
			);
			return;
		}
  }
  email := requestBody.Email;
  password := requestBody.Password;

	// Checking for existing user
	existingUser := new(model.User);
	result := lib.DB.Where("email = ?", email).First(&existingUser);
	if result.RowsAffected == 0 {
		ctx.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid credentials"});
		return;
	}

	// Comparing password
	err := bcrypt.CompareHashAndPassword([]byte(existingUser.Password), []byte(password));
	if err != nil {
		ctx.JSON(http.StatusConflict, gin.H{"message": "Invalid credentials"});
		return;
	}
	
	// Setting JWT token
	token := lib.CreateToken(existingUser.Id);
	ctx.SetCookie("auth", token, 60*60*24, "/", "localhost", false, true);

	ctx.String(http.StatusOK, "")
	return;
}


func GetCurrentUserRoute(ctx *gin.Context) {
	existingUser := lib.GetAuthedUser(ctx);

	if existingUser == nil {return}

	ctx.JSON(http.StatusOK, gin.H{"username": existingUser.Username, "email": existingUser.Email});
	return;
}
