function fetchCategories () {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => loadButtons(data.categories)
    )
};
const loadButtons = (categories) => {
    const btnContainer = document.getElementById('btn-container');
    console.log(btnContainer);
    
    for (let cat of categories) {
        console.log(cat);
        
        const div = document.createElement('div');
        div.innerHTML= `
        <button class="btn btn-lg ">${cat.category}</button>
        `
        btnContainer.appendChild(div);
    }
    
}
const fetchAllVideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(res => res.json())
    .then(data => loadVideos(data.videos))
}

const loadVideos = (videos) => {
    const videoContainer = document.getElementById('video-container');
    videos.forEach(video => {
        const div = document.createElement('div');
        div.innerHTML =`
                    <div class="card bg-base-100 space-y-4 rounded-lg">
                <figure>
                  <img
                    src="${video.thumbnail}"
                    alt="Shoes" />
                </figure>
                <div class="flex gap-3">
                    <div class="avatar">
                        <div class="w-12 h-12 rounded-full">
                          <img src="https://i.ibb.co/D9wWRM6/olivia.jpg" />
                        </div>
                    </div>
                    <div class="">
                        <h2 class="card-title text-xl">Shape of You</h2>
                        <div>
                            <p class="text-gray-500 text-lg">Awlad Hossain</p>
                            <p class="text-gray-500 text-base">2.1 views</p>
                        </div>
                    </div>
                
                </div>
              </div>
        `
    });
}
fetchAllVideos();
fetchCategories();
loadButtons();
loadVideos();
