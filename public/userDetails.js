let user=document.querySelector('#user');
let rides=document.querySelector('#rides');
let bookings=document.querySelector('#bookings');
let logout=document.querySelector('#logout');
let ridesList=document.querySelector('#rides-list');
let sort=document.querySelector('#sort');
// sort.textContent='Sort'
const editform=document.querySelector("#editForm");
let ridesSection = document.querySelector('.my-rides-section');
let bookingTable = document.querySelector('#booking-table');
let bookingTableBody = document.querySelector('#booking-table-body');
const token = localStorage.getItem('token');
async function editRide(id,from,to,seats){
    editform.style.display = "block";
    document.getElementById("rideId").value = id;
    document.getElementById("from").value = from;
    document.getElementById("to").value = to;
    document.getElementById("seats").value = seats;
    const submit=document.getElementById('submit');
    submit.addEventListener('click',async()=>{
        let id = document.getElementById("rideId").value;
  let from = document.getElementById("from").value;
  let to = document.getElementById("to").value;
  let seats = document.getElementById("seats").value;
  let res = await fetch(`/update/ride/${id}`, {
      method:"PUT",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({id,from, to, seats})
    });
    let data = await res.json();
    alert("Ride updated!");
    document.getElementById("editForm").style.display = "none";
    })
}
async function cancelRide(id) {
    const res=await fetch(`/update/dltBooking/${id}`,{
        method:'DELETE',
        headers:{'Authorization':`Bearer ${token}`}
    })
    const data= await res.json();

}
async function dltRide(id){
    const token = localStorage.getItem('token');
    const res= await fetch(`/post/ride/${id}`,{
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });

  let data = await res.json();
  alert(data.msg);
    window.location.reload();
}
async function getme(){
     if (!token) {
        userInfoBtn.innerText = "Not logged in";
        return;
    }
    
let data= await fetch('/get/me',{
     headers:{
        'Authorization':`Bearer ${token}`,
    }
})
let res=await data.json();
let name = res.user.Name;
    let email = res.user.Email
    let firstLetter = name.charAt(0).toUpperCase();
// user.innerHTML=`${res.user.Email} <br> ${res.user.Name}`;
// document.body.appendChild(user)
user.setAttribute("data-initial", firstLetter);
user.innerHTML = `
        <div>
            <span class="name">${name}</span>
            <span class="email">${email}</span>
        </div>
    `;
    rides.addEventListener('click',async()=>{
    let data1=await fetch('/get/rides');
    let res1=await data1.json();
        // res1.find(e=>{
        //     return e.Email===res.user.Email
        // });
        
        console.log(res1);
        
})
}
async function getMyRides(sortType='low') {
    if (!token) {
        ridesList.innerHTML = '<p>Please log in to see your rides.</p>';
        return;
    }
    const response = await fetch('/get/myRides', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        console.log(data);
        
        // data.rides.sort((a,b)=>a.Price-b.Price);
        // console.log(data);
        
          if (response.status !== 200 || !data.rides || data.rides.length === 0) {
        ridesList.innerHTML = '<p style="text-align: center;">You have no published rides.</p>';
        return;
    }
              
    let ridesArray = data.rides;

            switch(sortType) {
        case 'low':
            ridesArray.sort((a, b) => a.Price - b.Price);
            break;
        case 'high':
            ridesArray.sort((a, b) => b.Price - a.Price);
            break;
        case 'early':
            ridesArray.sort((a, b) => new Date(a.Datetime_local) - new Date(b.Datetime_local));
            break;
        case 'seats':
            ridesArray.sort((a, b) => b.Seats - a.Seats);
     break;
    }
    
        // if (response.status === 200) {
            ridesList.innerHTML = '';
            // if (data.rides.length > 0) {
                ridesArray.forEach(ride => {
                    console.log('rides',ride);
                    // const obj={id:ride.id};
                    // console.log(obj.id);
                    
                    const rideDiv = document.createElement('div');
                    rideDiv.addEventListener('click',async()=>{
let res=await fetch(`/get/booking/${ride.id}`);
let bookingsData = await res.json();
const bookingsContainer = document.createElement('div');
bookingsContainer.className = 'bookings-container';
bookingsContainer.style.display = 'none';
 rideDiv.appendChild(bookingsContainer);
    if (res.ok) {
        
        displayBookings(bookingsData, bookingsContainer);
        bookingsContainer.style.display = 'block'; 
    } else {
        bookingsContainer.innerHTML = `<p style="color:red;">Error: ${bookingsData.msg || 'Failed to fetch bookings.'}</p>`;
        bookingsContainer.style.display = 'block';
    }
});

function displayBookings(bookings, container) {
    if (bookings.length === 0) {
        container.innerHTML = '<p>No bookings yet for this ride.</p>';
        return;
    }

    let htmlContent = '<div class="bookings-list-header"><h4>Bookings:</h4></div>';
    bookings.forEach(booking => {
        htmlContent += `
            <div class="booking-card">
                <p><strong>Passenger:</strong> ${booking.customerName}</p>
                <p><strong>Seats:</strong> ${booking.seatsBooked}</p>
                <p><strong>Status:</strong> ${booking.status}</p>
 ${booking.Payment === 'online' ? `<button class="mark-paid-btn" data-booking-id="${booking.id}">Mark as Paid</button>` : ''}
                </div>
        `;
    });
    container.innerHTML = htmlContent;
    container.querySelectorAll('.mark-paid-btn').forEach(button => {
        button.addEventListener('click', async (e) => {
            e.stopPropagation(); // Parent card ke click event ko rokne ke liye
            const bookingId = e.target.getAttribute('data-booking-id');
            const token = localStorage.getItem('token');

            const response = await fetch(`/update/booking/paid/${bookingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            alert(data.msg);

            if (response.ok) {
                window.location.reload(); // Page reload kar de, ya booking list ko dobara fetch kar le
            }
        });
    });
}


                    // })
                    rideDiv.className = 'ride-card';
                    
                    rideDiv.innerHTML = `
                        <h3>${ride.Departure} to ${ride.Destination}</h3>
                        <p>Date: ${new Date(ride.Datetime_local).toLocaleString()}</p>
                        <p>Seats: ${ride.Seats}</p>
                        <p>Price: ₹${ride.Price}</p>
                        
                        <p><button id="edit"></button></p>
                        <p><button id="delete"></button></p>
                    `;
                    const edit=rideDiv.querySelector('#edit');
                    edit.textContent='Edit';
                    edit.setAttribute('id','edit');
                    const dlt=rideDiv.querySelector('#delete');
                    dlt.textContent="Delete";
                    dlt.setAttribute('id','dlt');
                    edit.addEventListener('click',()=>editRide(ride.id,ride.Departure,ride.Destination,ride.Seats));
                    dlt.addEventListener('click', () => dltRide(ride.id));
                    

                    ridesList.appendChild(rideDiv); 
                });
            // } else {
            //     ridesList.innerHTML = '<p style="text-align: center;">You have no published rides.</p>';
            // }
  
// }
        //  else {
        //     ridesList.innerHTML = `<p style="color: red;">Error: ${data.error || data.msg}</p>`;
        // }

        }
rides.addEventListener('click',()=>{
    bookingTable.style.display='none'
    if (ridesSection.style.display === 'block') {
        ridesSection.style.display = 'none';
    } else {
        ridesSection.style.display = 'block';

        getMyRides(); 
    }
})
getme();
bookings.addEventListener('click', async()=>{
    ridesSection.style.display='none';
    bookingTable.style.display='block';
    let data=await fetch('/get/bookings',{
        headers: {
                'Authorization': `Bearer ${token}`
            }
    });
    let res=await data.json();
    console.log(res);
        if (data.ok) {
            if (res.length > 0) {
                res.forEach(booking => {
                    const row = document.createElement('tr');
                    
                    const rideDetails = booking.rideDetails || {};
                    if (!rideDetails || Object.keys(rideDetails).length === 0) {
            // alert('Skipping a booking due to missing ride details.');
            return; 
        }
const departure=rideDetails.Departure||'n h';
const destination=rideDetails.Destination||'n h';
const seatsBooked=booking.seatsBooked||'n h';
const status=booking.status||'n h';

                    row.innerHTML = `
                        <td>${departure}</td>
                        <td>${destination}</td>
                        <td>${seatsBooked}</td>
                        <td>${status}</td>
                        <td><button id="cancel">Cancel</button></td>
                        `
                        // <td>${rideDetails.driverName || 'N/A'}</td>
                        // <td>${new Date(rideDetails.Datetime_local).toLocaleString() || 'N/A'}</td>
                    ;
                    const cancel=row.querySelector('#cancel');
                    // cancel.innerText='cancel'
                    cancel.addEventListener('click',()=>{
              cancelRide(booking.id);
                        
                    })
        
                    bookingTableBody.appendChild(row);
                });
            } else {
                bookingTableBody.innerHTML = '<tr><td colspan="6">No bookings found.</td></tr>';
            }
        } else {
            alert(`Error: ${bookings.error || 'Failed to fetch bookings.'}`);
            bookingTableBody.innerHTML = '<tr><td colspan="6">Failed to load bookings.</td></tr>';
        }
    

})
logout.addEventListener('click',()=>{
localStorage.setItem('token'," ");
alert('You are logged out');
    window.location.href="login.html";
})
sort.addEventListener('change',(event)=>{
const sortValue=event.target.value;
getMyRides(sortValue)


})
