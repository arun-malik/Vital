// (function () {
//   'use strict';

//   var cardElement = document.querySelector('.card');
//   var addCardBtnElement = document.querySelector('.add__btn');
//   var addCardInputElement = document.querySelector('.add__input');
//   var spinnerElement = document.querySelector('.card__spinner');
//   var bgSyncTextElement = document.querySelector('.bg-sync__text');
//   var bgSyncElement = document.querySelector('.custom__button-bg');

//   //Add github user data to the card
//   function addGitUserCard() {
//     var userInput = addCardInputElement.value;
//     if (userInput === '') return;
//     addCardInputElement.value = '';
//     localStorage.setItem('request', userInput);
//     fetchGitUserInfo(userInput);
//   }

//   //Add card click event
//   addCardBtnElement.addEventListener('click', addGitUserCard, false);

//   //To get github user data via `Fetch API`
//   function fetchGitUserInfo(username, requestFromBGSync) {
//     var name = username || 'gokulkrishh';
//     var url = 'https://api.github.com/users/' + name;

//     spinnerElement.classList.add('show'); //show spinner

//     fetch(url, { method: 'GET' })
//     .then(function(fetchResponse){ return fetchResponse.json() })
//       .then(function(response) {
//         if (!requestFromBGSync) {
//           localStorage.removeItem('request'); //Once API is success, remove request data from localStorage
//         }
//         cardElement.querySelector('.card__title').textContent = response.name;
//         cardElement.querySelector('.card__desc').textContent = response.bio;
//         cardElement.querySelector('.card__img').setAttribute('src', response.avatar_url);
//         cardElement.querySelector('.card__following span').textContent = response.following;
//         cardElement.querySelector('.card__followers span').textContent = response.followers;
//         cardElement.querySelector('.card__temp span').textContent = response.company;
//         spinnerElement.classList.remove('show'); //hide spinner
//       })
//       .catch(function (error) {
//         //If user is offline and sent a request, store it in localStorage
//         //Once user comes online, trigger bg sync fetch from application tab to make the failed request
//         localStorage.setItem('request', name);
//         spinnerElement.classList.remove('show'); //hide spinner
//         console.error(error);
//       });
//   }

//   fetchGitUserInfo(localStorage.getItem('request')); //Fetch github users data

//   //Listen postMessage when `background sync` is triggered
//   navigator.serviceWorker.addEventListener('message', function (event) {
//     console.info('From background sync: ', event.data);
//     fetchGitUserInfo(localStorage.getItem('request'), true);
//     bgSyncElement.classList.remove('hide'); //Once sync event fires, show register toggle button
//     bgSyncTextElement.setAttribute('hidden', true); //Once sync event fires, remove registered label
//   });
// })();


var sendLocationFlag = false;
var geoLocationId = null;
var name = "";
var teamName = "";
var customTaskDescription = "";

function sendData(postData){
  $.post( "https://prod-54.westus.logic.azure.com/workflows/04c3a6f695334d52bf357329e0563cf8/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=YEvjDTPZbPVAexcRWIuhfX8mIIQpd-0nnhHZFWDhIDs", postData );
}

function startButton(){
  name = document.getElementById("name").value;
  teamName = document.getElementById("teamName").value;
  customTaskDescription = document.getElementById("customTaskDescription").value;

  // var postData = JSON.stringify({ 
  //   "id": name, 
  //   "team_name": teamName, 
  //   "custom_task_description" : customTaskDescription
  // });
  sendLocationFlag = true;
  sendLocation();  
}

function stopButton(){
  sendLocationFlag = false;
}

function sendLocation(){

  if(sendLocationFlag == true){

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition, errorCoor, {maximumAge:60000, timeout:5000, enableHighAccuracy:true});
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
    setTimeout("sendLocation()", 2000);
  }
}

function showPosition(position) {
  // alert("showPosition = " + position.coords.latitude);
    // var x = document.getElementById("locationLbl");
  console.log("Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude); 
  var postData = JSON.stringify({ 
      "id": name, 
      "Team Name": teamName, 
      "Task" : customTaskDescription,
      "Lat": position.coords.latitude, 
      "Lon": position.coords.longitude
    });
  sendData(postData);
}



function nudgeButton(){
  // alert("nudge");
  // var id = navigator.geolocation.getCurrentPosition(function(pos){
  //   console.log(pos.coords.latitude);
  //   console.log(pos.coords.longitude);
  //   document.getElementById("locationLbl").innerHTML = pos.coords
  // });


  navigator.geolocation.getCurrentPosition(getCoor, errorCoor, {maximumAge:60000, timeout:5000, enableHighAccuracy:true});
}

function getCoor(pos){
    console.log(pos.coords.latitude);
    console.log(pos.coords.longitude);
    document.getElementById("locationLbl").innerHTML = pos.coords.latitude
  }


function errorCoor(){
  
}





