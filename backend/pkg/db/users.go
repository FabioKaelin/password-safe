package db

type (
	DatabaseUser struct {
		ID       string
		Name     string
		Password string
	}
)

func UsersCreate(user DatabaseUser) (string, error) {
	var userId string
	err := dbConn.QueryRow("INSERT INTO users (name, password) VALUES ($1, $2) RETURNING id", user.Name, user.Password).Scan(&userId)
	if err != nil {
		return "", err
	}
	return userId, nil
}

func UsersGet(id string) (DatabaseUser, error) {
	var user DatabaseUser
	err := dbConn.QueryRow("SELECT id, name, password FROM users WHERE id = $1", id).Scan(&user.ID, &user.Name, &user.Password)
	if err != nil {
		return user, err
	}
	return user, nil
}

func UsersGetByName(name string) (DatabaseUser, error) {
	var user DatabaseUser
	err := dbConn.QueryRow("SELECT id, name, password FROM users WHERE name = $1", name).Scan(&user.ID, &user.Name, &user.Password)
	if err != nil {
		return user, err
	}
	return user, nil
}
