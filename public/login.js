let email=document.querySelector('#email');
let pass=document.querySelector('#pass');
let login=document.querySelector('#login');
login.addEventListener('click', async ()=>{
    let Email=email.value;
    let Pass=pass.value;
    let obj={Email,Pass};
    let data= await fetch('/post/login',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(obj)
    })
    let res=await data.json();
    if(data.status==200){
        localStorage.setItem('token',res.token)
        window.location.href = 'blabla.html';
        console.log('ha shi user h');
        
    }
})