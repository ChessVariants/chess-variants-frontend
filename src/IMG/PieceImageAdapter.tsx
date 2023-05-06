import rook from './rook.svg';
import pawn from './pawn.svg';
import bishop from './bishop.svg';
import knight from './knight.svg';
import queen from './queen.svg';
import king from './king.svg';

import cannon from './cannon.svg'
import commoner from './commoner.svg'
import flag from './flag.svg'
import giraffe from './giraffe.svg'
import halfmoon from './halfmoon.svg'
import joker from './joker.svg'
import knightrotated from './knightrotated.svg'
import knightroyal from './knightroyal.svg'
import knighttie from './knighttie.svg'
import knightunicorn from './knightunicorn.svg'
import knightvar1 from './knightvar1.svg'
import knightvar2 from './knightvar2.svg'
import knightzebra from './knightzebra.svg'
import pawnvar1 from './pawnvar1.svg'
import pawnvar2 from './pawnvar2.svg'
import pawnvar3 from './pawnvar3.svg'
import plus from './plus.svg'
import ship from './ship.svg'
import supertower from './supertower.svg'
import telescope from './telescope.svg'
import tower from './tower.svg'
import duck from './duck.svg'


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