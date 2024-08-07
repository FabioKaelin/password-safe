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

### Kategorien

| Methode | Pfad                 | Beschreibung                           |
| ------- | -------------------- | -------------------------------------- |
| Get     | /api/categories      | Alle Kategorien des Benutzers abrufen  |
| Post    | /api/categories      | Neue Kategorie erstellen               |
| Get     | /api/categories/{id} | Bestimmte Kategorie abrufen            |
| Put     | /api/categories/{id} | Kategorie aktualisieren                |
| Delete  | /api/categories/{id} | Kategorie entfernen                    |

## Frontend

Das Frontend von diesem Projekt wurde mit Next.JS gestaltet. Zwar hatte jeder Erfahrung mit react, jedoch nicht mit Next.

Folgende Seiten wurden gestaltet:
| Route     | Beschreibung | Bild |
| --------- | ------------ | ---- |
| /         | Die Home Seite zeigt ein einfaches Interface, welches zum Sign up oder LogIn weiterleitet |  ![home](https://github.com/FabioKaelin/password-safe/assets/61542805/80828b3d-61eb-4723-ad8c-e93d3cdb4398)  |
| /login    | Um sich bei Ihrem Tresor anzumelden, gehen Sie zu 1 und geben Sie Ihren Benutzernamen und Ihr Passwort ein. | ![login](https://github.com/FabioKaelin/password-safe/assets/61542805/8d27e73e-6104-48c8-9707-a70554ff7cd1) |
| /register | Bei der Registrierung, können Sie sich für RoboGuard registrieren | ![register](https://github.com/FabioKaelin/password-safe/assets/61542805/9ac6f3bc-4898-4077-9449-adc0dda90f44) |
| /vault    | Im Vault kann man die Passwörter sehen, erstellen und bearbeiten. Man kann sie nach Kategorien filtern und den Master Passwort kann man auf dieser Seite auch gleich wechseln | ![vault](https://github.com/FabioKaelin/password-safe/assets/61542805/46321e91-665f-42d8-be97-6cf679d16b2a) |
| /vault    | Im Erstellungsmodal haben Sie die Möglichkeit, neue Einträge zu erstellen. Sie können auch eine Kategorie auswählen. Dasselbe gilt für das Bearbeiten eines Eintrags. | ![create](https://github.com/FabioKaelin/password-safe/assets/61542805/3d206d89-2dc0-498d-8298-8aa55984c39c) |
| /about    | Beinhaltet Informationen zum Entwickler / Erfinder Team | ![aboutPage](https://github.com/FabioKaelin/password-safe/assets/61542805/8144561d-998b-4bfc-b83b-5fcb753da464) |
| /category | Zum Erstellen der Kategorien | ![category](https://github.com/FabioKaelin/password-safe/assets/61542805/b150e71c-259e-49ee-a9b9-58b4968c130b) |





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

Da ich bereits ein Login in einem privaten Projekt gemacht habe, habe ich das Backend übernommen. Ich habe auch die Erstellung der Docker-Compose Datei  für die Datenbank übernommen. Ich konnte den Code für das Login wiederverwenden und konnte nachschauen wie das hashing funktioniert. Das Login war desshalb schnell implementiert und ich konnte mit den Passwort-Entries weitermachen. Um die Arbeit für die anderen zu erleichtern habe ich eine Swagger Dokumentation erstellt. Wir haben eher spät gemerkt, dass wir den Passwörtern Kategorien hinzufügen müssen. Dies hat in den letzten Tagen für ein wenig Stress gesorgt, welchen wir jedoch als Team gemeistert haben.

### Lukas

Zu Beginn des Projektes haben wir uns darauf geeinigt, dass Shansai und ich die Entwicklung des Frontends übernehmen und Fabio sich um das Backend kümmerte. Anfangs hatte ich noch leichte Schwiergkeiten mich mit TypeScript vertraut zu machen, da ich zuvor noch nie damit gearbeitet habe. Mit der Zeit ging es dann aber immer besser. Meine grösste Herausforderung kam dann mit der Implementierung des "PUT"-Endpoints, mit dem der User die Entries bearbeiten kann. Hier musste ich allerdings vermehrt auf die Hilfe von ChatGPT zurückgreifen.

Alles in allem hat die Entwicklung dieses Projektes sehr viel Spass gemacht und ich konnte meine ersten Erfahrungen mit TypeScript sammeln. Auch das Klima im Team war immer sehr angenehm und alle haben ihren Teil geleistet. Fabio hat ein erstklassiges, funktionstüchtiges Backend erstellt und Shansai hat erstklassige Arbeit mit der Entwicklung und dem Design des Frontends geleistet.

### Shansai

Allgemein ein gelungenes Projekt. Ich musste die Frontend Aufgaben übernehen, als einer der Frontend nicht so gerne hat, war das eine Challenge gewesen, jedoch war es doch letztendlich recht interessant und hat spass gemacht. Es kam zu interessanten Problemen, die auch grübeln gefordet haben. Das war auch recht lustig. Alles was positive Seiten hat, hat auch negative Seiten. In diesem Projekt kam es leider vor, dass wir gewisse Features vergessen / nicht fertig implementieren und das führte zu ein paar schlaflosen Nächten. Die Nächte haben sich gelohnt und die Features sind nun da. Fabio hat die Swagger Dokumentation erstelle, welche recht nützlich war für die Verbindung zwischen Frontend und Backend. Die Zusammenarbeit mit Lukas im Frontend war recht gut. Wir konnten beide voneinander lernen und haben auch zusammen "Coding Sessions" gemacht. Ebenfalls konnten wir viele Probleme dank künstlicher Intelligenz und StackOverflow lösen. Dabei war mir wichtig, dass ich eine gute Balance zwischen Künstlicher Intelligenz, Googlen und nachfragen bei Frontend Entwicklern in der Firma finde.
