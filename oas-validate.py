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
