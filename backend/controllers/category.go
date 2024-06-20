package controllers

import (
	"github.com/fabiokaelin/password-safe/pkg/category"
	"github.com/fabiokaelin/password-safe/pkg/middleware"
	"github.com/gin-gonic/gin"
)

func CategoryRouter(apiGroup *gin.RouterGroup) {
	categoryGroup := apiGroup.Group("/categories")
	categoryGroup.Use(middleware.SetUserToContext())
	{
		categoryGroup.GET("/", categoryGet)
		categoryGroup.POST("/", categoryPost)
		categoryGroup.GET("/:id", categoryGetByID)
		categoryGroup.PUT("/:id", categoryUpdate)
		categoryGroup.DELETE("/:id", categoryDelete)
	}
}

// categoryGet             godoc
//
//	@Summary		Get all categories
//	@Description	Get all categories of the user
//	@Tags			categories
//	@Produce		json
//	@Success		200	{array}		Category
//	@Success		400	{object}	errorResponse
//	@Success		401	{object}	errorResponse
//	@Router			/categories [get]
func categoryGet(c *gin.Context) {
	currentUser, err := middleware.GetCurrentUser(c)
	if err != nil {
		c.JSON(400, errorResponse{Message: err.Error()})
		return
	}

	categoriesOfUser, err := category.GetByUserID(currentUser.ID)

	if err != nil {
		if err.Error() == "sql: no rows in result set" {
			c.JSON(200, []category.Category{})
			return
		}
		c.JSON(400, errorResponse{Message: err.Error()})
		return
	}

	c.JSON(200, categoriesOfUser)
}

// categoryPost             godoc
//
//	@Summary		Create a category
//	@Description	Create a category for the user
//	@Tags			categories
//	@Accept			json
//	@Produce		json
//	@Param			category	body		Category	true	"Category object that needs to be created"
//	@Success		200			{object}	Category
//	@Success		400			{object}	errorResponse
//	@Success		401			{object}	errorResponse
//	@Router			/categories [post]
func categoryPost(c *gin.Context) {
	var newCategory category.Category
	if err := c.ShouldBindJSON(&newCategory); err != nil {
		c.JSON(400, errorResponse{Message: err.Error()})
		return
	}

	currentUser, err := middleware.GetCurrentUser(c)
	if err != nil {
		c.JSON(400, errorResponse{Message: err.Error()})
		return
	}

	newCategory.UserID = currentUser.ID

	category, err := category.Create(newCategory)
	if err != nil {
		c.JSON(400, errorResponse{Message: err.Error()})
		return
	}

	c.JSON(200, category)
}

// categoryGetByID             godoc
//
//	@Summary		Get a category by ID
//	@Description	Get a category by its ID
//	@Tags			categories
//	@Produce		json
//	@Param			id	path		string	true	"Category ID"
//	@Success		200	{object}	Category
//	@Success		400	{object}	errorResponse
//	@Success		401	{object}	errorResponse
//	@Router			/categories/{id} [get]
func categoryGetByID(c *gin.Context) {
	categoryID := c.Param("id")
	if categoryID == "" {
		c.JSON(400, errorResponse{Message: "id is required"})
		return
	}

	currentUser, err := middleware.GetCurrentUser(c)
	if err != nil {
		c.JSON(400, errorResponse{Message: err.Error()})
		return
	}

	category, err := category.Get(categoryID, currentUser.ID)
	if err != nil {
		c.JSON(400, errorResponse{Message: err.Error()})
		return
	}

	c.JSON(200, category)
}

// categoryUpdate             godoc
//
//	@Summary		Update a category
//	@Description	Update a category by its ID
//	@Tags			categories
//	@Accept			json
//	@Produce		json
//	@Param			id			path		string		true	"Category ID"
//	@Param			category	body		Category	true	"Category object that needs to be updated"
//	@Success		200			{object}	Category
//	@Success		400			{object}	errorResponse
//	@Success		401			{object}	errorResponse
//	@Router			/categories/{id} [put]
func categoryUpdate(c *gin.Context) {
	categoryID := c.Param("id")
	if categoryID == "" {
		c.JSON(400, errorResponse{Message: "id is required"})
		return
	}

	currentUser, err := middleware.GetCurrentUser(c)
	if err != nil {
		c.JSON(400, errorResponse{Message: err.Error()})
		return
	}

	var updatedCategory category.Category
	if err := c.ShouldBindJSON(&updatedCategory); err != nil {
		c.JSON(400, errorResponse{Message: err.Error()})
		return
	}

	updatedCategory.ID = categoryID
	err = category.Update(updatedCategory, currentUser.ID)
	if err != nil {
		c.JSON(400, errorResponse{Message: err.Error()})
		return
	}

	c.JSON(200, updatedCategory)
}

// categoryDelete             godoc
//
//	@Summary		Delete a category
//	@Description	Delete a category by its ID
//	@Tags			categories
//	@Produce		json
//	@Param			id	path		string	true	"Category ID"
//	@Success		200	{string}	string
//	@Success		400	{object}	errorResponse
//	@Success		401	{object}	errorResponse
//	@Router			/categories/{id} [delete]
func categoryDelete(c *gin.Context) {
	categoryID := c.Param("id")
	if categoryID == "" {
		c.JSON(400, errorResponse{Message: "id is required"})
		return
	}

	currentUser, err := middleware.GetCurrentUser(c)
	if err != nil {
		c.JSON(400, errorResponse{Message: err.Error()})
		return
	}

	err = category.Delete(categoryID, currentUser.ID)
	if err != nil {
		c.JSON(400, errorResponse{Message: err.Error()})
		return
	}

	c.JSON(200, "Category deleted")
}
