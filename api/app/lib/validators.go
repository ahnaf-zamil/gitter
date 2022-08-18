package lib

import (
	"strings"

	"github.com/gin-gonic/gin/binding"
	"github.com/go-playground/validator/v10"
)

func RegisterAllValidators() {
	if v, ok := binding.Validator.Engine().(*validator.Validate); ok {
		v.RegisterValidation("pure", pureValidator) // String Purity validator
	}
}

func pureValidator(
	fl validator.FieldLevel,
) bool {
	// Checks if string has special chars
	// A string without special chars is considered "pure"
	if strings.ContainsAny(fl.Field().String(), ",!\"#$'%&()*+/\\") {
		return false
	}

	return true
}
