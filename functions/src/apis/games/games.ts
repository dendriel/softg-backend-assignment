import { getFirestore } from '../../gateway/firestore';
import { memoize } from '../../utils';
import { NewGameDto, NewGameResponseDto } from './dtos';
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
  return result.docs.map((doc) => {
    // Map manually so we can include the ID in the result. Cover entries with auto-generated IDs.
    const data = doc.data();
    return {
      ...data,
      id: doc.id,
    };
  }) as Game[];
}

/**
 * Adds a new game to the collection.
 * @param game The game to be added.
 * @returns the ID of the added game.
 */
export async function addGame(game: NewGameDto): Promise<NewGameResponseDto> {
  const collection = getCollection();
  const addedGame = await collection.add(game);
  return { "id": addedGame.id.toString() };
}

/**
 * Deletes a game by its ID.
 * @param id The ID of the game to be deleted.
 */
export async function deleteGame(id: string): Promise<void> {
  const collection = getCollection();
  await collection.doc(id).delete();
}

/**
 * Get a game by its ID.
 * @param id The ID of the game to be fetch.
 */
export async function getGame(id: string): Promise<Game | null> {
  const collection = getCollection();
  const doc = await collection.doc(id).get();
  if (!doc.exists) {
    return null;
  }

  return { ...doc.data(), id: doc.id } as Game;
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