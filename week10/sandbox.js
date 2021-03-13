const page = document.querySelector('.signupForm');
const feedback = document.querySelector('.feedback');
const userNamePattern = /^[a-zA-Z]{6,12}$/;

//basic form input validation technique
page.addEventListener('submit', e => {
    e.preventDefault(); //stops the submit default action of refreshing the page
    //console.log(username.value);
    const username = page.username.value;
    if(userNamePattern.test(username)){
        //feedback good info
        feedback.textContent='that is a good username';
    }else{
        //feedback help info
        feedback.textContent='the username needs to be letters & between 6-12 characters long';
    };
});


//do event listen for live feedback

page.username.addEventListener('keyup', e =>{
    //console.log(e.target.value, page.username.value);
    console.log(e);
    if(userNamePattern.test(e.target.value)){
        //console.log('passed');
        page.username.setAttribute('class','success');
    } else {
        //console.log('failed');
        page.username.setAttribute('class','fail');
    }
});


//test RegEx
// const username = 'trevor'
// const pattern = /^[a-z]{6,}$/;

// // let result = pattern.test(username);

// // if(result){
// //     console.log('regex test passed :)');
// // }else {
// //     console.log('regex test failed :(');
// // }

// //alternate way:

// let result = username.search(pattern);
// console.log(result);

