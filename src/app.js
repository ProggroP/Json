//json_pull v1.1 - ©bastian meissner 2016. all rights reserved.
//requirements that make this code run
var UI = require('ui');
var ajax = require('ajax');
var settings = require('settings');

//code for the main menu
var menu = new UI.Menu({
  status: false,
  textColor: 'white',
  backgroundColor: 'black',
  highlightTextColor: 'white',
  highlightBackgroundColor: 'red',
  sections: [{
    items: [{
      title: 'WEATHER'
    }, {
      title: 'BITCOIN VALUE'
    }, {
      title: 'QUOTES'
    }]
  }]
});

//code for the weathercard, it is altered later on
var weathercard = new UI.Card({
  status: false,
  backgroundcolor: '#7f8c8d',
  textColor: '#d35400',
  title:'Weather',
  subtitle:'Fetching...'
});

//code for the bitcoincard, it is altered later on
var bitcoincard = new UI.Card({
  status: false,
  backgroundcolor: '#7f8c8d',
  textColor: '#d35400',
  title:'Bitcoin Value',
  subtitle:'Fetching...'
});

//code for the quotecard, it is altered later on
var quotecard = new UI.Card({
  status: false,
  scrollable: true,
  backgroundcolor: '#7f8c8d',
  textColor: '#d35400',
  body: 'Fetching...'
});

//function for getting data from the settings-page
settings.config(
  {url:'https://jsonpull.firebaseapp.com', autosave:true},
  function(e) {
    console.log('got the settings.');
    getweather();
    if (e.failed){
      console.log('failed getting the settings.');
    }
  }
);

//function for determining which menu item was clicked
menu.on('select', function(e){
  if (e.itemIndex === 0){
    weathercard.show();
  } else if (e.itemIndex == 1){
    bitcoincard.show();
  } else if (e.itemIndex == 2){
    quotecard.show();
  }
});


//function for getting the weather data
function getweather(){
  //define variables that form the url where the app gets the data from
  var weathername = settings.option("weather");
  var weatherkey = '87c21b8d0b617b8ac9240ff198fb6395';
  var weatherurl = 'http://api.openweathermap.org/data/2.5/weather?q=' + weathername + '&appid=' + weatherkey;
  //if the user didn't set up a specific location of where to get the weatherdata from,
  //get the weatherdata from Los Angeles.
  if (weathername === undefined){weathername = "LosAngeles";}
  //establish a connection
  ajax({url: weatherurl, type: 'json'},
  //if the app has gotten data from the connection...
  function(data) {
    console.log("got weather data.");
    //define variables for the data the app just got
    var location = data.name;
    var temperaturecel = Math.round(data.main.temp - 273.15) + "°C";
    var temperaturefah = Math.round(1.8 * (Math.round(data.main.temp - 273.15)) + 32) + "°F";
    var description = data.weather[0].description;
    description = description.charAt(0).toUpperCase() + description.substring(1);
    //show these variables to the user
    weathercard.title(location);
    weathercard.subtitle(temperaturecel + " , " + temperaturefah);
    weathercard.body(description);
  },
  //if the app has not gotten data from the connection...
  function(error) {
    console.log('failed getting weather data.');
  });
}

//function for getting the quote data
function getquote(){
  //define the url, actually not neccessary, we could just write the url into
  //the ajax call, but this makes the code a lot more modular.
  var quoteurl = 'http://quotes.rest/qod.json';
  //establish a connection
  ajax({url: quoteurl, type: 'json'},
    //if the app has gotten data from the connection...
    function(data) {
      console.log("got quote data.");
      //define variables for the data the app just got
      var quote = data.contents.quotes[0].quote;
      var author = data.contents.quotes[0].author;
      //show these variables to the user
      quotecard.title(author);
      quotecard.body(quote);
    },
    //if the app has not gotten data from the connection...
    function(error) {
      console.log('failed getting quote data.');
    });
}

//function for getting the bitcoin data
function getbitcoin(){
  //define variables that form the url
  var bitcoincur = 'EUR';
  var bitcoinurl = 'http://api.bitcoinaverage.com/exchanges/' + bitcoincur;
  //establish a connection
  ajax({url: bitcoinurl, type: 'json'},
    //if the app has gotten data from the connection...
    function(data){
      console.log("got bitcoin data.");
      //define variables for the data the app just got
      var ask = data.bitcoin_de.rates.ask;
      var name = data.bitcoin_de.display_name;
      //show these variables to the user
      bitcoincard.subtitle(name + " " + ask + " EUR.");
      },
    //if the app has not gotten data from the connection...
    function(error) {
      console.log('failed getting bitcoin data.');
    });
}

//show the menu
menu.show();
//get the weather-, bitcoin-, and quote data
getweather();
getbitcoin();
getquote();
