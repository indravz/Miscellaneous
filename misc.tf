provider "aws" {
  region = "us-east-1"  # Replace with your desired region
}

resource "aws_iam_policy" "textract_policy" {
  name        = "TextractDetectDocumentPolicy"
  description = "Policy to allow DetectDocumentText action in Amazon Textract"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect   = "Allow",
        Action   = "textract:DetectDocumentText",
        Resource = "*"
      }
    ],
  })
}

resource "aws_iam_role_policy_attachment" "attach_textract_policy" {
  policy_arn = aws_iam_policy.textract_policy.arn
  role       = "arn:aws:iam::ACCOUNT_ID:role/ROLE_NAME"
}


/////////////////////////////
data "archive_file" "lambda" {
  type        = "zip"
  source_file = "lambda.js"
  output_path = "lambda_function_payload.zip"
}

resource "aws_lambda_function" "test_lambda" {
  # If the file is not in the current working directory you will need to include a
  # path.module in the filename.
  filename      = "lambda_function_payload.zip"
  function_name = "lambda_function_name"
  role          = aws_iam_role.iam_for_lambda.arn
  handler       = "index.test"

  source_code_hash = data.archive_file.lambda.output_base64sha256

  runtime = "nodejs16.x"

  environment {
    variables = {
      foo = "bar"
    }
