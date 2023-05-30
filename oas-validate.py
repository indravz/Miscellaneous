//////////////////////////////////////oas-validate//////////////////////////////
-- make a copy of the original headers
kong.log.debug("Making a copy of the original headers")
local headers = kong.request.get_headers()
local original_headers = {}
for k, v in pairs(headers) do
  original_headers[k] = v
end

-- read the body data
kong.log.debug("Reading the request body")
kong.service.request.enable_buffering()
local body_data = kong.service.request.get_body()

-- check if the content-type is application/json
local content_type = original_headers["content-type"]
if content_type and content_type:lower() == "application/json" then
  -- make a request to the validation server
  kong.log.info("Making a request to the validation server")
  local httpc = kong.service.request.new()
  local upstream_uri = kong.var.upstream_uri
  local res, err = httpc:request_uri(upstream_uri, {
    method = "POST",
    headers = original_headers,
    body = body_data
  })

  -- if the response is not 200, return the full response to the caller
  if res.status ~= 200 then
    kong.log.err("Validation failed: status=" .. tostring(res.status) .. ", body=" .. tostring(res.body))
    kong.response.exit(res.status, res.body)
  end

  -- set the validated headers and body
  kong.log.debug("Setting validated headers and body")
  kong.service.request.set_headers(original_headers)
  kong.service.request.set_raw_body(body_data)
else
  -- continue processing without making the request
  kong.log.debug("Skipping validation as content-type is not application/json")
end

.///////////////////////////////////////////////////////////////////////












from flask import Flask, request
from swagger_spec_validator import validate_request

app = Flask(__name__)

# Load the OpenAPI spec file
with open('openapi.yaml', 'r') as file:
    openapi_spec = file.read()

@app.route('/api/v1/user', methods=['POST'])
def create_user():
    # Validate the incoming request against the OpenAPI spec
    try:
        validate_request(openapi_spec, request=request, spec_kwargs={'version': '3.0.2'})
    except Exception as e:
        return str(e), 400

    # Handle the request and return a response
    # ...

if __name__ == '__main__':
    app.run(debug=True)















from flask import Flask, request, jsonify
from openapi_schema_validator import validate
import json

app = Flask(__name__)

with open('openapispec.json', 'r') as f:
    openapi_spec = json.load(f)
validator = validate.Validator(openapi_spec)

@app.route('/validate', methods=['POST'])
def validate():
    path = request.args.get('X-forwared-PATH')
    request_body = request.json
    errors = validator.validate(request_body, path, method='POST')
    if errors:
        return jsonify({'error': errors})
    return jsonify({'path': path, 'request_body': request_body})

if __name__ == '__main__':
    app.run(debug=True)
