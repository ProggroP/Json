//Requirements
var UI = require('ui');
var ajax = require('ajax');

//Variables for getting the Weather
var weatherkey = '87c21b8d0b617b8ac9240ff198fb6395';
var weathername = 'Hirschau';
var weatherurl = 'http://api.openweathermap.org/data/2.5/weather?q=' + weathername + '&appid=' + weatherkey;

//Variables for getting the bitcoin Value
var bitcoincur = 'EUR';
var bitcoinurl = 'http://api.bitcoinaverage.com/exchanges/' + bitcoincur;

//Variables for getting twitter trends
var twittertrendsurl = 'http://api.whatthetrend.com/api/v2/trends.json';

//Weather Menu
var weathercard = new UI.Card({
   backgroundcolor: '#7f8c8d',
   textColor: '#d35400',
   title:'Weather',
   subtitle:'Fetching...'
});

//Bitcoin Menu
var bitcoincard = new UI.Card({
   backgroundcolor: '#7f8c8d',
   textColor: '#d35400',
   title:'Bitcoin Value',
   subtitle:'Fetching...'
});

//Twitter Trend Menu
var twittertrendscard = new UI.Card({
   backgroundcolor: '#7f8c8d',
   textColor: '#d35400',
   title:'Twitter Trends',
   subtitle:'Fetching...'
});

//Main Menu
var menu = new UI.Menu({
   backgroundColor: '#2980b9',
   textColor: 'black',
   highlightBackgroundColor: '#2ecc71',
   highlightTextColor: 'white',
   sections: [{
      items: [{
         title: 'Weather',
         icon: 'images/menu_icon.png'
      }, {
         title: 'Bitcoin Value',
         icon: 'images/menu_icon.png'
      }, {
         title: 'Trending Tweets',
         icon: 'images/menu_icon.png'
      }]
   }]
});

//Code for Main Menu
menu.on('select', function(e){
   if (e.itemIndex === 0){
      weathercard.show();
   } else if (e.itemIndex == 1){
      bitcoincard.show();
   } else if (e.itemIndex == 2){
      twittertrendscard.show();
   }
});


//Code for Weather Menu
ajax(
  {url: weatherurl, type: 'json'},
function(data) {
    console.log("Successfully fetched weather data!");
    var location = data.name;
    var temperature = Math.round(data.main.temp - 273.15) + "C";
    var description = data.weather[0].description;
    description = description.charAt(0).toUpperCase() + description.substring(1);
    weathercard.subtitle(location + ", " + temperature);
},
function(error) {
   console.log('Failed fetching weather data: ' + error);
});

//Code for BitCoin Menu
ajax(
   {url: bitcoinurl, type: 'json'},
   function(data){
      console.log("Successfully fetched bitcoin data!");
      var ask = data.bitcoin_de.rates.ask;
      var name = data.bitcoin_de.display_name;
      bitcoincard.subtitle("The current value on " + name + " is " + ask + " EUR.");
   }
);

ajax(
   {url: twittertrendsurl, type: 'json'},
   function(data){
      console.log("Successfully fetched trend data!");
      var date = data.trends.first_trended_at;
      var name = data.trends.desctription.text;
      console.log(date);
      console.log(name);
   }
);



menu.show();


