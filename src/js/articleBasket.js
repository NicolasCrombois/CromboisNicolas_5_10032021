function numberArticleBasket() {
    const listArticle = JSON.parse(localStorage.getItem('basket'));
    if ( $('.numberArticle') != undefined){
        $('.numberArticle').remove()
    }
    if (listArticle != null && listArticle.length != 0) {
        var articles = document.createElement('p');
        articles.classList.add("numberArticle");
        articles.innerHTML = listArticle.length + " article(s)";
        document.querySelector(".nav-item#basket a").appendChild(articles)
    } else {
        document.querySelector(".nav-item p") && document.querySelector(".nav-item p").remove();
    }
}