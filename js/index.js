document.body.style.backgroundColor = 'lightgreen'
let page
let url = `http://localhost:3000/monsters`
let form = document.getElementById('create-monster')
let monsterContainer = document.getElementById('monster-container')
let back = document.getElementById('back')
let fwd = document.getElementById('forward')

document.addEventListener('DOMContentLoaded', function () {
    fetchMonster()
    form.addEventListener('submit', addMonster)
    back.addEventListener('click', previousPage)
    fwd.addEventListener('click', nextPage)
});

function previousPage() {
    page--
    monsterContainer.innerHTML = ''

    fetch(`${url}/?_limit=50&_page=${page}`)
        .then(resp => resp.json())
        .then(monsters => monsters.forEach(monster => renderMonster(monster)))
}

function nextPage() {
    page++
    monsterContainer.innerHTML = ''

    fetch(`${url}/?_limit=50&_page=${page}`)
        .then(resp => resp.json())
        .then(monsters => monsters.forEach(monster => renderMonster(monster)))
}

function addMonster(event) {
    event.preventDefault()
    postMonster()
}

function postMonster() {
    let name = document.getElementById('name')
    let age = document.getElementById('age')
    let desc = document.getElementById('desc')
    
    let data = {
        name: name.value,
        age: age.value,
        desc: desc.value
    }
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(newMonster => console.log(newMonster))
}

function fetchMonster() {
    page = 1
    fetch(`${url}/?_limit=50`)
    .then( response => response.json())
    .then( monsterArray => monsterArray.forEach( renderMonster ))
}

function renderMonster(monster) {    
    let monsterID = `<div monster-id="${monster.id}"> 
    <h2>${monster.name}</h2>
    <h3>${monster.age}</h3>
    <p>${monster.description}</p>
    <br></div>`

    monsterContainer.innerHTML += monsterID
} 