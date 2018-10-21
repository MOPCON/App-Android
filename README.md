# App-Android
MOPCON App for Android

[![Build Status](https://travis-ci.org/MOPCON/App-Android.svg?branch=master)](https://travis-ci.org/MOPCON/App-Android)

### before getting start, please add env variable

```bash
export MOPCON_API_URL="https://mopconXXXXXXXX.com/"
export keystore_password="xxx"
export keystore_alias="xxx"
export keystore_alias_password="xxx"
export MOPCON_DES_KEY="xxx"
```

put keystore into `android/app/release.keystore`

put firebase setting file into `android/app/google-services.json`


### build production file by following script

```
npm run build:prd
```
