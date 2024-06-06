package controllers

import (
	"net/http"

	"github.com/fabiokaelin/password-safe/pkg/middleware"
	"github.com/fabiokaelin/password-safe/pkg/users"
	"github.com/gin-gonic/gin"
)

func UserRouter(apiGroup *gin.RouterGroup) {
	userGroup := apiGroup.Group("/users")
	{
		userGroup.POST("/", userPost)
		userGroup.POST("/login", userLogin)
		userGroup.PUT("/:id", userPut)
		userGroup.GET("/check", userCheckLogin)
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
//	@Failure		401	{object}	ErrorResponse
//	@Router			/users/login [post]
func userLogin(c *gin.Context) {
	var body users.User
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(400, errorResponse{Message: err.Error()})
		return
	}

	token, err := users.Login(body)
	if err != nil {
		c.JSON(http.StatusUnauthorized, errorResponse{Message: err.Error()})
		return
	}

	c.SetCookie("token", token, 24*60, "/", "localhost", false, true)

	c.JSON(200, token)
}

// userPut             godoc
//
//	@Summary		Update a user
//	@Description	Update a user and return the user
//	@Tags			users
//	@Param			id		path	string		true	"The user ID"
//	@Param			body	body	users.User	true	"body"
//	@Produce		json
//	@Success		200	{object}	users.User
//	@Failure		400	{object}	ErrorResponse
//	@Failure		401	{object}	ErrorResponse
//	@Router			/users/{id} [put]
func userPut(c *gin.Context) {
	id := c.Param("id")
	var body users.User
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(400, errorResponse{Message: err.Error()})
		return
	}

	user, err := users.Update(id, body)
	if err != nil {
		c.JSON(500, errorResponse{Message: err.Error()})
		return
	}

	c.JSON(200, user)
}

// userCheckLogin             godoc
//
//	@Summary		Check if the user is logged in
//	@Description	Check if the user is logged in
//	@Tags			users
//	@Produce		json
//	@Success		200	{object}	users.User
//	@Success		500	{object}	errorResponse
//	@Router			/users/check [get]
func userCheckLogin(c *gin.Context) {
	currentUser, err := middleware.GetCurrentUser(c)
	if err != nil {
		c.JSON(500, errorResponse{Message: err.Error()})
		return
	}
	filteredUser := currentUser.FilteredUser()
	c.JSON(200, filteredUser)
}
