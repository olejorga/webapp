# WebApp

Three individual webapps - an exam in Web Applications at HiØ, written with love in TS <3

## Authors
- Erik Teien Jarem [@eriktja](https://www.github.com/eriktja)
- Ole-Jørgen Andersen [@olejorga](https://www.github.com/olejorga)
- Simen Jacobsen Øygard [@simenyo](https://www.github.com/simenyo)

## Task 1

### Install
1. Run `npm i`
2. Run `npm run dev` to start the app
3. Go to [http://localhost:3000/](http://localhost:3000/) to view the site

## Task 2

### Install
1. Run `npm i`
2. Run `npm run prisma:migrate`
3. Run `npm run prisma:seed` for å fylle databasen
4. Run `npm run dev` to start the app
5. Go to [http://localhost:3000/](http://localhost:3000/) to view the site

## Task 3

### Install
1. Run `npm i`
2. Run `npm run prisma:migrate`
3. Run `npm run dev` to start the app
4. Go to [http://localhost:3000/](http://localhost:3000/) to view the site
5. On the site, click "demo" or "generate" to fill the database with data

### Important
* I /.env er mål hostname for api
* I /lunch.options.json er konfigurasjonen for lunsj-algoritmen
* Når man trykker "generate" eller "demo" tømmes databasen først
* Enkelte api endepunktene har et delay på 1s for å kunne vise loader animasjonen
* Se kommentarene i /lib/lunch.ts angående algoritme implementasjonen
* Se kommentar i "newEmployeePage.test.tsx", da vi hadde litt problemer med en av testene
* Vi har lagt mye jobb i små detaljer 😉
  * Som f.eks. å disable utilgjengelige options i select lister
  
### Algorithm
These are the individual steps in the algorithm.

```
1. Genererer et år, bestående av uker og dager
  2. For hver dag i året hentes en ansatt etter følgende regler
    2.1. Sjekk om dagen er uken er registrert som ferie, og om dagen er gyldig
    2.2. Forøker å hente de som kun kan denne dagen. eks: 'day:1' på mandag
    2.3. Om 2.1 ikke returnerer noen gyldig hentes alle som kan lage lunsj den dagen
    2.4. Lag en random index
    2.5. Om ansatt i gitt index treffer på hasOccured-sjekken fjernes den ansatte fra listen over de gyldige, og det trekkes igjen frem til listen har 1 igjen
    2.6. hasOccured sjekker om den ansatte er satt opp: 
      2.6.1. denne uken
      2.6.2. over gjennomsnittet mange ganger allerede 
      2.6.3. samme dag uken før
      2.6.4. over maxOccurence denne perioden
    2.7. hasOccured prio 2.5.1 høyest og 2.5.4 nederst
    2.8. Om algoritmen ikke finner en gyldig ansatt vil den prøve på nytt opp til 20 ganger
      2.8.1 Innen 20 forsøk vil flere sjekker i hasOccured ha blitt tatt bort for å forsøke å finne en ansatt
      2.8.2 Overstiges 20 forsøk vil det kastes en feil
    2.9. Den ansatte legges til gitt dag
  3. Gjenta 2 så lenge det er ledige dager
```
