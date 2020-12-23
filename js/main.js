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
}

function drop(ev) {
  ev.preventDefault()
  const data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data))
}

function allowDrop(ev) {
  ev.preventDefault();
}