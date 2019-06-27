document.addEventListener('DOMContentLoaded', function(){
    callAPI()
    let back = document.getElementById('back')
    let forward = document.getElementById('forward')
    let monsterForm = document.getElementById('create-monster-form')
    back.addEventListener('click', backHandler)
    forward.addEventListener('click', forwardHandler)
    monsterForm.addEventListener('submit', createMonster)
})

let count = 50

function callAPI() {
    fetch('http://localhost:3000/monsters')
        .then(function(resp){
            return resp.json() 
        })
        .then(function(json) {
            console.log(count)
            let monsterContainer = document.getElementById('monster-container')
            while (monsterContainer.firstChild) {
                monsterContainer.removeChild(monsterContainer.firstChild)
            }
            for (var i = count - 50; i < count; i++) {
                // div container for each monster
                let div = document.createElement('div')
                // monster name and age
                let h2= document.createElement('h2')
                h2.innerText = `${json[i].name}, age: ${json[i].age}`
                let p = document.createElement('p')
                p.innerText = json[i].description
                div.appendChild(h2)
                div.appendChild(p)
                monsterContainer.appendChild(div)
            }
            console.log(json)
        })
        .catch(function(error) {
            console.log(error)
        })
}

function backHandler(event) {
    count -= 50
    callAPI()
}

function forwardHandler(event) {
    count += 50
    callAPI()
}

function createMonster(event) {
    event.preventDefault()
    let name = document.getElementById('monster-name').value
    let age = document.getElementById('monster-age').value
    let description = document.getElementById('monster-description').value
    
    let formData = {
        name: name, 
        age: age,
        description: description
    }

    let configObj = {
        method: 'post',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      };
    
    return fetch('http://localhost:3000/monsters', configObj)
      .then(function(resp){
          return resp.json()
      })
      .then(function(obj){
          console.log(obj)
      })
      .catch(function(error) {
          console.log(error.message)
      })
}
