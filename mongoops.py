{
   import os
import pymongo
from pymongo import MongoClient
import logging
import json

# Setup logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Load database names from environment variable
def get_database_names():
    db_names_json = os.getenv("DATABASE_NAMES")
    if not db_names_json:
        logger.error("DATABASE_NAMES environment variable is missing.")
        raise ValueError("DATABASE_NAMES environment variable is missing.")
    try:
        db_names = json.loads(db_names_json)
        if not isinstance(db_names, list):
            raise ValueError("DATABASE_NAMES should be a JSON list.")
        return db_names
    except json.JSONDecodeError as e:
        logger.error(f"Failed to decode DATABASE_NAMES: {str(e)}")
        raise ValueError("DATABASE_NAMES is not a valid JSON list.")

# Load custom roles from JSON configuration file
def load_roles_config(file_path):
    try:
        with open(file_path, 'r') as file:
            return json.load(file)
    except Exception as e:
        logger.error(f"Failed to load roles configuration: {str(e)}")
        raise

def lambda_handler(event, context):
    # Retrieve the MongoDB connection string from environment variables
    mongo_uri = os.getenv("MONGO_URI")
    
    if not mongo_uri:
        logger.error("MONGO_URI environment variable is missing.")
        return {
            'statusCode': 500,
            'body': 'Internal Server Error: Missing MongoDB URI.'
        }

    client = MongoClient(mongo_uri)

    try:
        # Get the list of databases from the environment variable
        databases = get_database_names()

        # Create the specified databases
        for db_name in databases:
            create_database(client, db_name)

        # Load roles from the configuration file
        roles_config = load_roles_config("roles_config.json")

        # Create custom roles
        create_custom_roles(client, roles_config)

        # Log all database information after creation
        log_database_information(client)

        return {
            'statusCode': 200,
            'body': 'Databases, custom roles created, and database information logged successfully.'
        }
    except pymongo.errors.PyMongoError as e:
        logger.error(f"MongoDB Error: {str(e)}")
        return {
            'statusCode': 500,
            'body': f"MongoDB Error: {str(e)}"
        }
    except Exception as e:
        logger.error(f"Unexpected Error: {str(e)}")
        return {
            'statusCode': 500,
            'body': f"Internal Server Error: {str(e)}"
        }
    finally:
        client.close()

def create_database(client, db_name):
    try:
        # Get or create a database and collection
        database = client[db_name]
        database.create_collection("defaultCollection")
        logger.info(f"Created database: {db_name}")
    except pymongo.errors.CollectionInvalid as e:
        logger.warning(f"Collection already exists in {db_name}: {str(e)}")
    except pymongo.errors.PyMongoError as e:
        logger.error(f"Failed to create database {db_name}: {str(e)}")
        raise

def create_custom_roles(client, roles_config):
    try:
        admin_db = client["admin"]
        for role in roles_config["customRoles"]:
            admin_db.command("createRole", role["roleName"], 
                             privileges=role["privileges"], 
                             roles=role["inheritedRoles"])
            logger.info(f"Created custom role: {role['roleName']}")
    except pymongo.errors.OperationFailure as e:
        logger.error(f"Failed to create custom role: {str(e)}")
        raise

def log_database_information(client):
    try:
        db_names = client.list_database_names()
        logger.info(f"Total Databases: {len(db_names)}")
        for db_name in db_names:
            database = client[db_name]
            collections = database.list_collection_names()
            logger.info(f"Database: {db_name}, Collections: {collections}")
            # Example: Retrieve additional database details if needed
            stats = database.command("dbstats")
            logger.info(f"Stats for {db_name}: {stats}")
    except pymongo.errors.PyMongoError as e:
        logger.error(f"Failed to retrieve database information: {str(e)}")
        raise



"customRoles": [
        {
            "roleName": "customRole1",
            "privileges": [
                {
                    "resource": { "db": "database1", "collection": "" },
                    "actions": ["find", "insert", "update"]
                }
            ],
            "inheritedRoles": [
                { "role": "readWrite", "db": "database1" }
            ]
        },
        {
            "roleName": "customRole2",
            "privileges": [
                {
                    "resource": { "db": "database2", "collection": "" },
                    "actions": ["find", "insert"]
                }
            ],
            "inheritedRoles": [
                { "role": "read", "db": "database2" }
            ]
        }
    ]
}



//////////////////////////

import os
import pymongo
from pymongo import MongoClient
import logging
import json

# Setup logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Database configuration
DATABASES = [
    "database1",
    "database2",
    "database3"
]

# Load custom roles from JSON configuration file
def load_roles_config(file_path):
    try:
        with open(file_path, 'r') as file:
            return json.load(file)
    except Exception as e:
        logger.error(f"Failed to load roles configuration: {str(e)}")
        raise

def lambda_handler(event, context):
    # Retrieve the MongoDB connection string from environment variables
    mongo_uri = os.getenv("MONGO_URI")
    
    if not mongo_uri:
        logger.error("MONGO_URI environment variable is missing.")
        return {
            'statusCode': 500,
            'body': 'Internal Server Error: Missing MongoDB URI.'
        }

    client = MongoClient(mongo_uri)

    try:
        # Create the specified databases
        for db_name in DATABASES:
            create_database(client, db_name)

        # Load roles from the configuration file
        roles_config = load_roles_config("/path/to/roles_config.json")

        # Create custom roles
        create_custom_roles(client, roles_config)

        return {
            'statusCode': 200,
            'body': 'Databases and custom roles created successfully.'
        }
    except pymongo.errors.PyMongoError as e:
        logger.error(f"MongoDB Error: {str(e)}")
        return {
            'statusCode': 500,
            'body': f"MongoDB Error: {str(e)}"
        }
    except Exception as e:
        logger.error(f"Unexpected Error: {str(e)}")
        return {
            'statusCode': 500,
            'body': f"Internal Server Error: {str(e)}"
        }
    finally:
        client.close()

def create_database(client, db_name):
    try:
        # Get or create a database and collection
        database = client[db_name]
        database.create_collection("defaultCollection")
        logger.info(f"Created database: {db_name}")
    except pymongo.errors.CollectionInvalid as e:
        logger.warning(f"Collection already exists in {db_name}: {str(e)}")
    except pymongo.errors.PyMongoError as e:
        logger.error(f"Failed to create database {db_name}: {str(e)}")
        raise

def create_custom_roles(client, roles_config):
    try:
        admin_db = client["admin"]
        for role in roles_config["customRoles"]:
            admin_db.command("createRole", role["roleName"], 
                             privileges=role["privileges"], 
                             roles=role["inheritedRoles"])
            logger.info(f"Created custom role: {role['roleName']}")
    except pymongo.errors.OperationFailure as e:
        logger.error(f"Failed to create custom role: {str(e)}")
        raise
