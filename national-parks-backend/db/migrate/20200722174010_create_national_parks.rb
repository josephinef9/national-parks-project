class CreateNationalParks < ActiveRecord::Migration[5.2]
  def change
    create_table :national_parks do |t|
      t.string :name
      t.text :description
      t.string :image_url
    end
  end
end
