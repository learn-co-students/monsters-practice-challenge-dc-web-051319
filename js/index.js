document.addEventListener('DOMContentLoaded', init )

let limit = 50
let page = 1

const form = document.querySelector('form')
const target = document.getElementById('monster-container')



function init() {
  getMonsters()
  form.addEventListener('submit', addMonster)
  back.addEventListener('click', goBack)
  forward.addEventListener('click', getMore)
}

function getMonsters () {
  return fetch(`http://localhost:3000/monsters/?_limit=${limit}&_page=${page}`)
  .then(resp => resp.json())
  .then(json => showMonsters(json));
}

function showMonsters(json) {
  json.forEach( monster => {
    const monsterDiv = document.createElement('div')
    monsterDiv.className = "monster-style"
    target.appendChild(monsterDiv)
    const h2 = document.createElement('h2')
    h2.innerText = `${monster.name}`
    monsterDiv.appendChild(h2)
    const ul = document.createElement('ul')
    monsterDiv.appendChild(ul)
    const monsterAge = Math.round(monster.age)
    const ageLi = document.createElement('li')
    ageLi.innerText = `Age: ${monsterAge}`
    ul.appendChild(ageLi)
    const descLi = document.createElement('li')
    descLi.innerText = `Description: ${monster.description}`
    ul.appendChild(descLi)

  })
}

function addMonster(event) {
    event.preventDefault()

    let name = event.target.name.value
    let age = event.target.age.value
    let description = event.target.age.Description

  return fetch( "http://localhost:3000/monsters",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify( {
      name,
      age,
      description
    } )
  } )
  .then( function (response) {
    return response.json()
  } )
  .then( function ( object ) {
    document.body.innerHTML = object[ "id" ]
  } )
  .catch( function ( error ) {
    document.body.innerHTML = error.message
  } )
}


function goBack() {
   if (page === 1) {
     alert("At the Beginning")
   } else {
       target.innerHTML = ''
       --page
       getMonsters()
   }
}

function getMore() {
   if (target.childElementCount <= 49) {
     alert("No More Monsters to Show!")
    } else {
       target.innerHTML = ''
       ++page
       getMonsters()
    }
}
// stored while i try some other
// function showMonsters(json) {
//   let target = document.getElementById('monster-container')
//   json.forEach( monster => {
//     const monsterDiv = document.createElement('div')
//     monsterDiv.className = "monster-style"
//     target.appendChild(monsterDiv)
//     const h2 = document.createElement('h2')
//     h2.innerText = `${monster.name}`
//     monsterDiv.appendChild(h2)
//     const ul = document.createElement('ul')
//     monsterDiv.appendChild(ul)
//     const li = document.createElement('li')
//     li.innerText = `${monster.age}`
//     ul.appendChild(li)
//
//   })
// }
