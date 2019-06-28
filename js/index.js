document.addEventListener('DOMContentLoaded', init)
let limit = 50
let page = 1
const formCont = document.querySelector('#create-monster')
const container = document.querySelector('#monster-container')
const back = document.querySelector('#back')
const forward = document.querySelector('#forward')

function init() {


    getMonsters()

    formCont.addEventListener('submit', addMonster)
    makeForm()

    back.addEventListener('click', goBack)
    forward.addEventListener('click', getMore)
    
}

function getMonsters() {
    return fetch(`http://localhost:3000/monsters/?_limit=${limit}&_page=${page}`)
    .then(res => res.json())
    .then(res => res.forEach(makeMonster))
}

function makeMonster(monster) {
    let card = `<div data-id="${monster.id}"> 
    <h1>${monster.name}</h1>
    <h3>${monster.age}</h3>
    <p>${monster.description}</p>
    </div>`

    container.innerHTML += card
}

function makeForm() {
    let form = `<form>
       <input type="text" name="name" placeholder="Enter Monster Name">
       <input type="text" name="age" placeholder="Enter Monster Age">
       <input type="text" name="description" placeholder="Enter Monster Description">
       <input type="submit" value="Submit">
    </form>`

    formCont.innerHTML = form
}

function addMonster(e) {
    e.preventDefault()

    let name = e.target.name.value 
    let age = e.target.age.value 
    let desc = e.target.description.value 

    let monster = {
        name: name,
        age: age,
        description: desc
    }

    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers:
        {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(monster)
    }).then(res => res.json())
    .then(res => makeMonster(res))
    .catch(console.log)

}

function goBack() {
   if (page === 1) {
     alert("Can't go back.")
   } else {
       container.innerHTML = ''
       --page
       getMonsters()
   }
}

function getMore() {
   if (container.childElementCount <= 19) {
     alert("No More Monsters to Show!")
    } else {
       container.innerHTML = ''
       ++page
       getMonsters()
    }
}