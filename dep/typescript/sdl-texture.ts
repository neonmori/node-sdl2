import {Lib} from '../ffiHelper';
import * as Ref from 'ref';
import {Int32, PInt32, Pointer, PPVoid, PUint32, PUint8, PVoid, Uint32, Uint8, Void} from "../types";
import {PRect, Rect} from "./sdl-rect";
import {BlendMode} from "./sdl-surface";

export const CTexture = Void;
export const PTexture = PVoid;

let lib = Object.create(null);
Lib({
    SDL_QueryTexture: [Int32, [PTexture, PUint32, PInt32, PInt32, PInt32,]],
    SDL_SetTextureColorMod: [Int32, [PTexture, Uint8, Uint8, Uint8,]],
    SDL_GetTextureColorMod: [Int32, [PTexture, PUint8, PUint8, PUint8,]],
    SDL_SetTextureAlphaMod: [Int32, [PTexture, Uint8,]],
    SDL_GetTextureAlphaMod: [Int32, [PTexture, PUint8,]],
    SDL_SetTextureBlendMode: [Int32, [PTexture, Uint32,]],
    SDL_GetTextureBlendMode: [Int32, [PTexture, PUint32,]],
    SDL_UpdateTexture: [Int32, [PTexture, PRect, PVoid, Int32,]],
    SDL_UpdateYUVTexture: [Int32, [PTexture, PRect, PUint8, Int32, PUint8, Int32, PUint8, Int32,]],
    SDL_LockTexture: [Int32, [PTexture, PRect, PPVoid, PInt32,]],
    SDL_UnlockTexture: [Void, [PTexture,]],
}, lib);

export class Texture {
    constructor(private _texture$: Pointer) {
    }

    get cptr(): Pointer {
        return this._texture$;
    }

    query(): { format: number, access: number, w: number, h: number, res: number } {
        let format$ = Ref.alloc(Uint32);
        let access$ = Ref.alloc(Int32);
        let w$ = Ref.alloc(Int32);
        let h$ = Ref.alloc(Int32);
        let res = lib.SDL_QueryTexture(this._texture$, format$, access$, w$, h$);
        return {format: format$.deref(), access: access$.deref(), w: w$.deref(), h: h$.deref(), res};
    }

    setColorMod(r: number, g: number, b: number): number {
        return lib.SDL_SetTextureColorMod(this._texture$, r, g, b);
    }

    getColorMod(): { r: number, g: number, b: number, res: number } {
        let r$ = Ref.alloc(Uint8);
        let g$ = Ref.alloc(Uint8);
        let b$ = Ref.alloc(Uint8);
        let res = lib.SDL_GetTextureColorMod(this._texture$, r$, g$, b$);
        return {r: r$.deref(), g: g$.deref(), b: b$.deref(), res};
    }

    setAlphaMod(alpha: number): number {
        return lib.SDL_SetTextureAlphaMod(this._texture$, alpha);
    }

    getAlphaMod(): { alpha: number, res: number } {
        let a$ = Ref.alloc(Uint8);
        let res = lib.SDL_GetTextureAlphaMod(this._texture$, a$);
        return {alpha: a$.deref(), res};
    }

    setBlendMode(bm: BlendMode): number {
        return lib.SDL_SetTextureBlendMode(this._texture$, bm);
    }

    getBlendMode(): { bm: BlendMode, res: number } {
        let bm$ = Ref.alloc(Uint32);
        let res = lib.SDL_GetTextureBlendMode(this._texture$, bm$);
        return {bm: bm$.deref(), res};
    }

    update(rect: {x: number, y: number, w: number, h: number}, pixels: Pointer, pitch: number): number {
        return lib.SDL_UpdateTexture(this._texture$, new Rect(rect).ref(), pixels, pitch);
    }

    // TODO updateYUV(rect: {x: number, y: number, w: number, h: number},
    //           yPlane: Pointer, yPitch: number,
    //           uPlane: Pointer, uPitch: number,
    //           vPlane: Pointer, vPitch: number): number {
    //
    // }

    lock(rect: {x: number, y: number, w: number, h: number}): {pixels: Buffer, pitch: number, res: number} {
        let pixels$ = Ref.alloc(Void);
        let pitch$ = Ref.alloc(Int32);
        let res = lib.SDL_LockTexture(this._texture$, new Rect(rect).ref(), pixels$, pitch$);
        let pitch = pitch$.deref();
        let buf$ = new Buffer(pitch * rect.h).ref();
        buf$.writePointer(0, pixels$);
        return {pixels: buf$.deref(), pitch, res};
    }

    unlock() {
        lib.SDL_UnlockTexture(this._texture$);
    }
}