package page

import (
	"math"

	"github.com/fabiokaelin/password-safe/pkg/passwords"
)

type Page struct {
	Total     int                  `json:"total"`
	Page      int                  `json:"page"`
	Passwords []passwords.Password `json:"passwords"`
}

func GetPage(passwordsList []passwords.Password, page int) Page {
	passwordPerPage := 10
	start := (page - 1) * passwordPerPage
	end := page * passwordPerPage

	if start > len(passwordsList) {
		return Page{
			Total:     len(passwordsList) / passwordPerPage,
			Page:      page,
			Passwords: []passwords.Password{},
		}
	}

	if end > len(passwordsList) {
		end = len(passwordsList)
	}

	return Page{
		Total:     int(math.Ceil(float64(len(passwordsList)) / float64(passwordPerPage))),
		Page:      page,
		Passwords: passwordsList[start:end],
	}
}
