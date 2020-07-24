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
  parkLi.classList.add("list-group-item-info")
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
    <h2 class="text-success">Park Information</h2>
    <h2>${park.data.attributes.name}</h2>
    <br>
    <img src="${park.data.attributes.image_url}">
    <br><br>
    <p>${park.data.attributes.description}</p>
    <br><br>
    <form id="review-form">
      <label>Leave a Review</label>
      <input class="form-control input-lg" type="textarea" id="review-park-id-${park.data.id}"/>
      <button id="save-btn-${park.data.id}" class="btn btn-info btn-sm">Save</button>
    </form>
    <br>
    <h2>Reviews</h2>
  `
  parkDiv.appendChild(parkDetail)
  listenToReviewSave(park)
  appendReviews(park)
}

function appendReviews(park) {
  const reviewUl = document.getElementById("national-park-reviews")
  reviewUl.innerHTML = ""
  park.included.forEach(review => showReview({content: review.attributes.content, id: review.id, national_park_id: review.relationships.national_park.data.id}))
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
    }).then(resp => resp.json()).then(function(review) {
      showReview(review)
      reviewEl.value = ""
    })
  })
}

function showReview(review) {
  const reviewUl = document.getElementById("national-park-reviews")
  const reviewLi = document.createElement("li")
  reviewLi.classList.add("list-group-item")
  reviewLi.classList.add("list-group-item-info")
  reviewLi.id = `review-id-${review.id}`
  reviewLi.innerHTML = `
  <span>${review.content}</span>
  <button id="delete-btn-${review.id}" class="btn btn-danger btn-sm pull-right">Delete Review</button>
  `
  reviewUl.appendChild(reviewLi)
  listenToDelete(review)
}

function listenToDelete(review) {
  const deleteButton = document.getElementById(`delete-btn-${review.id}`)
  deleteButton.addEventListener("click", function(event){
    deleteReview(review)
  })
}

function deleteReview(review) {
  const wholeReview = document.getElementById(`review-id-${review.id}`)

  fetch(`http://localhost:3000/national_parks/${review.national_park_id}/reviews/${review.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }).then(resp => resp.json()).then(json => wholeReview.remove())
}