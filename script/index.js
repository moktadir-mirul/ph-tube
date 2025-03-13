function showLoader() {
    document.getElementById('loader').classList.remove('hidden');
    document.getElementById('video-container').classList.add('hidden');
}

function hideLoader() {
    document.getElementById('loader').classList.add('hidden');
    document.getElementById('video-container').classList.remove('hidden');
}

const removeActive = () => {
  const btns = document.getElementsByClassName("active");
  for (let btn of btns) {
    btn.classList.remove("active");
  }
};

function fetchCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => loadButtons(data.categories));
}

const loadButtons = (categories) => {
  const btnContainer = document.getElementById("btn-container");

  for (let cat of categories) {
    const div = document.createElement("div");
    div.innerHTML = `
        <button id="${cat.category_id}" class="btn btn-lg hover:bg-[#FF1F3D] hover:text-white duration-200" onClick="loadVideobyCategories('${cat.category_id}')">${cat.category}</button>
        `;
    btnContainer.appendChild(div);
  }
};

function loadVideobyCategories(id) {
  removeActive();
  showLoader();
  const activeBtn = document.getElementById(`${id}`);
  activeBtn.classList.add("active");
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => loadVideos(data.category));
}

const fetchAllVideos = (searchInput = '') => {
  removeActive();
  showLoader();
  const allBtn = document.getElementById("allBtn");
  allBtn.classList.add("active");
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchInput}`)
    .then((res) => res.json())
    .then((data) => loadVideos(data.videos));
};

function loadVideoDetails(VideoID) {
  console.log(VideoID);

  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${VideoID}`;
  console.log(url);

  fetch(url)
    .then((res) => res.json())
    .then((data) => showVideoDetails(data));
}

function showVideoDetails(videoData) {
  console.log(videoData);

  const div = document.getElementById("video_info");
  document.getElementById("videoDetails").showModal();
  div.innerHTML = `
        <div class="card bg-base-100 image-full w-full shadow-sm inter">
            <figure>
                <img
                src="${videoData.video.thumbnail}"
                alt="Shoes" />
            </figure>
            <div class="card-body">
                <h2 class="card-title text-2xl font-bold">${videoData.video.title}</h2>
                <div class="flex gap-2 items-center">
                    <img class="w-12 h-12 rounded-full" src="${videoData.video.authors[0].profile_picture}" />
                    <h2 class="font-semibold text-xl">${videoData.video.authors[0].profile_name}</h2>
                    
                </div>
                <p>${videoData.video.description}</p>
                <div class="card-actions justify-end">
                </div>
            </div>
        </div>

    `;
}

const loadVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");

  videoContainer.innerHTML = "";

  if (videos.length <= 0) {
    videoContainer.innerHTML = `
        <div class="col-span-full mx-auto py-10 text-center space-y-4">
                <img class="w-[160px] mx-auto" src="images/Icon.png" alt="">
                <h1 class="font-bold text-2xl">
                    Oops!! Sorry, There is no content here.
                </h1>
            </div>
        `;
        hideLoader();
    return;
  }
  videos.forEach((video) => {
    const div = document.createElement("div");
    div.innerHTML = `
            <div class="card bg-base-100 space-y-4 rounded-lg">
                <div class="rounded-lg relative">
                    <figure class="rounded-lg relative ">
                        <img class="w-full h-[150px] object-cover"
                          src="${video.thumbnail}"
                          alt="Shoes" />
                          <p class="px-2 rounded-sm text-white bg-black text-xs absolute bottom-2 right-4">3hrs 56 min ago</p>
                      </figure>
                      
                </div>
                <div class="flex gap-3">
                    <div class="avatar">
                        <div class="w-12 h-12 rounded-full">
                          <img src="${video.authors[0].profile_picture}" />
                        </div>
                    </div>
                    <div class="space-y-2">
                        <h2 class="card-title text-lg">${video.title}</h2>
                        <div class="space-y-2">
                            <div class="flex gap-2">
                                <p class="text-gray-500 text-sm">${video.authors[0].profile_name}</p>
                                ${video.authors[0].verified ? '<img class="w-6" src="https://img.icons8.com/color/48/verified-badge.png" alt="verified-badge"/>' : ''}
                            </div>
                            <p class="text-gray-500 text-xs">${video.others.views} views</p>
                        </div>
                    </div>
                </div>
                <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-block">Show Details</button>
            </div>
        `;
    videoContainer.append(div);
  });
  hideLoader();
};

document.getElementById('search').addEventListener('keyup', (e) => {
    const searchName = e.target.value;
    fetchAllVideos(searchName)
})
fetchCategories();
