class NationalParkSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :description, :image_url
  has_many :reviews
end
