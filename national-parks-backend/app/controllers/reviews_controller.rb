class ReviewsController < ApplicationController
  def create
    nationalpark = NationalPark.find(params[:national_park_id])
    content = params[:review][:content]
    author = params[:review][:author]
    review = Review.new(content: content, author: author, national_park_id: nationalpark.id)
    if review.save
      render json: review
    else
      render json: review.errors
    end
  end

  def destroy
    render json: Review.find(params[:id]).destroy
  end
end
