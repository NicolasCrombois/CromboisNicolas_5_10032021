function numberArticleBasket() {
    const listArticle = JSON.parse(localStorage.getItem('basket'));
    if (listArticle != null) {
        const numberArticle = listArticle.length;
        if (numberArticle != 0) {
            var articles = document.createElement('p');
            articles.innerHTML = numberArticle + " article(s)";
            document.querySelector(".nav-item#basket a").appendChild(articles)
        }
    } else {
        document.querySelector(".nav-item p") && document.querySelector(".nav-item p").remove();
    }
}