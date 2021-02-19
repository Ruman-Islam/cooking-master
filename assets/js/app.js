const searchBtn = document.querySelector('.search');
const foodInput = document.querySelector('.food-input');

//* Search Button Event Handler
searchBtn.addEventListener('click', () => {
    if (foodInput.value === '') {
        showError('block', 'none', 'none', 'none');
    }
    else {
        toggleSpinner();
        loadData(foodInput.value);
        showError('none', 'block', 'none', 'none');
    }
})

foodInput.addEventListener("keypress", function (event) {
    if (event.key === 'Enter')
        searchBtn.click();
});


//* Function of Display Error Message
function showError(display1, display2, display3, display4) {
    document.querySelector('.error-area').style.display = display1;
    document.querySelector('.food-container').style.display = display2;
    document.querySelector('.food-info').style.display = display3;
    document.querySelector('.invalid-message-area').style.display = display4;
}


//* Load Food Data
async function loadData(foodName) {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`;
    const response = await fetch(url);
    const data = await response.json();
    displayFoodItems(data);
    toggleSpinner();
}


//* Display Food Items
const displayFoodItems = data => {
    const foodItemsContainer = document.querySelector('.food-items');
    const meal = data.meals;
    if (meal === null) {
        showError('none', 'none', 'none', 'block');
    }
    else {
        let empty = '';
        meal.forEach(element => {
            const foodItemsInfo = `
        <div onclick="displayFoodInfo('${element.strMeal}')" class="card food-item">
            <img src="${element.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${element.strMeal}</h5>
            </div>
        </div>
        `;
            empty += foodItemsInfo;
        });
        foodItemsContainer.innerHTML = empty;
    }
}


//* Display Food Info
const displayFoodInfo = name => {
    toggleSpinner();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        .then(response => response.json())
        .then(data => {
            toggleSpinner();
            const ItemInfoContainer = document.querySelector('.food-info');
            const meal = data.meals[0];
            const foodInfo = `
            <div class="d-flex justify-content-center food-img-container">
                <div>
                    <img src="${meal.strMealThumb}" alt="">
                    <h4>${meal.strMeal}</h4>
                </div>
                <div class="ms-5">
                    <h5>Ingredients</h5>
                    <ul>
                        <li>${meal.strMeasure1} ${meal.strIngredient1}</li>
                        <li>${meal.strMeasure2} ${meal.strIngredient2}</li>
                        <li>${meal.strMeasure3} ${meal.strIngredient3}</li>
                        <li>${meal.strMeasure4} ${meal.strIngredient4}</li>
                        <li>${meal.strMeasure5} ${meal.strIngredient5}</li>
                        <li>${meal.strMeasure6} ${meal.strIngredient6}</li>
                        <li>${meal.strMeasure7} ${meal.strIngredient7}</li>
                        <li>${meal.strMeasure8} ${meal.strIngredient8}</li>
                        <li>${meal.strMeasure9} ${meal.strIngredient9}</li>
                    </ul>
                </div>
            </div>
            `;
            ItemInfoContainer.innerHTML = foodInfo;
        })
    showError('none', 'block', 'block', 'none');
}


//*Extra Feature 'Spinner'
const toggleSpinner = () => {
    const spinner = document.querySelector('.spinner-area');
    spinner.classList.toggle('d-none');
}




//////* Search Button Event Handler
////document.querySelector('.search').addEventListener('click', () => {
////    // console.log('i am clicked')
////    const foodInput = document.querySelector('.food-input').value;
////    // console.log(foodInput);
////    if (foodInput === '') {
////        showError('block', 'none', 'none', 'none');
////    }
////    else {
////        loadData(foodInput);
////        showError('none', 'block', 'none', 'none');
////        // document.querySelector('.food-info').style.display = 'none';
////        // document.querySelector('.invalid-message-area').style.display = 'none';
////    }
////})
////
////
//////* Function of Display Error Message
////function showError(display1, display2, display3, display4) {
////    document.querySelector('.error-area').style.display = display1;
////    document.querySelector('.food-container').style.display = display2;
////    document.querySelector('.food-info').style.display = display3;
////    document.querySelector('.invalid-message-area').style.display = display4;
////}
////
////
//////* Load Food Data
////async function loadData(foodName) {
////    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`;
////    const response = await fetch(url);
////    const data = await response.json();
////    displayFoodItems(data);
////    // console.log(data);
////}
////
////
//////* Display Food Items
////const displayFoodItems = data => {
////    const foodItemsContainer = document.querySelector('.food-items');
////    const meal = data.meals;
////    // console.log(meal);
////    // for (let i = 0; i < meal.length; i++){
////    //     const element = meal[i];
////    //     console.log(element);
////    // }
////    if (meal === null) {
////        showError('none', 'none', 'none', 'block');
////        // document.querySelector('.invalid-message-area').style.display = 'block';
////    }
////    else {
////        let empty = '';
////    meal.forEach(element => {
////        // console.log(element);
////        // console.log(foodItemsContainer.innerText);
////        const foodItemsInfo = `
////        <div onclick="displayFoodInfo('${element.strMeal}')" class="card food-item">
////            <img src="${element.strMealThumb}" class="card-img-top" alt="...">
////            <div class="card-body">
////            <h5 class="card-title">${element.strMeal}</h5>
////            </div>
////        </div>
////        `;
////        empty += foodItemsInfo;
////    });
////    foodItemsContainer.innerHTML = empty;
////    }
////}
////
////
//////* Display Food Info
////const displayFoodInfo = name => {
////    // console.log(name);
////    // document.querySelector('.food-info').style.display = 'block';
////    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
////        .then(response => response.json())
////        .then(data => {
////            // console.log(data);
////            const ItemInfoContainer = document.querySelector('.food-info');
////            const meal = data.meals[0];
////            // console.log(meal);
////            const foodInfo = `
////            <div class="d-flex justify-content-center food-img-container">
////                <div>
////                    <img src="${meal.strMealThumb}" alt="">
////                    <h4>${meal.strMeal}</h4>
////                </div>
////                <div class="ms-5">
////                    <h5>Ingredients</h5>
////                    <ul>
////                        <li>${meal.strMeasure1} ${meal.strIngredient1}</li>
////                        <li>${meal.strMeasure2} ${meal.strIngredient2}</li>
////                        <li>${meal.strMeasure3} ${meal.strIngredient3}</li>
////                        <li>${meal.strMeasure4} ${meal.strIngredient4}</li>
////                        <li>${meal.strMeasure5} ${meal.strIngredient5}</li>
////                        <li>${meal.strMeasure6} ${meal.strIngredient6}</li>
////                        <li>${meal.strMeasure7} ${meal.strIngredient7}</li>
////                        <li>${meal.strMeasure8} ${meal.strIngredient8}</li>
////                        <li>${meal.strMeasure9} ${meal.strIngredient9}</li>
////                    </ul>
////                </div>
////            </div>
////            `;
////            ItemInfoContainer.innerHTML = foodInfo;
////        })
////    showError('none', 'block', 'block', 'none');
////}