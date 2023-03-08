import rook from './rook.svg';
import pawn from './pawn.svg';
import bishop from './bishop.svg';
import knight from './knight.svg';
import queen from './queen.svg';
import king from './king.svg';

/**
 * Adapter a with static method that matches the id of a piece with the correct image
 */
export class PieceImageAdapter {

    /**
     * Returns the image of the corresponding piece (id)
     * 
     * @param id of piece
     * @returns image reference
     */
    static getImageRef(id: string) {
        if (id === "--") return "";
        switch (id.toLowerCase()) {
            case 'pa':
                return pawn;
            case 'bi':
                return bishop;
            case 'kn':
                return knight;
            case 'ro':
                return rook;
            case 'qu':
                return queen;
            case 'ki':
                return king;
            default:
                return "error"; // ID not found
        }
    }
}