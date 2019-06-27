const MONSTERS_URL = "http://localhost:3000/monsters"
let page = 1;
let pageLength = 200;
let form;

document.addEventListener("DOMContentLoaded", () => {
    buildMonsterTable()
    fetchMonsters();
    buildPageNav();

    form = document.getElementById('create-monster')
    form.addEventListener('submit', createMonster)
})

function buildPageNav() {
  let back = document.getElementById('back')
  let forward = document.getElementById('forward')
  back.addEventListener('click', () => prevPage())
  forward.addEventListener('click', () => nextPage())
}

function prevPage() {
  page > 1 ? (page--, fetchMonsters(page)) : alert("Sorry, no previous page")
}

function nextPage() {
  if (document.querySelectorAll('[data-monster]').length === pageLength) {
    page++, fetchMonsters(page)
  } else {
    alert("There are no more monsters!")
  }
}

// Build Monster Table on page load
function buildMonsterTable() {
  const container = document.getElementById('monster-container')
  const table = document.createElement('table')
    table.id = "monster-table"
  container.appendChild(table)
  const headerRow = document.createElement('tr')
    headerRow.id = 'monster-table-header'
  table.appendChild(headerRow)
  const th1 = document.createElement('th')
    th1.innerText = "ID"
    th1.width = "5.6%"
  const th2 = document.createElement('th')
    th2.innerText = "Name"
    th2.width = "8.4%"
  const th3 = document.createElement('th')
    th3.innerText = "Age"
    th3.width = "5.5%"
  const th4 = document.createElement('th')
    th4.innerText = "Description"
    th4.style.textAlign = "left"
    th4.width = "81.5%"
  headerRow.append(th1, th2, th3, th4)
}

// Get data for Monster Table
function fetchMonsters() {
  document.querySelectorAll('[data-monster]').forEach(monster => monster.parentNode.removeChild(monster));
  fetch(MONSTERS_URL + `?_limit=${pageLength}&_page=${page}`)
  .then(response => response.json())
  .then(monstersArray =>  
    monstersArray.forEach(monster => {
      appendMonsterRow(monster.id, monster.name, Math.floor(monster.age), monster.description)
    }
  ))
}


// Create new monster on form submit
function createMonster(e) {
  e.preventDefault();

  let formData = {
    monsterName: form.querySelector('input#name').value,
    monsterAge: parseInt(form.querySelector('input#age').value),
    monsterDec: form.querySelector('input#desc').value
  }

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  }

  form.reset()

  // POST new monster to monsters.json
  return fetch(MONSTERS_URL, configObj)
  .then(response => response.json())
  .then(monster => {
    // If there's space on the page, add a new row for the monster
    if (document.querySelectorAll('[data-monster]').length < pageLength) {
      appendMonsterRow(monster.id, monster.name, Math.floor(monster.age), monster.description)
    }
  })
}

// Build table rows for each monster
function appendMonsterRow(id, name, age, desc) {
  const table = document.getElementById('monster-table')
  const tableRow = document.createElement('tr')
  tableRow.dataset.monster = ""
  table.appendChild(tableRow)
  const td1 = document.createElement('td')
    td1.innerText = id
  const td2 = document.createElement('td')
    td2.innerText = name
  const td3 = document.createElement('td')
    td3.innerText = age
  const td4 = document.createElement('td')
    td4.innerText = desc
  tableRow.append(td1, td2, td3, td4)
}

