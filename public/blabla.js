

const date = document.querySelector('#date');
const leaving = document.querySelector('#leaving');
const going = document.querySelector('#going');
const search = document.querySelector('#search');
const main = document.querySelector('#main');
const login = document.querySelector('#login_link');
const sign = document.querySelector('#sign_link');
const rideList = document.querySelector('#rides-list-container');
const token = localStorage.getItem('token');

let payment;

async function getme() {
    const user_info = document.querySelector('#user-info');
    user_info.style.display = "inline-flex";
    login.style.display = 'none';
    sign.style.display = 'none';
    const userDiv = document.querySelector('#user-info');

    if (!token) {
        userDiv.innerText = 'User not logged in';
        return;
    }
    let data = await fetch('/get/me', {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
    let res = await data.json();
    console.log(res);

    if (res.user) {

        userDiv.innerHTML = `<div id="yediv">
            <strong>${res.user.Name.charAt(0).toUpperCase()}</strong></div>
            <span style="margin-left:8px;">${res.user.Name}</span>
           
        `;
    } else {
        userDiv.innerText = 'User not logged in';
    }
    user_info.addEventListener('click', async () => {
        window.location.href = "userDetails.html";
    })

}
if (token) {
    getme();
}
async function bookRide(rideId, seatsBooked,status='pending') {
    if (!token) {
        alert("Please log in to book a ride.");
        return;
    }
    const response = await fetch('/booking/ride', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            rideId: rideId,
            seatsBooked: seatsBooked,
            Payment:status
            
        })
    });

    const data = await response.json();

    if (response.ok) {
        
        alert('Ride booked successfully!');
        window.location.href = 'userDetails.html';
    } else {
        alert(`Error: ${data.error || 'Failed to book ride.'}`);
    }
}
function showBookingForm(ride) {
    const overlay = document.createElement('div');
    overlay.setAttribute('id','overlay');

    const form = document.createElement('div');
    form.setAttribute('id','form_details')
    
    form.innerHTML = `
        <h3>Book Ride</h3>
        <p><strong>From:</strong> ${ride.Departure}</p>
        <p><strong>To:</strong> ${ride.Destination}</p>
        <p><strong>Available Seats:</strong> ${ride.Seats}</p>
        <p><strong>Price per Seat:</strong> ₹${ride.Price}</p>
        <label>How many seats you want?</label>
        <input type="number" id="seatCount" min="1" max="${ride.Seats}" value="1" />
        <p id="totalPrice">Total Price: ₹${ride.Price}</p>
        <p><strong>Payment Options:</strong><br></p>
                        <button id="cash">Cash</button>
                        <button id="online">Online</button><br><br>
        <button id="confirmBooking">Confirm</button>
        <button id="cancelBooking">Cancel</button>
    `;

    overlay.appendChild(form);
    document.body.appendChild(overlay);

    const seatInput = form.querySelector("#seatCount");
    const totalPrice = form.querySelector("#totalPrice");
    const cash=form.querySelector('#cash');
    const online=form.querySelector('#online');
    seatInput.addEventListener("input", () => {
        const seats = parseInt(seatInput.value);
        totalPrice.textContent = `Total Price: ₹${seats * ride.Price}`;
    });

    form.querySelector("#confirmBooking").addEventListener("click",async () => {
        const seats = parseInt(seatInput.value);
        if (payment === "cash") {
        
        await bookRide(ride.id, seats, "cash");
        document.body.removeChild(overlay);

    }
    else if(payment==='online'){

//         const res = await fetch('/post/create-order', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json',
//     'Authorization':`Bearer ${token}`
//    },
//   body: JSON.stringify({ amount: ride.Price })
await bookRide(ride.id, seats, "online");
        document.body.removeChild(overlay);
    }
// });
// const order = await res.json(); 
// console.log(order);

// var options = {
//   key: "0987654321",
//   amount: order.amount,
//   currency: "INR",
//   name: "Ride Booking",
//   order_id: order.id,  
//   handler: async function (response) {
    
//     await bookRide(ride.id, seats, "online");
//                 document.body.removeChild(overlay);
//   }
// };
// var rzp = new Razorpay(options);
// rzp.open();
// }
    else {
        alert("Please select a payment method (Cash/Online)");
    }
//         // await bookRide(ride.id,seats,payment);
//         // document.body.removeChild(overlay);
    });

    form.querySelector("#cancelBooking").addEventListener("click", () => {
        document.body.removeChild(overlay);
    });
      cash.addEventListener("click", async () => {
    //     const seats = parseInt(seatInput.value);
    //    await bookRide(ride.id, seats, "cash");
       
    //     document.body.removeChild(overlay);
    payment='cash';
    });

    online.addEventListener("click", () => {
        // const seats = parseInt(seatInput.value);
        // bookRide(ride.id, seats, "online"); 
        // document.body.removeChild(overlay);
        payment='online'
    });
}

search.addEventListener('click', async () => {
    let Date = date.value;
    let Leaving = leaving.value;
    let Going = going.value;
    let data = await fetch('/get/rides');
    let response = await data.json();
    console.log(response);

    if (response.status == 400) {
        alert('not enough space ');
        //div.style.disabled=true;
    }
    const d = response.filter(e => {
        if (e.Departure == Leaving && e.Destination == Going) {
            let div = document.createElement('div');
            // let button = document.createElement('button');
            // button.innerHTML = `Book Now`
            div.innerHTML = `
            <p><strong>Departure:</strong> ${e.Departure}</p>
            <p><strong>Destination:</strong> ${e.Destination}</p>
            <p><strong>Date:</strong> ${e.Datetime_local}</p>
            <p><strong>Driver:</strong> ${e.driverName}</p>
            <button id="btn">Book Now</button>`
            ;
            div.querySelector('#btn').addEventListener('click', async () => {

                showBookingForm(e)
            })
            rideList.append(div);
            // rideList.append(btn);
        }
        main.append(rideList);
    })

    main.style.display = 'none';
    rideList.style.display = 'block';
    console.log(rideList);

    document.body.append(rideList);


})