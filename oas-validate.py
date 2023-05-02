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
