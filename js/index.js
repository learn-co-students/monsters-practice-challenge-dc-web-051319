const monsterBaseUrl = 'http://localhost:3000/monsters'
let currentPage;

document.addEventListener("DOMContentLoaded",function(){
  getfirst50Monsters()
  getMonsterForm().addEventListener("submit",addMonster)
  getForwardButton().addEventListener("click",nextPage)
  getBackButton().addEventListener("click",lastPage)
})


function nextPage(event){
  currentPage++
  getMonsterContainer().innerHTML= ''
  fetch(`${monsterBaseUrl}/?_limit=50&_page=${currentPage}`)
  .then(resp => resp.json())
  .then(page => page.forEach(page => displayMonster(page)))
}

function lastPage(event){
  currentPage--
  getMonsterContainer().innerHTML= ''
  fetch(`${monsterBaseUrl}/?_limit=50&_page=${currentPage}`)
  .then(resp => resp.json())
  .then(page => page.forEach(page => displayMonster(page)))

}

function getMonsterForm(){
  return document.querySelector("#monster-form")
}

function getForwardButton(){
  return document.querySelector("#forward")
}

function getBackButton(){
  return document.querySelector("#back")
}

function getfirst50Monsters(){
  currentPage = 1
  fetch(`${monsterBaseUrl}/?_limit=50`)
    .then(response => response.json())
    .then(monsters => monsters.forEach(monster => displayMonster(monster))
  )
}

function getMonsterContainer(){
  return monsterContainer = document.querySelector("#monster-container")
}


function displayMonster(result){
  getMonsterContainer()

  let monsterDiv = document.createElement("div")
  monsterDiv.id = result.id

  let monsterName = document.createElement("h2")
  monsterName.innerText = `${result.id}. ${result.name}`

  let monsterAge = document.createElement("h3")
  monsterAge.innerText = `Age of Monster: ${Math.floor(result.age)}`

  let monsterDescription = document.createElement("p")
  monsterDescription.innerText = `Description:

  ${result.description}`

  monsterDiv.append(monsterName, monsterAge, monsterDescription)
  getMonsterContainer().appendChild(monsterDiv)
}

function addMonster(event) {
  event.preventDefault()
  let name = document.querySelector("#name").value
  let age = document.querySelector("#age").value
  let descr = document.querySelector("#descr").value

  newMonster = {name:name, age:age, description:descr}
  fetch(`${monsterBaseUrl}`,{
    method: 'POST',
    headers:{
      "Content-Type":"application/json",
      Accept:"application/json"
    },
    body: JSON.stringify(newMonster)
  }).then(resp => resp.json())
  .then(result => displayMonster(result))

}



// document.querySelector(".form-monster")
