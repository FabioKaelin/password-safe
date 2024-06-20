package db

import (
	"fmt"
)

type (
	DatabasePassword struct {
		ID          string
		UserID      string
		Title       string
		URL         string
		Username    string
		Password    string
		Description string
		CategoryID  string
	}
)

func PasswordsCreate(password DatabasePassword) (string, error) {
	var passwordId string
	err := dbConn.QueryRow("INSERT INTO passwords (id, useridfk, title, url, username, password, description, categoryidfk) VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?) RETURNING id", password.UserID, password.Title, password.URL, password.Username, password.Password, password.Description, password.CategoryID).Scan(&passwordId)
	if err != nil {
		return "", err
	}
	return passwordId, nil
}

func PasswordsGet(id string) (DatabasePassword, error) {
	var password DatabasePassword
	err := dbConn.QueryRow("SELECT id, useridfk, title, url, username, password, description, categoryidfk FROM passwords WHERE id = ?", id).Scan(&password.ID, &password.UserID, &password.Title, &password.URL, &password.Username, &password.Password, &password.Description, &password.CategoryID)
	if err != nil {
		fmt.Println("Error in PasswordsGet: ", err)
		return password, err
	}
	return password, nil
}

func PasswordsGetByUserID(userId string) ([]DatabasePassword, error) {
	rows, err := dbConn.Query("SELECT id, useridfk, title, url, username, password, description, categoryidfk FROM passwords WHERE useridfk = ?", userId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var passwords []DatabasePassword
	for rows.Next() {
		var password DatabasePassword
		err := rows.Scan(&password.ID, &password.UserID, &password.Title, &password.URL, &password.Username, &password.Password, &password.Description, &password.CategoryID)
		if err != nil {
			return nil, err
		}
		passwords = append(passwords, password)
	}

	return passwords, nil
}

func PasswordsUpdate(password DatabasePassword) error {
	_, err := dbConn.Exec("UPDATE passwords SET title = ?, url = ?, username = ?, password = ?, description = ?, categoryidfk = ? WHERE id = ?", password.Title, password.URL, password.Username, password.Password, password.Description, password.CategoryID, password.ID)
	if err != nil {
		return err
	}
	return nil
}

func PasswordsDelete(id string) error {
	_, err := dbConn.Exec("DELETE FROM passwords WHERE id = ?", id)
	if err != nil {
		return err
	}
	return nil
}
