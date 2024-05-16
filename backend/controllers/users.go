package controllers

import (
	"github.com/fabiokaelin/password-safe/pkg/users"
	"github.com/gin-gonic/gin"
)

func UserRouter(apiGroup *gin.RouterGroup) {
	userGroup := apiGroup.Group("/users")
	{
		userGroup.POST("/", userPost)
		userGroup.POST("/login", userLogin)
	}
}

// userPost             godoc
//
//	@Summary		Register a new user
//	@Description	Register a new user and return the user
//	@Tags			users
//	@Param			body	body	users.User	true	"body"
//	@Produce		json
//	@Success		201	{object}	users.User
//	@Failure		400	{object}	ErrorResponse
//	@Failure		500	{object}	ErrorResponse
//	@Router			/users [post]
func userPost(c *gin.Context) {
	var body users.User
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(400, errorResponse{Message: err.Error()})
		return
	}

	newUser, err := users.Create(body)
	if err != nil {
		c.JSON(500, errorResponse{Message: err.Error()})
		return
	}

	c.JSON(201, newUser)
}

// userLogin             godoc
//
//	@Summary		Log in a user
//	@Description	Log in a user and set a cookie with the token
//	@Tags			users
//	@Param			body	body	users.User	true	"body"
//	@Produce		json
//	@Success		200	{string}	token
//	@Failure		400	{object}	ErrorResponse
//	@Failure		500	{object}	ErrorResponse
//	@Router			/users/login [post]
func userLogin(c *gin.Context) {
	var body users.User
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(400, errorResponse{Message: err.Error()})
		return
	}

	token, err := users.Login(body)
	if err != nil {
		c.JSON(500, errorResponse{Message: err.Error()})
		return
	}

	c.SetCookie("token", token, 24*60, "/", "localhost", false, true)

	c.JSON(200, token)
}
