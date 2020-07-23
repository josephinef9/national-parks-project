class NationalPark {
  constructor(name, description, image_url) {
    this.name = name
    this.description = description
    this.image_url = image_url
  }

  // static create(form) {
  //   fetch()
  // }

  // listItemElement() {
  //   const parkLi = document.createElement("li")
  //   parkLi.classList.add("list-group-item")
  //   parkLi.id = `national-park-id-${nationalpark.attributes.id}`
  //   parkLi.innerHTML = nationalpark.attributes.name
  //   return parkLi
  // }
}

// import NationalPark from "./path/to/other/file"

document.addEventListener('DOMContentLoaded', () => {
  fetchNationalParks()
})

function fetchNationalParks() {
  fetch("http://localhost:3000/national_parks")
  .then(resp => resp.json())
  .then(function(nationalparks) {
    for(const nationalpark of nationalparks.data) {
      showNationalPark(nationalpark)
      // const park = new NationalPark(...nationalpark)
      // const parkUl = document.getElementById("list-group") // grab a piece of the DOM that I want to change
      // parkUl.appendChild(park.listItemElement())
    }
  })
}

function showNationalPark(nationalpark) {
  const parkUl = document.getElementById("list-group")
  const parkLi = document.createElement("li")
  parkLi.classList.add("list-group-item")
  parkLi.id = `national-park-id-${nationalpark.id}`
  parkLi.innerHTML = nationalpark.attributes.name
  parkUl.appendChild(parkLi)
  listenToPark(nationalpark)
  console.log(nationalpark)
}

function listenToPark(nationalpark) {
  const parkBtn = document.getElementById(`national-park-id-${nationalpark.id}`)
  parkBtn.addEventListener("click", function(event){
    console.log(event)
  })
}