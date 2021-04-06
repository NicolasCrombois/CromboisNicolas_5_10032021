//fonction permettant d'afficher l'ensemble des produits
function displayProduct(listApi) {
    listApi.forEach(elementList => {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
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
                    
                    if (elementList == host + "api/cameras/") {
                        img.alt = "Photo de la caméra " + element.name;
                    } else if (elementList == host + "api/teddies/") {
                        img.alt = "Photo de la peluche " + element.name;
                    } else if (elementList == host + "api/furniture/") {
                        img.alt = "Photo d'un " + element.name;
                    }
                    img.src = element.imageUrl;
                    span.innerHTML = (element.price / 100).toFixed(2) + "€";
                    p.innerHTML = element.description;
                    h3.innerHTML = element.name;
                    if (elementList == host + "api/cameras/") {
                        a.href = "product.html?category=cameras&id=" + element._id;
                    } else if (elementList == host + "api/teddies/") {
                        a.href = "product.html?category=teddies&id=" + element._id;
                    } else if (elementList == host + "api/furniture/") {
                        a.href = "product.html?category=furniture&id=" + element._id;
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

//Si l'utilisateur choisi un filtre, on réalise les requêtes spécificiques
function selectCategoryProduct() {
    let allFilterButton = document.querySelectorAll('.categoryProduct input[name="category"]');
    let arrayApiUrlCategorySelected = [];
    allFilterButton.forEach(element => {
        if (element.checked) {
            arrayApiUrlCategorySelected.push(host + "api/" + element.id + "/")
        }
    })
    if (arrayApiUrlCategorySelected.length == 0) {
        arrayApiUrlCategorySelected = [host + "api/cameras/", host + "api/teddies/", host + "api/furniture/"]
    }
    document.querySelectorAll('div.card').forEach(element => {
        element.remove()
    })
    displayProduct(arrayApiUrlCategorySelected)
}

numberArticleBasket()
let allItemsUrl = [host + "api/cameras/", host + "api/teddies/", host + "api/furniture/"];
displayProduct(allItemsUrl)