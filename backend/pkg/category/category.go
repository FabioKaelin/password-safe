package category

import "github.com/fabiokaelin/password-safe/pkg/db"

type (
	Category struct {
		ID     string `json:"id,omitempty"`
		Name   string `json:"name,omitempty"`
		UserID string `json:"userid,omitempty"`
	} // @name Category
)

// Create creates a new category
func Create(category Category) (Category, error) {
	categoryId, err := db.CategoriesCreate(db.DatabaseCategory{
		Name:   category.Name,
		UserID: category.UserID,
	})
	if err != nil {
		return Category{}, err
	}

	newDBCategory, err := db.CategoriesGet(categoryId, category.UserID)
	if err != nil {
		return Category{}, err
	}

	newCategory := Category{
		ID:     newDBCategory.ID,
		Name:   newDBCategory.Name,
		UserID: newDBCategory.UserID,
	}

	return newCategory, nil
}

// Get gets a category by its ID
func Get(id string, userid string) (Category, error) {
	dbCategory, err := db.CategoriesGet(id, userid)
	if err != nil {
		return Category{}, err
	}

	category := Category{
		ID:     dbCategory.ID,
		Name:   dbCategory.Name,
		UserID: dbCategory.UserID,
	}

	return category, nil
}

// GetByUserID gets all categories by the user ID
func GetByUserID(userId string) ([]Category, error) {
	dbCategories, err := db.CategoriesGetByUserID(userId)
	if err != nil {
		return nil, err
	}

	var categories []Category
	for _, dbCategory := range dbCategories {
		category := Category{
			ID:     dbCategory.ID,
			Name:   dbCategory.Name,
			UserID: dbCategory.UserID,
		}
		categories = append(categories, category)
	}

	return categories, nil
}

// Update updates a category
func Update(category Category, userID string) error {
	err := db.CategoriesUpdate(db.DatabaseCategory{
		ID:     category.ID,
		Name:   category.Name,
		UserID: userID,
	})
	if err != nil {
		return err
	}
	return nil
}

// Delete deletes a category by its ID
func Delete(id string, userID string) error {
	err := db.CategoriesDelete(id, userID)
	if err != nil {
		return err
	}
	return nil
}
