resource "aws_dynamodb_table" "example" {
  name         = "YourTableName"
  hash_key     = "PrimaryKey"
  billing_mode = "PAY_PER_REQUEST"

  attribute {
    name = "PrimaryKey"
    type = "S"
  }

  # Existing table configuration here

  # Attach resource-based policy
  stream_enabled = false
}

resource "aws_dynamodb_table_item" "example_item" {
  table_name = aws_dynamodb_table.example.name
  hash_key   = "PrimaryKey"

  item = <<ITEM
{
  "PrimaryKey": {"S": "ExampleItem"},
  "SomeAttribute": {"S": "Value"}
}
ITEM
}

resource "aws_dynamodb_table_policy" "dynamodb_policy" {
  table_name = aws_dynamodb_table.example.name

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect    = "Allow"
        Principal = {
          AWS = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/YourExistingRoleName"
        }
        Action    = [
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:Query",
          "dynamodb:Scan"
        ]
        Resource  = "arn:aws:dynamodb:${var.region}:${data.aws_caller_identity.current.account_id}:table/${aws_dynamodb_table.example.name}"
      }
    ]
  })
}
