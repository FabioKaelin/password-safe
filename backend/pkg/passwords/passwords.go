package passwords

import (
	"github.com/davecgh/go-spew/spew"
	"github.com/fabiokaelin/password-safe/pkg/category"
	"github.com/fabiokaelin/password-safe/pkg/db"
)

type (
	Password struct {
		ID          string            `json:"id,omitempty"`
		UserID      string            `json:"userid,omitempty"`
		Title       string            `json:"title,omitempty"`
		URL         string            `json:"url,omitempty"`
		Username    string            `json:"username,omitempty"`
		Password    string            `json:"password,omitempty"`
		Description string            `json:"description,omitempty"`
		Category    category.Category `json:"category,omitempty"`
	} // @name Password
)

func Create(password Password) (Password, error) {
	encryptedPassword, err := Encrypt(password.Password)
	if err != nil {
		return Password{}, err
	}
	dbPassword := db.DatabasePassword{
		ID:          password.ID,
		UserID:      password.UserID,
		Title:       password.Title,
		URL:         password.URL,
		Username:    password.Username,
		Password:    encryptedPassword,
		Description: password.Description,
		CategoryID:  password.Category.ID,
	}

	passwordId, err := db.PasswordsCreate(dbPassword)
	if err != nil {
		return Password{}, err
	}

	newDBPassword, err := db.PasswordsGet(passwordId)
	if err != nil {
		return Password{}, err
	}

	decryptedPassword, err := Decrypt(newDBPassword.Password)
	if err != nil {
		return Password{}, err
	}

	category, err := category.Get(newDBPassword.CategoryID, newDBPassword.UserID)
	if err != nil {
		return Password{}, err
	}

	newPassword := Password{
		ID:          newDBPassword.ID,
		UserID:      newDBPassword.UserID,
		Title:       newDBPassword.Title,
		URL:         newDBPassword.URL,
		Username:    newDBPassword.Username,
		Password:    decryptedPassword,
		Description: newDBPassword.Description,
		Category:    category,
	}

	return newPassword, nil
}

func Get(id string) (Password, error) {
	dbPassword, err := db.PasswordsGet(id)
	if err != nil {
		return Password{}, err
	}

	decryptedPassword, err := Decrypt(dbPassword.Password)
	if err != nil {
		return Password{}, err
	}

	category, err := category.Get(dbPassword.CategoryID, dbPassword.UserID)
	if err != nil {
		return Password{}, err
	}

	password := Password{
		ID:          dbPassword.ID,
		UserID:      dbPassword.UserID,
		Title:       dbPassword.Title,
		URL:         dbPassword.URL,
		Username:    dbPassword.Username,
		Password:    decryptedPassword,
		Description: dbPassword.Description,
		Category:    category,
	}

	return password, nil
}

func GetByUserID(userId string) ([]Password, error) {
	dbPasswords, err := db.PasswordsGetByUserID(userId)
	if err != nil {
		return nil, err
	}

	var passwords []Password
	for _, dbPassword := range dbPasswords {
		decryptedPassword, err := Decrypt(dbPassword.Password)
		if err != nil {
			return nil, err
		}

		spew.Dump(dbPassword)

		categoryObj := category.Category{}

		if dbPassword.CategoryID != "" {
			categoryObj, err = category.Get(dbPassword.CategoryID, userId)
			if err != nil {
				return nil, err
			}
		}

		password := Password{
			ID:          dbPassword.ID,
			UserID:      dbPassword.UserID,
			Title:       dbPassword.Title,
			URL:         dbPassword.URL,
			Username:    dbPassword.Username,
			Password:    decryptedPassword,
			Description: dbPassword.Description,
			Category:    categoryObj,
		}
		passwords = append(passwords, password)
	}

	return passwords, nil
}

func Update(password Password) error {
	encryptedPassword, err := Encrypt(password.Password)
	if err != nil {
		return err
	}
	dbPassword := db.DatabasePassword{
		ID:          password.ID,
		UserID:      password.UserID,
		Title:       password.Title,
		URL:         password.URL,
		Username:    password.Username,
		Password:    encryptedPassword,
		Description: password.Description,
		CategoryID:  password.Category.ID,
	}

	err = db.PasswordsUpdate(dbPassword)
	if err != nil {
		return err
	}

	return nil
}

func Delete(id string) error {
	err := db.PasswordsDelete(id)
	if err != nil {
		return err
	}

	return nil
}
