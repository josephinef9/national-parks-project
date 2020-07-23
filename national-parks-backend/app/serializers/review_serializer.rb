class ReviewSerializer
  include FastJsonapi::ObjectSerializer
  attributes :content
  belongs_to :national_park
end
