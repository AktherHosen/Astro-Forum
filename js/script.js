// handle search button
const handleSearch = () => {
  const searchField = document.getElementById("search-box");
  const searchValue = searchField.value;
  console.log(searchValue);
  loadAllPostByCategory(searchValue);
};
// load data using search
const loadAllPostByCategory = async (category_name) => {
  const spinnerContainer = document.getElementById("loader-container");
  spinnerContainer.classList.remove("hidden");
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts?category=${category_name}`
  );
  const data = await res.json();
  // console.log(data.posts);
  const allposts = data.posts;
  const postsCardsContainer = document.getElementById("posts-cards-container");
  postsCardsContainer.innerHTML = " ";
  setTimeout(() => {
    spinnerContainer.classList.add("hidden");
    allposts.forEach((element) => {
      console.log(element);
      const div = document.createElement("div");
      div.classList = `w-full gap-3 p-4`;
      div.innerHTML = `
                        <div class="flex flex-col md:flex-row gap-6 mt-5  bg-[#f2f2ff] px-8 py-6 rounded-3xl space-y-3">
                            <div class="justify-center  md:justify-start avatar indicator">
                                <span class="indicator-item badge ${
                                  element.isActive
                                    ? "badge-success"
                                    : "badge-error"
                                }"></span>
                                <div class="w-16 h-16 rounded-lg">
                                    <img alt="Tailwind CSS examples"
                                        src="${element.image}" />
                                </div>
                            </div>
                            <div class="space-y-2 w-full">
                                <div class="flex gap-3">
                                    <h1># ${element.category}</h1>
                                    <p>Author : ${element.author.name}</p>
                                </div>
                                <h1 class="font-bold">${element.title}</h1>
                                <p class="text-gray-500">${
                                  element.description
                                }</p>
                                <hr>
                                <div class="flex justify-between my-3">
                                    <div class="flex gap-4">
                                        <span><i class="fa-regular fa-message"></i> ${
                                          element.comment_count
                                        }</span>
                                        <span><i class="fa-regular fa-eye"></i> ${
                                          element.view_count
                                        }</span>
                                        <span><i class="fa-regular fa-clock"></i> ${
                                          element.posted_time
                                        } min</span>
                                    </div>
                                    <div class="flex-end">
                                    <span onclick="handleCart('${
                                      element?.title
                                    }','${
        element?.view_count
      }')" class="bg-green-600 text-white rounded-3xl px-1"><i
                                            class="fa-regular fa-envelope text-md"></i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
      `;
      postsCardsContainer.appendChild(div);
    });
  }, 2000);
};
loadAllPostByCategory();

// load all post
const loadAllPost = async () => {
  const spinnerContainer = document.getElementById("loader-container");
  spinnerContainer.classList.remove("hidden");
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts`
  );
  const data = await res.json();
  // console.log(data.posts);
  const allposts = data.posts;
  const postsCardsContainer = document.getElementById("posts-cards-container");
  postsCardsContainer.innerHTML = " ";
  setTimeout(() => {
    spinnerContainer.classList.add("hidden");
    allposts.forEach((element) => {
      console.log(element);
      const div = document.createElement("div");
      div.classList = `w-full gap-3`;
      div.innerHTML = `
                        <div class="flex flex-col md:flex-row gap-6 mt-5  bg-[#f2f2ff] px-8 py-6 rounded-3xl">
                            <div class="justify-center  md:justify-start avatar indicator">
                                <span class="indicator-item badge ${
                                  element.isActive
                                    ? "badge-success"
                                    : "badge-error"
                                }"></span>
                                <div class="w-16 h-16 rounded-lg">
                                    <img alt="Tailwind CSS examples"
                                        src="${element.image}" />
                                </div>
                            </div>
                            <div class="space-y-2 w-full">
                                <div class="flex gap-3">
                                    <h1># ${element.category}</h1>
                                    <p>Author : ${element.author.name}</p>
                                </div>
                                <h1 class="font-bold">${element.title}</h1>
                                <p class="text-gray-500">${
                                  element.description
                                }</p>
                                <hr>
                                <div class="flex justify-between my-3">
                                    <div class="flex gap-4">
                                        <span><i class="fa-regular fa-message"></i> ${
                                          element.comment_count
                                        }</span>
                                        <span><i class="fa-regular fa-eye"></i> ${
                                          element.view_count
                                        }</span>
                                        <span><i class="fa-regular fa-clock"></i> ${
                                          element.posted_time
                                        } min</span>
                                    </div>
                                    <div class="flex-end">
                                    <span onclick="handleCart('${
                                      element?.title
                                    }','${
        element?.view_count
      }')" class="bg-green-600 text-white rounded-3xl px-1"><i
                                            class="fa-regular fa-envelope text-md"></i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
      `;
      postsCardsContainer.appendChild(div);
    });
  }, 2000);
};
loadAllPost();

// add to read cart
const handleCart = (title, view_count) => {
  const miniCardContainer = document.getElementById("mini-card-container");
  const div = document.createElement("div");
  div.classList = `mt-3 flex justify-between bg-white p-4 rounded-3xl`;
  div.innerHTML = `
                        <div class="mt-2 flex justify-between gap-x-3 bg-white p-1 rounded-3xl">
                            <h1 class=" font-bold">${title}</h1>
                            <span class="flex items-center gap-2"><i class="fa-regular fa-eye"></i> ${view_count}</span>
                        </div>
  `;
  miniCardContainer.appendChild(div);
  updateCardCount();
};

// updating the count of card in read cart
const updateCardCount = () => {
  const miniCardContainer = document.getElementById("mini-card-container");
  const cardCount = miniCardContainer.children.length;
  const cardCountElement = document.getElementById("card-count");
  cardCountElement.innerHTML = `<span class="text-green-600">✓✓</span> Mark as read(${cardCount})`;
};

// load latest post
const loadLatestPost = async () => {
  const spinnerContainer = document.getElementById("spinner-container");
  spinnerContainer.classList.remove("hidden");

  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
  );
  const data = await res.json();
  // console.log(data);

  const latestPostContainer = document.getElementById("latest-posts-container");

  setTimeout(() => {
    spinnerContainer.classList.add("hidden");

    data.forEach((element) => {
      const div = document.createElement("div");
      div.classList = `card w-full h-[550px] bg-base-100 border-2 rounded-3xl`;
      div.innerHTML = `
        <div class="p-2">
          <img src="${
            element.cover_image
          }" class="h-[300px] rounded-3xl" alt="Shoes" />
        </div>
        <div class="card-body px-4 py-1">
          <h1><i class="fa-regular fa-calendar-minus"></i> ${
            element?.author?.posted_date
              ? element.author.posted_date
              : "No publish date"
          }</h1>
          <h1 class="text-lg font-bold">${element?.title}</h1>
          <p class="text-gray-500">${element?.description}</p>
          <div class="card-actions flex gap-5 items-center">
            <div class="avatar">
              <div class="w-16 rounded-full">
                <img src="${element?.profile_image}" />
              </div>
            </div>
            <div>
              <h1 class="font-bold">${element?.author?.name}</h1>
              <p class="text-gray-500">${
                element?.author?.designation
                  ? element.author.designation
                  : "Unknown"
              }</p>
            </div>
          </div>
        </div>
      `;
      latestPostContainer.appendChild(div);
    });
  }, 2000);
};

loadLatestPost();
