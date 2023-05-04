import boto3

sqs = boto3.resource('sqs')
queue_url = 'https://sqs.us-east-1.amazonaws.com/123456789012/my-queue-name'

def lambda_handler(event, context):
    messages = []

    # Retrieve up to 10 messages from the SQS queue
    for message in sqs.Queue(queue_url).receive_messages(MaxNumberOfMessages=10):
        messages.append(message.body)

    # Process the messages here
    for message in messages:
        print(message)

    return {
        'statusCode': 200,
        'body': 'Successfully processed {} messages.'.format(len(messages))
    }
