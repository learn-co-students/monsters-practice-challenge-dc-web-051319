//let urlAllMonsters = "http://localhost:3000/monsters"
let pageCounter = 1

document.addEventListener("DOMContentLoaded", () => {

  createForm().addEventListener("submit", submitHandler)
  // backButton.addEventListener()
  getBackButton().addEventListener("click", backButton)

  getFowardButton().addEventListener("click", forwardButton)
  listAllMonsters()

})


function listAllMonsters() {

  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageCounter}`)
  .then(response => response.json())
  .then(listAllMonstersObject => iterateThroughMonsterObject(listAllMonstersObject))

}

//want first 50 monster loaded when DOMm DOMContentLoaded use id='monster-container'
//each monster is displayed with its name,age,descption
function iterateThroughMonsterObject(listAllMonstersObject){
  //create a new element li for
  listAllMonstersObject.forEach((entry)=> { displayAMonsterEntry(entry)})
}

//create a new element called li in div with id='monster-container' for each monster , and display its name,age,descption
//append li to div
function displayAMonsterEntry(entry){
  let monsterEntryName = document.createElement("h2")
  let monsterEntryAge = document.createElement("h4")
  let monsterEntryDescription = document.createElement("p")
  let monsterEntryContainer = document.createElement("div")
  let monsterEntryList = document.querySelector("#monster-container")
  getMonsterEntryList()
  monsterEntryAge.innerText = `Age: ${entry.age}`
  monsterEntryName.innerText = entry.name
  monsterEntryDescription.innerText = entry.description
  monsterEntryContainer.appendChild(monsterEntryName)
  monsterEntryContainer.appendChild(monsterEntryAge)
  monsterEntryContainer.appendChild(monsterEntryDescription)

  getMonsterEntryList().appendChild(monsterEntryContainer)

}

function getMonsterEntryList(){
  let monsterEntryList = document.querySelector("#monster-container")
return monsterEntryList

}

//form to create new monster with text field, stick to DOM above list of monster use id='create-monster'
//add create a monster button, when created monster should be added to lis and saved in API
function createForm() {
  createNameField()
  createAgeField()
  createDescriptionField()
  let monsterForm = document.createElement("form")
  let createMonster = document.querySelector("#create-monster")
  //create submit button
  let createButton = document.createElement("button")
  createButton.innerText = "Create Monster Button"
  //create a form field
  monsterForm.append(createNameField(), createAgeField(), createDescriptionField(),createButton)
  createMonster.append(monsterForm)
  return createMonster

}

function createNameField(){
  let enterNameField = document.createElement("input")
  enterNameField.id = "name"
  enterNameField.placeholder = "name..."
  return enterNameField
}

function createAgeField(){
  let enterAgeField = document.createElement("input")
  enterAgeField.id = "age"
  enterAgeField.placeholder = "age..."
  return enterAgeField
}

function createDescriptionField(){
  let enterDescriptionField = document.createElement("input")
  enterDescriptionField.id = "description"
  enterDescriptionField.placeholder = "description..."
  return enterDescriptionField
}

function submitHandler(event){
  event.preventDefault()
  postMonster()
}

function postMonster(){

  console.log("attempting to post a Monster")
  //assign newMonsterData
  let newMonsterData = {
    name: document.querySelector("form")[0].value,
    age: document.querySelector("form")[1].value,
    description:document.querySelector("form")[2].value
  }
  //make fetch request to POST newMonsterData
  fetch('  http://localhost:3000/monsters', {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(newMonsterData)
  }).then(response => response.json())

}

function renderMonster(newMonsterData){
  //append new Monster data
  displayAMonsterEntry(newMonsterData)
}

function backButton(){
//
pageCounter--
getMonsterEntryList().innerHTML = ""
//reload list without reloding _page

listAllMonsters()
}

function forwardButton(){
//chnage page id from 1 to 2
pageCounter++
getMonsterEntryList().innerHTML = ""
//reload list without reloding _page

listAllMonsters()
}

function getFowardButton(){
  let forwardButton = document.querySelector("#forward")
  return forwardButton
}
function getBackButton(){
  let backButton = document.querySelector("#back")
  return backButton
}
//add event listenr to each Button
//when click on a button it changes the URL page id and reload the list

//add functionailty to foward and back button to load 50 monster each instant button clicked.
