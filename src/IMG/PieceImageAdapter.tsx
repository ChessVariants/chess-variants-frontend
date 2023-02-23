import test from './test.png'

export class PieceImageAdapter {
    // add input: data : JSON, id : string
    static getImageRef(id : string) {
        if (id === "em") return "";
        return test;
    }
}