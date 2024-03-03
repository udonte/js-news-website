const cards = document.querySelector(".cards");
const category = document.querySelector(".category");
const categorySpan = document.querySelectorAll(".category span");

// full endpoints
// const newsA = `https://newsapi.org/v2/top-headlines?country=us&apiKey=eb684edff1e5425ab339b6c9e4ccb8e0`;
// const newsB = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=eb684edff1e5425ab339b6c9e4ccb8e0`;
// const newsC = `https://newsapi.org/v2/everything?q=crypto&sortBy=publishedAt&apiKey=eb684edff1e5425ab339b6c9e4ccb8e0`;
// const newsD = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=eb684edff1e5425ab339b6c9e4ccb8e0`;

const apiKey = `&apiKey=eb684edff1e5425ab339b6c9e4ccb8e0`;
const baseUrl = `https://newsapi.org/v2`;
const backupImage = `https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`;

async function dataRequest(url) {
  try {
    const response = await fetch(baseUrl + url + apiKey);
    return await response.json();
    const data = response.json;
  } catch (error) {
    console.log(error);
  }
}
function URLRequest(url) {
  dataRequest(url).then((data) => {
    data.articles.forEach((news) => {
      cards.innerHTML += `
                            <div class="card">
                              <div class="image">
                                <img src="${news.urlToImage || backupImage}" />
                              </div>
                              <div class="information">
                              <div>
                                <p class="title">${news.title}</p>
                                <p class="description">${news.description}</p>
                                <p class="time">
                                  <span>${
                                    news.publishedAt
                                      .replace("Z", "")
                                      .split("T")[0]
                                  }</span>
                                  <span>${
                                    news.publishedAt
                                      .replace("Z", "")
                                      .split("T")[1]
                                  }</span>
                                </p>
                              </div>
                              <div class="other">
                                <span class="source">${news.source.name}</span>
                                <a href="${
                                  news.url
                                } class="url" target="_blank">Read Article <i class="bi bi-arrow-right"></i></a>
                              </div>
                            </div>
                        </div>
                        `;
    });
  });
}

category.addEventListener("click", (e) => {
  if (e.target.tagName === "SPAN") {
    cards.innerHTML = "";
    URLRequest(e.target.dataset.url);
    categorySpan.forEach((span) => span.classList.remove("active"));
    e.target.classList.add("active");
  }
});

URLRequest("/top-headlines?country=us");
