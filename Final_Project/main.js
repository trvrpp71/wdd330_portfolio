import utils from "./utils.js";

/*----------initialize Firebase--------------*/

const app = firebase.initializeApp({
    apiKey: "AIzaSyBNNcOLAHbZNrovoZTtzYxTKd3-7Q-N0xc",
    authDomain: "wdd330final.firebaseapp.com",
    projectId: "wdd330final",
    storageBucket: "wdd330final.appspot.com",
    messagingSenderId: "41890343479",
    appId: "1:41890343479:web:eee022cacc22cb5fe2edb2"
});
const storage = app.storage();
const imageRef = firebase.storage().ref("images/");

const fileButton = document.getElementById('image');
const gallery = document.querySelector('#gallery');
const modal = document.getElementById('myModal');
const mImg = document.getElementById('modal-img');
const captionText = document.getElementById('caption');
const close = document.getElementById('close');

//listen for file selection
fileButton.addEventListener('change', e => {
    e.preventDefault();
    utils.upload(e);
})


/*----------ADD HTML & VIEW FILES---------------*/



imageRef.listAll().then (res => {
    
    let c = (res.items.length);
    
    res.items.forEach((item) => {

        const name = item.name;

        item.getDownloadURL().then((url) => {

           if (c != 1) {
                gallery.innerHTML += `
                    <li class="gallery-img" id="${name}">
                        <img src=${url} alt="${name}">
                        <i class="far fa-trash-alt delete"></i>
                    </li>
                   `;
                c--;      
           } else if (c===1) {
                gallery.innerHTML += `
                    <li class="gallery-img" id="${name}">
                        <img src=${url}>
                        <i class="far fa-trash-alt delete"></i>
                    </li>
                    <li></li>
            `;
           }
        });
    });
});




//listen for which image was clicked

gallery.addEventListener(('click'), e => {
    e.preventDefault();


    if(e.target.tagName === 'IMG'){
        const id = e.target.parentElement.getAttribute('id');
        const src = e.target.getAttribute('src');
        const meta = storage.ref('images/' + id);
        
        modal.style.display = "block"; 
        mImg.setAttribute("src", src);
        captionText.innerHTML = `<p> Filename: ${id}</p>`
    
        meta.getMetadata().then(metadata => {
            const dateStamp = metadata.timeCreated;
            utils.addMeta(dateStamp, captionText);
        });
    } else if (e.target.tagName ==="I") {  //the delete button was clicked
        const id = e.target.parentElement.getAttribute('id');
        if (confirm("Are you sure you want to delete this image?")) {
            const deleteRef = storage.ref('images/' + id);
            deleteRef.delete().then(() => {
                location.reload(true);
                alert("File deleted succesfully");

            }).catch((err) => {
                alert("Something went wrong...")
            });
        }
        
    }
});


close.addEventListener(('click'), e => {
    e.preventDefault();
    modal.style.display = "none";
});




