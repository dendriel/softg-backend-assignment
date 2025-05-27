import { wrapAsync, createRouter } from '../../../utils';
import { getGames, addGame, deleteGame, editGame } from '../../../apis/games';
import { HttpError } from '../../../classes';

export const gamesRouter = createRouter();

gamesRouter.get(
  '/',
  wrapAsync(() => {
    try {
      return getGames();
    } catch (error) {
      throw new HttpError('Error while fetching games', 500);
    }
  })
);

gamesRouter.post(
  '/',
  wrapAsync(async (req, res) => {
    const gameData = req.body;
    if (!gameData) {
        throw new HttpError('Game data is required', 400);
    }

    try {
      const newGame = await addGame(gameData)
      return newGame;
  } catch (error) {
    throw new HttpError('Error while adding a new game', 500);
  }
  }, 201)
);

gamesRouter.delete(
  '/:id',
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    if (!id) {
      throw new HttpError('Game ID is required', 400);
    }
    
    try {
      await deleteGame(id);
    } catch (error) {
      throw new HttpError(`Error while deleting game with ID ${id}`, 500);
    }
  }, 204)
)

gamesRouter.patch(
  '/:id',
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const gameData = req.body;
    if (!id || !gameData) {
      throw new HttpError('Game ID and data are required', 400);
    }

    try {
      await editGame(id, gameData);
    } catch (error) {
      throw new HttpError(`Error while updating game with ID ${id}`, 500);
    }
  })
)