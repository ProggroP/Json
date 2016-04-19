//Requirements
var UI = require('ui');
var ajax = require('ajax');

//Variables for getting the Weather
var weatherkey = '87c21b8d0b617b8ac9240ff198fb6395';
var weathername = 'Hirschau';
var weatherurl = 'http://api.openweathermap.org/data/2.5/weather?q=' + weathername + '&appid=' + weatherkey;

//Weather Menu
var weathercard = new UI.Card({
  title:'Weather',
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
         title: 'Second Item',
         icon: 'images/menu_icon.png',
         subtitle: 'Subtitle Text'
      }]
   }]
});

//Code for Main Menu
menu.on('select', function(e){
   if (e.itemIndex === 0){
      weathercard.show();
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

menu.show();


