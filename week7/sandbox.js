/*-------------lessons 86-92--------------*/
const getTodos1 = (callback) => {
    const request = new XMLHttpRequest();

    request.addEventListener('readystatechange', () => {
        //console.log(request, request.readyState);
        if(request.readyState === 4 && request.status === 200){
            const data = JSON.parse(request.responseText);
            callback(undefined, data);
        } else if (request.readyState === 4) {
            callback('cound not fetch data', undefined);
        }
    });
    
    //request.open('GET', 'https://jsonplaceholder.typicode.com/todos/'); //http request
    request.open ('GET', 'todos/todos.json'); //local request
    request.send();
};

console.log(1);
console.log(2);

getTodos1((err, data) => {
    console.log('callback fired');
    if(err){
        console.log(err);
    } else {
        console.log(data);
    }
});

console.log(3);
console.log(4);

/*-----------------lessons 93 - 95 --------------------*/

const getTodos2 = (resource, callback) => {
    const request = new XMLHttpRequest();

    request.addEventListener('readystatechange', () => {
        //console.log(request, request.readyState);
        if(request.readyState === 4 && request.status === 200){
            const data = JSON.parse(request.responseText);
            callback(undefined, data);
        } else if (request.readyState === 4) {
            callback('cound not fetch data', undefined);
        }
    });
    
    request.open ('GET', resource); //local request
    request.send();
};

/*-----this is CALLBACK HELL--------------*/
getTodos2('todos/luigi.json', (err, data) => {
    console.log(data);
    getTodos2('todos/mario.json', (err, data) => {
        console.log(data);
        getTodos2('todos/trevor.json', (err, data) => {
            console.log(data);
        })
    })
});


/*---------Lesson 94 & 95 PROMISE BASICS-------------------*/


const getTodos3 = (resource) => {
    
    return new Promise((resolve,reject) => {
        const request = new XMLHttpRequest();

        request.addEventListener('readystatechange', () => {
 
            if(request.readyState === 4 && request.status === 200){
                const data = JSON.parse(request.responseText);
                resolve(data);
            } else if (request.readyState === 4) {
                reject('cound not fetch data');
            }
        
        });
        
        request.open ('GET', resource); //local request
        request.send();
    });
};

getTodos3('todos/luigi.json').then(data => {
    console.log('promise resolved:', data);
}).catch((err)=> {
    console.log ('promise rejected:', err);
});

/*-----------------chaining promises------------------*/

getTodos3('todos/luigi.json').then(data => {
    console.log('promise 1 resolved:', data);
    return getTodos3('todos/mario.json');
}).then(data => {
    console.log('promise 2 resolved:', data);
    return getTodos3('todos/trevor.json');
}).then(data => {
    console.log('promise 3 resolved:', data);
}) .catch((err)=> {
    console.log ('promise rejected:', err);
});

/*--------------FETCH API-------------------------*/
//this replaces the get method above and is fairly new

fetch('todos/luigi.json').then((response) => {
    console.log('resolved', response);
    return response.json();
}).then((data) => {
    console.log(data)
}).catch((err) => {
    console.log('rejected', err);
});


/*--------------ASYNC & AWAIT----------------*/

const getTodos5 = async () => {

    const response = await fetch('todos/trevor.json');

    if(response.status !== 200){
        throw new Error('cannot fetch the data');
    }


    const data = await response.json();
    return data;
};

getTodos5()
    .then (data => console.log('resolved:', data))
    .catch(err => console.log('rejected: ', err.message));



