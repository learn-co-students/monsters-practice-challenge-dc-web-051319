const MONSTER_URL = 'http://localhost:3000/monsters'

document.addEventListener('DOMContentLoaded', function(){
    fetchMonsters()
    getMonsterForm().addEventListener('submit', createMonster)

    let button = getForwardButton()
    button.addEventListener('click', advancePage)

    let backButton = getBackButton()
    backButton.addEventListener('click', goBack)
})

function goBack() {
    currentPage--
    getMonsterContainer().innerHTML = ''

    fetch(`${MONSTER_URL}/?_limit=50&_page=${currentPage}`)
    .then(resp => resp.json())
    .then(monsters => monsters.forEach( monster => displayMonster(monster)))
}

function advancePage(){
    currentPage++
    getMonsterContainer().innerHTML = ''


    fetch(`${MONSTER_URL}/?_limit=50&_page=${currentPage}`)
    .then(resp => resp.json())
    .then(monsters => monsters.forEach( monster => displayMonster(monster)))
}

function fetchMonsters(){
    currentPage = 1
    fetch(`${MONSTER_URL}/?_limit=50`)
    .then(resp => resp.json())
    .then(monsters => monsters.forEach(monster => displayMonster(monster)))
    
}

function displayMonster(monstro){
    let div = document.createElement("div")

    let h2 = document.createElement("h2")
        h2.innerText = monstro.name

    let h4 = document.createElement("h4")
        h4.innerText = monstro.age
    
    let p = document.createElement("p")
        p.innerText = monstro.description
         
    div.append(h2, h4, p)
    getMonsterContainer().appendChild(div)

}

function getMonsterContainer(){
    return document.getElementById("monster-container")
}

function createMonster(event){

    event.preventDefault()

    let name = document.getElementById('name').value
    let age = document.getElementById('age').value
    let description = document.getElementById('description').value 

    newMonster = {
        name: name,
        age: age,
        description: description
    }

    fetch(MONSTER_URL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"  
        },
        body: JSON.stringify(newMonster)
    }).then(resp => resp.json())
    .then(result => console.log(result))

}

function getMonsterForm(){
    return document.getElementById('monster-form')
}

function getForwardButton() {
    return document.getElementById('forward')
}

function getBackButton() {
    return document.querySelector('#back')
}