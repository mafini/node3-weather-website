console.log("I am from app.js")



const weatherForm = document.querySelector('form');
const addressBox = document.querySelector('input');
const line1 = document.querySelector('#line1');
const line2 = document.querySelector('#line2');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const weatherEndPoint = '/weather?address=' + addressBox.value;
    
    console.log(addressBox.value);
    fetch(weatherEndPoint).then((response) => {
        response.json().then((data) => {
            console.log(data);
            if(data.error){
                line1.textContent = data.error;
                line2.textContent = '';
            }else{
                line1.textContent = data.location;
                line2.textContent = data.forecastData;
            }
        });
    });
})