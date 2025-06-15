import type {Firestore} from 'firebase-admin/firestore';
import {getFirestore as createFirestore} from 'firebase-admin/firestore';
import {getApp} from '../firebase-admin/getApp.js';
import {memoize} from '../../utils/memoize.js';

// here memoize allows to make a Singleton from Firestore, which makes sense
export const getFirestore = memoize((): Firestore => createFirestore(getApp()));
