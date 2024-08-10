# Define an IAM role with the necessary permissions to update DynamoDB
resource "aws_iam_role" "ssm_role" {
  name = "ssm_execution_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Effect = "Allow",
        Principal = {
          Service = "ssm.amazonaws.com"
        }
      }
    ]
  })
}

# Attach a policy to the IAM role that allows it to update the DynamoDB table
resource "aws_iam_policy" "dynamodb_policy" {
  name = "dynamodb_update_policy"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = [
          "dynamodb:UpdateItem"
        ],
        Effect = "Allow",
        Resource = "arn:aws:dynamodb:${var.aws_region}:${var.aws_account_id}:table/invitations"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "dynamodb_policy_attachment" {
  role       = aws_iam_role.ssm_role.name
  policy_arn = aws_iam_policy.dynamodb_policy.arn
}

# Create the SSM document
resource "aws_ssm_document" "update_email_document" {
  name          = "UpdateEmailInDynamoDB"
  document_type = "Command"

  content = jsonencode({
    schemaVersion = "0.3",
    description   = "Update the email field in the invitations table",
    parameters    = {
      email = {
        type = "String"
        description = "The new email to update"
      },
      key = {
        type = "String"
        description = "The primary key value to identify the item in DynamoDB"
      }
    },
    mainSteps = [
      {
        action = "aws:executeScript"
        name   = "updateDynamoDBEmail"
        inputs = {
          Runtime = "python3.8"
          Handler = "handler"
          Script  = <<-EOF
import boto3

def handler(event, context):
    dynamodb = boto3.client('dynamodb')
    
    response = dynamodb.update_item(
        TableName='invitations',
        Key={
            'PrimaryKey': {'S': event['key']}
        },
        UpdateExpression='SET email = :val',
        ExpressionAttributeValues={
            ':val': {'S': event['email']}
        }
    )
    
    return response
EOF
        }
      }
    ]
  })

  permissions {
    type        = "Share"
    account_ids = [var.aws_account_id]
  }
}

# Variables
variable "aws_region" {
  type = string
  description = "AWS Region"
  default = "us-east-1"
}

variable "aws_account_id" {
  type = string
  description = "AWS Account ID"
}

# Outputs
output "ssm_document_arn" {
  value = aws_ssm_document.update_email_document.arn
}
