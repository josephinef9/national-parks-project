class ReviewsController < ApplicationController
  def create
    nationalpark = NationalPark.find(params[:national_park_id])
    content = params[:review][:content]
    review = Review.create(content: content, national_park_id: nationalpark.id)
    render json: review

  end
end