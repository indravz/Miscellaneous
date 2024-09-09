Automating the retrieval of DynamoDB tables in Terraform requires using external data sources or scripts. Since Terraform doesn’t natively support listing all DynamoDB tables directly, you can use an external script to query the list of tables and then pass that data into Terraform.
{
    "TableName": "YourTableName",
    "Key": {
        "PrimaryKey": {
            "S": "PrimaryKeyValue"
        }
    },
    "ConditionExpression": "attribute_exists(PrimaryKey)"
}




Here’s an example using an external data source with a Python script:

### 1. Python Script to List DynamoDB Tables
Create a Python script (`list_dynamodb_tables.py`) that lists all DynamoDB tables:

```python
import boto3
import json

def list_dynamodb_tables():
    dynamodb = boto3.client('dynamodb')
    tables = dynamodb.list_tables()['TableNames']
    
    result = []
    for table in tables:
        table_info = dynamodb.describe_table(TableName=table)
        result.append({
            "name": table,
            "arn": table_info['Table']['TableArn']
        })
    
    return result

if __name__ == "__main__":
    tables = list_dynamodb_tables()
    print(json.dumps({"tables": tables}))
```

### 2. External Data Source in Terraform
You can then use Terraform's `external` data source to call this script and get the list of tables:

```hcl
data "external" "dynamodb_tables" {
  program = ["python3", "list_dynamodb_tables.py"]
}

locals {
  dynamo_tables = data.external.dynamodb_tables.result.tables
}

module "your_module" {
  for_each = { for table in local.dynamo_tables : table.name => table }

  table_name = each.value.name
  table_arn  = each.value.arn

  # Add other module variables here
}
```

### 3. Run the Terraform Code
Once the script is created and Terraform code is set up, run `terraform apply`. Terraform will call the Python script, retrieve the DynamoDB tables, and use them in the module.

This approach helps to automate the process of retrieving all DynamoDB tables in your AWS account and use them within a Terraform module. Keep in mind that you need Python and `boto3` installed, and your AWS credentials should be configured properly for this to work.
locals {
  dynamo_tables = [
    {
      name = aws_dynamodb_table.table1.name
      arn  = aws_dynamodb_table.table1.arn
    },
    {
      name = aws_dynamodb_table.table2.name
      arn  = aws_dynamodb_table.table2.arn
    },
    # Add more tables here
  ]
}

module "your_module" {
  for_each = { for table in local.dynamo_tables : table.name => table }

  table_name = each.value.name
  table_arn  = each.value.arn

  # Add other module variables here
}





To use a module for all the DynamoDB tables with the table names and ARNs, you can define these values in `locals` and then pass them to the module. Here’s how you can approach it:

1. **Define Locals with Table Names and ARNs:**

   You can create a map in `locals` that contains the table names and ARNs.

   ```hcl
   locals {
     dynamodb_tables = {
       table1 = {
         name = aws_dynamodb_table.table1.name
         arn  = aws_dynamodb_table.table1.arn
       }
       table2 = {
         name = aws_dynamodb_table.table2.name
         arn  = aws_dynamodb_table.table2.arn
       }
       # Add all other tables here
     }
   }
   ```

2. **Iterate Over the Tables in the Module:**

   Then, you can use a `for_each` loop in the module call to iterate over the tables.

   ```hcl
   module "dynamodb_table_module" {
     source = "path_to_your_module"

     for_each = local.dynamodb_tables

     table_name = each.value.name
     table_arn  = each.value.arn

     # Any other parameters your module might require
   }
   ```

3. **Create DynamoDB Tables:**

   Here’s an example of how your DynamoDB tables might look:

   ```hcl
   resource "aws_dynamodb_table" "table1" {
     name           = "table1"
     # Other configurations
   }

   resource "aws_dynamodb_table" "table2" {
     name           = "table2"
     # Other configurations
   }

   # Define other tables similarly
   ```

With this setup, your module will dynamically use the name and ARN of each DynamoDB table you’ve created. This way, you don’t need to manually pass the values for each table separately.
