package db

import "fmt"

type (
	DatabaseCategory struct {
		ID     string
		Name   string
		UserID string
	}
)

func CategoriesCreate(category DatabaseCategory) (string, error) {
	var categoryId string
	err := dbConn.QueryRow("INSERT INTO categories (id, name, useridfk) VALUES (UUID(), ?, ?) RETURNING id", category.Name, category.UserID).Scan(&categoryId)
	if err != nil {
		return "", err
	}
	return categoryId, nil
}

func CategoriesGet(id string, userid string) (DatabaseCategory, error) {
	var category DatabaseCategory
	err := dbConn.QueryRow("SELECT id, name, useridfk FROM categories WHERE id = ? and useridfk = ?", id, userid).Scan(&category.ID, &category.Name, &category.UserID)
	if err != nil {
		fmt.Println("Error in CategoriesGet: ", err)
		return category, err
	}
	return category, nil
}

func CategoriesGetByUserID(userId string) ([]DatabaseCategory, error) {
	rows, err := dbConn.Query("SELECT id, name, useridfk FROM categories WHERE useridfk = ?", userId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var categories []DatabaseCategory
	for rows.Next() {
		var category DatabaseCategory
		err := rows.Scan(&category.ID, &category.Name, &category.UserID)
		if err != nil {
			return nil, err
		}
		categories = append(categories, category)
	}

	return categories, nil
}

func CategoriesUpdate(category DatabaseCategory) error {
	_, err := dbConn.Exec("UPDATE categories SET name = ? WHERE id = ? AND useridfk = ?", category.Name, category.ID, category.UserID)
	if err != nil {
		return err
	}
	return nil
}

func CategoriesDelete(id string, userid string) error {
	_, err := dbConn.Exec("DELETE FROM categories WHERE id = ? AND useridfk = ?", id, userid)
	if err != nil {
		return err
	}
	return nil
}
