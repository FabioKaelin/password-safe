package main

import (
	"fmt"

	"github.com/fabiokaelin/password-safe/config"
	"github.com/fabiokaelin/password-safe/controllers"
	"github.com/fabiokaelin/password-safe/pkg/logger"
	"github.com/fabiokaelin/password-safe/pkg/middleware"
	"github.com/gin-gonic/gin"
)

func main() {
	err := config.Load()

	if err != nil {
		fmt.Println("Error in Load config", err)
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

	controllers.UserRouter(apiGroup)

	router.Run(":8080")
}
