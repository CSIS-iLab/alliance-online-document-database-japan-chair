#! /bin/bash
echo "This is a tool to migrate Svelte 3.x to Svelte 5"

# Function to delete specific files and directories no longer needed
clean_old_files() {
  echo "Cleaning up old files and directories no longer need on Svelte 5"

  # Array of files and directories to delete
  files_to_delete=(
    "node_modules"
    "package-lock.json"
    "rollup.config.js"
    "scripts"
    "public/build"
  )

  # Loop through each file/directory and delete if it exists
  for item in "${files_to_delete[@]}"; do
    if [ -e "$item" ]; then
      rm -rf "$item"
      echo "Deleted $item"
    else
      echo "$item does not exist, skipping..."
    fi
  done
}

# Check if the directory "old" exists?
if [ ! -d "old" ]; then
  # If do not exist, create it
  mkdir old
  echo "'old' directory was created"
  
  # call function to clean old files
  clean_old_files
else
  echo "Directory already exists"
fi
