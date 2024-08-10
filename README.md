resource "aws_iam_policy" "dynamodb_rw_policy" {
  name        = "DynamoDBReadWritePolicy"
  description = "Policy to allow read and write access to all DynamoDB tables"
  policy      = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:Query",
          "dynamodb:Scan"
        ]
        Effect   = "Allow"
        Resource = "arn:aws:dynamodb:${var.region}:${data.aws_caller_identity.current.account_id}:table/*"
      }
    ]
  })
}


resource "aws_iam_role_policy_attachment" "dynamodb_rw_policy_attachment" {
  role       = "your_existing_role_name"
  policy_arn = aws_iam_policy.dynamodb_rw_policy.arn
}


@@@@@@@@@@@@@@@@@@@@@@@@@@@








select * from ftc_member_role_assignment where grouptype_cd='R'
select *




List<String> uniqueItems = Stream.concat(entitlements.getView().stream(), newTokens.stream())
                                          .distinct()
                                          .collect(Collectors.toList());
                                          


import java.util.*;

public class Entitlements {
    private List<String> view;

    public Entitlements() {
        this.view = new ArrayList<>();
    }

    public List<String> getView() {
        return view;
    }

    public void setView(List<String> view) {
        this.view = view;
    }

    // Assuming you have other fields and methods
}

public class Main {
    public static void main(String[] args) {
        Entitlements entitlements = new Entitlements();
        List<String> initialTokens = Arrays.asList("item1", "item2");
        entitlements.getView().addAll(initialTokens); // Add some initial tokens to the view

        List<String> newTokens = Arrays.asList("item2", "item3", "item4");

        // Combine existing view items and new tokens to ensure uniqueness
        Set<String> uniqueItems = new HashSet<>(entitlements.getView());
        uniqueItems.addAll(newTokens);

        // Update the view list with the unique items
        entitlements.getView().clear();
        entitlements.getView().addAll(uniqueItems);

        // Print the updated view list
        System.out.println(entitlements.getView());
    }
}



import java.util.*;

public class Entitlements {
    private List<String> view;

    public Entitlements() {
        this.view = new ArrayList<>();
    }

    public List<String> getView() {
        return view;
    }

    public void setView(List<String> view) {
        this.view = view;
    }

    // Assuming you have other fields and methods
}

public class Main {
    public static void main(String[] args) {
        Entitlements entitlements = new Entitlements();
        List<String> tokens = Arrays.asList("item1", "item2", "item3", "item2");

        // Convert the existing view list to a set to ensure uniqueness
        Set<String> uniqueItems = new HashSet<>(entitlements.getView());
        
        // Add all tokens to the set
        uniqueItems.addAll(tokens);

        // Update the view list with the unique items
        entitlements.getView().clear();
        entitlements.getView().addAll(uniqueItems);

        // Print the updated view list
        System.out.println(entitlements.getView());
    }
}
///////////////////////



// Assuming tokens is a List or Collection of items
List<Type> view = new ArrayList<>();
Set<Type> uniqueItems = new HashSet<>(view); // Initialize with existing items

uniqueItems.addAll(tokens); // Add all items from tokens to the set

view.clear(); // Clear the original list
view.addAll(uniqueItems); // Add back the unique items to the list

 
 
 List<String> itemsToAdd = Stream.of("AM@R:", "TR@R:", "MM@R:", "AC@R:")
                                        .map(prefix -> prefix + repCode)
                                        .collect(Collectors.toList())
                                        
                                        
                                        
#!/bin/bash

# Get the host IP address
host_ip=$(hostname -I | awk '{print $1}')

# Add 'master tcp <host ip> 8100' to /etc/sybase/interfaces
echo "master tcp $host_ip 8100" | sudo tee -a /etc/sybase/interfaces > /dev/null

# Replace 'fndc1' with 'fnndc2' globally in the file /etc/sybase/config
sudo sed -i 's/fndc1/fnndc2/g' /etc/sybase/config

# Run command 'startsybase' and sleep for 100 seconds
startsybase &
sleep 100




Subject: Confirmed Completion of Master's Degree: Elevating My Candidacy for Promotion

Dear [Recipient's Name],

I trust this message finds you in good spirits. I'm excited to share that I've attached the conclusive documents verifying the successful completion of my Master's degree. Reviewing these, I'm eager to ascertain if this achievement positions me favorably for the promotion I've set my sights on.

I'm keen to discuss any additional steps or actions required from my end to align with the promotion criteria. Your guidance and insights on this matter are invaluable to me.

Thank you immensely for your time and support.

Warm regards,
[Your Name]


Hello, 

please join the meeting with me 

Meeting title: AWS Support Conference Bridge
Personalized ID: 1321562250
Meeting ID: 1321 56 2250
Hosting Region: Ireland
URL Link: https://chime.aws/1321562250
US dial-in: +1 206-462-5569
US toll-free dial-in: +1 855-552-4463
International dial-in numbers: https://chime.aws/dialinnumbers/

We value your feedback. Please share your experience by rating this and other correspondences in the AWS Support Center. You can rate a correspondence by selecting the stars in the top right corner of the correspondence.

Best regards,
Zhan
Amazon Web Services
=============================================================== 




#!/bin/bash

# Redirect output to a log file
exec > >(tee /var/log/user-data.log|logger -t user-data -s 2>/dev/console) 2>&1

echo "User-data script started at $(date)"

# Add files
echo "Adding files..."
echo "File content" > /path/to/your/file.txt
cp /path/to/your/local/file /path/to/destination/file

# Run some commands
echo "Running commands..."
apt-get update
apt-get install -y your-package

# Add more debugging information
echo "Printing environment variables..."
printenv

echo "User-data script completed at $(date)"




#!/bin/bash

# Find the EBS volume that is not mounted
device=$(lsblk -o NAME,MOUNTPOINT | grep -E '^\w' | awk '$2 == "" {print $1; exit}')

if [ -n "$device" ]; then
    # Create a directory to use as a mount point
    mount_dir="/mnt/ebsvolume"
    sudo mkdir -p "$mount_dir"

    # Mount the EBS volume to the mount point
    sudo mount "/dev/$device" "$mount_dir"

    # Output success message
    echo "Mounted /dev/$device at $mount_dir"
else
    echo "No unmounted EBS volumes found."
fi



#!/bin/bash

# Check for unmounted EBS volumes
unmounted=$(lsblk -o NAME,MOUNTPOINT | grep -Ev '^NAME|MOUNTPOINT' | grep -v '/')

# Output the unmounted volumes
echo "$unmounted"


#!/bin/bash

# User Data script to mount unmounted EBS volumes
sudo su -

# Mount unmounted volumes (replace /dev/xvdf and /mnt/ebsvolume with your appropriate details)
mount /dev/xvdf /mnt/ebsvolume

#!/bin/bash

file_path="path_to_your_file.txt"  # Replace with your file's path
actual_ip=$(curl -s ifconfig.me)  # Fetching the actual IP using ifconfig.me

cat << EOF >> "$file_path"
This is line 1 to add.
This is line 2 to add.
My IP is $actual_ip, please substitute accordingly.
EOF

#!/bin/bash

file_path="path_to_your_file.txt"  # Replace with your file's path

cat << EOF >> "$file_path"
This is line 1 to add.
This is line 2 to add.
This is line 3 to add.
EOF



data "aws_ami" "example" {
  most_recent = true

  filter {
    name   = "tag:YourTagName"  # Replace YourTagName with the actual tag key
    values = ["YourTagValue"]  # Replace YourTagValue with the actual tag value
  }

  owners = ["self"]  # Filter for AMIs owned by yourself, change if necessary
}


sudo tcpdump -i eth0 -w capture.pcap port 22



1234

fields @logStream, @log
| stats count() by @logStream, @log
| sort @logStream asc


fields @timestamp, @message
| filter @message like /error/
| stats count() as error_count by @message
| sort error_count desc
| limit 10


fields @timestamp, @request_path, @status_code
| filter @status_code >= 400
| stats count() as request_count by @request_path, @status_code
| sort request_count desc


fields @timestamp, @request_path, @status_code
| filter @status_code >= 400
| stats count() as request_count by @request_path, @status_code
| sort request_count desc


keytool -genkeypair -v -keystore keystore.jks -keyalg RSA -keysize 2048 -alias new_alias -keypass alias_password -storepass keystore_password

keytool -importcert -v -keystore keystore.jks -alias new_alias -file certificate.pem -storepass keystore_password


keytool -delete -alias your_alias -keystore keystore.jks -storepass keystore_password

openssl x509 -in your_certificate.crt -noout -text | grep "DNS:"

openssl req -in your_csr.csr -noout -text | grep "Subject Alternative Name"


openssl req -in your_csr.csr -noout -subject | sed -n 's/.*CN=\(.*\)/\1/p'


fields @timestamp, @message
| filter @message like "[Data]"
| parse @message /.*\[Data\]\s+((\w+\s+){0,10})/ as data_words
| fields data_words



AWS Batch, AWS CloudFormation, AWS DataSync, AWS Lambda, AWS Management Console, AWS Support Center, Amazon API Gateway, Amazon CloudWatch, Amazon Cognito, Amazon Connect, Amazon Inspector, Amazon Location Service, Amazon Redshift, EC2 Image Builder


path) => {
  const validPaths = [
    '/api/v1/users',
    '/api/v1/accounts/test',
    '/api/v1/v2/groups/create'
  ];

  return validPaths.some(validPath => path === validPath);
};


find /path/to/folders -type f -name "*.txt" -exec cat {} + > consolidated.txt

aws s3 cp s3://your-bucket-name/ local-path/ --recursive --exclude "*" --include "abc.2023-05-26*"


In my current role as Vice President at BOFA, I am responsible for managing the team's cloud infrastructure. This includes ensuring its design, security, scalability, and performance optimization for diverse applications.

I actively contribute to the development of microservices, employing best practices and implementing efficient and reliable solutions to enhance system functionality.

Furthermore, I utilize data analytics techniques to analyze customer metrics and derive actionable insights using Python. These insights play a crucial role in driving data-driven decision-making processes.

Additionally, I am dedicated to maintaining data integrity and implementing robust security measures to protect sensitive information within the cloud infrastructure.






As part of my role, I actively utilize data analytics techniques to analyze customer metrics and derive actionable insights using Python. These insights are instrumental in driving data-driven decision-making processes and optimizing strategies for customer engagement and retention

responsible for managing the organization's cloud infrastructure, ensuring its design, security, scalability, and performance optimization.

Actively contribute to the development of microservices, utilizing best practices and implementing efficient and reliable solutions to enhance system functionality.

dedicated to maintaining data integrity and implementing robust security measures to protect sensitive information within the cloud infrastructure.



validateApiSpec (optional)


local cookies = kong.request.get_header("cookie")
if cookies then
  original_headers["cookie"] = cookies
end

filter @message like /your_string/
| fields @timestamp, @message


// Setup request logging with morgan
app.use(morgan('combined', { stream: logger.stream }));


app.use(
  OpenApiValidator.middleware({
    apiSpec: './openapi.yaml',
    validateRequests: true, // (default)
    validateResponses: true, // false by default
    ignorePaths: /healthcheck
  }),
);

API Gateway: integration-priv-ext
arn:aws:execute-api:us-east-1:127823895237:zxwiufz8h6/*/*/*
API endpoint: https://zxwiufz8h6.execute-api.us-east-1.amazonaws.com/dap/{proxy+}

Details

API Gateway: integration-priv-int
arn:aws:execute-api:us-east-1:127823895237:vbmo1hnkxi/*/*/*
API endpoint: https://vbmo1hnkxi.execute-api.us-east-1.amazonaws.com/dap/{proxy+}
Details
















*****************kong-plugin with err handling*******************************
_plugins:
  - name: my-plugin
    config:
      # configuration options for your plugin, if any
      # ...
      script: |
        -- set the request headers
        kong.log.info("Setting X-Forwarded-URL and X-Forwarded-Method headers")
        local set_header_success, set_header_err = pcall(kong.service.request.set_header, "X-Forwarded-URL", kong.request.get_path_with_query())
        if not set_header_success then
          kong.log.err("Failed to set X-Forwarded-URL header: " .. tostring(set_header_err))
        end

        local set_method_success, set_method_err = pcall(kong.service.request.set_header, "X-Forwarded-Method", kong.request.get_method())
        if not set_method_success then
          kong.log.err("Failed to set X-Forwarded-Method header: " .. tostring(set_method_err))
        end
        
        -- make a copy of the original headers
        kong.log.debug("Making a copy of the original headers")
        local headers = kong.request.get_headers()
        local original_headers = {}
        for k, v in pairs(headers) do
          original_headers[k] = v
        end
        
        -- read the body data
        kong.log.debug("Reading the request body")
        kong.service.request.enable_buffering()
        local body_data = kong.service.request.get_body()
        
        -- make a request to the validation server
        kong.log.info("Making a request to the validation server")
        local httpc = kong.service.request.new()
        local res, err = httpc:request_uri("http://localhost:8080/request-validations", {
          method = "POST",
          headers = original_headers,
          body = body_data
        })
        if err then
          kong.log.err("Failed to make a request to the validation server: " .. tostring(err))
          kong.response.exit(500, {message = "Internal Server Error"})
        end
        
        -- if the response is not 200, return the full response to the caller
        if res.status ~= 200 then
          kong.log.err("Validation failed: status=" .. tostring(res.status) .. ", body=" .. tostring(res.body))
          kong.response.exit(res.status, res.body)
        end
        
        -- set the validated headers and body
        kong.log.debug("Setting validated headers and body")
        local set_headers_success, set_headers_err = pcall(kong.service.request.set_headers, original_headers)
        if not set_headers_success then
          kong.log.err("Failed to set validated headers: " .. tostring(set_headers_err))
        end

        local set_body_success, set_body_err = pcall(kong.service.request.set_raw_body, body_data)
        if not set_body_success then
          kong.log.err("Failed to set validated body: " .. tostring(set_body_err))
        end
***************************************************************************************************************************
********************kong - prefunction plugin *************************


_plugins:
  - name: my-plugin
    config:
      # configuration options for your plugin, if any
      # ...
      script: |
        -- set the request headers
        kong.log.info("Setting X-Forwarded-URL and X-Forwarded-Method headers")
        kong.service.request.set_header("X-Forwarded-URL", kong.request.get_path_with_query())
        kong.service.request.set_header("X-Forwarded-Method", kong.request.get_method())
        
        -- make a copy of the original headers
        kong.log.debug("Making a copy of the original headers")
        local headers = kong.request.get_headers()
        local original_headers = {}
        for k, v in pairs(headers) do
          original_headers[k] = v
        end
        
        -- read the body data
        kong.log.debug("Reading the request body")
        kong.service.request.enable_buffering()
        local body_data = kong.service.request.get_body()
        
        -- make a request to the validation server
        kong.log.info("Making a request to the validation server")
        local httpc = kong.service.request.new()
        local upstream_uri = kong.var.upstream_uri
        local res, err = httpc:request_uri(upstream_uri, {
          method = "POST",
          headers = original_headers,
          body = body_data
        })
        
        -- if the response is not 200, return the full response to the caller
        if res.status ~= 200 then
          kong.log.err("Validation failed: status=" .. tostring(res.status) .. ", body=" .. tostring(res.body))
          kong.response.exit(res.status, res.body)
        end
        
        -- set the validated headers and body
        kong.log.debug("Setting validated headers and body")
        kong.service.request.set_headers(original_headers)
        kong.service.request.set_raw_body(body_data)

***********************************************************************************************************************************************************



Ottawa University - MBA
Monroe College

Humphreys University

Saint Peter's University - Data science
McDaniel College - Data Analytics
National Louis University



Program: Master of science in information studies,

I am writing to express my sincere interest in pursuing a Master of Science in Information Studies degree at Trine University. The field of information studies has captivated my attention, and I am eager to expand my knowledge and skills in this rapidly evolving discipline.

My journey in the realm of data analytics began with the completion of my Master's degree in Data Analytics, where I achieved exceptional grades. This program provided me with a comprehensive understanding of data mining, statistical analysis, and machine learning techniques. I honed my skills in data manipulation, visualization, and predictive modeling, enabling me to extract valuable insights from complex datasets. Through hands-on projects and collaborations with industry professionals, I developed a deep appreciation for the power of data-driven decision-making.

Currently, I am employed as a Vice President at a major bank, where I am entrusted with overseeing the implementation of cloud applications and driving digital transformation initiatives. This role has exposed me to the intricacies of cloud computing and the immense potential it holds for businesses. I have gained hands-on experience in leveraging cloud technologies to optimize operational processes, enhance scalability, and improve data security. Collaborating with cross-functional teams and engaging with stakeholders, I have witnessed the transformative impact of cloud computing on organizational efficiency and customer experience.

My professional journey at the bank has provided me with a profound understanding of the critical interplay between information systems, business strategy, and emerging technologies. It has instilled in me the importance of effective project management, data governance, and cybersecurity in safeguarding organizational assets and ensuring regulatory compliance. By navigating through complex challenges and facilitating seamless integration of cloud applications, I have honed my leadership, problem-solving, and communication skills.

Through the Master of Science in Information Studies program, I aim to deepen my expertise in areas such as project management, cloud computing, database management, cybersecurity, and network management. These courses will equip me with the theoretical foundations and practical skills required to tackle contemporary information challenges and shape the digital landscape of organizations. I am eager to explore the nuances of advanced database management, gain insights into system engineering analysis, and harness the potential of big data and data science techniques.

Furthermore, I am drawn to the collaborative and research-oriented environment at [University Name]. The opportunity to learn from esteemed faculty members who are at the forefront of information studies research is invaluable. I am excited about the prospect of engaging in scholarly discussions, participating in industry partnerships, and contributing to the advancement of the field through the Information Studies Capstone course.

I am confident that my diverse experiences in data analytics, cloud computing, and leadership roles will enrich classroom discussions and enable me to make meaningful contributions to the [University Name] community. I am committed to embracing the challenges of the program, dedicating myself to academic excellence, and fostering an inclusive and collaborative learning environment.

Thank you for considering my application. I am eager to embark on this transformative academic journey at [University Name] and make a lasting impact in the field of information studies.

Sincerely,

[Your Name]
#############################

Subject: Request for Assistance with Collaborative Practical Training Agreement

Hello HR Team,

I have obtained the required forms from my school advisor regarding the CPT agreement for my employment with GS. , and I have attached them to this email for your reference.

I have been in communication with our school's DSO regarding this statement in the agreement - "the position must be an integral part of the student's course study." I have inquired whether it would be possible to modify the flagged wording. However, the school's DSO has expressed reluctance to make any modifications to this requirement.

Given this situation, I request your guidance on how to proceed forward in order to continue my employment with GS. It would be greatly appreciated if you could provide me with information or any alternative solutions that may be available to address this issue. 

Looking forward to your suggestions

Best regards,
[Your Name]

























If you are working on OPT, you must transfer before the semester begins. You cannot
legally work on OPT with one university and start a new program with another. To minimize the gap in your ability to work, it is
best to transfer your SEVIS by your orientation date.

apiHostName	apigw.dap.foliofn.com
apiHostNameInternal	apigw-int.dap.foliofn.com
pathPrefix	/foliofn


=================================XXXXXXXXXXXXXX==============================================
local http = require "resty.http"

-- set the request headers
ngx.req.set_header("X-Forwarded-URL", ngx.var.request_uri)
ngx.req.set_header("X-Forwarded-Method", ngx.req.get_method())

-- make a copy of the original headers
local headers = ngx.req.get_headers()
local original_headers = {}
for k, v in pairs(headers) do
  original_headers[k] = v
end

-- read the body data
ngx.req.read_body()
local body_data = ngx.req.get_body_data()

-- construct the request URL to call the local endpoint with the exact API call to Kong
local request_url = "http://localhost:8000" .. ngx.var.request_uri

-- make a request to the local endpoint
local httpc = http.new()
local res, err = httpc:request_uri(request_url, {
  method = ngx.req.get_method(),
  headers = original_headers,
  body = body_data
})

-- if the response is not 200, return the full response to the caller
if not res then
  ngx.status = 500
  ngx.say("Failed to request the local endpoint: ", err)
  ngx.exit(ngx.status)
elseif res.status ~= 200 then
  ngx.status = res.status
  ngx.say(res.body)
  ngx.exit(ngx.status)
end

===================================================================XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX=============================




















https://goldmansachs.zoom.us/j/*******524?pwd=Zkt3WUFGcmhEbFhxUmYxTmtWckl0Zz09

fields @timestamp, @message
| filter message like "StoppedTask: Task failed to start" or message like "Essential container in task exited"
| sort @timestamp desc
| limit 20


import yaml
import json

with open("input.yaml", "r") as yamlfile:
    data = yaml.safe_load(yamlfile)

with open("output.json", "w") as jsonfile:
    json.dump(data, jsonfile)


test# Miscellaneous

#!/bin/bash

# Create a new user without login access
sudo adduser fafas --disabled-login

# Remove the user from the "sudo" group
sudo deluser fafas sudo

# Create a .ssh directory for the user
sudo mkdir -p /home/fafas/.ssh

# Add the public key to the authorized_keys file
echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDXtOtNhQ2mZ...tDgb username@local_machine" | sudo tee -a /home/fafas/.ssh/authorized_keys > /dev/null

# Set ownership and permissions on the .ssh directory and authorized_keys file
sudo chown -R fafas:fafas /home/fafas/.ssh
sudo chmod 700 /home/fafas/.ssh
sudo chmod 600 /home/fafas/.ssh/authorized_keys



"provisioners": [
  {
    "type": "file",
    "source": "path/to/create_user.sh",
    "destination": "/tmp/create_user.sh"
  },
  {
    "type": "shell",
    "script": "/tmp/create_user.sh"
  }
]


####################kong####################

 local http = require "resty.http"
                local httpc = http.new()
                
                -- set the request headers
                ngx.req.set_header("X-Forwarded-URL", ngx.var.request_uri)
                ngx.req.set_header("X-Forwarded-Method", ngx.req.get_method())
                
                -- make a copy of the original headers
                local headers = ngx.req.get_headers()
                local original_headers = {}
                for k, v in pairs(headers) do
                  original_headers[k] = v
                end
                
                -- read the body data
                ngx.req.read_body()
                local body_data = ngx.req.get_body_data()
                
                -- make a request to the validation server
                local res, err = httpc:request_uri("http://localhost:8080/request-validations", {
                  method = "POST",
                  headers = original_headers,
                  body = body_data
                })
                
                -- if the response is not 200, return the full response to the caller
                if res.status ~= 200 then
                  ngx.status = res.status
                  ngx.say(res.body)
                  ngx.exit(ngx.status)
                end

from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    return 'Hello, World!', 200

if __name__ == '__main__':
    app.run()

python3 -m http.server 8000 --cgi

python3 -c "from flask import Flask; app = Flask(__name__); @app.route('/'); def hello(): return 'Hello, World!', 200; app.run()"

                -- use the Kong HTTP client
                local http = kong.service.request.set_http_client("resty")
                local httpc = http.new()
                
                -- set the request headers
                ngx.req.set_header("X-Forwarded-URL", ngx.var.request_uri)
                ngx.req.set_header("X-Forwarded-Method", ngx.req.get_method())
                
                -- make a copy of the original headers
                local headers = ngx.req.get_headers()
                local original_headers = {}
                for k, v in pairs(headers) do
                  original_headers[k] = v
                end
                
                -- read the body data
                ngx.req.read_body()
                local body_data = ngx.req.get_body_data()
                
                -- make a request to the validation server
                local res, err = httpc:request_uri("http://localhost:8080/request-validations", {
                  method = "POST",
                  headers = original_headers,
                  body = body_data
                })
                
                -- if the response is not 200, return the full response to the caller
                if res.status ~= 200 then
                  ngx.status = res.status
                  ngx.say(res.body)
                  ngx.exit(ngx.status)
                end

export KONG_UNTRUSTED_LUA_SANDBOX_REQUIRES=resty.http

untrusted_lua_sandbox_requires = resty.template
