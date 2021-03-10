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





// fetch('todos/luigi.json').then((response) => {
//     console.log('resolved', response);
//     return response.json();
// }).then((data) => {
//     console.log(data)
// }).catch((err) => {
//     console.log('rejected', err);
// });

