# Password-safe project

## Project Team

1. Lukas Winterleitner (NxtLvl)
2. Fabio Kälin (Swiss Re)
3. Shansai Muraleetharan (KPMG Switzerland)

## Projekt Definition

Unser Auftrag war es ein Password-Safe zu erstellen. Dabei sollten wir ein Front und ein Backend machen. Ein Nutzer sollte fähig sein sich zu registrieren ebenso wie sich anzumelden. Wenn er angemeldet ist sollte er seine Passwörter einsehen können und sie dann auch bearbeiten und löschen können. Zudem sollte er auch neue Passwörter hinzufügen können. Auch eine Funktion um das MasterPasswort zu ändern sollte implementiert werden.

## API Endpoints

### Benutzer

| Methode | Pfad             | Beschreibung                                                          |
| ------- | ---------------- | --------------------------------------------------------------------- |
| Get     | /api/users/check | überprüft ob der Benuzter eingeloggt ist und gibt den Benutzer zurück |
| Post    | /api/users       | Neuen Benutzer registrieren                                           |
| Post    | /api/users/login | Als Benutzer einloggen                                                |
| Put     | /api/users/{id}  | Benutzer aktualisieren                                                |

### Passwort Einträge

| Methode | Pfad                | Beschreibung                          |
| ------- | ------------------- | ------------------------------------- |
| Get     | /api/passwords      | Alle Passwörter des Benutzers abrufen |
| Get     | /api/passwords/{id} | Ein Passwort des Benutzers abrufen    |
| Post    | /api/passwords      | Neues Passwort hinzufügen             |
| Put     | /api/passwords/{id} | Passwort aktualisieren                |
| Delete  | /api/passwords/{id} | Passwort löschen                      |

## Frontend

Das Frontend von diesem Projekt wurde mit Next.JS gestaltet. Zwar hatte jeder Erfahrung mit react, jedoch nicht mit Next.

Folgende seiten wurden gestaltetl:
| Route | Beschreibung | Bild |
| ----- | ------------ | ---- |
| / |           Die Home Seite zeigt ein einfaches Interface, welches zum Sign up oder LogIn weiterleitet   |  !["Home"]("/resources/docImg/home.jpeg")    |

## Nutzung im Dev Modus

### Pre-Requisites

- Docker ([https://www.docker.com](https://www.docker.com))
- Node.js ([https://nodejs.org](https://nodejs.org))
- npm ([https://www.npmjs.com](https://www.npmjs.com))
- Go ([https://golang.org](https://golang.org))

### Starten der Datenbank

```bash
cd resources
docker-compose up -d
```

### Starten des Backends

```bash
cd backend
go run main.go
```

Swagger Dokumentation: [http://localhost:8000/api/swagger](http://localhost:8000/api/swagger)

### Starten des Frontends

```bash
cd frontend
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000)

## Reflexion
