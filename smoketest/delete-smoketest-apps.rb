require 'rubygems'
require 'bundler/setup'
require 'oktakit'

id = ARGV[0]

client = Oktakit.new(token: ENV['OKTA_TOKEN'], api_endpoint: ENV['OKTA_BASE_URL'])
response, http_status = client.deactivate_application(id)
p http_status
if http_status != 200
  p "The app was not able to be deactivated. This is a problem."
  exit 1
end
response, http_status = client.delete_application(id)
p http_status
if http_status != 204
  p "The app was not able to be deleted. This is a problem."
  exit 1
end