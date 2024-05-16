package db

type (
	DatabaseUser struct {
		ID       string
		Email    string
		Password string
	}
)

func UsersCreate(user DatabaseUser) (string, error) {
	var userId string
	err := dbConn.QueryRow("INSERT INTO users (id, email, password) VALUES (UUID(), ?, ?) RETURNING id", user.Email, user.Password).Scan(&userId)
	if err != nil {
		return "", err
	}
	return userId, nil
}

func UsersGet(id string) (DatabaseUser, error) {
	var user DatabaseUser
	err := dbConn.QueryRow("SELECT id, email, password FROM users WHERE id = ?", id).Scan(&user.ID, &user.Email, &user.Password)
	if err != nil {
		return user, err
	}
	return user, nil
}

func UsersGetByEmail(email string) (DatabaseUser, error) {
	var user DatabaseUser
	err := dbConn.QueryRow("SELECT id, email, password FROM users WHERE email = ?", email).Scan(&user.ID, &user.Email, &user.Password)
	if err != nil {
		return user, err
	}
	return user, nil
}
