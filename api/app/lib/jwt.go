package lib

import (
	"errors"
	"os"
	"time"

	"github.com/golang-jwt/jwt"
)

var JWT_SECRET string = os.Getenv("JWT_SECRET");

func CreateToken(userId int64) string {
  token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": userId,
		"exp": time.Now().Add(time.Hour * 24 * 7).Unix(),
	});
	tokenStr, err := token.SignedString([]byte(JWT_SECRET));
  
  if err != nil {
    panic(err);
  }

	return tokenStr;
}

func VerifyToken(tokenStr string) (int, error) {
  token, err := jwt.Parse(tokenStr, func (token *jwt.Token) (interface{}, error) {
    return []byte(JWT_SECRET), nil
  })

  if err != nil {
    return 0, err;
  }

  if claims, ok := token.Claims.(jwt.MapClaims); ok {
    // Returning user ID if token is valid
    return int(claims["user_id"].(float64)), nil;
  }
  return 0, errors.New("Invalid token");
}
