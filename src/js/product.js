/*sessionStorage.removeItem('basket')*/
for (let i=0;i< sessionStorage.length ; i++){
    const key = sessionStorage.key(1);
    console.log(`${key} => ${sessionStorage.getItem(key)}`)
}
// Fonction permettant de mettre à jour le prix de la page product.html en fonction de la quantité sélectionné
function calculatePrice(){
    let quantity = document.querySelector('.product-input-quantity').value;
    //var price = JSON.parse(sessionStorage.getItem('element')).price;
    // Faire un call a l'api plutot que de stocker dans sessionStorage
    if (typeof(parseInt(quantity)) == "number" && parseInt(quantity)>0){
        document.querySelector("span.product-price").innerHTML = ((price)*parseInt(quantity)/100).toFixed(2)+"€";
    } else {
        document.querySelector("span.product-price").innerHTML = ((price)*1/100).toFixed(2)+"€";
    }
}

function addBasket(){
    const specificity = $("input[type='radio'][name='color']:checked").prop("id")
    if (specificity != undefined){
        let quantity = document.querySelector('.product-input-quantity').value;
        if (typeof(parseInt(quantity)) != "number" || quantity == "" || parseInt(quantity)<1 ) {
            quantity = "1"
        }
        if(sessionStorage.getItem('basket') == null){
            var basket = [];
            var product = {"id": JSON.parse(sessionStorage.getItem('element'))._id, "custom": specificity, "quantity": quantity};
            basket.push(product);
            sessionStorage.setItem('basket', JSON.stringify(basket));
        } else {
            var product = {"id": JSON.parse(sessionStorage.getItem('element'))._id, "custom": specificity, "quantity": quantity};
            var basket = JSON.parse(sessionStorage.getItem('basket'));
            console.log($("input[type='radio'][name='color']:checked").prop("id"));
            basket.push(product);
            sessionStorage.setItem('basket', JSON.stringify(basket));
        }
        /* Ajouter un message d'ajout */
    }else{
        sessionStorage.setItem('flash', JSON.stringify({'error': "Aucunes personnalisation n'a été sélectionné"}));
        /* Ajouter un message d'erreur */
    }
}

// Récuperer les paramètres présents dans l'URL
const queryString = window.location.search;
const urlParameters = new URLSearchParams(queryString);
const category = urlParameters.get('category');
const id = urlParameters.get('id');

// Créer un tableau regroupant les adresses API (les adresses qui récupérent l'ensemble des tableaux des produits de la catégorie)
let allItemsUrl = {"cameras": "http://localhost:3000/api/cameras/", "teddies": "http://localhost:3000/api/teddies/", "furniture" : "http://localhost:3000/api/furniture/"};
let customByCategory = {"cameras" : "lenses", "teddies" : "colors", "furniture" : "varnish"};

// Requête XML de récupérer toutes les données relatives au produit sélectionné
var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var element = JSON.parse(this.responseText);
        sessionStorage.setItem('element', JSON.stringify(element));
        // Récupérer l'élément dans lequel les informations poussé
        const productDiv = document.getElementById('product');

        // Créer l'ensemble des éléments HTML nécessaire à la mise en page
        var h1 = document.createElement('h1');
        var img = document.createElement('img');
        var divImage = document.createElement('div');
        var productGlobalForm = document.createElement('div');
        var customSentence = document.createElement('p');
        var button = document.createElement('button');
        var button = document.createElement('button');
        var containerPrice = document.createElement('p');
        var labelQuantity = document.createElement('label');
        var inputQuantity = document.createElement('input');
        var span = document.createElement('span');
        var divGlobalCustom = document.createElement('div');
        
        // Ajoût des classes à ces éléments
        h1.classList.add("product-name");
        h1.classList.add("text-center");
        img.classList.add("product-img");
        divImage.classList.add("product-divImage");
        productGlobalForm.classList.add("productGlobalForm");
        customSentence.classList.add("customText");
        button.classList.add("btn");
        button.classList.add("btn-primary");
        containerPrice.classList.add("product-ContainerPrice");
        labelQuantity.classList.add("customText");
        inputQuantity.classList.add("product-input-quantity");
        span.classList.add("product-price");
        divGlobalCustom.classList.add("product-globalCustom");

        // Ajoût de la balise alt spécifique 
        if (category == "cameras"){
            img.alt = "Photo de la caméra "+element.name;
        } else if (category == "teddies"){
            img.alt = "Photo de la peluche "+element.name;
        } else if (category == "furniture"){
            img.alt = "Photo d'un "+element.name;
        }
        // Ajoût de la source de l'image
        img.src = element.imageUrl;

        // Ajoût des textes dans les éléments nécessaires
        h1.innerHTML = element.name;
        customSentence.innerHTML = "Choississez la personnalisation qui vous convient :";
        button.innerHTML = "Ajouter au panier";
        span.innerHTML = (element.price/100).toFixed(2)+"€";
        containerPrice.innerHTML = "Prix : ";
        labelQuantity.innerHTML = "Quantité désirée :";

        // Ajoût des paramètres et du texte nécessaire sur l'élément input et label
        labelQuantity.htmlFor = "quantity";
        inputQuantity.type = "number";
        inputQuantity.name = "quantity"
        inputQuantity.min = 1;
        inputQuantity.max = 99;

        // Ajoût d'une écoute sur la quantité entrée afin de modifier le prix en fonction 
        inputQuantity.addEventListener("keyup", calculatePrice, false);
        inputQuantity.addEventListener("mouseup", calculatePrice, false);

        // Ajoût d'une écoute sur le bouton "ajouter au panier" afin d'exécuter la fonction d'ajouter au basket 
        button.addEventListener("click", addBasket, false);

        // Ensemble des éléments sont enfin ajoutés dans l'élément parent
        productDiv.appendChild(h1);
        divImage.appendChild(img);
        productDiv.appendChild(divImage);
        divGlobalCustom.appendChild(customSentence);
        // Les options de personnalisation doivent être formaté/ajouté au compte-gouttes
        element[customByCategory[category]].forEach(customElement => {
            // Créer les balises input et label et de la balise parent (div); Attribution des classes
            var divForm = document.createElement('div');
            var input = document.createElement('input');
            var label = document.createElement('label');
            divForm.classList.add("product-form");
            divForm.classList.add("form-check");
            input.classList.add("form-check-input");
            label.classList.add("form-check-label");
            // Ajoût des paramètres sur l'élément input
            input.type = "radio";
            input.name = "color";
            // Ajoût des paramètres et du texte nécessaire sur les éléments input et label
            input.id = customElement;
            label.htmlFor = customElement;
            label.innerHTML = customElement;
            // Ajoût des input et label dans la div parent
            divForm.appendChild(input);
            divForm.appendChild(label);
            // Ajout des div contenant les label et input dans une div contenant l'ensemble des options
            productGlobalForm.appendChild(divForm);
        });
        divGlobalCustom.appendChild(productGlobalForm);
        divGlobalCustom.appendChild(labelQuantity);
        divGlobalCustom.appendChild(inputQuantity);
        productDiv.appendChild(divGlobalCustom);
        containerPrice.appendChild(span);
        productDiv.appendChild(containerPrice);
        productDiv.appendChild(button);

}}
request.open("GET", allItemsUrl[category]+id);
request.send();