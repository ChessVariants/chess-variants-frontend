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
import whiteCircle from './whiteCircle.svg';


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
        if (id === "Du") return duck;
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
            case 'ca':
                return cannon;
            case 'co':
                return commoner;
            case 'fl':
                return flag;
            case 'gi':
                return giraffe;
            case 'ha':
                return halfmoon;
            case 'jo':
                return joker;
            case 'sh':
                return ship;
            case 'kr':
                return knightrotated;
            case 'nr':
                return knightroyal;
            case 'kt':
                return knighttie;
            case 'ku':
                return knightunicorn;
            case 'ok':
                return knightvar1;
            case 'tk':
                return knightvar2;
            case 'kz':
                return knightzebra;
            case 'op':
                return pawnvar1;
            case 'tp':
                return pawnvar2;
            case 'hp':
                return pawnvar3;
            case 'pl':
                return plus;
            case 'st':
                return supertower;
            case 'ts':
                return telescope;
            case 'to':
                return tower;
            case 'wc':
                return whiteCircle;
            default:
                return "error"; // ID not found

        }
    }
}