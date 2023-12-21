#!/bin/bash

DIR="./src-tauri/gen/android/app/src/main/java/com/mterm/mterm/generated"

while true; do
    new_files=$(find "$DIR" -type f -cmin -1)
    for file in $new_files; do
        timestamp=$(date +"%Y-%m-%d %H:%M:%S")
        rm "$file"
        filename=$(basename "$file")
        echo -e "\e[32m$timestamp\e[0m: \e[31m$filename\e[0m deleted."
    done

    sleep 1
done
