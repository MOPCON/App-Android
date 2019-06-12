# App-Android
MOPCON App for Android build by react-native 0.59.8

[![Build Status](https://travis-ci.org/MOPCON/App-Android.svg?branch=master)](https://travis-ci.org/MOPCON/App-Android)


### Install Command and Develop Tool
this project develop with react-native, so before getting start, we should install below command and tool.

* nodejs recommend v10 LTS version
* jdk8
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
sh appcenter-post-clone.sh
```

If you need to add files into `secrets.tar.enc`, you can follow below command

```bash
# compress multiple files into single tar file.
tar -czvf secrets.tar aaa.json bbb.json
# use environment key to encrypt tar file.
openssl des-cbc -e -k $MOPCON_DES_KEY -in secrets.tar -out secrets.tar.enc
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

### Coding Style 

the coding style in below link, all the developer should follow it.

https://github.com/letmeknowhow/react-native-coding-style

### Git Flow

We use the simplified git-flow to improve team development speed. Unlike the standard git-flow, we don't have a release branch.

![Imgur](https://i.imgur.com/VtzQ17K.png)

When a feature branch is finished, you must submit a **Pull Request** to develop branch.

Don't forget assign your partner to review it.

### App Version

The App Version use Semantic Versioning concept.

The Semantic Versioning concept is simple: all versions have 3 digits: x.y.z.

* the first digit is the major version
* the second digit is the minor version
* the third digit is the patch version

When you make a new release, you don’t just up a number as you please, but you have rules:

* up the major version when you make incompatible API changes 
* up the minor version when you add functionality in a backward-compatible manner
* up the patch version when you make backward-compatible bug fixes

```
npm version [major|minor|patch] --no-git-tag-version
```