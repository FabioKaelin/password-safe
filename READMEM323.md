# Modul 323

## Nutzung von Functional programming in diesem Projekt

### High Order Functions (Kompetenz C3E)

Die Nutzung von High order Functions in diesem Projekt ist sehr fortgeschritten. Beispielsweise wird in der Datei: `CategoriesTable.tsx` ein useEFfect gebraucht, welcher einen Filter anwendet. Dieser Filter ist eine High Order Function.

Zeile 29 - 31:
Dabei wird ein Filter angwendet.

```typescript
    useEffect(() => {
        const categoryFilter = (searchInput: string) => (entry: Category) => entry.name.toLowerCase().includes(searchInput.toLowerCase());
        const res = filteredEntries !== null && filteredEntries.filter(categoryFilter(searchInput));
        setFilteredCategories(res);
    }, [searchInput, filteredEntries]);
```

Die Definition des Filter befindet sich in der Datei: `FilteringHandler.ts` und sieht wie folgt aus:
Davon werden mehrere Filter verwendet in verschiedenen Dateien, wie zum Beispiel auch in: `PasswordTable.tsx` und `CategoriesTable.tsx`

```typescript
export const categoryFilter = (searchInput: string) => (entry: Category) => entry.name.toLowerCase().includes(searchInput.toLowerCase());
```

### Immutable values (kind of)

#### Immutable values - Beispiel 1 (Kompetenz AF1)

In diesem Projekt wurden auch immutable values verwendet. Beispielsweise in der Datei: `PasswordTable.tsx` wird ein neues Array erstellt, welches die alten Werte beinhaltet und dann wird ein neuer Wert hinzugefügt.

Dabei wird ein neues Array erstellt und ein neuer Wert hinzugefügt.

```typescript
    const newEntries = [...filteredEntries, newEntry];
    setFilteredEntries(newEntries);
```

Weiter wird es wie folgt bearbeitet:

```typescript
    useEffect(() => {
        if (searchInput === " " || searchInput === "" || searchInput === null) {
            setFilteredEntries(entries)
            return
        }
        // Higher Function method
        const res = filteredEntries.filter(vaultFilter(searchInput));

        setFilteredEntries(res)
    }, [searchInput]);
```

### First Class Citizen (Kompetenz C2F)

Dieser Backend-Code ist für das Routing verantworlich und übergibt die Handler für die Endpoints.

```go
func PasswordRouter(apiGroup *gin.RouterGroup) {
    passwordGroup := apiGroup.Group("/passwords")
    passwordGroup.Use(middleware.SetUserToContext())
    {
        passwordGroup.GET("/", passwordGet)
        passwordGroup.POST("/", passwordPost)
        passwordGroup.GET("/:id", passwordGetByID)
        passwordGroup.PUT("/:id", passwordUpdate)
        passwordGroup.DELETE("/:id", passwordDelete)
    }
}
```

Dies ist die Funktion/Handler die an Gin (API-Framework) übergeben $wird.

```go
// passwordGet             godoc
//
// @Summary        Get all passwords
// @Description    Get all passwords of the user
// @Tags           passwords
// @Produce        json
// @Success        200     {array}     Password
// @Param          page    query       string    false    "page"
// @Success        400     {object}    errorResponse
// @Success        401     {object}    errorResponse
// @Router         /passwords [get]
func passwordGet(c *gin.Context) {
    currentUser, err := middleware.GetCurrentUser(c)
    if err != nil {
        c.JSON(400, errorResponse{Message: err.Error()})
        return
    }

    passwordsOfUser, err := passwords.GetByUserID(currentUser.ID)

    if err != nil {
        if err.Error() == "sql: no rows in result set" {
            c.JSON(200, []passwords.Password{})
            return
        }
        c.JSON(400, errorResponse{Message: err.Error()})
        return
    }

    pageNr := c.Query("page")
    if pageNr == "" {
        c.JSON(200, passwordsOfUser)
        return
    } else {
        pageNrInt, err := strconv.Atoi(pageNr)
        if err != nil {
            c.JSON(400, errorResponse{Message: err.Error()})
            return
        }
        c.JSON(200, page.GetPage(passwordsOfUser, pageNrInt))
        return
    }
}
```
