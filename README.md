# TablesTalesDarbs

Nosleguma darba projekts ar skaidru strukturu: **Laravel API backend + React frontend + SQLite**.

## Izmantotie riki un tehnologijas
- Backend: Laravel 13, PHP 8+, Sanctum, Eloquent
- Datubaze: SQLite
- Frontend: React + Vite + React Router

## Projekta struktura
- `backend/` - Laravel API, migracijas, seederi, autentifikacija, lomu kontrole
- `frontend/` - React lietotaja interfeiss (atseviskas lapas)
- `TEST_CASES.md` - 5 manualie testu scenariji

## Palaishana
1. Atvert terminali mapes `backend/`:
   - `composer install`
   - `php artisan migrate:fresh --seed`
   - `php -d auto_prepend_file= -S 127.0.0.1:9100 -t public`
2. Atvert otru terminali mapes `frontend/`:
   - `npm install`
   - `npm run dev`
3. Frontend adrese: `http://localhost:5173`
4. Backend API adrese: `http://127.0.0.1:9100/api`

## Demo lietotaji
- Admin: `admin@local.test` / `Admin123!`
- Representative: `rep@local.test` / `Admin123!`
- User: `user@local.test` / `Admin123!`

## Atbilstiba kriterijiem (pec pievienota PDF)

### Nefunkcionalas prasibas
- Tabulu skaits >= 4: izpildits (`users`, `restaurants`, `reservations`, `messages`)
- Musdieniga vietne: izpildits (React interfeiss ar 5 atseviskam lapam)
- OWASP vadlinijas: izpildits pamatlimeni (validacija, autentifikacija, lomu pieejas kontrole)
- WCAG vadlinijas: daleji izpildits (formas ar label, semantiski elementi; nav pilna audita)
- PWA: nav vel pilniba ieviests (ja vajag, var pievienot Vite PWA pluginu)

### Funkcionalas prasibas
- DB integracija ar vietni un datu apmaina: izpildits (Laravel API + React fetch)
- Datu parvalde (ievietoshana/redigeshana/dzeshana): izpildits
- Datu validacija: izpildits (request validacijas kontrollieros)
- Lietotaju autentifikacija un lomas: izpildits (`admin`, `representative`, `user`)
- Administratora autentifikacija un pienakumu sadale: izpildits
- Statistika: izpildits (`/api/stats`)
- Datu apstrade:
  - kartoshana: izpildits
  - filtresana un mekleshana: izpildits
  - atlase no vairakam saistitam tabulam (JOIN): izpildits
  - aprekinu veikshana/grupeshana: izpildits

## Kas vel ieteicams pilnai atbilstibai
- Pievienot pilnu WCAG auditu (kontrasts, focus states, klaviaturas navigacija).
- Pievienot PWA atbalstu frontendam (manifest + service worker).
- Pievienot automatizetus testus API endpointiem.
