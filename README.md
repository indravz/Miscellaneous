# Miscellaneous

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
