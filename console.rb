require 'pry'
require 'active_record'

## Connect to the database
require_relative 'db/connection'

# Load models
require_relative 'models/artist'
require_relative 'models/song'

binding.pry

puts "this line fixes binding.pry bug"
