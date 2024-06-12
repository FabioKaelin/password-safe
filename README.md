# RoboGuard (Password-safe)
<center><img src="https://github.com/FabioKaelin/password-safe/assets/61542805/78085ec4-5b83-4b79-ae18-0206f1bdaf6e" /></center>

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

Folgende Seiten wurden gestaltet:
| Route | Beschreibung | Bild |
| ----- | ------------ | ---- |
| / |           Die Home Seite zeigt ein einfaches Interface, welches zum Sign up oder LogIn weiterleitet   |   ![home](https://github.com/FabioKaelin/password-safe/assets/61542805/b4b9b4ab-3b02-41f1-af88-81f999a5c236)|
| /login | In the LogIn page you can log in youself to your vault | ![login](https://github.com/FabioKaelin/password-safe/assets/61542805/d132e60c-fb64-4f2c-b73c-0919b5d0399c) |
| /register | In the register page you can register yourself to use RoboGuard | ![register](https://github.com/FabioKaelin/password-safe/assets/61542805/3653cfe3-d4f2-4e86-95e9-4534929dbf72) |
| /vault | In the vault, you can see, create, edit and delete your passwords. You can also filter by category. Also the Master password can be changed | ![vault](https://github.com/FabioKaelin/password-safe/assets/61542805/3ff1b65d-e57d-4bc0-a5b1-b310c16bc33f) | 
| /vault | In the create modal, you got the possibility to create new entries. You can also select a category. You can also create a new Category, but please be aware, that the category will be created, once the password entry is created. The same applies for editing an entry | ![create](https://github.com/FabioKaelin/password-safe/assets/61542805/34a36ff1-111d-4301-a99a-db133f904182) |
| /about | Contains information about the product and the development / founder team | ![aboutPage](https://github.com/FabioKaelin/password-safe/assets/61542805/8144561d-998b-4bfc-b83b-5fcb753da464) |






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

### fabio

### Lukas

### Shansai

Allgemein ein gelungenes Projekt. Leider musste ich die Frontend Aufgaben übernehen, als einer der Frotnend abnormal hasst ist das ein challeng gewesen, jedoch war es doch letztendlich recht interessant und hat spass gemacht. Ich hätte mir gewünscht, dass ich weniger Logik im Frontend bräuchte, jedoch ist das nicht der Fall, weil das Model der Datenbank doch nicht das beste ist. Die Zusammenarbeit mit Lukas im Frontend war recht gut. Wir konnten beide voneinander lernen und haben auch zusammen "Coding Sessions" gemacht. Ebenfalls konnten wir viele Probleme dank künstlicher Intelligenz und StackOverflow lösen können. Dabei war mir wichtig, dass ich eine gute Balance zwischen Künstlicher Intelligenz, Googlen und nachfragen bei Frontend Entwicklern in der Firma zu finden.
