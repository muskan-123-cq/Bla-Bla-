// const user_info=document.querySelector('#user-info');
// async function getme(){
//     const userDiv = document.querySelector('#user-info');
//     const token = localStorage.getItem('token');
//     if(!token){
//         userDiv.innerText = 'User not logged in';
//         return;
//     }
// let data = await fetch('/get/me',{
//     headers:{
//         'Authorization':`Bearer ${token}`,
//     }
// })
// let res= await data.json();
// console.log(res);

// if (res.user) {
//         userDiv.innerHTML = `
//             <strong>${res.user.Name.charAt(0).toUpperCase()}</strong>
//         `;
//     } else {
//         userDiv.innerText = 'User not logged in';
//     }


// }
// getme();
// user_info.addEventListener('click',async ()=>{
//     // console.log('hello');
//    window.location.href="userDetails.html";
    
// })