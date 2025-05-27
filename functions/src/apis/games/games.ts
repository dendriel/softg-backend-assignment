import { getFirestore } from '../../gateway/firestore/getFirestore.js';
import { memoize } from '../../utils/memoize.js';
import { HttpError } from '../../classes/HttpError.js';

// TODO: caching the results without a expire policy is adequate in here?
const getCollection = memoize(() =>
  getFirestore().collection('games'),
);

// TODO: type the return value so we have control of what is being exposed to the client
export async function getGames() {
  try {
    const result = await getCollection().get();
    return result.docs.map((snap) => snap.data());
  } catch (error) {
    throw new HttpError('Error while fetching games', 500);
  }
}
