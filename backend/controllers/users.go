package controllers

import (
	"github.com/fabiokaelin/password-safe/pkg/users"
	"github.com/gin-gonic/gin"
)

func UserRouter(apiGroup *gin.RouterGroup) {
	userGroup := apiGroup.Group("/users")
	{
		userGroup.POST("/", userPost)
		userGroup.GET("/login", userLogin)
	}
}

func userPost(c *gin.Context) {
	var body users.User
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	newUser, err := users.Create(body)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(201, newUser)
}

func userLogin(c *gin.Context) {
	var body users.User
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	token, err := users.Login(body)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.SetCookie("token", token, 24*60, "/", "localhost", false, true)

	c.JSON(200, token)
}
