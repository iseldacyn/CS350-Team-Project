if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var addIngredientButtons = document.getElementsByClassName('add-btn')
    for (var i=0; i < addIngredientButtons.length; i++){
        var button = addIngredientButtons[i]
        button.addEventListener('click',addIngredientRow)
    } 

    var removeIngredientButtons = document.getElementsByClassName('rmv-btn')
    for (var i=0; i<removeIngredientButtons.length; i++){
        var button = removeIngredientButtons[i]
        button.addEventListener('click',removeIngredient)
    }
}

function addIngredientRow(event) {
    var buttonClicked = event.target
    var ingredientRow = document.createElement('div')
    ingredientRow.classList.add('ingredient-row')
    var ingredients = document.getElementsByClassName('ingredients-list')[0]
    var ingredientRowContents = `
        <input class="ingredient-quantity ingredient-column field" type="number" name="quantity" id="quantity" required>
        <select class="ingredient-unit ingredient-column field" name="unit" id="unit" required>
            <option value="c">cup</option>
            <option value="floz">fl. oz</option>
            <option value="pt">pint</option>
            <option value="qt">quart</option>
            <option value="gal">gallon</option>
            <option value="oz">ounce</option>
            <option value="lb">lb</option>
            <option value="tsp">tsp</option>
            <option value="tbsp">tbsp</option>
            <option value="g">gram</option>
            <option value="kg">kilogram</option>
            <option value="ml">mililiter</option>
            <option value="l">liter</option>
        </select>
        <input class="ingredient-name ingredient-column field" type="text" name="iname" id="iname" required>
        <button class="btn rmv-btn ing-btn" type="button">&minus;</button>`
    ingredientRow.innerHTML = ingredientRowContents
    ingredients.append(ingredientRow)
    ingredientRow.getElementsByClassName('rmv-btn')[0].addEventListener('click',removeIngredient)
}

function removeIngredient(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.remove()

}