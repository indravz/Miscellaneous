######################kong-plugin-config################
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


#####################################








# -*- coding: cp1252 -*-
import chardet

# Read the file in binary mode
with open('myfile.txt', 'rb') as f:
    data = f.read()

    # Detect the encoding
    result = chardet.detect(data)
    encoding = result['encoding']

# Use the detected encoding
with open('myfile.txt', encoding=encoding) as f:
    content = f.read()

print(content)





# -*- coding: iso-8859-1 -*-
import boto3

# Define the AWS clients for SQS and DynamoDB
sqs = boto3.client('sqs')
dynamodb = boto3.client('dynamodb')

def lambda_handler(event, context):
    # Get the SQS queue ARN from the input event
    queue_arn = event['queue_arn']

    # Extract the queue name from the queue ARN
    queue_name = queue_arn.split(':')[-1]

    # Get the queue URL from the queue name
    queue_url = sqs.get_queue_url(QueueName=queue_name)['QueueUrl']

    # Retrieve messages from the queue
    response = sqs.receive_message(QueueUrl=queue_url, MaxNumberOfMessages=10)

    # Process the messages and write them to the DynamoDB table
    for message in response['Messages']:
        # Extract the message details
        message_id = message['MessageId']
        message_body = message['Body']
        message_attributes = message['Attributes']

        # Write the message to the DynamoDB table
        dynamodb.put_item(
            TableName='my-dynamodb-table',
            Item={
                'message_id': {'S': message_id},
                'message_body': {'S': message_body},
                'message_attributes': {'M': message_attributes}
            }
        )

        # Delete the message from the SQS queue
        sqs.delete_message(QueueUrl=queue_url, ReceiptHandle=message['ReceiptHandle'])
        
        
        
        
        
        
import re

# Define a string that contains the plus-minus sign, left-pointing double angle quotation mark, and right-pointing double angle quotation mark
text = "This is a ± sample «quoted» text.»"

# Define a regular expression pattern that matches any of the three Unicode characters
pattern = "[\u00B1\u00AB\u00BB]"

# Replace any matches of the regular expression pattern with a comma
new_text = re.sub(pattern, ",", text)

# Define the string with regular expressions
string_with_regex = "This is a string with \n, \\, and <EOR> characters \\EOR\\."

# Define a regular expression pattern to match the characters to be removed
regex_pattern = r'[\n\\]|<EOR>'

# Replace the matched characters with an empty string
string_without_regex = re.sub(regex_pattern, '', string_with_regex)

# Print the results
print(new_text)
print(string_without_regex)



import json

# Define a sample dictionary
my_dict = {"name": "John", "age": 30, "city": "New York"}

# Convert the dictionary to a JSON string
json_string = json.dumps(my_dict)

# Print the JSON string
print(json_string)


