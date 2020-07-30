export function fetchNationalParks(callback) {
  fetch("http://localhost:3000/national_parks")
  .then(resp => resp.json())
  .then(function(nationalparks) {
    for(const nationalpark of nationalparks.data) {
      callback(nationalpark)
    }
  })
}

export function fetchNewPark(callback, body) {
  fetch("http://localhost:3000/national_parks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(body)
  }).then(resp => resp.json()).then(function(park){
    callback(park.data)
  })
}

export function fetchParkDetail(callback, id) {
  fetch(`http://localhost:3000/national_parks/${id}`)
  .then(resp => resp.json())
  .then(callback)
}

export function fetchNewReview(callback, park, body) {
  fetch(`http://localhost:3000/national_parks/${park.data.id}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(body)
  }).then(resp => resp.json()).then(callback)
}

export function deleteReview(review) {
  const wholeReview = document.getElementById(`review-id-${review.id}`)

  fetch(`http://localhost:3000/national_parks/${review.national_park_id}/reviews/${review.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }).then(resp => wholeReview.remove())
}