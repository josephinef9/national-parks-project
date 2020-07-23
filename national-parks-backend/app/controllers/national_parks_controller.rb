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

end