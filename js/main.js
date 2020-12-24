'use strict'

const menuImages = document.querySelectorAll('.menu-container > div > img')
menuImages.forEach(image => {
  image.setAttribute("draggable", "true")
  image.setAttribute("ondragstart", "drag(event)")
})

const bowls = document.querySelectorAll('.space-bowl')
bowls.forEach(bowl => {
  bowl.setAttribute("ondrop", "drop(event)")
  bowl.setAttribute("ondragover", "allowDrop(event)")
})

const tray = document.querySelectorAll('.tray')[0]
tray.setAttribute("ondrop", "drop(event)")
tray.setAttribute("ondragover", "allowDrop(event)")

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id)
  ev.dataTransfer.effectAllowed = "copy"
}

function drop(ev) {
  ev.preventDefault()
  const data = ev.dataTransfer.getData("text")
  const element = document.getElementById(data)
  setFoodInBill(element)
  calculateAndSetTotalAmount()
  ev.target.appendChild(document.getElementById(data))
  ev.dataTransfer.dropEffect = "copy"
}

function allowDrop(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = "copy"
}

function setFoodInBill(element) {
  const bill = document.getElementById('bill')
  const description = document.createTextNode(`${element.dataset.name}: ${element.dataset.price} €`)
  const newParagraph = createNewParagraph(description)
  newParagraph.setAttribute('data-price', element.dataset.price)
  bill.appendChild(newParagraph)
}

function calculateAndSetTotalAmount() {
  const bill = document.getElementById('bill')
  const elementInBill = document.querySelectorAll('#bill > p')
  let totalAmount = 0

  elementInBill.forEach(element => {
    totalAmount +=  +element.getAttribute('data-price')
  })

  totalAmount = parseFloat(totalAmount).toFixed(2)
  
  const createdTotalLabel = document.querySelector('#bill > h4')
  if (!createdTotalLabel) {
    bill.style.visibility = "visible"
    const description = createDescription(undefined, totalAmount)
    const totalAmountDescription = createTotalAmountDescription(description)
    bill.appendChild(totalAmountDescription)
  } else {
    createdTotalLabel.textContent = updateTotalAmountInDescription(totalAmount)
  }

}

function createNewParagraph(description) {
  const newParagraph = document.createElement('p')
  newParagraph.appendChild(description)
  return newParagraph
}

function createTotalAmountDescription(description) {
  const newParagraph = document.createElement('h4')
  newParagraph.appendChild(description)
  return newParagraph
}

function updateTotalAmountInDescription(totalAmount) {
  return `TOTAL: ${totalAmount} €`
}

function createDescription(element, totalAmount) {
  return totalAmount
    ? document.createTextNode(updateTotalAmountInDescription(totalAmount))
    : document.createTextNode(`${element.dataset.name}: ${element.dataset.price} €`)
}