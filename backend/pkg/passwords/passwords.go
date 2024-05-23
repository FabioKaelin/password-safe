package passwords

import "github.com/fabiokaelin/password-safe/pkg/db"

type (
	Password struct {
		ID          string `json:"id,omitempty"`
		UserID      string `json:"userid,omitempty"`
		Title       string `json:"title,omitempty"`
		URL         string `json:"url,omitempty"`
		Username    string `json:"username,omitempty"`
		Password    string `json:"password,omitempty"`
		Description string `json:"description,omitempty"`
	} // @name Password
)

func Create(password Password) (Password, error) {
	dbPassword := db.DatabasePassword{
		ID:          password.ID,
		UserID:      password.UserID,
		Title:       password.Title,
		URL:         password.URL,
		Username:    password.Username,
		Password:    password.Password,
		Description: password.Description,
	}

	passwordId, err := db.PasswordsCreate(dbPassword)
	if err != nil {
		return Password{}, err
	}

	newDBPassword, err := db.PasswordsGet(passwordId)
	if err != nil {
		return Password{}, err
	}

	newPassword := Password{
		ID:          newDBPassword.ID,
		UserID:      newDBPassword.UserID,
		Title:       newDBPassword.Title,
		URL:         newDBPassword.URL,
		Username:    newDBPassword.Username,
		Password:    newDBPassword.Password,
		Description: newDBPassword.Description,
	}

	return newPassword, nil
}

func Get(id string) (Password, error) {
	dbPassword, err := db.PasswordsGet(id)
	if err != nil {
		return Password{}, err
	}

	password := Password{
		ID:          dbPassword.ID,
		UserID:      dbPassword.UserID,
		Title:       dbPassword.Title,
		URL:         dbPassword.URL,
		Username:    dbPassword.Username,
		Password:    dbPassword.Password,
		Description: dbPassword.Description,
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
		password := Password{
			ID:          dbPassword.ID,
			UserID:      dbPassword.UserID,
			Title:       dbPassword.Title,
			URL:         dbPassword.URL,
			Username:    dbPassword.Username,
			Password:    dbPassword.Password,
			Description: dbPassword.Description,
		}
		passwords = append(passwords, password)
	}

	return passwords, nil
}

func Update(password Password) error {
	dbPassword := db.DatabasePassword{
		ID:          password.ID,
		UserID:      password.UserID,
		Title:       password.Title,
		URL:         password.URL,
		Username:    password.Username,
		Password:    password.Password,
		Description: password.Description,
	}

	err := db.PasswordsUpdate(dbPassword)
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
