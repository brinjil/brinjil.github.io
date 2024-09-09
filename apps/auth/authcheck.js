function authCheck(){
    setTimeout(() => {
        function isTokenInvalid(token) {
            return token === '' || token === 'null' || token === null;
        }
        var token = getCookie('token');
        if(isTokenInvalid(token)){
            window.location.href="../auth/login.html"
        }
    }, 200); 
}