const nameInput = document.getElementById('name'),
    emailInput = document.getElementById('email'),
    textInput =document.getElementById('msg'),
    button =document.getElementById('button'),
    response =document.getElementById('response');

button.addEventListener('click',send,false);

function  send() {
    const  name= nameInput.value;
    const email = emailInput.value;
    const text= textInput.value;
    response.innerHTML="After reviewing your request I'll be getting in touch.";
    setTimeout(myFunction,4000);

    function myFunction() {
        response.innerHTML="";
    }


    fetch('/',{
        method:'post',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify({name:name,email:email,text:text})
    })
        .then(function (res) {
            console.log(res);
        })
        .catch(function (err) {
            console.log(err);
        });
}