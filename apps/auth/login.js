document.addEventListener("DOMContentLoaded", function(event) {
  setTimeout(() => {
    function isTokenInvalid(token) {
        return token === '' || token === 'null' || token === null;
    }
    var token = getCookie('token');
    if(!isTokenInvalid(token)){
        window.location.href="../home/login.html"
    }
  }, 200); 
});

document.getElementById("username").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("btn-login").click();
  }
}); 

document.getElementById("password").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("btn-login").click();
  }
}); 

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
        document.cookie = "token="+data.token+"; expires=Thu, 18 Dec 2024 12:00:00 UTC; Path=/; SameSite=Strict;"; 
        setTimeout(() => {
            window.location.href="../home/"
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