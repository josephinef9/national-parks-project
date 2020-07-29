import { fetchNationalParks, fetchNewPark, fetchParkDetail, fetchNewReview, deleteReview } from "./API.js"


class NationalPark {
  constructor(name, description, image_url) {
    this.name = name
    this.description = description
    this.image_url = image_url
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchNationalParks(showNationalPark)
  const newPark = document.querySelector(".new-park")
  const newParkBtn = document.createElement("h4")
  newParkBtn.innerHTML = "Click here to add a park to the list!"
  newParkBtn.addEventListener("click", function(event){
    createNewPark()
  })
  newPark.appendChild(newParkBtn)
})

function createNewPark() {
  const newPark = document.querySelector(".new-park")
  const newParkDiv = document.createElement("div")
  newParkDiv.id = "new-park-id"
  newParkDiv.innerHTML = `
  <form id='new-park-form'>
    <label>Add a new park</label>
    <input class="form-control" type="text" id="new-park-element-name" placeholder="Park Name"/>
    <input class="form-control" type="text" id="new-park-element-image" placeholder="Image URL"/>
    <input class="form-control" type="textarea" id="new-park-element-description" placeholder="Park Description"/>
    <button id="save-btn-new-park" class="btn btn-info btn-sm pull-right">Add Park</button>
  </form>`
  newPark.appendChild(newParkDiv)
  listenToAddPark()
}

function showNationalPark(nationalpark) {
  const parkUl = document.getElementById("list-group")
  const parkLi = document.createElement("li")
  parkLi.classList.add("list-group-item")
  // parkLi.classList.add("list-group-item-info")
  parkLi.id = `national-park-id-${nationalpark.id}`
  parkLi.innerHTML = nationalpark.attributes.name
  parkUl.appendChild(parkLi)
  listenToPark(nationalpark)
}

function listenToAddPark() {
  const parkForm = document.getElementById("new-park-form")
  parkForm.addEventListener("submit", function(event){
    event.preventDefault()
    parkForm.style.display = "none"
    const nameEl = document.getElementById("new-park-element-name")
    const imageEl = document.getElementById("new-park-element-image")
    const descriptionEl = document.getElementById("new-park-element-description")
    const body = {
      name: nameEl.value,
      image: imageEl.value,
      description: descriptionEl.value
    }
    fetchNewPark(showNationalPark, body)
  })
}

function listenToPark(nationalpark) {
  const parkBtn = document.getElementById(`national-park-id-${nationalpark.id}`)
  parkBtn.addEventListener("click", function(event){
    fetchParkDetail(showParkDetail, nationalpark.id)
  })
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
      <input class="form-control" type="text" id="review-park-author-${park.data.id}" placeholder="Your Name"/>
      <input class="form-control input-lg" type="textarea" id="review-park-id-${park.data.id}" placeholder="Your Review"/>
      <button id="save-btn-${park.data.id}" class="btn btn-info btn-sm pull-right">Save</button>
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
  park.included.forEach(review => showReview({content: review.attributes.content, id: review.id, national_park_id: review.relationships.national_park.data.id, author: review.attributes.author}))
}

function listenToReviewSave(park) {
  const reviewForm = document.getElementById("review-form")
  reviewForm.addEventListener("submit", function(event){
    event.preventDefault()
  const reviewEl = document.getElementById(`review-park-id-${park.data.id}`)
  const reviewAuthor = document.getElementById(`review-park-author-${park.data.id}`)
  const body = {
    content: reviewEl.value,
    author: reviewAuthor.value
  }

  fetchNewReview(showReview, body)
  })
}

function showReview(review) {
  const reviewUl = document.getElementById("national-park-reviews")
  const reviewLi = document.createElement("li")
  reviewLi.classList.add("list-group-item")
  reviewLi.classList.add("list-group-item-info")
  reviewLi.id = `review-id-${review.id}`
  reviewLi.innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>Author</th>
          <th>Review</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${review.author}</td>
          <td>${review.content}</td>
          <td><button id="delete-btn-${review.id}" class="btn btn-danger btn-sm pull-right">Delete Review</button></td>
        </tr>
      </tbody>
    </table>
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
