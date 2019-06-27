const URL = "http://localhost:3000/monsters?_limit=50&_page=";
const pURL = "http://localhost:3000/monsters"
let pageCount=1;

document.addEventListener("DOMContentLoaded",init);

function init(){
    initPageButtons();
    initForm();
    populateDOM();

}

function pagePrinter(monsterArray){
    let monsterDiv = document.getElementById("monster-container");
    monsterDiv.innerHTML = "";
    monsterArray.forEach(recordPrinter(monsterDiv));
    
}

function forwardButtonHandler(e){
    pageCount+=1;
    fetch(URL+pageCount.toString())
    .then(response => response.json())
    .then(monsterArray => {
        if (monsterArray.length > 0){
            clearMonsterDiv();
            monsterArray.forEach(recordPrinter);
        }else{
            alert("This is the last page.")
        }});
}

function backButtonHandler(e){
    if (pageCount === 1){
        alert("This is the first page.")
    }else{
        pageCount-=1;
        fetch(URL+pageCount.toString())
        .then(response => response.json())
        .then(monsterArray => {
            clearMonsterDiv();
            monsterArray.forEach(recordPrinter
            )});
    }
}
function recordPrinter(record){
    let monsterDiv = document.getElementById("monster-container");
    let newRow = document.createElement("div");
    let newUl = document.createElement("ul");
        let newLiId = document.createElement("li");
    let newLiName = document.createElement("li");
    let newLiAge = document.createElement("li");
    let newLiDesc = document.createElement("li");
    newRow.id = `monster-${record.id}`
        newLiId.innerHTML = `<b>ID: </b>${record.id}`
    newLiName.innerHTML = `<b>Name: </b>${record.name}`
    newLiAge.innerHTML = `<b>Age: </b>${record.age}`
    newLiDesc.innerHTML = `<b>Description: </b>${record.description}`
        newUl.appendChild(newLiId);
    newUl.appendChild(newLiName);
    newUl.appendChild(newLiAge);
    newUl.appendChild(newLiDesc);
    newRow.appendChild(newUl);
    monsterDiv.appendChild(newRow);
}

function clearMonsterDiv(){
    document.getElementById("monster-container").innerHTML ="";
}

function initPageButtons(){
    let forwardButton = document.getElementById("forward");
    let backButton = document.getElementById("back");
    forwardButton.addEventListener("click", forwardButtonHandler);
    backButton.addEventListener("click", backButtonHandler);
}

function populateDOM(){
    fetch(URL+pageCount.toString())
    .then(response => response.json())
    .then(
        // monsterArray => pagePrinter(monsterArray)
        monsterArray => {
            clearMonsterDiv();
            monsterArray.forEach(recordPrinter)
        });
}

function initForm(){
    let newMonsDiv = document.getElementById("create-monster");
    let newMonsForm = document.createElement("form");
    let nameLabel = document.createElement("label");
    let ageLabel = document.createElement("label");
    let descLabel = document.createElement("label");
    let nameText = document.createElement("input");
    let ageText = document.createElement("input");
    let descText = document.createElement("input");
    let submitButton = document.createElement("input");
    newMonsForm.id ="monster-form";
    nameText.type="text";
    nameText.id = "form-name"
    ageText.type="text";
    ageText.id = "form-age"
    descText.type="text";
    descText.id = "form-description"
    submitButton.type="submit";
    nameLabel.innerText="Name: ";
    ageLabel.innerText="Age: ";
    descLabel.innerText="Description: ";
    submitButton.addEventListener("click", newMonsterHandler)
    newMonsForm.append(nameLabel,nameText,ageLabel,ageText,descLabel,descText,submitButton);
    newMonsDiv.appendChild(newMonsForm);

}

function newMonsterHandler(e){
    let name = document.getElementById("form-name").value;
    let newForm = document.getElementById("monster-form");
    let age = document.getElementById("form-age").value;
    let description = document.getElementById("form-description").value;
    if (name !== "" && age !== "" && description !== ""){
        let data = {
            name : `${name}`,
            age : `${age}`,
            description : `${description}`
        };
        let configObj = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(data)
          };
        fetch(pURL,configObj)
        .then(response => response.json())
        .then(recordPrinter)
    }else{
        alert("Name, Age or Description field cannot be empty.")
    }
    e.preventDefault();
    newForm.reset();

}