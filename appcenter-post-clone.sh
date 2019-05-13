#!/usr/bin/env bash

# decrypt enc file to tar.
openssl des-cbc -d -K $MOPCON_DES_KEY -in secrets.tar.enc -out secrets.tar

# extract tar file.
tar xvf ./secrets.tar

# move file to correct folder.
mv release.keystore ./android/app/
mv google-services.json ./android/app/