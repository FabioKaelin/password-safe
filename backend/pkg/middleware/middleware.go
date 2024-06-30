package middleware

import (
	"errors"
	"fmt"
	"net/http"
	"strings"

	"github.com/fabiokaelin/password-safe/config"
	"github.com/fabiokaelin/password-safe/pkg/db"
	token_pkg "github.com/fabiokaelin/password-safe/pkg/token"
	user_pkg "github.com/fabiokaelin/password-safe/pkg/users"
	"github.com/gin-gonic/gin"
)

func SetUserToContext() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var token string
		cookie, err := ctx.Cookie("token")

		authorizationHeader := ctx.Request.Header.Get("Authorization")
		fields := strings.Fields(authorizationHeader)

		if len(fields) != 0 && fields[0] == "Bearer" {
			token = fields[1]
		} else if err == nil {
			token = cookie
		}

		if token == "" {
			fmt.Println("token is empty 1")
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"status": "fail", "message": "You are not logged in"})
			return
		}

		sub, err := token_pkg.ValidateToken(token, config.JWTTokenSecret)
		if err != nil {
			fmt.Println("error on validate token 2")
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"status": "fail", "message": err.Error()})
			return
		}

		var user user_pkg.User

		fmt.Println("sub", sub)

		rows, err := db.RunSQL("SELECT `id`, `email`, `password` FROM `users` WHERE `id` = ? LIMIT 1;", fmt.Sprint(sub))

		if err != nil {
			fmt.Println("the user belonging to this token no logger exists 3")
			ctx.AbortWithStatusJSON(http.StatusForbidden, gin.H{"status": "fail", "message": "the user belonging to this token no logger exists"})
			return
		}
		defer rows.Close()

		for rows.Next() {
			rows.Scan(&user.ID, &user.Email, &user.Password)
			break
		}

		ctx.Set("currentUser", user)
		ctx.Next()

	}
}

// GetCurrentUser returns the current user from the context
func GetCurrentUser(c *gin.Context) (user_pkg.User, error) {
	userData, exist := c.Get("currentUser")
	if !exist {
		return user_pkg.User{}, errors.New("user not found")
	}
	// var userResponse UserResponse
	userResponse := userData.(user_pkg.User)
	return userResponse, nil
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		origin := c.Request.Header.Get("Origin")
		c.Writer.Header().Set("Access-Control-Allow-Origin", origin)
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With, access-control-allow-origin, Cookie, caches, Pragma, Expires")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
