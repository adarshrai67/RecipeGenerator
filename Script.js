document.getElementById("button").addEventListener('click', () => {
    let inputValue = document.getElementById('inputName').value
    let searched = document.getElementById("searched")
    searched.innerHTML = `<h2><b>${inputValue}</b></h2> <hr>`

    fetch(`https:www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
    .then(response => response.json())
    .then(data => {
        const items = document.getElementById("items")
        items.innerHTML = ""
        if(data.meals == null){
            document.getElementById("msg").style.display = "block"
        } else{
            document.getElementById("msg").style.display = "none"
            data.meals.forEach(meal => {
                itemDiv = document.createElement("div")
                itemDiv.className = "m-2 singleItem"
                itemDiv.setAttribute('onclick', `details(${meal.idMeal})`)
                const itemInfo = `
                <div class="card mb-3" style="width: 17rem;">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body text-center">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
                    </div>
                </div>`
                itemDiv.innerHTML = itemInfo
                items.appendChild(itemDiv)
            })
        }
    })
})

function details(id){
    console.log(id)
    fetch(`https:www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(response => response.json())
    .then(detail => {
        let meal = detail.meals[0]
        console.log(meal)

        let details = document.getElementById("details")
        details.innerHTML = ""
        let detailsDiv = document.createElement("div")
        detailsInfo = `
        <div class="card mb-3" style="width: 20rem; border: 1px solid brown;">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="..." style="border: 1px solid brown">
            <div class="card-body text-center">
                <h3 class="card-title">${meal.strMeal}</h3>
                <b>${meal.strArea}</b>
                <hr>
                <h5><b>Ingredients</b></h5>
            <ul>
                <li>${meal.strIngredient1}</li>
                <li>${meal.strIngredient2}</li>
                <li>${meal.strIngredient3}</li>
                <li>${meal.strIngredient4}</li>
                <li>${meal.strIngredient5}</li>
                <li>${meal.strIngredient6}</li>
                <li>${meal.strIngredient7}</li>
                <li>${meal.strIngredient8}</li>
                <li>${meal.strIngredient9}</li>
            </ul>
            </div>
        </div>`
        detailsDiv.innerHTML = detailsInfo
        details.appendChild(detailsDiv)

        let instructionsDiv = document.createElement("div")        
        instructionsDiv.innerHTML = `
        <div class="instructions" style="background-color: white; font-size: 1.1rem; padding: 20px; width: 50vw;">
            <h5><b>Instructions</b></h5>
            ${meal.strInstructions}
        </div>`
        details.appendChild(instructionsDiv)
    })
}