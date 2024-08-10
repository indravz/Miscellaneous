import boto3

def lambda_handler(event, context):
    dynamodb = boto3.client('dynamodb')
    
    # Extract parameters from the event
    table_name = event.get('table_name')
    partition_key = event.get('partition_key')
    partition_value = event.get('partition_value')
    field_name = event.get('field_name')
    field_value = event.get('field_value')
    
    # Check for missing parameters
    if not all([table_name, partition_key, partition_value, field_name, field_value]):
        return {
            'statusCode': 400,
            'body': 'Missing required parameters: table_name, partition_key, partition_value, field_name, and field_value'
        }

    try:
        # Update the specified field in the DynamoDB table
        response = dynamodb.update_item(
            TableName=table_name,
            Key={
                partition_key: {'S': partition_value}
            },
            UpdateExpression=f'SET {field_name} = :val',
            ExpressionAttributeValues={
                ':val': {'S': field_value}
            }
        )
        return {
            'statusCode': 200,
            'body': f'{field_name} updated successfully to {field_value} in table {table_name}'
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': f'Error updating {field_name}: {str(e)}'
        }




@@@@@@@@@@@@@


import boto3

def lambda_handler(event, context):
    dynamodb = boto3.client('dynamodb')
    
    # Extract parameters from the event
    table_name = event.get('table_name')
    partition_key = event.get('partition_key')
    partition_value = event.get('partition_value')
    field_name = event.get('field_name')
    field_value = event.get('field_value')
    
    # Check for missing parameters
    if not all([table_name, partition_key, partition_value, field_name, field_value]):
        return {
            'statusCode': 400,
            'body': 'Missing required parameters: table_name, partition_key, partition_value, field_name, and field_value'
        }

    try:
        # Update the specified field in the DynamoDB table
        response = dynamodb.update_item(
            TableName=table_name,
            Key={
                partition_key: {'S': partition_value}
            },
            UpdateExpression=f'SET {field_name} = :val',
            ExpressionAttributeValues={
                ':val': {'S': field_value}
            }
        )
        return {
            'statusCode': 200,
            'body': f'{field_name} updated successfully to {field_value} in table {table_name}'
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': f'Error updating {field_name}: {str(e)}'
        }
