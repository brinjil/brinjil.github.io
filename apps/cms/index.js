document.addEventListener("DOMContentLoaded", function(event) {
    authCheck();

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
      token:getCookie('token')
    }

    fetch(host+"bridge/cms/read/", {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        dataType: 'json',
        body: JSON.stringify({data})
      }).then(response => response.json())
      .then(data => {
        if(data.success == true){
          console.log(data.data[0].web_title);
          document.title = data.data[0].web_title;
          document.getElementById("navbar_web_title").textContent = data.data[0].web_title;
          document.getElementById("navbar").style.backgroundColor = "#00c8e6";
          document.getElementById('image').src = data.image_url+data.data[0].image;

          // JSON string
          var i=0;
          do{
            document.getElementById('cards').innerHTML += "<center>\
              <div class='card mb-3' style='max-width: 540px; margin-top:20px;cursor: pointer;' onclick='carClicked(`"+data.data[0].cards.data[i].url+"`)'>\
                <div class='row g-0'>\
                  <div class='col'>\
                    <div class='card-body' style='padding:5px;padding-top:10px;'>\
                      <img src='"+data.image_url+data.data[0].cards.data[i].image+"' style='height:auto; max-width:80px;' class='img-fluid rounded-start' alt='...'>\
                      <p>"+data.data[0].cards.data[i].text+"</p>\
                    </div>\
                  </div>\
                </div>\
              </div>\
            </center>";
            i++
          }while(i<data.data[0].cards.data.length)

          document.getElementById('map').src = data.data[0].maps_embed;
        }
      }).catch(error => console.log('Error:', error));
});

function carClicked(url){
  window.location = url;
}