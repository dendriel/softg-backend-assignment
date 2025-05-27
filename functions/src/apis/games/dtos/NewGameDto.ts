/**
 * DTOs for creating a new game.
 */

export interface Players {
  min: number;
  max?: number;
}

export interface NewGameDto {
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