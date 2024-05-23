package main

import (
	"fmt"

	"github.com/fabiokaelin/passowrd-safe/config"
	"github.com/gin-gonic/gin"
)

func main() {
	err := config.Load()

	if err != nil {
		fmt.Println("Error in Load config", err)
		panic(err)
	}

	router := gin.Default()
	router.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	router.Run(":8080")
}
