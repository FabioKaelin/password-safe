package controllers

import (
	"github.com/fabiokaelin/password-safe/pkg/middleware"
	"github.com/fabiokaelin/password-safe/pkg/passwords"
	"github.com/gin-gonic/gin"
)

func PasswordRouter(apiGroup *gin.RouterGroup) {
	passwordGroup := apiGroup.Group("/passwords")
	passwordGroup.Use(middleware.SetUserToContext())
	{
		passwordGroup.GET("/", passwordGet)
		passwordGroup.POST("/", passwordPost)
	}
}

// passwordGet             godoc
//
//	@Summary		Get all passwords
//	@Description	Get all passwords of the user
//	@Tags			passwords
//	@Produce		json
//	@Success		200	{array}		Password
//	@Success		500	{object}	errorResponse
//	@Router			/passwords [get]
func passwordGet(c *gin.Context) {
	currentUser, err := middleware.GetCurrentUser(c)
	if err != nil {
		c.JSON(500, errorResponse{Message: err.Error()})
		return
	}

	passwordsOfUser, err := passwords.GetByUserID(currentUser.ID)

	if err != nil {
		if err.Error() == "sql: no rows in result set" {
			c.JSON(404, "not found")
			return
		}
		c.JSON(500, errorResponse{Message: err.Error()})
		return
	}

	c.JSON(200, passwordsOfUser)
}

// passwordPost             godoc
//
//	@Summary		Create a password entry
//	@Description	Create a password entry for the user
//	@Tags			passwords
//	@Accept			json
//	@Produce		json
//	@Param			password	body		Password	true	"Password object that needs to be created"
//	@Success		200			{object}	Password
//	@Success		400			{object}	errorResponse
//	@Success		500			{object}	errorResponse
//	@Router			/passwords [post]
func passwordPost(c *gin.Context) {
	var password passwords.Password
	if err := c.ShouldBindJSON(&password); err != nil {
		c.JSON(400, errorResponse{Message: err.Error()})
		return
	}

	currentUser, err := middleware.GetCurrentUser(c)
	if err != nil {
		c.JSON(500, errorResponse{Message: err.Error()})
		return
	}

	password.UserID = currentUser.ID

	newPassword, err := passwords.Create(password)
	if err != nil {
		c.JSON(500, errorResponse{Message: err.Error()})
		return
	}

	c.JSON(200, newPassword)
}
