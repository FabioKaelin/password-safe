# <center><div style='display: flex; text-align: right; justify-content: center;'><span><img src="https://github.com/FabioKaelin/password-safe/assets/61542805/78085ec4-5b83-4b79-ae18-0206f1bdaf6e" width="100"/> RoboGuard (Password-safe)</span></div></center>


## Project Team

1. Lukas Winterleitner (NxtLvl Development GmbH)
2. Fabio Kälin (Swiss Re)
3. Shansai Muraleetharan (KPMG Switzerland)

## Projekt Definition

Unser Auftrag war es ein Password-Safe zu erstellen. Dabei sollten wir ein Front und ein Backend machen. Ein Nutzer sollte fähig sein sich zu registrieren ebenso wie sich anzumelden. Wenn er angemeldet ist sollte er seine Passwörter einsehen können und sie dann auch bearbeiten und löschen können. Zudem sollte er auch neue Passwörter hinzufügen können. Auch eine Funktion um das MasterPasswort zu ändern sollte implementiert werden.

## API Endpoints

### Benutzer

| Methode | Pfad              | Beschreibung                                                          |
| ------- | ----------------- | --------------------------------------------------------------------- |
| Get     | /api/users/check  | überprüft ob der Benuzter eingeloggt ist und gibt den Benutzer zurück |
| Post    | /api/users        | Neuen Benutzer registrieren                                           |
| Post    | /api/users/login  | Als Benutzer einloggen                                                |
| Put     | /api/users/{id}   | Benutzer aktualisieren                                                |
| Post    | /api/users/logout | Loggt den Benutzer aus                                                |

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
| Route     | Beschreibung                                                                                                                                                                                                                                                               | Bild                                                                                                            |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| /         | Die Home Seite zeigt ein einfaches Interface, welches zum Sign up oder LogIn weiterleitet                                                                                                                                                                                  | ![home](https://github.com/FabioKaelin/password-safe/assets/61542805/b4b9b4ab-3b02-41f1-af88-81f999a5c236)      |
| /login    | Um sich bei Ihrem Tresor anzumelden, gehen Sie zu 1 und geben Sie Ihren Benutzernamen und Ihr Passwort ein.                                                                                                                                                                | ![login](https://github.com/FabioKaelin/password-safe/assets/61542805/d132e60c-fb64-4f2c-b73c-0919b5d0399c)     |
| /register | Bei der Registrierung, können Sie sich für RoboGuard registrieren                                                                                                                                                                                                          | ![register](https://github.com/FabioKaelin/password-safe/assets/61542805/3653cfe3-d4f2-4e86-95e9-4534929dbf72)  |
| /vault    | Im Vault kann man die Passwörter sehen, erstellen und bearbeiten. Man kann sie nach Kategorien filtern und den Master Passwort kann man auf dieser Seite auch gleich wechseln                                                                                              | ![vault](https://github.com/FabioKaelin/password-safe/assets/61542805/3ff1b65d-e57d-4bc0-a5b1-b310c16bc33f)     |
| /vault    | Im Erstellungsmodal haben Sie die Möglichkeit, neue Einträge zu erstellen. Sie können auch eine Kategorie auswählen. Beachten Sie jedoch, dass die Kategorie erst erstellt wird, sobald der Passworteintrag erstellt ist. Dasselbe gilt für das Bearbeiten eines Eintrags. | ![create](https://github.com/FabioKaelin/password-safe/assets/61542805/34a36ff1-111d-4301-a99a-db133f904182)    |
| /about    | Beinhaltet Informationen zum Entwickler / Erfinder Team                                                                                                                                                                                                                    | ![aboutPage](https://github.com/FabioKaelin/password-safe/assets/61542805/8144561d-998b-4bfc-b83b-5fcb753da464) |

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

### Fabio

Da ich bereits ein Login in einem privaten Projekt gemacht habe, habe ich das Backend übernommen. Ich konnte den Code für das Login wiederverwenden und konnte nachschauen wie das hashing funktioniert. Das Login war desshalb schnell implementiert und ich konnte mit den Passwort-Entries weitermachen.

### Lukas

### Shansai

Allgemein ein gelungenes Projekt. Leider musste ich die Frontend Aufgaben übernehen, als einer der Frotnend abnormal hasst ist das ein challenge gewesen, jedoch war es doch letztendlich recht interessant und hat spass gemacht. Ich hätte mir gewünscht, dass ich weniger Logik im Frontend bräuchte, jedoch ist das nicht der Fall, weil das Model der Datenbank doch nicht das beste ist. Die Zusammenarbeit mit Lukas im Frontend war recht gut. Wir konnten beide voneinander lernen und haben auch zusammen "Coding Sessions" gemacht. Ebenfalls konnten wir viele Probleme dank künstlicher Intelligenz und StackOverflow lösen können. Dabei war mir wichtig, dass ich eine gute Balance zwischen Künstlicher Intelligenz, Googlen und nachfragen bei Frontend Entwicklern in der Firma zu finden.
