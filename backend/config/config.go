package config

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

var (
	GinMode string

	DatabaseHost     string
	DatabaseUser     string
	DatabasePassword string
	DatabasePort     string

	FrontEndOrigin string

	JWTTokenSecret string
	PasswordSecret string
)

func getString(key string) (string, error) {
	value := os.Getenv(key)
	if value == "" {
		return "", fmt.Errorf("key '%s' not found", key)
	}
	return value, nil
}

func Load() error {
	godotenv.Load(".env")

	ginmode, err := getString("GIN_MODE")
	if err != nil {
		return err
	}
	if ginmode != "debug" && ginmode != "release" {
		ginmode = "debug"
	}
	GinMode = ginmode

	DatabaseHost, err = getString("DATABASE_HOST")
	if err != nil {
		return err
	}

	DatabaseUser, err = getString("DATABASE_USER")
	if err != nil {
		return err
	}

	DatabasePassword, err = getString("DATABASE_PASSWORD")
	if err != nil {
		return err
	}

	DatabasePort, err = getString("DATABASE_PORT")
	if err != nil {
		return err
	}

	FrontEndOrigin, err = getString("FRONT_END_ORIGIN")
	if err != nil {
		return err
	}

	JWTTokenSecret, err = getString("JWT_TOKEN_SECRET")
	if err != nil {
		return err
	}

	PasswordSecret, err = getString("PASSWORD_SECRET")
	if err != nil {
		return err
	}

	return nil
}
