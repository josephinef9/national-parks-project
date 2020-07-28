class NationalParksController < ApplicationController

  def index
    nationalparks = NationalPark.all
    options = {
      include: [:reviews]
    }
    render json: NationalParkSerializer.new(nationalparks, options)
  end

  def show
    nationalpark = NationalPark.find_by(id: params[:id])
    options = {
      include: [:reviews]
    }
    render json: NationalParkSerializer.new(nationalpark, options)
  end

  def create
    name = params[:name]
    image = params[:image]
    description = params[:description]
    park = NationalPark.new(name: name, image_url: image, description: description)
    if park.save
      render json: NationalParkSerializer.new(park)
    else
      render json: park.errors
    end
  end

end