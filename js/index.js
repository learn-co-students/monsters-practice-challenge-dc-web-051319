document.addEventListener("DOMContentLoaded", init)
let monsterCont = document.getElementById('monster-container')
let createMonster = document.getElementById('create-monster')
let back = document.getElementById('back')
let forward = document.getElementById('forward')
let backButton = back.addEventListener('click', goingBack)
let forwardButton = forward.addEventListener('click', goingForward)
let putMonster = createMonster.addEventListener('submit', postMonster)
let limit = 50
let page = 1
  

function init(){
    
    fetchMonsters()
    
}







function fetchMonsters(){
    fetch (`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
        .then(response => response.json())
        .then(data => data.forEach(putToDom))
    }


function putToDom(data){
    let newDiv = document.createElement('div')
    let newHead = document.createElement('h2')
    let newHead4 = document.createElement('h4')
    let par = document.createElement('p')
    newDiv.id = data.id
    newHead.innerText = data.name
    newHead4.innerText = data.age
    par.innerText = data.description 

    newDiv.appendChild(newHead)
    newDiv.appendChild(newHead4)
    newDiv.appendChild(par)

    monsterCont.appendChild(newDiv)
    
    
}

  
function postMonster(e){
    e.preventDefault()
    let name = e.target.name.value 
    let age = e.target.age.value
    let description = e.target.description.value
    fetch ('http://localhost:3000/monsters',{
    method: 'POST', 
    headers: 
    {
        "Content-Type": "application/json",
        Accept: "application/json"
    },
    body: JSON.stringify({
        name: name, 
        age: age, 
        description: description
    })
})
    .then(res => res.json())
    .then(response => putToDom(response))
    .catch(error => console.error('Error:', error))
    createMonster.reset()

}


function goingBack(){
    if (page < 1){
        fetchMonsters()
    }
    monsterCont.innerHTML = ''
    page --
    fetchMonsters()
    //when the button is clicked, you go back to the previous 50 monsters
    //maaaybe do a fetch of the previous monsters?

}

function goingForward(){
    monsterCont.innerHTML = ''//when the button is clicked, you go to the next 50 monsters
    page++
    fetchMonsters()
}