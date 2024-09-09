document.addEventListener("DOMContentLoaded", function(event) {
    function isTokenInvalid(token) {
        return token === '' || token === 'null' || token === null;
    }
    
    var token = getCookie('token');
    if(isTokenInvalid(token)){
        window.location.href="auth/"
    }else{
        window.location.href="home/"
    }
});