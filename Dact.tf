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
