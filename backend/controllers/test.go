package controllers

import (
	"github.com/fabiokaelin/password-safe/pkg/middleware"
	"github.com/gin-gonic/gin"
)

func TestRouter(apiGroup *gin.RouterGroup) {
	testGroup := apiGroup.Group("/test")
	testGroup.Use(middleware.SetUserToContext())
	{
		testGroup.GET("/", testGet)
	}
}

// testGet             godoc
//
//	@Summary		Test if the user is logged in
//	@Description	Test if the user is logged in
//	@Tags			test
//	@Produce		json
//	@Success		200	{object}	users.User
//	@Success		500	{object}	errorResponse
//	@Router			/test [get]
func testGet(c *gin.Context) {
	currentUser, err := middleware.GetCurrentUser(c)
	if err != nil {
		c.JSON(500, errorResponse{Message: err.Error()})
		return
	}
	filteredUser := currentUser.FilteredUser()
	c.JSON(200, filteredUser)
}
