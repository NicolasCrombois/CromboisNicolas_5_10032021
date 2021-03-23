function displayProduct(listApi){
    listApi.forEach(elementList => {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                var response = JSON.parse(this.responseText);
                response.forEach(element => {
                    let span = document.createElement('span');
                    let h3 = document.createElement('h3');
                    let p = document.createElement('p');
                    let divBody = document.createElement('div');
                    let a = document.createElement('a');
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
                    span.innerHTML = (element.price/100).toFixed(2)+"€";
                    p.innerHTML = element.description;
                    h3.innerHTML = element.name;
                    if (elementList == "http://localhost:3000/api/cameras/"){
                        a.href = "product.html?category=cameras&id="+element._id;
                    } else if (elementList == "http://localhost:3000/api/teddies/"){
                        a.href = "product.html?category=teddies&id="+element._id;
                    } else if (elementList == "http://localhost:3000/api/furniture/"){
                        a.href = "product.html?category=furniture&id="+element._id;
                    }


                    divBody.appendChild(img);
                    divBody.appendChild(h3);
                    divBody.appendChild(p);
                    divBody.appendChild(span);
                    a.appendChild(divBody);
                    divContainer.appendChild(a);

                    const cardList = document.querySelector('#main .card-list')
                    cardList.appendChild(divContainer);
                });
            }
        };
        request.open("GET", elementList);
        request.send();
        
    });
}

//Si l'utilisateur choisi un filtre
function selectCategoryProduct(){
    let allFilterButton = document.querySelectorAll('.categoryProduct input[name="category"]');
    let arrayApiUrlCategorySelected = [];
    allFilterButton.forEach( element => {
        if(element.checked){
            arrayApiUrlCategorySelected.push("http://localhost:3000/api/"+element.id+"/")
        }
    })
    if (arrayApiUrlCategorySelected.length == 0) {
        arrayApiUrlCategorySelected = ["http://localhost:3000/api/cameras/", "http://localhost:3000/api/teddies/", "http://localhost:3000/api/furniture/"]
    }
    document.querySelectorAll('div.card').forEach(element => {
        element.remove()
    })
    console.log(arrayApiUrlCategorySelected)
    displayProduct(arrayApiUrlCategorySelected)
}


let allItemsUrl = ["http://localhost:3000/api/cameras/", "http://localhost:3000/api/teddies/", "http://localhost:3000/api/furniture/"];
displayProduct(allItemsUrl)