resource "aws_ssm_document" "update_email_record" {
  name          = "UpdateEmailRecord"
  document_type  = "Automation"
  content = jsonencode({
    schemaVersion = "2.2"
    description   = "Update email field in DynamoDB table record"
    parameters = {
      table_name = {
        type        = "String"
        description = "The name of the DynamoDB table"
      }
      partition_key_value = {
        type        = "String"
        description = "The value of the partition key"
      }
      new_email = {
        type        = "String"
        description = "The new email address to set"
      }
    }
    mainSteps = [
      {
        action = "aws:runCommand"
        name   = "updateDynamoDBRecord"
        inputs = {
          DocumentName = "AWS-RunShellScript"
          Parameters = {
            commands = [
              "#!/bin/bash",
              "aws dynamodb update-item \\",
              "    --table-name {{ table_name }} \\",
              "    --key '{\"invitationId\": {\"S\": \"{{ partition_key_value }}\"}}' \\",
              "    --update-expression 'SET email = :newEmail' \\",
              "    --expression-attribute-values '{\":newEmail\": {\"S\": \"{{ new_email }}\"}}'"
            ]
          }
        }
      }
    ]
  })
}


@@@@@@@@@@@@@@@@


schemaVersion: '2.2'
description: Update email field in DynamoDB table record
mainSteps:
  - action: aws:runCommand
    name: updateDynamoDBRecord
    inputs:
      DocumentName: AWS-RunShellScript
      Parameters:
        commands:
          - '#!/bin/bash'
          - aws dynamodb update-item \
            --table-name YourTableName \
            --key '{"invitationId": {"S": "PartitionKeyValue"}}' \
            --update-expression 'SET email = :newEmail' \
            --expression-attribute-values '{":newEmail": {"S": "NewEmailValue"}}'


@@@@@@@@@@@@@@@@@




provider "aws" {
  region = "us-west-2"
}

data "aws_caller_identity" "current" {}

resource "aws_iam_policy" "dynamodb_full_access" {
  name        = "DynamoDBFullAccess"
  description = "Allows full access to DynamoDB tables for editing, deleting, and other operations"
  policy      = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = [
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:Query",
          "dynamodb:Scan",
          "dynamodb:BatchGetItem",
          "dynamodb:BatchWriteItem"
        ]
        Resource = "arn:aws:dynamodb:${var.region}:${data.aws_caller_identity.current.account_id}:table/*"
      }
    ]
  })
}



resource "aws_iam_role_policy_attachment" "dynamodb_full_access_attachment" {
  role       = "your_existing_role_name"
  policy_arn = aws_iam_policy.dynamodb_full_access.arn
}



@@@@@@@@@@@@@@@@@@



provider "aws" {
  region = "us-west-2"
}

data "aws_caller_identity" "current" {}

variable "region" {
  default = "us-west-2"
}

# Existing DynamoDB table
resource "aws_dynamodb_table" "example" {
  name         = "YourTableName"
  hash_key     = "PrimaryKey"
  billing_mode = "PAY_PER_REQUEST"

  attribute {
    name = "PrimaryKey"
    type = "S"
  }
}

# IAM policy document
data "aws_iam_policy_document" "test" {
  statement {
    actions = [
      "dynamodb:GetItem",
      "dynamodb:PutItem",
      "dynamodb:UpdateItem",
      "dynamodb:DeleteItem",
      "dynamodb:Query",
      "dynamodb:Scan"
    ]

    principals {
      type        = "AWS"
      identifiers = [
        "arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/YourExistingRoleName"
      ]
    }

    resources = [
      aws_dynamodb_table.example.arn
    ]

    effect = "Allow"
  }
}

# Resource-based policy for DynamoDB table
resource "aws_dynamodb_resource_policy" "example" {
  resource_arn = aws_dynamodb_table.example.arn
  policy       = data.aws_iam_policy_document.test.json
}
