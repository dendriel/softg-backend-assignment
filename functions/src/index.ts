import {https} from 'firebase-functions/v2';
import {app} from './app.js';

export const admin = https.onRequest(
  {
    region: 'europe-west3',
    minInstances: 0,
    maxInstances: 1,
    concurrency: 10,
    memory: '128MiB',
    cpu: 1,
    timeoutSeconds: 60,
    cors: true,
  },
  app,
);
