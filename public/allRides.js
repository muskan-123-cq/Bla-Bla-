//allRides.js
const token=localStorage.getItem('token');
const isLoggedIn = !!token;
async function getRides() {
    let data = await fetch('get/rides');
    let res = await data.json();
    console.log(res);
    const container = document.getElementById('rides-list-container');
    container.innerHTML = '';
    console.log(res);

    res.forEach(ride => {
        const rideDiv = document.createElement('div');


                      

        rideDiv.classList.add('ride-card');

        rideDiv.innerHTML = `
                        <div class="ride-info">
                            <span><strong>Driver:</strong> ${ride.driverName}</span>
                            <span><strong>Route:</strong> ${ride.Departure} → ${ride.Destination}</span>
                            <span><strong>Date & Time:</strong> ${new Date(ride.Datetime_local).toLocaleString()}</span>
                            <span><strong>Available Seats:</strong> ${ride.Seats}</span>
                            <span><strong>Price per Seat:</strong> ₹${ride.Price}</span>
                        </div>
                    `;

        if (isLoggedIn) {
            const bookBtn = document.createElement('button');
            bookBtn.textContent = 'Book Ride';
            bookBtn.addEventListener('click', () => {
                // if(!token || token==''){
                //     alert('First log in to your account');
                //     window.location.href="login.html";
                // }
                alert(`Booking ride with ${ride.driverName}`);
            });
            rideDiv.appendChild(bookBtn);
        }

        container.appendChild(rideDiv);
    });

}
getRides();