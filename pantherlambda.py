import boto3
import requests
from botocore.exceptions import ClientError

def get_secret():
    secret_name = "idfs_client_secret"
    region_name = "your-aws-region"

    # Create a Secrets Manager client
    session = boto3.session.Session()
    client = session.client(
        service_name='secretsmanager',
        region_name=region_name
    )

    # Get the client secret from Secrets Manager
    try:
        get_secret_value_response = client.get_secret_value(
            SecretId=secret_name
        )
    except ClientError as e:
        raise e
    else:
        if 'SecretString' in get_secret_value_response:
            secret = get_secret_value_response['SecretString']
            return secret
        else:
            # Handle binary secret
            secret = base64.b64decode(get_secret_value_response['SecretBinary'])
            return secret

def lambda_handler(event, context):
    # Parameters passed to the lambda function
    param1 = event['param1']
    param2 = event['param2']
    
    # Fetch client secret from Secrets Manager
    client_secret = get_secret()
    
    # Make a call to idfs-vz.com to get JWT token using client secret
    idfs_response = requests.post('https://idfs-vz.com/get_jwt', data={'client_secret': client_secret})
    jwt = idfs_response.json()['jwt']
    
    # Make a call to my-service.com using obtained JWT and parameters
    headers = {'Authorization': 'Bearer ' + jwt}
    my_service_url = f'https://my-service.com/{param1}/{param2}/'
    my_service_response = requests.get(my_service_url, headers=headers)
    
    # Process my_service_response if needed
    return my_service_response.json()
