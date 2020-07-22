class NationalParksController < ApplicationController

  def index
    nationalparks = NationalPark.all
    render json: NationalParkSerializer.new(nationalparks)
  end


end