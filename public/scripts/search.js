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

