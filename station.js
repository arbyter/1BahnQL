const stations = require('db-stations');
const fetch = require("node-fetch")

class Station {
	
	constructor(evaId) {
		this.evaId = evaId
	}
	
	get loadStation() {
		if (!this.promise) {
			var promise = loadStationEva(this.evaId)
			this.promise = promise
		}
		
		return this.promise
	}
	
	get name() {
		return this.loadStation.then(station => station.name)
	}
	
	get facilities() {
		return this.bahnhofsnummer.then(bahnhofsnummer => loadElevatorFor(bahnhofsnummer))
	}
	
	get bahnhofsnummer() {
		var evaId = this.evaId
		return new Promise(function(resolve) {
			stations()
			.on('data', function(station) {
				if (station.id == evaId) {
					resolve(station.nr)
				}
			})
		})
	}
}

function loadStationEva(evaID) {
	let fetch = new Promise(function(resolve) {
		stations()
		.on('data', function(station) {
			if (station.id == evaID) {
				resolve(station)
			}
		})
	}).then(function(station) {
		return loadStation(station.nr)
	}) 
	
	return fetch
}

var stationCache = {}
function loadStation(bahnhofsnumer) {
	let cache = stationCache[bahnhofsnumer]
	if (cache) {
		return cache
	}
	let url = "https://api.deutschebahn.com/stada/v2/stations/" + bahnhofsnumer
	var myInit = { method: 'GET',
	               headers: {"Authorization": "Bearer 8462e8ba208e92a1c88477b81dad227a"},
	               cache: 'force-cache',
	 				"cache-control": 'force-cache' };
	let promies = fetch(url, myInit)
	.then(function(res) {
		return res.json()
	})
	.then(function(result) {
		let station = result.result[0]
		stationCache[bahnhofsnumer] = station
		return station
	})
	
	return promies
}

//Move to elevator
var elevatorCache = {}
function loadElevatorFor(bahnhofsnumer) {
	var cached = elevatorCache[bahnhofsnumer]
	if (cached) {
		return cached
	}
	let url = "https://api.deutschebahn.com/fasta/v1/stations/" + (bahnhofsnumer)
	var myInit = { method: 'GET',
	headers: {"Authorization": "Bearer 8462e8ba208e92a1c88477b81dad227a"}};
	return fetch(url, myInit)
	.then(function(res) {
		return res.json()
	})
	.then(function(result) {
		elevatorCache[bahnhofsnumer] = result.facilities
		return result.facilities
	})
}

module.exports = Station;