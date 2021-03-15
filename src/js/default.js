let allItemsUrl = ["http://localhost:3000/api/cameras/", "http://localhost:3000/api/teddies/", "http://localhost:3000/api/furniture/"]
let idCategoryItem = {"camera": [],"teddies": [],"furniture": []};
allItemsUrl.forEach(elementList => {

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            var response = JSON.parse(this.responseText);
            response.forEach(element => {
                let span = document.createElement('span');
                let h3 = document.createElement('h3');
                let p = document.createElement('p');
                let divBody = document.createElement('div');
                let divContainer = document.createElement('div');
                let img = document.createElement('img');

                p.classList.add("card-text");
                h3.classList.add("card-title");
                divBody.classList.add("card-body");
                divContainer.classList.add("card");
                divContainer.id = element._id;
                img.classList.add("card-img-top");
                if (elementList == "http://localhost:3000/api/cameras/"){
                    img.alt = "Photo de la caméra "+element.name;
                } else if (elementList == "http://localhost:3000/api/teddies/"){
                    img.alt = "Photo de la peluche "+element.name;
                } else if (elementList == "http://localhost:3000/api/furniture/"){
                    img.alt = "Photo d'un "+element.name;
                }

                img.src = element.imageUrl;
                span.innerHTML = element.price+"€";
                p.innerHTML = element.description;
                h3.innerHTML = element.name;

                divBody.appendChild(img);
                divBody.appendChild(h3);
                divBody.appendChild(p);
                divBody.appendChild(span);
                divContainer.appendChild(divBody);

                const cardList = document.querySelector('#main .card-list')
                cardList.appendChild(divContainer);

                
                divContainer.addEventListener("click", function(e){
                    const idItem = divContainer.id;
                    if (elementList == "http://localhost:3000/api/cameras/"){
                        window.location.replace("product.html?category=cameras&id="+element._id);
                    } else if (elementList == "http://localhost:3000/api/teddies/"){
                        window.location.replace("product.html?category=teddies&id="+element._id);
                    } else if (elementList == "http://localhost:3000/api/furniture/"){
                        window.location.replace("product.html?category=furniture&id="+element._id);
                    }
                    
                });
            });
        }
    };
    request.open("GET", elementList);
    request.send();
    
});