import {getFirestore} from '../../gateway/firestore';
import {memoize} from '../../utils';
import {SaveGameDto, SaveGameResponseDto} from './dtos';
import {Game} from './';

const getCollection = memoize(() =>
  getFirestore().collection('games'),
);

/**
 * Get all stored games.
 * WARNING: for environments with a lot of games, we should implement pagination.
 * @return {Promise<Game[]>} A promise that resolves to an array of Game objects.
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
 * @param {SaveGameDto} game The game to be added.
 * @return {Promise<SaveGameResponseDto>} the ID of the added game.
 */
export async function addGame(game: SaveGameDto): Promise<SaveGameResponseDto> {
  const collection = getCollection();
  const addedGame = await collection.add(game);
  return {'id': addedGame.id.toString()};
}

/**
 * Deletes a game by its ID.
 * @param {string} id The ID of the game to be deleted.
 * @return {Promise<void>} A promise that resolves when the game is deleted.
 */
export async function deleteGame(id: string): Promise<void> {
  const collection = getCollection();
  await collection.doc(id).delete();
}

/**
 * Get a game by its ID.
 * @param {string} id The ID of the game to be fetch.
 * @return {Promise<Game | null>} A promise that resolves to the Game object if found, or null if
 * not found.
 */
export async function getGame(id: string): Promise<Game | null> {
  const collection = getCollection();
  const doc = await collection.doc(id).get();
  if (!doc.exists) {
    return null;
  }

  return {...doc.data(), id: doc.id} as Game;
}

/**
 * Updates the details of a game.
 * @param {string} id The ID of the game to be updated.
 * @param {SaveGameDto} game The data to be updated in the game (absent fields won't be modified).
 * @return {Promise<void>} A promise that resolves when the game is updated.
 */
export async function editGame(id: string, game: SaveGameDto): Promise<void> {
  const collection = getCollection();
  await collection.doc(id).set(game, {merge: true});
}
