document.addEventListener("DOMContentLoaded", () => {
    console.log("HTML Loaded");
    getAllMonsters();

    let formSubmit = document.getElementById("monster-form");
    formSubmit.addEventListener("submit", createMonster);

    let forwardButton = document.getElementById("forward");
    forwardButton.addEventListener("click", nextPage);

    let backButton = document.getElementById("back");
    backButton.addEventListener("click", prevPage);
    
    trulyGetAllMonsters();
})

let pageCount = 1;
let max;

function getAllMonsters () {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageCount}`)
    .then(resp => resp.json())
    .then(data => {
        data.forEach(monster => addMonsterToDOM(monster))
    })
}

function trulyGetAllMonsters() {
    fetch(`http://localhost:3000/monsters`)
    .then(resp => resp.json())
    .then(data => max = data.length)
}

function addMonsterToDOM(monster) {
    let div = document.createElement("div")
    div.innerText = `${monster.name}, ${parseInt(monster.age)} years`

    let monsterContainer = document.getElementById("monster-container")
    monsterContainer.appendChild(div)
    
    let para = document.createElement("p")
    para.innerText = monster.description
    div.appendChild(para)
}

function createMonster(event) {
    event.preventDefault();
    fetch("http://localhost:3000/monsters", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            name: event.target[0].value, 
            age: event.target[1].value, 
            description: event.target[2].value
        })
    })
    .then(resp => resp.json())
    .then(monster => {
        alert(`${monster.name} Added!`)
        let form = document.getElementById("monster-form")
        form.reset();
    })
}

function nextPage() {
    pageCount += 1;
    if (pageCount > Math.ceil(max/50)) {
        pageCount = Math.ceil(max/50);
    }
    console.log(pageCount)
    let pageMax = document.getElementById("")
    let monsterContainer = document.getElementById("monster-container");
    monsterContainer.innerHTML = "";
    getAllMonsters();
}

function prevPage() {
    pageCount -= 1;
    if (pageCount < 1) {
        pageCount = 1
    }
    console.log(pageCount)
    let monsterContainer = document.getElementById("monster-container");
    monsterContainer.innerHTML = "";
    getAllMonsters();
}
