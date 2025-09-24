const destination=document.querySelector('#destination');
const departure=document.querySelector('#departure');
const datetime_local=document.querySelector('#datetime');
const seats=document.querySelector('#seats')
const price=document.querySelector('#price')
const submit=document.querySelector('#submit')
submit.addEventListener('click',async (event)=>{
    // event.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
        alert("Please log in to post a ride.");
        window.location.href = 'login.html'; 
        return;
    }
    let Destination=destination.value
    let Departure=departure.value
    let Datetime_local=datetime_local.value;
    let Seats=seats.value
    let Price =price.value
    let obj={Destination,Datetime_local,Departure,Seats,Price};
    let response= await fetch('/post/ride',{
        method:'POST',
        headers:{'Content-Type':'application/json','Authorization': `Bearer ${token}`},
        body:JSON.stringify(obj)
    })
    let data = await response.json();
    if (response.status === 200) {
        
            alert(data.msg);
            window.location.href = 'blabla.html'; 
        } else {
            alert(data.error);
        }
})