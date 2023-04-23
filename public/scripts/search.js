if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    console.log(document.cookie);

    /*
    for (let i = 1; i < 10; i++) {
        var items = document.getElementsByClassName("item");
        items[i].innerHTML = ` 
        `
    }
    */
}
function deleteRecipe(event) {
    if(!confirm('Are you sure you want to delete this recipe?')){
        return false;
    }
    const db = getFirestore();
    db.collection('Recipes').doc(event).delete();
    var buttonClicked = event.target
    buttonClicked.parentElement.remove()
}

delBtn.addEventListener('click',deleteRecipe);

