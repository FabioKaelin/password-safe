package db

import (
	// "backend/config"

	"database/sql"
	"errors"
	"fmt"
	"time"

	// database driver
	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"

	"github.com/fabiokaelin/password-safe/config"
	"github.com/fabiokaelin/password-safe/pkg/logger"
)

var dbConn *sqlx.DB
var connString string

// UpdateDBConnection initializes or updates the database connection
func UpdateDBConnection() error {
	if connString == "" {
		connString = fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=true", config.DatabaseUser, config.DatabasePassword, config.DatabaseHost, config.DatabasePort, "safe")
	}
	dbNew, err := sqlx.Open("mysql", connString)
	if err != nil {
		logger.Log.Error(err.Error())
		dbConn = nil
		return err
	}
	if dbNew == nil {
		err := errors.New("error durring updating db connection")
		dbConn = nil
		return err
	}
	// test if connection is working
	err = dbNew.Ping()
	if err != nil {
		err := errors.Join(errors.New("error durring updating db connection"), err)
		dbConn = nil
		return err
	}
	if dbConn != nil {
		dbConn.Close()
		dbConn = nil
	}
	dbConn = dbNew
	dbConn.SetMaxOpenConns(30)
	dbConn.SetMaxIdleConns(5)
	maxLifeTime := time.Minute * 30
	dbConn.SetConnMaxLifetime(maxLifeTime)
	// db.QueryRow("set client_encoding='win1252'")
	// db.QueryRow("SET CLIENT_ENCODING TO 'LATIN1';")
	return nil
}

// SetConnectionString sets the database connection string
func SetConnectionString(newConnString string) {
	connString = newConnString
}

// GetDBConnection returns the database connection string
func GetDBConnection() *sqlx.DB {
	return dbConn
}

func RunSQL(sqlStatement string, parameters ...any) (*sql.Rows, error) {
	err := dbConn.Ping()
	if err != nil {
		fmt.Println("DB Connection lost, reconnecting...")
		err := UpdateDBConnection()
		if err != nil {
			return &sql.Rows{}, err
		}
	}
	rows, err := dbConn.Query(sqlStatement, parameters...)
	if err != nil {
		err := errors.Join(errors.New("error durring executing "+sqlStatement), err)
		return &sql.Rows{}, err
	}
	return rows, nil
}
