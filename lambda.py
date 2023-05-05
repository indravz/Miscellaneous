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


