function fetchMonsterList(limit, page) {
    fetch(`http://localhost:3000/monsters?_limit=${limit}&_page=${page}`)
        .then(response => response.json())
        .then(monsters => {
            renderMonsterList(monsters);
        });
};

function renderMonsterList(monsters) {
    let monstersContainer = document.querySelector("#monster-container");

    for (let monster of monsters) {
        let monsterContainer = document.createElement("div");
        monsterContainer.id = `monster-${monster.id}`;

        let monsterName = document.createElement("h2");
        monsterName.innerText = monster.name;
        monsterContainer.appendChild(monsterName);

        let monsterAge = document.createElement("h3");
        monsterAge.innerText = monster.age;
        monsterContainer.appendChild(monsterAge);

        let monsterDescription = document.createElement("p");
        monsterDescription.innerText = monster.description;
        monsterContainer.appendChild(monsterDescription);

        monstersContainer.appendChild(monsterContainer);
    };
};

function clearMonsterList() {
    let monstersContainer = document.querySelector("#monster-container");
    while (monstersContainer.firstChild) {
        monstersContainer.removeChild(monstersContainer.firstChild);
    }
};

function submitMonster(name, age, description) {
    let formData = {
        name: name,
        age: age,
        description: description
    };

    let configObject = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
    };

    fetch("http://localhost:3000/monsters", configObject)
        .then(response => response.json())
        .then(monster => {
            window.alert(`${monster.name} has been created!`)
            clearMonsterList();
            fetchMonsterList(limit, currentPage);
        })
        .catch(error => {
            window.alert(error.message);
        });
};

function createNavEvents() {
    let backButton = document.querySelector("#back");
    let forwardButton = document.querySelector("#forward");

    backButton.addEventListener("click", (event) => {
        if (currentPage > 0) {
            currentPage -= 1;
        };
        clearMonsterList();
        fetchMonsterList(limit, currentPage);
    });
    
    forwardButton.addEventListener("click", (event) => {
        if (true) {
            currentPage += 1;
        };
        clearMonsterList();
        fetchMonsterList(limit, currentPage);
    });
};

function createFormEvents() {
    let monsterForm = document.querySelector("#new-monster");
    let monsterName = monsterForm.querySelector("#monster-name");
    let monsterAge = monsterForm.querySelector("#monster-age");
    let monsterDescription = monsterForm.querySelector("#monster-description");

    monsterForm.addEventListener("submit", (event) => {
        event.preventDefault();
        submitMonster(
            monsterName.value, 
            monsterAge.value,
            monsterDescription.value
        );
        monsterForm.reset();
    });
};

const limit = 50;
let currentPage = 0;

document.addEventListener("DOMContentLoaded", () => {
    fetchMonsterList();
    createNavEvents();
    createFormEvents();
});