# Modul 323

## Nutzung von Functional programming in diesem Projekt

### High Order Functions & Lambda Functions (Kompetenz `CG3`, `CF3`, `CE3`)

Die Nutzung von High order Functions in diesem Projekt ist sehr fortgeschritten. Beispielsweise wird in der Datei: `CategoriesTable.tsx` ein useEffect gebraucht, welcher einen Filter anwendet. Dieser Filter ist eine High Order Function. Der Filter wird im `Filteringhandler.ts` definiert

Zeile 29 - 31:
Dabei wird ein Filter angwendet. `CategoriesTable.tsx`:

```typescript
    useEffect(() => {
        const res = filteredEntries !== null && filteredEntries.filter(categoryFilter(searchInput));
        setFilteredCategories(res);
    }, [searchInput, filteredEntries]);
```

`Filteringhandler.ts`:

```typescript
export const categoryFilter = (searchInput: string) => (entry: CategoryWithApi) => {
    return entry.name.toLowerCase().includes(searchInput.toLowerCase())
};
```

Die Definition des Filter befindet sich in der Datei: `FilteringHandler.ts` und sieht wie folgt aus:
Davon werden mehrere Filter verwendet in verschiedenen Dateien, wie zum Beispiel auch in: `PasswordTable.tsx` und `CategoriesTable.tsx`

```typescript
export const categoryFilter = (searchInput: string) => (entry: Category) => entry.name.toLowerCase().includes(searchInput.toLowerCase());
```

### Immutable values (kind of)

#### Immutable values - Beispiel 1 (Kompetenz `AG1`, `AF1`)

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

### First Class Citizen (Kompetenz `CG2`, `CF2`, `CE2`)

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

Dies ist die Funktion/Handler die an Gin (API-Framework) übergeben wird.

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

### Pure Functions (Kompetenz `AG1`, `AF1`, `A1E`)

Im Filtering handler benutzern wir eine Pure function. Wenn man nach einer Kategorie sucht, wird immer das gleiche Ergebnis ausgegeben, wenn der Input auch das gleiche ist. 
Es hat auch keine Side-Effects am eigentlichen set der Entries.

`FilteringHandler.ts`:

```typescript
export const categoryFilter = (searchInput : string) => (entry : CategoryWithApi) => {
    return entry.name.toLowerCase().includes(searchInput.toLowerCase())
};
```

### Recursive Functions:
in diesem Projekt haben wir recursive functions benutzt, um Passwörter zu generieren. Dabei haben wir die folgende Methode genutzt:

`PasswordGenerator.ts`

```typescript
    function generatePassword(charset: string, length: number): string {
        if (length <= 0) return '';
        const randomChar = charset[Math.floor(Math.random() * charset.length)];
        return randomChar + generatePassword(charset, length - 1);
    }
```

## Arbeitsrappot

### 20.06.2024

Wir hatten heute nichts gross am Code geändert sondern bereits die nächsten Schritte besprochen was wir beim nächsten Mal alles implementieren müssen.

### 27.06.2024

#### Fabio

Ich habe heute die Kategorien verbessert und nun ist Kategorie eine eigene Entity. Ich habe dafür die Datenbank angepasst und alle CRUD Operationen für Kategorien implementiert. Zudem habe ich eine Paginierung für die Passwörter implementiert. Dies war einfacher als ich es zu beginn erwartet hatte.

#### Shansai

Ich habe heute Lukas geholfen, um unsere neue Logik von Kategorien zu implementieren. Auf nächste Woche, möchte ich die Such Funktion fertigstellen und wenn möglich noch die paging Funktion, jedoch ist das nicht sicher.

#### Lukas

Ich habe zusammen mit Shansai die Logik zur Erstellung von Kategorien umstrukturiert und zusätzlich noch die Logik zur Speicherung der Kategorien in der Datenbank. Es gab manchmal kleinere Probleme und Komplikationen aber diese konnte ich dank Shansai schnell fixen.

#### 04.07.2024

Heute haben wir noch die restlichen Schritten zur Fertigstellung des Projekts besprochen und dementsprechend auch umgesetzt. Einer dieser Punkte war die implementierung der Pagination Logik im Frontend. 
Die Paging Funktion wurde von Lukas und Shansai im Frontend implementiert. Dabei hat Fabio das Backend leicht verändert, sodass es ein query parameter namens `page` abfrägt, welches die page bestimmt. Die Gesamtzahl von pages wird dabei auch zurückgegeben. Dadurch werden nur die Daten für die jeweilige Page zurückgegeben. Im Frontend ist es nun jedoch so, dass die Filtrirung mit searchbar nur für die geladenen Entries funktionieren. Als Zusatz probieren wir noch in den nächsten Tagen, dieses Feature so umzugestalten, dass man jede einzelne Entry filtern kann. 

## Gesamtreflexion des Projekts

### Fabio

### Shansai

Das Projekt verlief recht gut. Wir hatten keine Probleme untereinander und konnten unsere Aufgaben gut aufteilen. Ich konnte Lukas helfen im Frontend und vice versa. Mit Fabio konnte man auch gut arbeiten, speziell die Paging Funktion. Wir hatten auch recht Glück, weil wir die meisten Code Zeilen bereits Funktional programmiert haben im vorherigen Modul. Das einzige was neu dazu gekommen war, ist die "Paging" Funktion. Diese konnten Lukas und ich zusammen im Frontend implementieren, während Fabio die Backend Logik dafür bereitgemacht hat.

### Lukas

Ich bin mit dem Verlauf dieses Projekts sehr zufrieden. Die Zusammenarbeit mit Shansai und Fabio war sehr angenehm und lehrreich für mich und wir konnten unsere Aufgaben ziemlich gut einteilen. Was mir bei den Aufgaben besonders wichtig war war, dass ich auch beim Programmieren mitwirke oder es zumindest versuche. Ich wollte nicht, dass Shansai und Fabio alles alleine programmierten während ich nur kleine Texte für Dokumentationen und Reflexionen schreiben würde. Jedoch war beim Programmieren immer mein mangelndes Wissen ein grosses Hindernis. Ich war deshalb oft gezwungen Shansai oder Fabio um Rat zu fragen, da ich das Problem selbst nicht hätte lösen können oder viel zu viel Zeit dafür in Anspruch genommen hätte. Nichtsdestotrotz war das Projekt für mich ein voller Erfolg auf den wir alle wirklich stolz sein können.

## Reflexion Funktionale Programmierung

Das Go Framework Gin hat die Definierung der Endpoints mit First Class Citizen ermöglicht. Dies hat uns ermöglicht, die Handler für die Endpoints zu übergeben.
Die High Order Functions waren äusserst nützlich im Frontend, weil wir dadurch den code in the component files reduzieren konnten und die Logik in die Filtering handler files übergeben konnten. Da die Components bereits gross waren, wäre unser Code noch grösser und damit noch komplexer ohne diese High Order Functions
Die Generierung von Passwörtern dank der rekursiven Funktion vereinfachte es uns auch, da wir dadurch keine weiteren for-loops brauchten um diese zu generieren. Dies hat uns dazu gebracht, dass wir viele Code Zeilen sparen konnten.
