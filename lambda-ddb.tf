resource "mongodb_db_role" "example_role" {
  name     = "myCustomRole"
  database = "my_database"

  # Allow all necessary operations within the "my_database"
  privilege {
    db         = "my_database"
    collection = ""  # This applies the privilege to the entire database
    actions = [
      "listCollections",
      "createCollection",
      "createIndex",
      "dropIndex",
      "insert",
      "remove",
      "renameCollectionSameDB",
      "update"
    ]
  }

  # Restrict the ability to create new databases by not granting any global permissions
}



///////////
import boto3
from boto3.dynamodb.types import TypeDeserializer, TypeSerializer

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
        # Retrieve the existing item
        response = dynamodb.get_item(
            TableName=table_name,
            Key={
                partition_key: {'S': partition_value}
            }
        )
        
        # Check if the item exists
        if 'Item' not in response:
            return {
                'statusCode': 404,
                'body': 'Item not found'
            }
        
        # Get the existing field type, if it exists
        deserializer = TypeDeserializer()
        existing_field_value = response['Item'].get(field_name)

        if existing_field_value is not None:
            existing_field_type = list(existing_field_value.keys())[0]  # Get the type key, e.g., 'S', 'N', 'L', etc.

            # Serialize the new value to the existing type
            serializer = TypeSerializer()
            try:
                serialized_value = serializer.serialize(field_value)
                if existing_field_type not in serialized_value:
                    return {
                        'statusCode': 400,
                        'body': f'Type mismatch: Expected {existing_field_type}, got {list(serialized_value.keys())[0]}'
                    }
            except Exception as e:
                return {
                    'statusCode': 400,
                    'body': f'Error serializing field_value: {str(e)}'
                }
        
        # Update the specified field in the DynamoDB table
        # Determine the type of the new field_value
        serializer = TypeSerializer()
        serialized_value = serializer.serialize(field_value)
        new_field_type = list(serialized_value.keys())[0]  # Get the type of the new value

        response = dynamodb.update_item(
            TableName=table_name,
            Key={
                partition_key: {'S': partition_value}
            },
            UpdateExpression=f'SET {field_name} = :val',
            ExpressionAttributeValues={
                ':val': {new_field_type: field_value}
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

//////////////

{
  "table_name": "invitations",
  "partition_key": "invitationid",
  "partition_value": "12345",
  "field_name": "email",
  "field_value": "abc@gmail.com"
}



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


# Define the Lambda IAM Role
resource "aws_iam_role" "lambda_role" {
  name = "lambda_execution_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Effect = "Allow",
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

# Attach a policy to the Lambda role that allows it to update DynamoDB
resource "aws_iam_policy" "lambda_policy" {
  name = "lambda_dynamodb_policy"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = [
          "dynamodb:UpdateItem"
        ],
        Effect = "Allow",
        Resource = "arn:aws:dynamodb:${var.aws_region}:${var.aws_account_id}:table/${var.table_name}"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_policy_attachment" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = aws_iam_policy.lambda_policy.arn
}

# Create the Lambda Function
resource "aws_lambda_function" "update_item_function" {
  function_name = "UpdateDynamoDBItem"
  role          = aws_iam_role.lambda_role.arn
  handler       = "lambda_function.lambda_handler"
  runtime       = "python3.8"
  
  # Path to the ZIP file containing your lambda_function.py
  filename         = "lambda_function.zip"
  source_code_hash = filebase64sha256("lambda_function.zip")
}

# Create a ZIP file containing the Python script
data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = "lambda/"
  output_path = "lambda_function.zip"
}

# Variables for AWS Region and Account ID
variable "aws_region" {
  type        = string
  default     = "us-east-1"
}

variable "aws_account_id" {
  type        = string
}

# Output the ARN of the Lambda function
output "lambda_function_arn" {
  value = aws_lambda_function.update_item_function.arn
}
