class ReviewSerializer
  include FastJsonapi::ObjectSerializer
  attributes :content, :author
  belongs_to :national_park
end
