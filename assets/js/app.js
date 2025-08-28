console.log("Js Loaded..!");

AOS.init({ duration: 800 });
function callApi(mealName) {
    return fetch(`https://www.themealdb.com/api/json/v1/1/${mealName}`)
        .then(response => response.json());

}
let searchMeal = document.getElementById("searchInput");
searchMeal.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        searchMealName();
    }
});

let searchMealCat = document.getElementById("ingredientInput");
searchMealCat.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        searchByIngredient();

    }
});
async function randomFunction() {
    const container = document.getElementById("randomScroll");
    container.innerHTML = "";

    for (let i = 0; i < 10; i++) {
        const data = await callApi("random.php");
        const meal = data.meals[0];


        const card = document.createElement("div");
        card.className = "card shadow-sm";
        card.style.width = "200px";
        card.className = "card shadow-sm flex-shrink-0";
        card.style.width = "200px";
        card.setAttribute("data-aos", "flip-right");
        card.setAttribute("data-aos-delay", `${i * 100}`);
        card.setAttribute("data-aos-duration", "800");

        card.innerHTML = `
                <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                <div class="card-body">
                    <h6 class="card-title">${meal.strMeal}</h6>
                    <p class="card-text"><small>${meal.strArea} • ${meal.strCategory}</small></p>
                </div>
            `;

        container.appendChild(card);


    }
    AOS.refresh();
}

randomFunction();

async function mainFunction(mealName) {
    const data = await callApi(mealName);
    const meal = data.meals[0];
    const container = document.getElementById("mainContainer");

    container.setAttribute("data-aos", "fade-down");
    container.setAttribute("data-aos-duration", "800");
    container.className = "hero d-flex align-items-center";
    container.style.height = "500px";
    container.style.padding = "20px";
    container.style.background = "transparent";
    container.innerHTML = "";


    const card = document.createElement("div");
    card.className = "card shadow-sm d-flex flex-row";
    card.style.width = "800px";
    card.style.height = "400px";
    card.style.background = "rgba(255,255,255,0.09)";
    card.style.backdropFilter = "blur(1px)";
    card.style.border = "none";
    card.style.overflow = "hidden";
    card.setAttribute("data-aos", "fade-down");
    card.setAttribute("data-aos-duration", "800");


    const imgDiv = document.createElement("div");
    imgDiv.style.flex = "0 0 400px";
    imgDiv.style.height = "100%";
    imgDiv.style.paddingTop = "30px";
    const img = document.createElement("img");
    img.src = meal.strMealThumb;
    img.alt = meal.strMeal;
    img.style.width = "90%";
    img.style.height = "90%";

    img.style.borderRadius = "20px 20px 20px 20px";

    img.style.objectFit = "cover";
    imgDiv.appendChild(img);


    const contentDiv = document.createElement("div");
    contentDiv.className = "card-body d-flex flex-column justify-content-center";
    contentDiv.style.flex = "1";
    contentDiv.style.background = "white";
    contentDiv.style.boxShadow = "0 0 10px rgba(0,0,0,0.1)";
    contentDiv.innerHTML = `
    <h2 class="card-title fw-bold mb-3">${meal.strMeal}</h2>
    <h4 class="text-muted mb-2">Area: ${meal.strArea}</h4>
    <h4 class="text-muted mb-3">Category: ${meal.strCategory}</h4>
    <p class="card-text"><small>${meal.strInstructions ? meal.strInstructions.substring(0, 200) + "..." : "No description available."}</small></p>
    <a href="${meal.strYoutube}" target="_blank" class="btn btn-danger mt-3">
        Watch on YouTube
    </a>
`;


    card.appendChild(imgDiv);
    card.appendChild(contentDiv);

    container.appendChild(card);

    AOS.refresh();
}

function searchMealName() {
    let meal = document.getElementById("searchInput").value.trim();
    const container = document.getElementById("mainContainer");

    if (!meal) {
        container.innerHTML = "";
        container.classList.add("d-none");
        return;
    } else {
        container.classList.remove("d-none");
        mainFunction("search.php?s=" + meal);
    }
}

function searchByIngredient() {
    let meal = document.getElementById("ingredientInput").value.trim();
    const container = document.getElementById("mainContainer");

    if (!meal) {
        container.innerHTML = "";
        container.classList.add("d-none");
        return;
    } else {
        container.classList.remove("d-none");
        mainFunction("filter.php?i=" + meal);
    }
}

function searchRandom() {
    mainFunction("random.php");
}

async function browseCategories() {
    let data = await callApi("list.php?c=list");
    let catDropDown = document.getElementById("categoriesSelect");
    let defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.innerText = "Select a category";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    catDropDown.appendChild(defaultOption);
    for (let i = 0; i < data.meals.length; i++) {

        let optionCard = document.createElement("option");
        catDropDown.style.background = "rgba(6, 7, 63, 0.63)";
        optionCard.style.background = "rgba(6, 7, 63, 0.63)";
        optionCard.value = `${data.meals[i].strCategory}`;
        optionCard.innerText = `${data.meals[i].strCategory}`;

        catDropDown.appendChild(optionCard);

    }

}
browseCategories();

async function browseArea() {
    let data = await callApi("list.php?a=list");
    // console.log(data);

    let areaDropDown = document.getElementById("areasSelect");
    let defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.innerText = "Select Area";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    areaDropDown.appendChild(defaultOption);
    for (let i = 0; i < data.meals.length; i++) {

        let optionCard = document.createElement("option");
        areaDropDown.style.background = "rgba(6, 7, 63, 0.63)";
        optionCard.style.background = "rgba(6, 7, 63, 0.63)";
        optionCard.value = `${data.meals[i].strArea}`;
        optionCard.innerText = `${data.meals[i].strArea}`;

        areaDropDown.appendChild(optionCard);

    }

}
browseArea();

async function dropDownFunction(mealLink) {
    const data= await callApi(mealLink);
    console.log(data);
    
    let gridView=document.getElementById("mealsGrid");
    gridView.innerHTML="";

    if (!data.meals || !data) {
        gridView.innerHTML = "<p class='text-center'> No meals found. </p>";
        return;
    }
    data.meals.forEach(meal => {
        let col = document.createElement("div");
        col.className = "col"; 

        col.innerHTML = `
            <div class="card shadow-sm h-100"  data-aos="zoom-in">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    
                </div>
            </div>
        `;
        gridView.appendChild(col);
    });   

    AOS.refresh();
}



document.getElementById("categoriesSelect").addEventListener("change",function(){
    let selectedOption = this.value;
    dropDownFunction("filter.php?c="+selectedOption);
    
});
document.getElementById("areasSelect").addEventListener("change",function(){
    let selectedOption = this.value;
    dropDownFunction("filter.php?a="+selectedOption);
    
});
