=============================================xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx=============================================

-- Set the request headers
ngx.req.set_header("X-Forwarded-URL", ngx.var.request_uri)
ngx.req.set_header("X-Forwarded-Method", ngx.req.get_method())

-- Make a copy of the original headers
local headers = ngx.req.get_headers()
local original_headers = {}
for k, v in pairs(headers) do
  original_headers[k] = v
end

-- Read the body data
ngx.req.read_body()
local body_data = ngx.req.get_body_data()

-- Make a request to the validation server based on the request method
if ngx.var.request_method == "GET" then
  -- GET request
  ngx.log(ngx.INFO, "Making GET request to request validator")
  local res, err = httpc:request_uri("http://localhost:8080/request-validations", {
    method = "GET",
    headers = original_headers
  })

  -- Handle the response
  if not res then
    ngx.status = ngx.HTTP_INTERNAL_SERVER_ERROR
    ngx.say("Failed to make a request to the validation server: " .. tostring(err))
    ngx.exit(ngx.status)
  end

  if res.status ~= 200 then
    ngx.status = res.status
    ngx.say(res.body)
    ngx.exit(ngx.status)
  end

elseif ngx.var.request_method == "PUT" or ngx.var.request_method == "DELETE" or ngx.var.request_method == "POST" then
  -- PUT, DELETE, or POST request
  ngx.log(ngx.INFO, "Making " .. ngx.var.request_method .. " request to request validator")
  local res, err = httpc:request_uri("http://localhost:8080/request-validations", {
    method = ngx.var.request_method,
    headers = original_headers,
    body = body_data
  })

  -- Handle the response
  if not res then
    ngx.status = ngx.HTTP_INTERNAL_SERVER_ERROR
    ngx.say("Failed to make a request to the validation server: " .. tostring(err))
    ngx.exit(ngx.status)
  end

  if res.status ~= 200 then
    ngx.status = res.status
    ngx.say(res.body)
    ngx.exit(ngx.status)
  end

else
  -- Unsupported request method
  ngx.status = ngx.HTTP_METHOD_NOT_IMPLEMENTED
  ngx.say("Unsupported request method: " .. ngx.var.request_method)
  ngx.exit(ngx.status)
end

======================================xxxxxxxxxxxxxxxxxxxxxxxx======================================================





















-- Set the request headers
ngx.req.set_header("X-Forwarded-URL", ngx.var.request_uri)
ngx.req.set_header("X-Forwarded-Method", ngx.req.get_method())

-- Make a copy of the original headers
local headers = ngx.req.get_headers()
local original_headers = {}
for k, v in pairs(headers) do
  original_headers[k] = v
end

-- Read the body data
ngx.req.read_body()
local body_data = ngx.req.get_body_data()

-- Make a request to the validation server based on the request method
if ngx.var.request_method == "GET" then
  -- GET request
  ngx.log(ngx.INFO, "Making GET request to request validator")
  local res, err = httpc:request_uri("http://localhost:8080/request-validations", {
    method = "GET",
    headers = original_headers
  })

  -- Handle the response
  if res.status ~= 200 then
    ngx.status = res.status
    ngx.say(res.body)
    ngx.exit(ngx.status)
  end

elseif ngx.var.request_method == "PUT" or ngx.var.request_method == "DELETE" or ngx.var.request_method == "POST" then
  -- PUT, DELETE, or POST request
  ngx.log(ngx.INFO, "Making " .. ngx.var.request_method .. " request to request validator")
  local res, err = httpc:request_uri("http://localhost:8080/request-validations", {
    method = ngx.var.request_method,
    headers = original_headers,
    body = body_data
  })

  -- Handle the response
  if res.status ~= 200 then
    ngx.status = res.status
    ngx.say(res.body)
    ngx.exit(ngx.status)
  end

else
  -- Unsupported request method
  ngx.status = ngx.HTTP_METHOD_NOT_IMPLEMENTED
  ngx.say("Unsupported request method: " .. ngx.var.request_method)
  ngx.exit(ngx.status)
end
