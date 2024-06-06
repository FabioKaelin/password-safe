package main

import (
	"fmt"

	"github.com/fabiokaelin/password-safe/config"
	"github.com/fabiokaelin/password-safe/controllers"
	"github.com/fabiokaelin/password-safe/pkg/db"
	"github.com/fabiokaelin/password-safe/pkg/logger"
	"github.com/fabiokaelin/password-safe/pkg/middleware"
	"github.com/gin-gonic/gin"

	docs "github.com/fabiokaelin/password-safe/docs"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// @title						Password Safe API
// @version					1.0.0
// @description				The API for the Password Safe Application
//
// @BasePath					/api
// @securityDefinitions.apikey	ApiKeyAuth
// @in							header
// @name						token
// @description				Token for authentication
func main() {
	err := config.Load()

	if err != nil {
		fmt.Println("Error in Load config", err)
		panic(err)
	}

	err = db.UpdateDBConnection()
	if err != nil {
		fmt.Println("Error in UpdateDBConnection", err)
		panic(err)
	}

	gin.SetMode(config.GinMode)

	router := gin.New()
	router.Use(gin.Recovery())
	router.Use(gin.LoggerWithConfig(logger.LoggerConfig))
	router.ForwardedByClientIP = true
	router.HandleMethodNotAllowed = true
	router.Use(middleware.CORSMiddleware())

	apiGroup := router.Group("/api")

	docs.SwaggerInfo.BasePath = "/api"
	apiGroup.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))
	apiGroup.GET("/swagger", func(c *gin.Context) {
		c.Redirect(302, "/api/swagger/index.html")
	})

	controllers.UserRouter(apiGroup)
	controllers.PasswordRouter(apiGroup)

	router.Run(":8000")
}
