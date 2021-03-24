

/*----------UPLOAD file--------------*/
//get elements
const uploader = document.getElementById('uploader');
const fileButton = document.getElementById('image');

const modal = document.getElementById('myModal');
const mImg = document.getElementById('modal-img');



//listen for file selection
fileButton.addEventListener('change', e => {
    e.preventDefault();

    //get file
    const file = e.target.files[0];

    //create a storage ref
    const storageRef = firebase.storage().ref('images/' + file.name);

    //upload file
    const task = storageRef.put(file);

    //update progress bar

    task.on('state-changed',
        function progress(snapshot) {
            const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            uploader.value = percent;
        },
        
        function error(err) {

        },
        
        function complete() {

        }
    );
})


/*----------DOWNLOAD AND VIEW FILE---------------*/

const imageRef = firebase.storage().ref("images/");
const gallery = document.querySelector('#gallery');


imageRef.listAll().then (res => {
    
    res.items.forEach((item) => {
        console.log(item.name);
        const name = item.name;

        item.getDownloadURL().then((url) => {

            gallery.innerHTML += `
                <img id="${name}" class="gallery-img" src=${url}  >              
            `;
             
        });
    });
});


//listen for which image was clicked

gallery.addEventListener(('click'), e => {
    e.preventDefault();

    
    if(e.target.tagName === 'IMG'){
        const id = e.target.getAttribute('id');
        const src = e.target.getAttribute('src');
        console.log(id, src);
        modal.style.display = "block"; 
        mImg.setAttribute("src", src);
    }
});

function closeModal(){
    modal.style.display = "none";

}


