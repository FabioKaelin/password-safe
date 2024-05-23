package users

import (
	"time"

	"github.com/fabiokaelin/password-safe/config"
	"github.com/fabiokaelin/password-safe/pkg/db"
	"github.com/fabiokaelin/password-safe/pkg/hash"
	"github.com/fabiokaelin/password-safe/pkg/token"
)

type (
	User struct {
		ID       string `json:"id,omitempty"`
		Email    string `json:"email,omitempty"`
		Password string `json:"password,omitempty"`
	}
)

func Create(user User) (User, error) {

	hashedPassword, err := hash.HashAndSalt([]byte(user.Password))

	if err != nil {
		return User{}, err
	}

	dbUser := db.DatabaseUser{
		ID:       user.ID,
		Email:    user.Email,
		Password: hashedPassword,
	}

	userid, err := db.UsersCreate(dbUser)
	if err != nil {
		return User{}, err
	}

	newDBUser, err := db.UsersGet(userid)
	if err != nil {
		return User{}, err
	}

	newUser := User{
		ID:       newDBUser.ID,
		Email:    newDBUser.Email,
		Password: newDBUser.Password,
	}

	return newUser.FilteredUser(), nil
}

func Login(user User) (string, error) {
	dbUser, err := db.UsersGetByEmail(user.Email)
	if err != nil {
		return "", err
	}

	if !hash.ComparePasswords(dbUser.Password, []byte(user.Password)) {
		return "", nil
	}

	tokenString, err := token.GenerateToken(time.Duration(24*time.Hour), dbUser.ID, config.JWTTokenSecret)

	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func (user *User) FilteredUser() User {
	return User{
		ID:    user.ID,
		Email: user.Email,
	}
}
