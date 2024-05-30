# Grundkonzept Password Safe

1. Master Passwort wird gehashed in der Datenbank gespeichert
2. Für das LogIn wird ein bearer `Token` erstellt und im Frontend in einem Cookie gespeichert
3. Passworteinträge werden im `Backend` verschlüsselt

## Features & Nice-to-have

1. User kann seine Passwörter anzeigen lassen
2. User kann bestehende Passworteinträge bearbeiten
3. User kann bestehende Passworteinträge löschen
4. Die URL der entsprechenden Loginseiten kann den Passworteinträgen zugewiesen werden
5. *Der User kann Passwörter generieren lassen
