/**
 * DTOs for creating/updating a game.
 */

export interface Players {
  min: number;
  max?: number;
}

export interface SaveGameDto {
    name: string;
    players: Players;
    type: string;
    releaseYear?: number;
    publisher?: string;
    baseGame?: string;
    expansions?: string[];
    standalone?: boolean;
    // If we want to be strict with type. But it would require changing the code for each new type.
    //type: 'BaseGame' | 'Expansion' 
}