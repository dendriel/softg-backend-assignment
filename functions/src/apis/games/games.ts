import { getFirestore } from '../../gateway/firestore';
import { memoize } from '../../utils';
import { NewGameDto } from './dtos';
import { Game } from './';

const getCollection = memoize(() =>
  getFirestore().collection('games'),
);

/**
 * Get all stored games.
 * WARNING: for environments with a lot of games, we should implement pagination.
 * @returns {Promise<Game[]>} A promise that resolves to an array of Game objects.
 */
export async function getGames(): Promise<Game[]> {
  const result = await getCollection().get();
  return result.docs.map((snap) => {
    // Map manually so we can include the ID in the result. Cover entries with auto-generated IDs.
    const data = snap.data();
    return {
      ...data,
      id: snap.id,
    };
  }) as Game[];
}

/**
 * Adds a new game to the collection.
 * @param game The game to be added.
 * @returns the ID of the added game.
 */
export async function addGame(game: NewGameDto): Promise<string> {
  const collection = getCollection();
  const addedGame = await collection.add(game);
  return addedGame.id.toString();
}

/**
 * Deletes a game by its ID.
 * @param id The ID of the game to be deleted.
 * @returns A promise that resolves when the game is deleted.
 */
export async function deleteGame(id: string): Promise<void> {
  const collection = getCollection();
  await collection.doc(id).delete();
}

/**
 * Updates the details of a game.
 * @param id The ID of the game to be updated.
 * @param game The data to be updated in the game (absent fields won't be modified).
 */
export async function editGame(id: string, game: NewGameDto): Promise<void> {
  const collection = getCollection();
  await collection.doc(id).set(game, { merge: true });
}