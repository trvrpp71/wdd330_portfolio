function upload(e){

    console.log("hello kitty");
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
            console.log(err);
       },
       
       function complete() {
            alert('Image uploaded succesfully');
            location.reload(true);
       }
   );

}

function galleryFix(){

    const ul = document.getElementById("gallery");
    const li = document.createElement('li');

    ul.appendChild(li);

}



function addMeta(dateStamp){
    const dateShot = new Date(dateStamp);
    captionText.innerHTML += `<p> Date & time Shot: ${dateShot}`;
}


export default {
    upload,
    galleryFix,
    addMeta

}