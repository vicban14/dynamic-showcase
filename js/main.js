'use strict'

var menuImages = document.querySelectorAll('.menu-container > div > img')
menuImages.forEach(image => {
  image.setAttribute("draggable", "true")
  image.setAttribute("ondragstart", "drag(event)")
})

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