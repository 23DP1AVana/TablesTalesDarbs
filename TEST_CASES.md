# Testa gadijumi

## 1) Registracija ar derigiem datiem
- Soli:
  - Atvert frontend lapu `http://localhost:5173/auth`
  - Parslegt uz Register un aizpildit korektus laukus
- Sagaidamais rezultats:
  - Lietotajs tiek izveidots SQLite datubaze
  - Lietotajs tiek ielogots un redz Dashboard

## 2) Ielagosanas meginajums ar nepareizu paroli
- Soli:
  - Atvert `http://localhost:5173/auth`
  - Ievadit eksistejosu e-pastu un nepareizu paroli
- Sagaidamais rezultats:
  - Piekluve netiek pieskjirta
  - Redzams kludas pazinojums

## 3) Lietotajs izveido rezervaciju
- Soli:
  - Ielogoties ka parasts lietotajs
  - Atvert lapu `Restaurants`
  - Spiest `Reserve` pie jebkura restorana
- Sagaidamais rezultats:
  - Rezervacija paradas Dashboard saraksta ar statusu `pending`

## 4) Statusa maina no `representative` vai `admin` lomas
- Soli:
  - Ielogoties ka `representative` vai `admin` (`/auth`)
  - Atvert lapu `Dashboard`
  - Mainit statusu uz `approved` vai `cancelled`
- Sagaidamais rezultats:
  - Rezervacijas statuss datu baze un UI atjaunojas korekti

## 5) Kontaktformas validacija
- Soli:
  - Atvert `http://localhost:5173/contact`
  - Ievadit nederigu e-pastu un nosutit formu
  - Pec tam ievadit derigu e-pastu un nosutit velreiz
- Sagaidamais rezultats:
  - Nederigs e-pasts tiek noraidits
  - Deriga forma tiek saglabata `messages` tabula SQLite datubaze
