# App-Android
MOPCON App for Android

[![Build Status](https://travis-ci.org/MOPCON/App-Android.svg?branch=master)](https://travis-ci.org/MOPCON/App-Android)
[![Build status](https://build.appcenter.ms/v0.1/apps/b4514c56-9c65-4275-9da9-fd14a6a9d744/branches/develop/badge)](https://appcenter.ms)

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
