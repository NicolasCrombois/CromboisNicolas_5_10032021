let basket = JSON.parse(localStorage.getItem('basket'));
const TotalPrice = document.getElementById('total-price');

function post(endpoint, body) {
    fetch(host+'api/' + endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
    .then(response => response.json())
    .then(data => displayOrder(data))
    .catch((error) => {
        console.error('Erreur:', error);
    });
}
//Permet de faire la requête post d'une commande et de récupérer la réponse de celle-ci
function postOrder(category, id_list, firstName, lastName, city, address, email) {
    post(category + '/order', {
        contact: {
            "firstName": firstName, 
            "lastName": lastName, 
            "address": address, 
            "city": city, 
            "email": email 
         }, 
      products: id_list
    })
}


//Permet de supprimer les éléments du panier affichés sur la page 
function clearViewBasket() {
    const basketElement = document.querySelectorAll('.product-globalProduct')
    basketElement.forEach(element => {
        element.remove()
    });
}//Permet d'afficher le message signalant à l'utilisateur que son panier est vide.
function basketEmpty() {
    document.querySelector('#total-price').remove()
    document.querySelector('#user-form').remove()
    var alert = document.createElement('p');
    alert.classList.add("alert");
    alert.classList.add('alert-warning');
    alert.classList.add('text-center');
    alert.innerHTML = "Votre panier est vide. <br> Pour passer au paiement d'un produit, ajoutez-le d'abord dans votre panier puis revenez sur cette page.";
    (document.querySelector(".card-list")).appendChild(alert)
}
function displayProduct(article, url, totalPriceFloat){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            var element = JSON.parse(this.responseText);
            totalPriceFloat += element.price * article.quantity;
            // Récupérer l'élément dans lequel les informations poussé
            const productDiv = document.querySelector('#main div.card-list');
            // Créer l'ensemble des éléments HTML nécessaire à la mise en page
            let h1 = document.createElement('h2');
            let img = document.createElement('img');
            let customSentence = document.createElement('p');
            let custom = document.createElement('span');
            let deleteButton = document.createElement('button');
            let containerPrice = document.createElement('p');
            let labelQuantity = document.createElement('label');
            let quantity = document.createElement('span');
            let price = document.createElement('span');
            let infoProduct = document.createElement('div');
            let divGlobalProduct = document.createElement('div');
            let textPrice = document.createElement('p');
            let totalPrice = document.createElement('span');
            
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
            deleteButton.onclick = function () { deleteProduct(basket, article.id, article.category, article.custom); };
            // Ajoût de la balise alt spécifique 
            if (element.category == "cameras") {
                img.alt = "Photo de la caméra " + element.name;
            } else if (element.category == "teddies") {
                img.alt = "Photo de la peluche " + element.name;
            } else if (element.category == "furniture") {
                img.alt = "Photo d'un " + element.name;
            }
            // Ajoût de la source de l'image
            img.src = element.imageUrl;
            // Ajoût des textes dans les éléments nécessaires
            h1.innerHTML = element.name;
            customSentence.innerHTML = "Personnalisation choisie :";
            custom.innerHTML = article.custom;
            deleteButton.innerHTML = "<i class=\"fas fa-times\"></i>";
            price.innerHTML = (element.price / 100) * article.quantity.toFixed(2) + "€";
            containerPrice.innerHTML = "Prix : ";
            labelQuantity.innerHTML = "Quantité désirée : ";
            quantity.innerHTML = article.quantity;
            textPrice.innerHTML = "Montant total : ";
            totalPrice.innerHTML = (totalPriceFloat / 100).toFixed(2) + "€";
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
            textPrice.appendChild(totalPrice);
            $('.textPrice').remove()
            TotalPrice.appendChild(textPrice);
        }
    }
    request.open("GET", url);
    request.send();
}
function viewProduct(basket, totalPriceFloat) {
    basket.forEach(article => {
        displayProduct(article, host + "api/" + article.category + "/" + article.id, totalPriceFloat)
    })
};

function displayOrder(data) {
    //Afin d'afficher correctement les commandes réalisés, il faut dans un premier temps enlever les éléments présents
    $('#user-form').remove();
    $('#total-price').remove();
    clearViewBasket();

    //On change le titre de la page "votre panier" => "votre commande"
    document.querySelector("h1").innerHTML = "Commande";

    //On crée les éléments nécessaires à l'affichage 
    var divOrder = document.createElement('div');
    var title = document.createElement('h3');
    var sentence = document.createElement('p');
    var ul = document.createElement('ul');


    divOrder.classList.add("unit-order");
    
    title.innerHTML = "Numéro de commande : " + data.orderId;
    sentence.innerHTML = 'Cette commande comprend l\'/les article(s) suivant(s):';
    divOrder.appendChild(title);
    divOrder.appendChild(sentence);
    data.products.forEach(element => {
        var li = document.createElement('li');
        li.innerHTML = element.name;
        ul.appendChild(li);

    });
    divOrder.appendChild(ul)
    divParent = document.getElementById('main');
    divParent.appendChild(divOrder)
    localStorage.removeItem('basket')
}

function deleteProduct(basket, id, category, custom) {
    //Pour supprimé un produit du panier, on coupe le tableau basket à l'index de ce produit
    clearViewBasket()
    for (let i = 0; i < basket.length; i++) {
        if (basket[i].id == id && basket[i].category == category && basket[i].custom == custom){
            basket.splice(i, 1);
            localStorage.setItem('basket', JSON.stringify(basket));
            document.querySelector('.nav-item#basket p').remove()
            numberArticleBasket()
        }
    }
    // Afin le panier possède au moins un article, on affiche la basket sinon on affiche un message disant que le panier est vide
    if (basket.length > 0) {
        viewProduct(basket, 0.00)
    } else {
        basketEmpty()
    }
}

async function valideContact() {
    const firstName = document.getElementById("firstName").value
    const lastName = document.getElementById("lastName").value
    const address = document.getElementById("address").value
    const city = document.getElementById("city").value
    const email = document.getElementById("email").value

    let id_list_camera = []
    let id_list_furniture = []
    let id_list_teddy = []
    //On vérifie ensuite que les champs du formulaire soient correctement remplis
    var formatEmail = /\S+@\S+\.\S+/;
    var formatName = /\S+/;
    if (firstName != undefined && formatName.test(firstName) && lastName != null && formatName.test(lastName) && address != null && typeof (address) == "string" && email != null && formatEmail.test(email) && city != null && typeof (city) == "string") {
        //On trie les produits du panier par catégorie via des tableaux
        //Car l'api réalise des commandes par catégories et non pas sur un panier 
        basket.forEach(element => {
            if (element.category == "cameras") {
                id_list_camera.push(element.id)
            } else if (element.category == "furniture") {
                id_list_furniture.push(element.id)
            } else if (element.category == "teddies") {
                id_list_teddy.push(element.id)
            }
        });
        //On réalise ensuite l'affichage des informations de la commande
        if (id_list_camera.length != 0 || id_list_teddy.length != 0 || id_list_furniture.length != 0) {
            var congratulationSentence = document.createElement('h2');
            var totalPriceSentence = document.createElement('p');

            congratulationSentence.classList.add("congratulationSentence");
            totalPriceSentence.classList.add("finalTotalPrice");
            congratulationSentence.innerHTML = "Félicitation " + firstName + " " + lastName + " votre commande a bien été effectué ! ";
            totalPriceSentence.innerHTML = "Le prix global de vos commandes est de : <b>" + document.querySelector('.totalPrice').innerHTML;
            document.getElementById('main').appendChild(congratulationSentence);
            document.getElementById('main').appendChild(totalPriceSentence);
        }
        if (id_list_camera.length != 0) {
            let order = postOrder("cameras", id_list_camera, firstName, lastName, city, address, email)
        } if (id_list_furniture.length != 0) {
            let order = postOrder("furniture", id_list_furniture, firstName, lastName, city, address, email)
        } if (id_list_teddy.length != 0) {
            let order = postOrder("teddies", id_list_teddy, firstName, lastName, city, address, email)
        }

    } else {
        if (document.querySelector('#user-form .alert')) {
            document.querySelector('#user-form .alert').remove()
        }
        var alert = document.createElement('p');
        alert.classList.add("alert");
        alert.classList.add('alert-danger');
        alert.classList.add('text-center');
        alert.innerHTML = "Certains champs ne sont pas remplis correctement.";
        (document.querySelector("#user-form button")).before(alert)
    }
    numberArticleBasket()
}

numberArticleBasket()
if (basket == null || basket.length == 0) {
    basketEmpty()
} else {
    viewProduct(basket, 0.00)
}