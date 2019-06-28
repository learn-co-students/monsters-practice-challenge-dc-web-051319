document.addEventListener('DOMContentLoaded' , () => {
    getForm().addEventListener('submit', submitHandler)
    fetchMonsters()
    moveForwardPage().addEventListener('click', pageForward)
    moveBackwardPage().addEventListener('click', pageBackward)

});

function monsterContainer(){
    return document.querySelector('#monster-container')
}
function createMonsterContainer(){
    return document.querySelector('#create-container')
}
function getForm(){
    return document.querySelector('form')
}

function moveForwardPage(){
    return document.querySelector('#forward')
  
}

function moveBackwardPage(){
    return document.querySelector('#back')
}


let limit = 5
let page = 1
const URL_PREFIX = 'http://localhost:3000/monsters'


function fetchMonsters() {
    fetch(URL_PREFIX + "/?_limit="+limit+"&_page="+page+"")                //Fetches URL
    .then(response => response.json())                      //Gets Response in 
    .then(monsterData => {
        monsterData.forEach(monster => {renderMonsters(monster)})
       
    }
    )};

function renderMonsters(monster){
    let h4_1 = document.createElement('h4')
    let h4_2 = document.createElement('h4')
    let p = document.createElement('p')
    monsterContainer().append(h4_1)
    h4_1.innerText = "Name: "+monster.name+""
    monsterContainer().append(h4_2)
    h4_2.innerText = "Age: "+monster.age+""
    monsterContainer().append(p)
    p.innerHTML = "<strong>Description:</strong> "+monster.description+""
}

function submitHandler(e){
    e.preventDefault()
    postMonster()
}

function postMonster(){
    let data = {
        // getForm()[0].name: getForm()[0].value,
        // getForm()[1].name: getForm()[1].value,
        // getForm()[2].name: getForm()[2].value,
        // name: document.querySelector('form')[0].value,
        // age: document.querySelector('form')[1].value,
        // description: document.querySelector('form')[2].value
        name: getForm()[0].value,
        age: getForm()[1].value,
        description: getForm()[2].value
    }

    fetch(URL_PREFIX + endPoint, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),})
        .then(response => response.json());

}



function pageForward(){
    
    ++page;
    monsterContainer().innerHTML = " ";
    fetchMonsters()


}

function pageBackward(){
    if (page === 1) {
        alert("Can't go back Anymore Pages")
    }
    else{
        --page;
        monsterContainer().innerHTML = " ";
        fetchMonsters()
    }

}