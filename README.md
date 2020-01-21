# expo-firebase-demo

- [View as a website](https://expo-firebase-demo.web.app/)


## Firebase Deploy

The following steps describe how to deploy the firebase cloud settings to your project.

### Prerequisites

- [Install Firebase CLI globally](https://firebase.google.com/docs/cli#setup_update_cli)
```
$ npm install -g firebase-tools
```

- [Login to Firebase](https://firebase.google.com/docs/cli#sign-in-test-cli)
```
$ firebase login
```

- Select your Firebase project
```
$ firebase projects:list
$ firebase use <your-project>
```

### Commands

When all prerequisites have been met, you can deploy the config using the following commands.

- [Deploy all config](https://firebase.google.com/docs/cli#deployment)
```
$ firebase deploy
```

- Deploy the built website
```
$ expo web:build
$ firebase deploy --only hosting
```


- Deploy the Firestore rules only
```
$ firebase deploy --only firestore:rules
```

- Deploy the Firestore database indexes only
```
$ firebase deploy --only firestore:indexes
```

- Deploy the Storage rules only
```
$ firebase deploy --only storage:rules
```
