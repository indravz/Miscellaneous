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
