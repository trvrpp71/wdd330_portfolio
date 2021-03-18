
const form = document.getElementById('form')
const parentDiv = document.getElementById('result');
const image = document.getElementById('image');

form.addEventListener('submit', e => {
    e.preventDefault();

    const reader = new FileReader();

    const name = document.getElementById("image").files[0].name;
    
    console.log(name);


    reader.addEventListener('load', function()  {

        if(this.result && localStorage) {
            window.localStorage.setItem(name, this.result);
            alert("Image stored in local storage");
            parentDiv.innerHTML='';
            image.value='';
            showImages();
        } else {
            alert ("unable to save to local storage")
        }
    });

    reader.readAsDataURL(image.files[0]);

});


function showImages(){

    for(let i = 0; i<window.localStorage.length;i++){
        let res = window.localStorage.getItem(window.localStorage.key(i));
        const newImage = new Image();
        newImage.src = res;
        parentDiv.appendChild(newImage);
    }

}

function removeImages() {
    window.localStorage.clear();
    parentDiv.innerHTML='';
    showImages();
}


showImages();