import React, { Component } from 'react';
import Searchbar from './Searchbar';


let airlinesList = {
	"airlines": [
    	{
        	"ICAO": "AAF",
        	"IATA": "ZI",
        	"name": "Aigle Azur"
    	},
    	{
        	"ICAO": "AAH",
        	"IATA": "KH",
        	"name": "Aloha Air Cargo"
    	},
    	{
        	"ICAO": "AAL",
        	"IATA": "AA",
        	"name": "American Airlines"
    	},
	],

  "hdr": {
	"cmd": "getAirlines",
	"status": "ok"
   }

 };


let airportsList = {
	"airports": [
    	{
        	"ICAO": "AGGA",
        	"IATA": "AKS",
        	"name": "Gwaunaru'u Airport",
        	"countryCode": "SB",
        	"cityCode": "AKS",
        	"latitude": -8.70428,
        	"longitude": 160.681,
        	"elevation": 19,
        	"UTCoffset": 11,
        	"regionName": "Oceania"
    	},
    	{
        	"ICAO": "AGGE",
        	"IATA": "BAS",
        	"name": "Balalae Airport",
        	"countryCode": "SB",
        	"cityCode": "BAS",
        	"latitude": -6.99342,
        	"longitude": 155.883,
        	"elevation": 53,
        	"UTCoffset": 11,
        	"regionName": "Oceania"
    	},
    	{
        	"ICAO": "AGGH",
        	"IATA": "HIR",
        	"name": "Honiara International Airport",
        	"countryCode": "SB",
        	"cityCode": "HIR",
        	"latitude": -9.42859,
        	"longitude": 160.048,
        	"elevation": 30,
        	"UTCoffset": 11,
        	"regionName": "Oceania"
    	},
	],
  "hdr": {
	   "cmd": "getAirports",
	   "status": "ok"
  }
};


let flightsList = {
 "flights": [{
  "guid": "AAL1908",
  "active": true,
  "flightid": "AAL1908",
  "origin": "KDFW",
  "destination": "KMIA",
  "eventtime": "2018-08-07T20:49:57Z",
  "aircraft": {
   "actype": "A321"
  },
  "position": {
   "latitude": 25.799120000000003,
   "longitude": -80.42445000000001,
   "heading": 88.0,
   "speed": 169,
   "altitude": 152500
  }
 }, {
  "guid": "AAL1927",
  "active": true,
  "flightid": "AAL1927",
  "origin": "KPHL",
  "destination": "KDTW",
  "eventtime": "2018-08-07T20:49:55Z",
  "aircraft": {
   "actype": "A319"
  },
  "position": {
   "latitude": 42.205597000000008,
   "longitude": -83.34697899999999,
   "heading": 28.0,
   "speed": 135,
   "altitude": 0
  }
 },
 {
  "guid": "XOJ726",
  "active": true,
  "flightid": "XOJ726",
  "origin": "TXKF",
  "destination": "KHPN",
  "eventtime": "2018-08-07T20:49:55Z",
  "aircraft": {
   "actype": "C750"
  },
  "position": {
   "latitude": 40.839412,
   "longitude": -72.452854,
   "heading": 55.0,
   "speed": 318,
   "altitude": 0
  }
 }],
 "hdr": {
  "cmd": "getFlights",
  "serverInfo": "1533675001,1533675001,XOJ726",
  "clientInfo": "56",
  "status": "ok"
 }
};



export default class DataExtract extends Component{
  constructor(props){
    super(props);
    this.state = {
			searchList:[],
      activeAirportLat: 0,
      activeAirportLon: 0
    };
  }




  /*parseData(List,type) {

    let json_airlines =[];
    let js_airlines =[];

    let json_airports =[];
    let js_airports=[];

		let json_flights =[];
    let js_flights=[];


    if(type === "airlines"){
      json_airlines = List.airlines;
      console.log("json_airlines:",json_airlines);

    json_airlines.forEach((airline)=> {
        let airlineobj ={};
        airlineobj.name = airline.name;
        airlineobj.type = type;
        airlineobj.searchstr = airline.ICAO + ','+airline.IATA+','+airline.name
        //console.log("airlineobj:",airlineobj);
        js_airlines.push(airlineobj);
    });
    console.log("js_airlies: ",js_airlines);
		return(js_airlines);
  }

    if(type === "airports"){
      json_airports = List.airports;
      console.log("json_airports:",json_airports);

    json_airports.forEach((airport)=> {
        let airportobj ={};
        airportobj.name = airport.name;
        airportobj.type = type;
				airportobj.latitude = airport.latitude;
				airportobj.longitude = airport.longitude;
        airportobj.searchstr = airport.ICAO + ','+airport.IATA+','+airport.name
        //console.log("airportobj:",airportobj);
        js_airports.push(airportobj);
    });

    console.log("js_airports: ",js_airports);
		return(js_airports);

    }

		if(type === "flights"){
      json_flights = List.flights;
      console.log("json_flights:",json_flights);

    json_flights.forEach((flight)=> {
        let flightobj ={};
        flightobj.name = flight.guid;
        flightobj.type = type;
				flightobj.lat = flight.position.latitude;
				flightobj.lon = flight.position.longitude;
        flightobj.searchstr = flight.guid;
        //console.log("flightobj:",flightobj);
        js_flights.push(flightobj);
    });

    console.log("js_flights: ",js_flights);
    return(js_flights);
    }

  }*/




	parseData(airlinesL,airportsL,flightsL) {

    let json_airlines = airlinesL.airlines;		 //json array for airlines
		let json_airports = airportsL.airports;    //json array for airports
    let json_flights = flightsL.flights;		   //json array for flights

    let js_airlines = [];									 //js array of airlines
    let js_airports = [];								  //js array of airports
    let js_flights  = [];                 //js array of flights



    //console.log("json_airlines:",json_airlines);
    json_airlines.forEach((airline)=> {
        let airlineobj ={};
        airlineobj.name = airline.name;
        airlineobj.type = 'airline';
        airlineobj.searchstr = airline.ICAO + ','+airline.IATA+','+airline.name		//search string
        //console.log("airlineobj:",airlineobj);
        js_airlines.push(airlineobj);
    });
    //console.log("js_airlies: ",js_airlines);


    //console.log("json_airports:",json_airports);
    json_airports.forEach((airport)=> {
        let airportobj ={};
        airportobj.name = airport.name;
        airportobj.type = 'airport';
				airportobj.latitude = airport.latitude;
				airportobj.longitude = airport.longitude;
        airportobj.searchstr = airport.ICAO + ','+airport.IATA+','+airport.name //search string
        //console.log("airportobj:",airportobj);
        js_airports.push(airportobj);
    });
    //console.log("js_airports: ",js_airports);


    //console.log("json_flights:",json_flights);
    json_flights.forEach((flight)=> {
        let flightobj ={};
        flightobj.name = flight.guid;
        flightobj.type = 'flight';
				flightobj.latitude = flight.position.latitude;
				flightobj.longitude = flight.position.longitude;
        flightobj.searchstr = flight.guid;					//search string
        //console.log("flightobj:",flightobj);
        js_flights.push(flightobj);
    });
    //console.log("js_flights: ",js_flights);

		let sList = js_airlines.concat(js_airports,js_flights);
		//console.log("sList",sList);
		return(sList);

  }


consolefun(){
	console.log("say hi");
}


  componentWillMount(){
		//console.log("this is props",this.props);
		//this.consolefun();

		//In this.parseData() replace each list with it's counter parts i.e this.props.airlines etc...
    this.setState({
			searchList: this.parseData(airlinesList,airportsList,flightsList),
			activeAirport_Latitude:32.897480,
			activeAirport_Longitude:-97.040443
		});

 }


  render(){

    //console.log("hi",this.state);
    return(
      <Searchbar data={this.state} />
    );
  }

}
