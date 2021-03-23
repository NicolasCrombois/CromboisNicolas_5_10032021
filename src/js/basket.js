let basket = JSON.parse(localStorage.getItem('basket'));
let index = 0;
let totalPriceFloat = 0.00;
const TotalPrice = document.getElementById('total-price');

function viewProduct(basket){
    basket.forEach(article => {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                var element = JSON.parse(this.responseText);
                totalPriceFloat += element.price;
                // Récupérer l'élément dans lequel les informations poussé
                const productDiv = document.querySelector('#main div.card-list');

                // Créer l'ensemble des éléments HTML nécessaire à la mise en page
                var h1 = document.createElement('h2');
                var img = document.createElement('img');
                var customSentence = document.createElement('p');
                var custom = document.createElement('span');
                var deleteButton = document.createElement('button');
                var containerPrice = document.createElement('p');
                var labelQuantity = document.createElement('label');
                var quantity = document.createElement('span');
                var price = document.createElement('span');
                var infoProduct = document.createElement('div');
                var divGlobalProduct = document.createElement('div');
                var textPrice = document.createElement('p');
                var totalPrice = document.createElement('span');
                
                // Ajoût des classes à ces éléments
                h1.classList.add("product-name");
                img.classList.add("product-img");
                customSentence.classList.add("customText");
                deleteButton.classList.add("btn");
                deleteButton.classList.add("delete-product");
                containerPrice.classList.add("product-ContainerPrice");
                labelQuantity.classList.add("customText");
                quantity.classList.add("product-quantity");
                price.classList.add("product-price");
                infoProduct.classList.add("product-information");
                divGlobalProduct.classList.add("product-globalProduct");
                textPrice.classList.add("textPrice");
                totalPrice.classList.add("totalPrice");

                //Ajout de la fonction à executer  sur le bouton de suppression
                let articleindex = index
                deleteButton.onclick = function(){ deleteProduct(articleindex); };
                
                // Ajoût de la balise alt spécifique 
                if (element.category == "cameras"){
                    img.alt = "Photo de la caméra "+element.name;
                } else if (element.category == "teddies"){
                    img.alt = "Photo de la peluche "+element.name;
                } else if (element.category == "furniture"){
                    img.alt = "Photo d'un "+element.name;
                }
                // Ajoût de la source de l'image
                img.src = element.imageUrl;

                // Ajoût des textes dans les éléments nécessaires
                h1.innerHTML = element.name;
                customSentence.innerHTML = "Personnalisation choisie :";
                custom.innerHTML = article.custom;
                deleteButton.innerHTML = "<i class=\"fas fa-times\"></i>";
                price.innerHTML = (element.price/100)*article.quantity.toFixed(2)+"€";
                containerPrice.innerHTML = "Prix : ";
                labelQuantity.innerHTML = "Quantité désirée : ";
                quantity.innerHTML = article.quantity;
                textPrice.innerHTML = "Montant total : ";
                
                totalPrice.innerHTML = (totalPriceFloat/100).toFixed(2)+"€";


                // Ajoût d'une écoute sur le bouton "ajouter au panier" afin d'exécuter la fonction d'ajouter au basket 
                //deleteButton.addEventListener("click", addBasket, false);

                // Ensemble des éléments sont enfin ajoutés dans l'élément parent
                divGlobalProduct.appendChild(h1);
                divGlobalProduct.appendChild(img);
                infoProduct.appendChild(customSentence);
                infoProduct.appendChild(custom);
                infoProduct.appendChild(labelQuantity);
                infoProduct.appendChild(quantity);
                infoProduct.appendChild(containerPrice);
                infoProduct.appendChild(price);
                divGlobalProduct.appendChild(infoProduct)
                divGlobalProduct.appendChild(deleteButton);
                productDiv.appendChild(divGlobalProduct);
                console.log(TotalPrice)
                textPrice.appendChild(totalPrice);
                $('.textPrice').remove()
                TotalPrice.appendChild(textPrice);

        }}
        request.open("GET", "http://localhost:3000/api/"+article.category+"/"+article.id);
        request.send();

        index ++;
    });
}

function deleteProduct(index){
    console.log("Hello"+index)
}

viewProduct(basket)