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
