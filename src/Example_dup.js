import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import Map from "./map.js";
import searchIcon from "./search.png";

//global object to populate when user makes a selection via 'click'
let fltObj={};

//data array would provide with the data
//expected fields:
//name: name of the airport/airline/flight
//type/priority: to pick right kind of object incase of multiple selection with similar name(e.g DLLAS Airport V/s delta when user types DAL)
//priority for now : 1.airline,2.airport,3.flight
//lat&lon: show lat and longitude co-ordiantes incase of airport and flights

let languages=[];

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

//does a simple find for the item with matching name
function findItemInFlightsArray(enteredValue){

  enteredValue = enteredValue.trim();
  let flightObj = languages.find(function(item) {
    return (item.name === enteredValue);
  });
  return flightObj;
}



//returs the suggestion list depending on the user input i.e value
function getSuggestions(value) {

  const escapedValue = escapeRegexCharacters(value.trim());
  if (escapedValue === '') {
    return [];
  }
  const regex = new RegExp(escapedValue, 'i');
  return languages.filter(language => regex.test(language.name));
}


//returs the suggestion.name agmonst the suggestion list
//also populates flightObj on user selection via a click
function getSuggestionValue(suggestion) {
  //console.log("getSuggestionValue:",suggestion)
  fltObj=findItemInFlightsArray(suggestion.name);
  return suggestion.name;
}

//render suggestion
//haven't used this much
function renderSuggestion(suggestion) {
  //console.log("renderSuggestion:",suggestion.name);
  return (
    <span>{suggestion.name}</span>
  );
}

//Searchbar class Component
export default class Example extends Component {
  constructor(props) {
    super(props);
//state variables
//noSuggestion: boolean value
//true: when the user input yeilds an empty suggestion list
//isSelectSuggestion: true when user makes a selection from the suggestion list(either through keyboard or mouse click)
let searchList  =  this.props.data.searchList;
languages =searchList;
console.log("LAT:",this.props.data.activeAirport_Latitude);
console.log("searchList:",searchList);


    this.state = {
      value: '',
      suggestions: [],
      noSuggestions: false,
      isSelectSuggestion:false,
      searchList: this.props.data.searchList,
      latitude:this.props.data.activeAirport_Latitude,
      longitude:this.props.data.activeAirport_Longitude
      //lat:28.53823,
      //lon: -81.37739
    };
  }


  //Whenever Input changes or selection made using UP & Down arrow or click
  onChange = (event, { newValue, method }) => {
    //records I guess input box change
    //console.log("onchange");
    this.setState({
      value: newValue,
    });

    //onClick
    if(fltObj && method==='click') {
      this.setState({
        latitude:   fltObj.latitude,
        longitude:   fltObj.longitude

      });
      fltObj={};
      //!!might need to set noSuggestion & isSelectSuggestion to false as a safe bound
    }


    //set noSuggestion to false since user has the ability to make a valid selection
    if(method === 'down' || method === 'up') {
      this.setState({
          noSuggestions: false,
          isSelectSuggestion: true
      });

    }
    else {
      this.setState ({
        isSelectSuggestion: false
      });
    }

    //console.log('Input box:')
    //console.log('KeyPressSelection: '+ method,this.state.isSelectSuggestion);
    //console.log('NoSuggestion: '+ method,this.state.noSuggestions);
  };



selectValueCallBack= (state,method) =>{

    console.log(`Method ${method}:suggestions: `,state.suggestions);
    //on selection or Invalid data
    if (!state.suggestions.length ) {
      //on Selection
      if(state.isSelectSuggestion && !state.noSuggestions) {

        console.log(`Method ${method}:selection performed`);
        console.log(`Method ${method} isSelectSuggestion: `,state.isSelectSuggestion);
        console.log(`Method ${method} NoSuggestions: `,state.noSuggestions);
        console.log(`Method ${method} value:`,state.value);

        let selectionItem =  findItemInFlightsArray(state.value);
       console.log("selectionItem returned:",selectionItem);
         this.setState({
           value: selectionItem.name,
           latitude:   selectionItem.latitude,
           longitude:   selectionItem.longitude
         });
       console.log( 'selection' + this.state);
      }
      else{
        //no Suggestions to show!
        console.log(`${method}: Invalid Value!`);
      }

    }

    //Single item only avaliable
    else if (state.suggestions.length ===1) {
      console.log(`${method}: One value returned`);
      this.setState({
        value: state.suggestions[0].name,
        latitude: state.suggestions[0].latitude,
        longitude: state.suggestions[0].longitude
      });
    }

    //suggestionsArray present but no selection made
    else {
      console.log(`${method}: Suggestion Array returned but no selection`);
      this.setState({
        noSuggestions:true
      });
    }
};




//Callback for whenever user presses enter
  onKeyPress = (e) => {

     if(e.key === 'Enter') {
       console.log("onEnterPress");
       this.selectValueCallBack(this.state,"Enter");
     }
  }




// the function to fetch suggestion list
//it also decides whether user input is valid else set flag noSuggestions
  onSuggestionsFetchRequested = ({ value }, callback) => {
    console.log("OSR:value:",value)
    //const suggestions = getSuggestions(value,this.state.searchList);
    const suggestions = getSuggestions(value);
    //console.log('Fetchedsuggestions', suggestions);
    const isInputBlank = value.trim() === '';
    const noSuggestions = !isInputBlank && suggestions.length === 0;

    //if no suggestions, selection false
    if(noSuggestions){
      this.setState({
        isSelectSuggestion:false
      });
    }

    this.setState({
      suggestions,
      noSuggestions
    },  () => {
      if(callback){
        callback()
      }
    });
//()=> console.log("Fetching suggestions:",this.state.suggestions)
   //console.log("Calc Nosuggestions:",noSuggestions);
   //console.log('Nosuggestions:',this.state.noSuggestions);
   //console.log('Selection:',this.state.isSelectSuggestion);
  };


  //Callback for whenever user clicks the searchIcon
  onClickHandleEvent = (e) => {
    console.log('icon click');
    this.onSuggestionsFetchRequested({value: this.state.value},
    this.selectValueCallBack(this.state,"SearchIcon"));
      //this.selectValueCallBack(this.state,"SearchIcon");
      /*let value = this.state.value;
      const suggestions = getSuggestions(value);
      const isInputBlank = value.trim() === '';
      const noSuggestions = !isInputBlank && suggestions.length === 0;

      //if no suggestions, selection false
      if(noSuggestions){
        this.setState({
          isSelectSuggestion:false
        });
      }

      //this.state.suggestions = suggestions;
      this.setState({
        suggestions,
        noSuggestions,
      }, ()=>{console.log("suggestions", this.state.suggestions)});

      console.log("onClickSearchIcon:",this.state.suggestions);
      console.log("onClickSearchIcon:",suggestions);
      //this.onSuggestionsFetchRequested(this.state.value);*/


  }



//this is called when the user clears input through the 'X' mark or a backspace key is hit
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
    if (this.state.noSuggestions) {
      this.setState({
        noSuggestions: false,
        isSelectSuggestion:false
        }
      );
    }
      console.log('onSuggestionsClearRequested:',this.state);
  };

//the render function
  render() {

    const { value, suggestions,noSuggestions } = this.state;
    const inputProps = {
      placeholder: "Type Airport/flightId/Fixes...",
      value,
      onChange: this.onChange,
      onKeyPress: this.onKeyPress,
    };
    const center = { lat:this.state.latitude, lng: this.state.longitude };

    //console.log("center",center);
    return (
      <div>
        <div className="autosuggest-container">
        <img className="search-icon" src={searchIcon} onClick={this.onClickHandleEvent} />
        <Autosuggest
        focusInputOnSuggestionClick ={false}
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps} />

          </div>
          <div className ="no-suggestions">
          {noSuggestions && 'No suggestions!'}
          </div>
            <Map Center={center} Zoom={12} />

      </div>
    );
  }
}
