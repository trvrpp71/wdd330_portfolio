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



function addMeta(dateStamp, captionText){
    
    const dateShot = new Date(dateStamp);
    const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    
    let formatted_date = dateShot.getDate() + "-" + months[dateShot.getMonth()] + "-" + dateShot.getFullYear() 
    let formatted_time = appendZeros(dateShot.getHours()) + ":" + appendZeros(dateShot.getMinutes()) + ":" + appendZeros(dateShot.getSeconds()); 
    captionText.innerHTML += `
        <p> Date Uploaded: ${formatted_date}
        <p> Time Uploaded: ${formatted_time}
        `;

}

function appendZeros(n){
    if(n <=9){
        return "0" + n;
    }
    return n
}



export default {
    upload,
    galleryFix,
    addMeta

}