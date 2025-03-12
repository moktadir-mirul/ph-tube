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
fetchCategories();
loadButtons();
