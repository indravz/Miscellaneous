local http = require "resty.http"

-- set the request headers
ngx.req.set_header("X-Forwarded-URL", ngx.var.request_uri)
ngx.req.set_header("X-Forwarded-Method", ngx.req.get_method())

-- make a copy of the original headers
local headers = ngx.req.get_headers()
local original_headers = {}
for k, v in pairs(headers) do
  original_headers[k] = v
end

-- read the body data
ngx.req.read_body()
local body_data = ngx.req.get_body_data()

-- construct the request URL to call the local endpoint with the exact API call to Kong
local request_url = "http://localhost:8000" .. ngx.var.request_uri

-- make a request to the local endpoint
local httpc = http.new()
local res, err = httpc:request_uri(request_url, {
  method = ngx.req.get_method(),
  headers = original_headers,
  body = body_data
})

-- if the response is not 200, return the full response to the caller
if not res then
  ngx.status = 500
  ngx.say("Failed to request the local endpoint: ", err)
  ngx.exit(ngx.status)
elseif res.status ~= 200 then
  ngx.status = res.status
  ngx.say(res.body)
  ngx.exit(ngx.status)
end
