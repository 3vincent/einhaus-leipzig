# EinHaus Leipzig

Website der EinHaus Reichpietschstraße 13 eG, eines selbstverwalteten
Hausprojekts in Leipzig-Reudnitz.

Live: [www.einhaus-leipzig.de](https://www.einhaus-leipzig.de)

## Technischer Überblick

- Nuxt 4 und Vue 3 mit Composition API und strengem TypeScript
- serverseitig gerenderte Seiten mit SEO- und Open-Graph-Metadaten
- responsives SCSS ohne UI-Framework
- Kontaktformular mit gemeinsamer Client-/Server-Typisierung, Schema-Validierung,
  Honeypot, Zeitprüfung und SMTP-Versand
- mehrstufiger Spam-Schutz durch Honeypot, Zeitprüfung und lokales Rate-Limit
- zugängliche Navigation, Dialoge und Statusmeldungen
- automatisierte Tests mit Vitest
- Deployment als Vercel-Nitro-Anwendung

## Lokale Entwicklung

Voraussetzung ist eine aktuelle Node.js-LTS-Version.

```bash
npm ci
npm run dev
```

Die Entwicklungsseite ist anschließend unter `http://localhost:3000`
erreichbar.

## Umgebungsvariablen

Für das Kontaktformular werden folgende Variablen benötigt:

```dotenv
DISPLAY_OFFICIAL_CONTACT_ADDRESS=
SMTP_HOST=
SMTP_PORT_TLS=
SMTP_USER_NAME=
SMTP_USER_PASSWORD=
CONTACT_FORM_SENDER_NAME=
CONTACT_FORM_SENDER_ADDRESS=
MAIL_RECEIVER_CONTACT_FORM=
MAIL_RECEIVER_FALLBACK=
```

Das lokale Rate-Limit benötigt keine zusätzliche Infrastruktur. Auf einer
Serverless-Plattform gilt sein Zähler jeweils für eine aktive Instanz. Honeypot
und Zeitprüfung funktionieren unabhängig davon. Falls zukünftig ein globales
Limit erforderlich wird, sollte es direkt über die Hosting-Plattform
konfiguriert werden.

## Qualitätschecks

```bash
npm run lint
npm run format
npm test
npm run build
```

## Projektstruktur

```text
app/          Vue-Komponenten, Seiten, Layouts und Composables
server/       Nitro-API, Middleware und serverseitige Hilfsfunktionen
shared/       gemeinsam verwendete DTOs und Validierung
tests/        automatisierte Unit-Tests
util/         statische Daten und Sanitizing
public/       Bilder, Icons und SEO-Dateien
```
