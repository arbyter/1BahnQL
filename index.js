const { graphql } = require('graphql');
const schema = require('./schema.js');
const express = require('express');
const graphqlHTTP = require('express-graphql');

const ParkingspaceLoader = require('./Parkingspace/ParkingspaceLoader');
const FlinksterLoader = require('./Flinkster/FlinksterLoader');
const StationLoader = require('./Station/StationLoader');
const OperationLocationLoader = require('./OperationLocation/OperationLocationLoader');
const TravelCenterLoader = require('./TravelCenter/TravelCenterLoader');
const TimetableLoader = require('./Timetable/TimetableLoader.js');
const FacilityLoader = require('./Facility/FacilityLoader.js');
const StationPictureLoader = require('./StationPicture/StationPictureLoader');

const ParkingspaceService = require('./Parkingspace/ParkingspaceService');
const FlinksterService = require('./Flinkster/FlinksterService');
const OperationLocationService = require('./OperationLocation/OperationLocationService');
const StationService = require('./Station/StationService');
const NearbyStationService = require('./Station/NearbyStationsService');
const TravelCenterService = require('./TravelCenter/TravelCenterService');
const FacilityService = require('./Facility/FacilityService.js');
const RoutingService = require('./Routing/RoutingService.js');
const TimetableService = require('./Timetable/TimetableService.js');
const TrackService = require('./Platforms/TrackService.js');
const StationIdMappingService = require('./Station/StationIdMappingService');
const StationPictureService = require('./StationPicture/StationPictureService');

const StationRelationships = require('./Station/StationRelationships');
const ParkingspaceRelationships = require('./Parkingspace/ParkingspaceRelationships');
const RouteRelationships = require('./Routing/RouteRelationships');

const NearbyQuery = require('./NearbyQuery');

// --------- //

const APIToken = process.env.DBDeveloperAuthorization;

// Loader
const parkingspaceLoader = new ParkingspaceLoader(APIToken);
const stationLoader = new StationLoader(APIToken);
const timetableLoader = new TimetableLoader(APIToken);
const operationLocationLoader = new OperationLocationLoader(APIToken);
const travelCenterLoader = new TravelCenterLoader(APIToken);
const facilityLoader = new FacilityLoader(APIToken);
const flinksterLoader = new FlinksterLoader(APIToken);
const stationPictureLoader = new StationPictureLoader(APIToken);

// Services
const parkingspaceService = new ParkingspaceService(parkingspaceLoader);
const operationLocationService = new OperationLocationService(operationLocationLoader);
const stationIdMappingService = new StationIdMappingService();
const stationService = new StationService(stationLoader, stationIdMappingService);
const nearbyStationService = new NearbyStationService(stationService);
const travelCenterService = new TravelCenterService(travelCenterLoader);
const facilityService = new FacilityService(facilityLoader)
const routingService = new RoutingService();
const flinksterService = new FlinksterService(flinksterLoader);
const timetableServcie = new TimetableService(timetableLoader);
const trackService = new TrackService(stationIdMappingService);
const stationPictureService = new StationPictureService(stationPictureLoader)

// Relationships
stationService.relationships = new StationRelationships(parkingspaceService, facilityService, timetableServcie, trackService, stationPictureService);
parkingspaceService.relationships = new ParkingspaceRelationships(parkingspaceService, stationService);
routingService.relationships = new RouteRelationships(stationService, trackService);

// Queries
const root = {
  parkingSpace: args => parkingspaceService.parkingspaceBySpaceId(args.id),
  stationWith: args => stationService.stationByEvaId(args.evaId),
  search: args => ({ stations: stationService.searchStations(args.searchTerm), operationLocations: operationLocationService.searchOperationLocations(args.searchTerm) }),
  nearby: args => new NearbyQuery(args.latitude, args.longitude, args.radius, nearbyStationService, parkingspaceService, flinksterService, travelCenterService),
};

const experimental = process.env.experimental
if(experimental) {
  root.routing = (args) => {
    const routeSearch = routingService.routes(args.from, args.to);
    return routeSearch.then(options => [options[0]]);
  }
}


const app = express();
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));
// set the port of our application
// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`now browse to localhost:${port}/graphql`));
