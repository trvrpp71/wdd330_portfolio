export function getJSON(url){
    fetch(url).then((response) => {
        console.log('resolved', response);
        return response.json();
    }).then((data) => {
        console.log(data)
    }).catch((err) => {
        console.log('rejected', err);
    });
};

export const getLocation = function(options){
    return new Promise(function(resolve,reject){
        navigator.geolocation.getCurrentPosition(resolve,reject,options)
    });
};

// export function getLocation(){
//     let options = {timeout:60000};
//     navigator.geolocation.getCurrentPosition(showLocation, errorHandler, options);
// }

// function showLocation(position){
//     let latitude = position.coords.latitude;
//     let longitude = position.coords.longitude;
//     alert("latitude: " + latitude + "Longitude: " + longitude);
// }

// function errorHandler(err){
//     if(err.code == 1) {
//         alert("error: access denied");
//     } else if(err.code ==2 ){
//         alert("error: position is not avaialble");
//     }
// }



// fetch('todos/luigi.json').then((response) => {
//     console.log('resolved', response);
//     return response.json();
// }).then((data) => {
//     console.log(data)
// }).catch((err) => {
//     console.log('rejected', err);
// });

