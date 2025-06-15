import {Game} from '../Game';

export interface GamesPaginatedDto {
    data: Game[];
    total: number;
}
