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
}

function listenToPark(nationalpark) {
  const parkBtn = document.getElementById(`national-park-id-${nationalpark.id}`)
  parkBtn.addEventListener("click", function(event){
    fetchParkDetail(nationalpark.id)
  })
}

function fetchParkDetail(id) {
  fetch(`http://localhost:3000/national_parks/${id}`)
  .then(resp => resp.json())
  .then(park => showParkDetail(park))
}

function showParkDetail(park) {
  const parkDiv = document.getElementById("national-park-detail")
  const parkDetail = document.createElement("div")
  parkDiv.innerHTML = ""
  parkDetail.id = `park-detail-id-${park.data.id}`
  parkDetail.innerHTML = `
    <h1>${park.data.attributes.name}</h1>
    <br>
    <img src="${park.data.attributes.image_url}">
    <br><br>
    <p>${park.data.attributes.description}</p>
    <br><br>
    <form id="review-form">
      <label for="inputlg">Leave a Review</label>
      <input class="form-control input-lg" type="textarea" id="review-park-id-${park.data.id}"/>
      <button id="save-btn-${park.data.id}" class="btn btn-info btn-sm">Save</button>
    </form>
  `
  parkDiv.appendChild(parkDetail)
  listenToReviewSave(park)
}

function listenToReviewSave(park) {
  const reviewForm = document.getElementById("review-form")
  reviewForm.addEventListener("submit", function(event){
    event.preventDefault()
  const reviewEl = document.getElementById(`review-park-id-${park.data.id}`)

    fetch(`http://localhost:3000/national_parks/${park.data.id}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        content: reviewEl.value
      })
    }).then(resp => resp.json()).then(review => showReview(review))
  })
}

function showReview(review) {
  const reviewUl = document.getElementById("national-park-reviews")
  const reviewLi = document.createElement("li")
  reviewLi.id = `review-id-${review.id}`
  reviewLi.innerText = `${review.content}`
  reviewUl.appendChild(reviewLi)

  console.log(review)
}