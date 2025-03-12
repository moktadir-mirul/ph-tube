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
    videoContainer.innerHTML = '';
    videos.forEach(video => {
        const div = document.createElement('div');
        div.innerHTML =`
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
                                <img class="w-6" src="https://img.icons8.com/color/48/verified-badge.png" alt="verified-badge"/>
                            </div>
                            <p class="text-gray-500 text-xs">${video.others.views} views</p>
                        </div>
                    </div>
                </div>
            </div>
        `
        videoContainer.append(div);
    });
}
fetchAllVideos();
fetchCategories();

