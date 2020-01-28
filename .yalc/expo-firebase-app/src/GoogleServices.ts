import { CodedError } from '@unimodules/core';
import Constants from 'expo-constants';
import { FirebaseOptions } from './FirebaseApp.types';

export function getFirebaseOptionsFromAndroidGoogleServicesFile(
  googleServicesJson: any
): FirebaseOptions {
  // TODO make this solid
  const projectInfo = googleServicesJson['project_info'];
  const client = googleServicesJson.client[0];
  const projectId = projectInfo.project_id;
  const messagingSenderId = projectInfo.project_number;
  const databaseURL = projectInfo.firebase_url;
  const storageBucket = projectInfo.storage_bucket;
  const appId = client.client_info.mobilesdk_app_id;
  const analyticsService = client.services['analytics-service'];
  const trackingId = analyticsService ? analyticsService.analytics_property.tracking_id : undefined;
  const apiKey = client.api_key[0].current_key;
  const authDomain = `${projectId}.firebaseapp.com`;
  return {
    appId,
    trackingId,
    apiKey,
    authDomain,
    projectId,
    messagingSenderId,
    databaseURL,
    storageBucket,
  };
}

export function getFirebaseOptionsFromAndroidManifest(): FirebaseOptions {
  const { manifest } = Constants;
  if (!manifest) throw new CodedError('ERR_MANIFEST', 'Manifest not available');
  const { googleServicesFile } = manifest;
  if (!googleServicesFile)
    throw new CodedError('ERR_MANIFEST', 'GoogleServicesFile is not configured in app.json');
  const json = JSON.parse(googleServicesFile);
  return getFirebaseOptionsFromAndroidGoogleServicesFile(json);
}

export function getFirebaseOptionsFromManifest(): FirebaseOptions {
  return getFirebaseOptionsFromAndroidManifest();
}
