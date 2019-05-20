# App-Android
MOPCON App for Android

[![Build Status](https://travis-ci.org/MOPCON/App-Android.svg?branch=master)](https://travis-ci.org/MOPCON/App-Android)


### Install Command and Develop Tool
this project develop with react-native, so before getting start, we should install [react-native](https://facebook.github.io/react-native/) and [npm](https://nodejs.org/en/) command

* react-native recommend v0.56
* nodejs recommend v10 LTS version
* android-studio recommend v3.4.1

### Environment Variable

before getting start, please set env variable to develop machine

```bash
export MOPCON_API_URL="https://mopconXXXXXXXX.com/"
export keystore_password="xxx"
export keystore_alias="xxx"
export keystore_alias_password="xxx"
export MOPCON_DES_KEY="xxx"
```

### Security Files
the security files was encrypted into `secrets.tar.enc` use follow command to decrypt it.

```bash
openssl des-cbc -d -k $MOPCON_DES_KEY -in secrets.tar.enc -out secrets.tar

# extract tar file.
tar xvf ./secrets.tar

# move file to correct folder.
mv release.keystore ./android/app/
mv google-services.json ./android/app/
```

### Install Dependencies

after extract necessary files. use follow command to install dependencies.

```bash
npm i && react-native link
```

### Start Develop

after setting all tool and commands, now we can start develop. To run the code on android simulator, we should create android AVD and open it. After open AVD we can use follow command to install app to simulator.

```bash
npm run android
```

### Build Production APK

Generate release mode APK for React-Native project to publish on PlayStore

```
npm run build:prd
```

### Folder Structure

```
.
├── android                 # android folder
├── appcenter-post-clone.sh # App-Center CI/CD config
├── .travis.yml             # travis CI/CD config
├── app.json 
├── assets
│   └── fonts               # necessary fonts
├── BoothMission.json       # mission game json, it should be extracted from secrets.tar.enc
├── index.js                # react native enter point
├── ios                     # ios folder
├── package.json
├── package-lock.json
├── Quiz.json               # mission game json, it should be extracted from secrets.tar.enc
├── README.md
├── secrets.tar.enc         # encryped secrets files
└── src
    ├── api                 # all api services defined in here.
    ├── components          # common react components
    ├── containers          # main app pages
    ├── images
    ├── locales             # i18n json
    ├── store               # react context 
    ├── theme               # theme constant
    └── utils
```
