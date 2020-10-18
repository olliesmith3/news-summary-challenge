$.getJSON(`https://content.guardianapis.com/search?api-key=${GUARDIAN_API_KEY}`, function(data) {
  var stories = data.response.results;

  console.log(data)

  displayArticles();

  function addClickListener(elementId, clickFunction) {
      let button = document.getElementById(elementId);
      button.addEventListener("click", function(clickEvent) {
        clickFunction(clickEvent);
      });
    } 

  function displayArticles() {
    let articleList = document.getElementById("articles");
    let html = ""
    for (let i = 0; i < stories.length; i++) {
      let article = stories[i];
      html += formatArticle(article, i);
    }
    articleList.innerHTML = '<div id="article-list">' + html + "</div>";
    goToFullArticleOnClick();
  };

  function formatArticle(article, index) {
    return `<div id='article-${index}'>` + article.webTitle + '<br>' + generateLinkButton(index) + "<br><br></div>";
  };

  function generateLinkButton(index) {
    return `<button type='button' class="full-article" id='full-article-${index}'>Go to full article</button>`;
  }

  function goToFullArticleOnClick() {
    for (let i = 0; i < stories.length; i++) {
      addClickListener(`article-${i}`, function() {
        window.open(stories[i].webUrl)
      });
    };
  }

})

