# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20121214104428) do

  create_table "cities", :force => true do |t|
    t.string   "name"
    t.boolean  "available"
    t.integer  "lock_version"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "images", :force => true do |t|
    t.integer  "resource_id"
    t.integer  "lock_version"
    t.string   "photo_file_name"
    t.string   "photo_content_type"
    t.integer  "photo_file_size"
    t.datetime "photo_updated_at"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "products", :force => true do |t|
    t.string   "name"
    t.float    "price"
    t.datetime "expiration"
    t.string   "advert_file_name"
    t.string   "advert_content_type"
    t.integer  "advert_file_size"
    t.datetime "advert_updated_at"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "products_resources", :force => true do |t|
    t.integer "product_id"
    t.integer "resource_id"
  end

  create_table "quota", :force => true do |t|
    t.integer  "resource_id"
    t.integer  "city_id"
    t.integer  "quantity"
    t.boolean  "privilege"
    t.integer  "lock_version"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "resources", :force => true do |t|
    t.string   "name"
    t.string   "category"
    t.string   "breed"
    t.string   "orign_country"
    t.string   "orign_area"
    t.string   "reference_year"
    t.string   "color"
    t.string   "odour"
    t.float    "alcoholic"
    t.integer  "capacity"
    t.integer  "score"
    t.integer  "lock_version"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", :force => true do |t|
    t.string   "username"
    t.string   "password"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
