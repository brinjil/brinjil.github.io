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

            // JSON string
            var i=0;
            var cards_order = [];
            do{
                cards_order.push(data.data[0].cards.data[i].id);
                document.getElementById('cards').innerHTML += "<center>\
                <div class='card mb-3' style='max-width: 540px; margin-top:20px;'>\
                    <div class='row g-0'>\
                    <div class='col' >\
                        <div class='card-body' style='padding:5px;padding-top:10px;'>\
                        <img src='"+data.image_url+data.data[0].cards.data[i].image+"' style='height:auto; max-width:80px;' class='img-fluid rounded-start' alt='...'>\
                        <p>"+data.data[0].cards.data[i].text+"</p>\
                        </div>\
                    </div>\
                    <div class='col-xs' style='width:70px;'>\
                    <button class='btn btn-primary color-change-button' onclick=reorderCards('"+data.data[0].cards.data[i].id+"') style='margin-top:20px; border-radius: 100px; color:gray; background-color:white; border-color: gray; '>\
                        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-chevron-compact-up' viewBox='0 0 16 16'>\
                            <path fill-rule='evenodd' d='M7.776 5.553a.5.5 0 0 1 .448 0l6 3a.5.5 0 1 1-.448.894L8 6.56 2.224 9.447a.5.5 0 1 1-.448-.894z'/>\
                        </svg>\
                    </button>\
                    </br>\
                    <button class='btn btn-primary color-change-button' style='margin-top:10px; border-radius: 100px; color:gray; background-color:white; border-color: gray; '>\
                        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-chevron-compact-down' viewBox='0 0 16 16'>\
                            <path fill-rule='evenodd' d='M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67'/>\
                        </svg>\
                    </button>\
                    </div>\
                    </div>\
                </div>\
                </center>";
                i++
            }while(i<data.data[0].cards.data.length)
            
            localStorage.setItem('cards_order', cards_order);
        }
      }).catch(error => console.log('Error:', error));
});

function moveElement(arr, fromIndex, toIndex) {
    // Remove the element from the current index
    const element = arr.splice(fromIndex, 1)[0];
    
    // Insert the element at the new index
    arr.splice(toIndex, 0, element);
    
    return arr;
}

function reorderCards(id){
    let string = localStorage.getItem('cards_order');
    let arr = string.split(',');
    let index = arr.indexOf(id);
    
    console.log(index);
    console.log(moveElement(arr, index, index-1));
}