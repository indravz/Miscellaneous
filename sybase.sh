#!/bin/bash

# Function to mount EBS volumes based on provided volume IDs
mount_volumes() {
  local vol_ids=("$@")
  local lsblk_output=$(lsblk -o NAME,SERIAL)
  local index=0

  for vol_id in "${vol_ids[@]}"; do
    vol_id_to_compare=$(echo "$vol_id" | tr -d '-') # Remove '-' from volume ID
    serial=$(echo "$lsblk_output" | grep "$vol_id_to_compare" | awk '{print $2}')
    
    # Set different mount points based on the index
    case $index in
        0)
            target_mount="/twtwt" # Modify the mount point structure for index 0
            ;;
        1)
            target_mount="/hberhb" # Modify the mount point structure for index 1
            ;;
        *)
            target_mount="/folder$((++index))" # Default mount point for other indices
            ;;
    esac

    # Compare the serial number and mount the volume if a match is found
    if [ -n "$serial" ]; then
      dev_name=$(echo "$lsblk_output" | grep "$serial" | awk '{print $1}')
      if [ -n "$dev_name" ]; then
        sudo mkdir -p "$target_mount"
        sudo mount "/dev/$dev_name" "$target_mount"
        echo "Volume $vol_id mounted at $target_mount"
      else
        echo "Device not found for volume $vol_id"
      fi
    else
      echo "Serial number not found for volume $vol_id"
    fi
    
    ((index++)) # Increment index for the next volume
  done
}

# Call the mount function with the provided volume IDs
mount_volumes "vol-9182792" "vol9188639" "vol-12345"






#!/bin/bash

# Store script arguments in variables
arg1="$1"
arg2="$2"
arg3="$3"

# Function to mount EBS volumes based on provided volume IDs
mount_volumes() {
  local vol1="$1"
  local vol2="$2"
  local vol3="$3"

  # Your function logic using vol1, vol2, vol3...
}

# Call the function with the stored arguments
mount_volumes "$arg1" "$arg2" "$arg3"

