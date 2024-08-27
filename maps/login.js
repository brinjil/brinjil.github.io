document.addEventListener("DOMContentLoaded", function(event) {

    //please remember, if the cookie returns null cookie expires parameter may be in the past
    // document.cookie = "token=heofuqoh2e9h9fe2h;expires=Thu, 18 Dec 2024 12:00:00 UTC;SameSite=Strict;"; 
});

// Select the button by its ID
// document.getElementById("test").addEventListener("click", function() {

//     var cookie = getCookie('token');
//     console.log(cookie);
// });

document.getElementById("btn-login").addEventListener("click", function() {

    let local = 'localhost';
    let host = '';
    if(window.location.href.indexOf(local) > -1){
      local = true;
      host = 'http://localhost/brinjilbackend/';
    }else{
    local = false;
      host = 'https://nurida-florist.com/apis/';
    }

    let data = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
      // origin: host
      origin: host
    }

    fetch(host+"bridge/auth/", {
      method: "POST",
      headers: {'Content-Type': 'application/json'}, 
      dataType: 'json',
      body: JSON.stringify({data})
    }).then(response => response.json())
    .then(data => {
      if(data.success == true){
        document.getElementById("username").value = '';
        document.getElementById("password").value = '';
        document.cookie = "token=heofuqoh2e9h9fe2h; expires=Thu, 18 Dec 2024 12:00:00 UTC; Path=/; SameSite=Strict;"; 
        setTimeout(() => {
            window.location.href="home.html"
        }, 200);
      }else{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Wrong Password!"
        });
      }
    }
    ).catch(error => console.log('Error:', error));
});