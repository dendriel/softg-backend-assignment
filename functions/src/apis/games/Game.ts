import { NewGameDto } from './dtos';

/**
 * Represents a game entity with its details.
 */
// If we need a different interface for the DTO, we should decouple the entity from the DTO.
// For now, to avoid complexity (duplicating interfaces), we use the same interface for both.
export interface Game extends NewGameDto {
    id: string;
}