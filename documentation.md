# Documentation

## 03.05.2024

### Fabio

Ich habe heute ein grossen Fortschritt gemacht. Ich habe die Passwörter im Backend verschlüsselt und somit verschlüsselt abgespeichert. Ich hatte zuerst Probleme mit dem bereits erstellten Passwort welches im Klartext abgespeichert wurde und desshalb beim einschlüsseln einen Fehler verursachte. Ich habe das Problem gelöst indem ich die Datenbank geleert habe und die Passwörter neu erstellt habe.


### Lukas

Heute habe ich mit der Hilfe von Shansai und Fabio meinen Work Branch auf den `main`-Branch "rebased". Leider gab es einige kleine Komplikationen während dem "rebase" Prozess. Ich musste daraufhin meine selbst erstellen Komponente (Navbar und Logo) nochmals aus meinem alten Branch reintegrieren.

### Shansai

Heute konnte ich das LogIn fertigstellen, nachdem ich CORS Probleme gehabt habe. Ebenfalls kann das Vault jetzt Passwörter anzeigen und man kann auch welche erstellen. Es gab auch einen Bug, wenn man einen empty Vault hat, wurde ein Error geworfen. Das konnte ich auch fixen. Nächste Woche soll das Vault bearbeitbar sein und man soll Entries löschen.