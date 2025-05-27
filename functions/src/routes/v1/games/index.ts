import { wrapAsync, createRouter } from '../../../utils';
import { getGames, addGame, deleteGame, getGame, editGame, Game } from '../../../apis/games';
import { newApiError } from '../../../utils';

export const gamesRouter = createRouter();

gamesRouter.get(
  '/',
  wrapAsync(() => {
    try {
      return getGames();
    } catch (error) {
      throw newApiError('Error while fetching games', error, 500);
    }
  })
);

gamesRouter.post(
  '/',
  wrapAsync(async (req, _res) => {
    const gameData = req.body;
    if (!gameData) {
        throw newApiError('Game data is required', 400);
    }

    try {
      const newGame = await addGame(gameData)
      return newGame;
    } catch (error) {
      throw newApiError('Error while creating a new game', error, 500);
    }
  }, 201)
);

gamesRouter.delete(
  '/:id',
  wrapAsync(async (req, _res) => {
    const { id } = req.params;
    if (!id) {
      throw newApiError('Game ID is required', 400);
    }
    
    try {
      await deleteGame(id);
    } catch (error) {
      throw newApiError(`Error while deleting game with ID ${id}`, 500);
    }
  }, 204)
);


gamesRouter.get(
  '/:id',
  wrapAsync(async (req, _res) => {
    const { id } = req.params;
    if (!id) {
      throw newApiError('Game ID is required', 400);
    }
    
    let game: Game | null = null;
    try {
      game = await getGame(id);
    } catch (error) {
      throw newApiError(`Error while fetching game with ID ${id}`, 500);
    }

    if (!game) {
      throw newApiError(`Game with ID ${id} not found`, 404);
    }
    return game;
  })
);

gamesRouter.patch(
  '/:id',
  wrapAsync(async (req, _res) => {
    const { id } = req.params;
    const gameData = req.body;
    if (!id || !gameData) {
      throw newApiError('Game ID and data are required', 400);
    }

    try {
      await editGame(id, gameData);
    } catch (error) {
      throw newApiError(`Error while updating game with ID ${id}`, 500);
    }
  })
);