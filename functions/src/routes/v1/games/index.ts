import {wrapAsync, createRouter} from '../../../utils';
import {
  getGames,
  getGamesPaginated,
  addGame,
  deleteGame,
  getGame,
  editGame,
  Game,
} from '../../../apis/games';
import {newApiError} from '../../../utils';

export const gamesRouter = createRouter();

gamesRouter.get(
  '/',
  wrapAsync(async (req) => {
    const {page, pageSize} = req.query;
    const pageNumber = parseInt(page as string, 10);
    const pageSizeNumber = parseInt(pageSize as string, 10);
    if (isNaN(pageNumber) || isNaN(pageSizeNumber)) {
      throw newApiError('Invalid page/pageSize parameters', 400);
    }

    try {
      if (page && pageSize) {
        return getGamesPaginated(pageNumber, pageSizeNumber);
      } else {
        // DEPRECATED: Non-paginated API call
        return getGames();
      }
    } catch (error: unknown) {
      throw newApiError('Error while fetching games', error, 500);
    }
  }),
);

gamesRouter.post(
  '/',
  wrapAsync(async (req) => {
    const gameData = req.body;
    if (!gameData) {
      throw newApiError('Game data is required', 400);
    }

    try {
      const newGame = await addGame(gameData);
      return newGame;
    } catch (error: unknown) {
      throw newApiError('Error while creating a new game', error, 500);
    }
  }, 201),
);

gamesRouter.delete(
  '/:id',
  wrapAsync(async (req) => {
    const {id} = req.params;
    if (!id) {
      throw newApiError('Game ID is required', 400);
    }

    try {
      await deleteGame(id);
    } catch (error: unknown) {
      throw newApiError(`Error while deleting game with ID ${id}`, error, 500);
    }
  }, 204),
);


gamesRouter.get(
  '/:id',
  wrapAsync(async (req) => {
    const {id} = req.params;
    if (!id) {
      throw newApiError('Game ID is required', 400);
    }

    let game: Game | null = null;
    try {
      game = await getGame(id);
    } catch (error: unknown) {
      throw newApiError(`Error while fetching game with ID ${id}`, error, 500);
    }

    if (!game) {
      throw newApiError(`Game with ID ${id} not found`, 404);
    }
    return game;
  }),
);

gamesRouter.patch(
  '/:id',
  wrapAsync(async (req) => {
    const {id} = req.params;
    const gameData = req.body;
    if (!id || !gameData) {
      throw newApiError('Game ID and data are required', 400);
    }

    try {
      await editGame(id, gameData);
    } catch (error: unknown) {
      throw newApiError(`Error while updating game with ID ${id}`, error, 500);
    }
  }),
);
