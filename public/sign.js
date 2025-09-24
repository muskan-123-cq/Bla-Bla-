//sign.js

let email=document.querySelector('#email');
let name=document.querySelector('#name');
let pass=document.querySelector('#pass');
let sign=document.querySelector('#sign');
const passenger=document.querySelector('#passenger');
const driver=document.querySelector('#driver');
sign.addEventListener('click', async(event)=>{
event.preventDefault();
    let Email=email.value;
    let Name=name.value;
    let Pass=pass.value;
    let role='';
    if(passenger.checked){
        role='passenger';
    }
    else{
        role='driver'
    }
    
    let obj={Email,Name,Pass,role};
    console.log(obj);
    
    let data= await fetch('/post/sign',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(obj)
    })
    let res= await data.json();
    console.log(res);
    
    console.log(data.status);
    if(data.status===200){
        window.location.href='login.html';
    }
    
})