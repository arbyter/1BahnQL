# 1BahnQL
Single unified API for all DBOpenData APIs implemented with GraphQL. We implemented the following APIs: StaDa, FaSta, TimeTables, Flinkster, CallABike, ParkplätzeAPI, ReiseCenter

## GraphiQL Playground
[1BahnQL GraphiQL](https://bahnql.herokuapp.com/graphql)

## Usage
### Install
`npm install`
### Run
`DBDeveloperAuthorization=<Your DBOpenData Athetication Token> node index.js`

Optional parameters:
- DBBaseURL

### Heroku Deploy
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/dennispost/1BahnQL])


## Datenquellen
### API:

- [x] Stationen (StaDa)
- [x] Fahrstühle (FaSta)
- [x] Fahrplan (Fahrplan-Free)
- [x] Flinkster 
- [x] Betriebsstellen
- [x] Reisezentren
- [x] Parkplätze
- [x] Bahnhofsfotos
- [ ] https://github.com/derhuerst/db-zugradar-client
- [ ] https://github.com/derhuerst/db-hafas
- [ ] https://github.com/derhuerst/generate-db-shop-urls
- [ ] https://github.com/derhuerst/find-db-station-by-name
- [ ] https://github.com/derhuerst/european-transport-modules
- [ ] https://github.com/derhuerst/vbb-lines
- [ ] https://github.com/derhuerst/db-stations

### Statisch:
- [x] http://data.deutschebahn.com/dataset/data-bahnsteig
- [ ] http://data.deutschebahn.com/dataset/data-bahnsteig-regio
- [ ] http://data.deutschebahn.com/dataset/data-wagenreihungsplan-soll-daten
- [ ] http://data.deutschebahn.com/dataset/luftschadstoffkataster

## Root Queries

### Verbindungssuche

### Textsuche
- [x] Station
- [ ] Zug

### Geosuche
- [x] Station
- [ ] Bahnsteig
- [x] Flinkster
- [x] Call a Bike
- [x] Parkplätze
- [ ] Zug
- [ ] Fahrstühle / Rolltreppen

### ID Access
- [x] EvaId (Station)
- [ ] DS100 (BetrSt)
- [ ] Zug
- [ ] Flinkster
- [ ] Call a Bike
- [ ] Fahrstühle / Rolltreppen
- [x] Parkplätze
- [ ] Bahnsteig
