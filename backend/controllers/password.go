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
		passwordGroup.GET("/:id", passwordGetByID)
		passwordGroup.PUT("/:id", passwordUpdate)
		passwordGroup.DELETE("/:id", passwordDelete)
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
			c.JSON(200, []passwords.Password{})
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

// passwordGetByID             godoc
//
//	@Summary		Get a Password
//	@Description	Get a password by ID
//	@Tags			passwords
//	@Param			id	path	string	true	"id"
//	@Produce		json
//	@Success		200	{array}		Password
//	@Success		500	{object}	errorResponse
//	@Router			/passwords/{id} [get]
func passwordGetByID(c *gin.Context) {
	passwordID := c.Param("id")

	password, err := passwords.Get(passwordID)
	if err != nil {
		if err.Error() == "sql: no rows in result set" {
			c.JSON(404, "not found")
			return
		}
		c.JSON(500, errorResponse{Message: err.Error()})
		return
	}

	currentUser, err := middleware.GetCurrentUser(c)
	if err != nil {
		c.JSON(500, errorResponse{Message: err.Error()})
		return
	}

	if password.UserID != currentUser.ID {
		c.JSON(403, "forbidden")
		return
	}

	c.JSON(200, password)
}

// passwordUpdate             godoc
//
//	@Summary		Update a password entry
//	@Description	Update a password entry for the user
//	@Tags			passwords
//	@Accept			json
//	@Produce		json
//	@Param			id			path		string		true	"id"
//	@Param			password	body		Password	true	"Password object that needs to be updated"
//	@Success		200			{object}	Password
//	@Success		400			{object}	errorResponse
//	@Success		500			{object}	errorResponse
//	@Router			/passwords/{id} [put]
func passwordUpdate(c *gin.Context) {
	currentUser, err := middleware.GetCurrentUser(c)
	if err != nil {
		c.JSON(500, errorResponse{Message: err.Error()})
		return
	}

	var password passwords.Password
	if err := c.ShouldBindJSON(&password); err != nil {
		c.JSON(400, errorResponse{Message: err.Error()})
		return
	}

	if password.UserID != currentUser.ID {
		c.JSON(403, "forbidden")
		return
	}

	passwordID := c.Param("id")
	password.ID = passwordID

	err = passwords.Update(password)
	if err != nil {
		c.JSON(500, errorResponse{Message: err.Error()})
		return
	}

	updatedPassword, err := passwords.Get(passwordID)
	if err != nil {
		c.JSON(500, errorResponse{Message: err.Error()})
		return
	}

	c.JSON(200, updatedPassword)
}

// passwordDelete             godoc
//
//	@Summary		Delete a password entry
//	@Description	Delete a password entry for the user
//	@Tags			passwords
//	@Param			id	path	string	true	"id"
//	@Success		204
//	@Success		500	{object}	errorResponse
//	@Router			/passwords/{id} [delete]
func passwordDelete(c *gin.Context) {
	currentUser, err := middleware.GetCurrentUser(c)
	if err != nil {
		c.JSON(500, errorResponse{Message: err.Error()})
		return
	}

	passwordID := c.Param("id")
	password, err := passwords.Get(passwordID)
	if err != nil {
		c.JSON(500, errorResponse{Message: err.Error()})
		return
	}

	if password.UserID != currentUser.ID {
		c.JSON(403, "forbidden")
		return
	}

	err = passwords.Delete(passwordID)
	if err != nil {
		c.JSON(500, errorResponse{Message: err.Error()})
		return
	}

	c.JSON(204, "deleted")
}
