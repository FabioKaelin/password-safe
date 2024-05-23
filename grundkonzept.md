# Grundkonzept Password Safe

1. Master Passwort wird gehashed in der Datenbank gespeichert
2. Für das LogIn wird ein bearer `token` erstellt und im frontend in einem cookie gespeichert
3. Passworteinträge werden im `Backend` verschlüsselt
4. User kann seine Passwörter anzeigen lassen
5. User kann bestehende Passworteinträge bearbeiten
6. User kann bestehende Passworteinträge löschen
7. Die URL der entsprechenden Loginseiten kann den Passworteinträgen zugewiesen werden
