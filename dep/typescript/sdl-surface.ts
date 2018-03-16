import {Lib} from '../ffiHelper';
import * as FFI from 'ffi';
import * as Struct from 'ref-struct';
import * as Ref from 'ref';
import {Int32, Pointer, PUint32, PUint8, PVoid, Uint32, Uint8, Void} from "../types";
import {PPalette, PPixelFormat} from './sdl-pixels';
import {PRect, Rect, RectArray} from "./sdl-rect";
import {PRWOps} from "./sdl-rwops";

export enum BlendMode {
    SDL_BLENDMODE_NONE = 0,
    SDL_BLENDMODE_BLEND = 1,
    SDL_BLENDMODE_ADD = 2,
    SDL_BLENDMODE_MOD = 4,
}

export const BlitMap = Void;
export const PBlitMap = PVoid;
export const cSurface = Struct({
    flags: Uint32,
    format: PPixelFormat,
    w: Int32,
    h: Int32,
    pitch: Int32,
    pixels: PVoid,
    userdata: PVoid,
    locked: Int32,
    lock_data: PVoid,
    clip_rect: Rect,
    map: PBlitMap,
    refcount: Int32,
});
export const PSurface = Ref.refType(cSurface);
export const blit = FFI.Function(Int32, [PSurface, PRect, PSurface, PRect,]);

let lib = Object.create(null);
Lib({
    SDL_CreateRGBSurface: [PSurface, [Uint32, Int32, Int32, Int32, Uint32, Uint32, Uint32, Uint32,]],
    SDL_CreateRGBSurfaceFrom: [PSurface, [PVoid, Int32, Int32, Int32, Int32, Uint32, Uint32, Uint32, Uint32,]],
    SDL_FreeSurface: [Void, [PSurface,]],
    SDL_SetSurfacePalette: [Int32, [PSurface, PPalette,]],
    SDL_LockSurface: [Int32, [PSurface,]],
    SDL_UnlockSurface: [Void, [PSurface,]],
    SDL_LoadBMP_RW: [PSurface, [PRWOps, Int32,]],
    SDL_SaveBMP_RW: [Int32, [PSurface, PRWOps, Int32,]],
    SDL_SetSurfaceRLE: [Int32, [PSurface, Int32,]],
    SDL_SetColorKey: [Int32, [PSurface, Int32, Uint32,]],
    SDL_GetColorKey: [Int32, [PSurface, PUint32,]],
    SDL_SetSurfaceColorMod: [Int32, [PSurface, Uint8, Uint8, Uint8,]],
    SDL_GetSurfaceColorMod: [Int32, [PSurface, PUint8, PUint8, PUint8,]],
    SDL_SetSurfaceAlphaMod: [Int32, [PSurface, Uint8,]],
    SDL_GetSurfaceAlphaMod: [Int32, [PSurface, PUint8,]],
    SDL_SetSurfaceBlendMode: [Int32, [PSurface, Uint32,]],
    SDL_GetSurfaceBlendMode: [Int32, [PSurface, PUint32,]],
    SDL_SetClipRect: [Uint32, [PSurface, PRect,]],
    SDL_GetClipRect: [Void, [PSurface, PRect,]],
    SDL_ConvertSurface: [PSurface, [PSurface, PPixelFormat, Uint32,]],
    SDL_ConvertSurfaceFormat: [PSurface, [PSurface, Uint32, Uint32,]],
    SDL_ConvertPixels: [Int32, [Int32, Int32, Uint32, PVoid, Int32, Uint32, PVoid, Int32,]],
    SDL_FillRect: [Int32, [PSurface, PRect, Uint32,]],
    SDL_FillRects: [Int32, [PSurface, PRect, Int32, Uint32,]],
    SDL_UpperBlit: [Int32, [PSurface, PRect, PSurface, PRect,]],
    SDL_LowerBlit: [Int32, [PSurface, PRect, PSurface, PRect,]],
    SDL_SoftStretch: [Int32, [PSurface, PRect, PSurface, PRect,]],
    SDL_UpperBlitScaled: [Int32, [PSurface, PRect, PSurface, PRect,]],
    SDL_LowerBlitScaled: [Int32, [PSurface, PRect, PSurface, PRect,]],
}, lib);

export class Surface {
    constructor(private _surface$: Pointer) {
    }

    get surface(): Pointer {
        return this._surface$;
    }

    get w(): number {
        // (*_surface).w === _surface->w
        return this._surface$.deref().w;
    }

    get h(): number {
        return this._surface$.deref().h;
    }

    free(): void {
        lib.SDL_FreeSurface(this._surface$);
    }

    // TODO: palette.unpack()
    setPalette(palette: any): Int32 {
        // palette: *Palette
        return lib.SDL_SetSurfacePalette(this._surface$, palette);
    }

    lock(): Int32 {
        return lib.SDL_LockSurface(this._surface$);
    }

    unlock(): void {
        lib.SDL_UnlockSurface(this._surface$);
    }

    // SDL_SaveBMP_RW: [ Int32, [ PSurface, PRWOps, Int32, ] ],
    saveBMP_RW(dst: Pointer, freeDst: Int32): Int32 {
        return lib.SDL_SaveBMP_RW(this._surface$, dst, freeDst);
    }

    // SaveBMP saves the surface to a BMP file.
    // (https://wiki.libsdl.org/SDL_SaveBMP)
    // func (surface *Surface) SaveBMP(file string) error {
    //     return surface.SaveBMPRW(RWFromFile(file, "wb"), 1)
    // }

    setRLE(flag: number): number {
        return lib.SDL_SetSurfaceRLE(this._surface$, flag);
    }

    setColorKey(flag: number, key: number): number {
        return lib.SDL_SetColorKey(this._surface$, flag, key);
    }

    getColorKey(): { key: number, res: number } {
        let key$ = Ref.alloc(Uint32);
        let res = lib.SDL_GetColorKey(this._surface$, key$);
        return {key: key$.deref(), res};
    }

    setColorMod(r: number, g: number, b: number): number {
        return lib.SDL_SetSurfaceColorMod(this._surface$, r, g, b);
    }

    getColorMod(): { r: number, g: number, b: number, res: number } {
        let r$ = Ref.alloc(Uint8);
        let g$ = Ref.alloc(Uint8);
        let b$ = Ref.alloc(Uint8);

        let res = lib.SDL_GetSurfaceColorMod(this._surface$, r$, g$, b$);

        return {r: r$.deref(), g: g$.deref(), b: b$.deref(), res};
    }

    setAlphaMod(alpha: number): number {
        return lib.SDL_SetSurfaceAlphaMod(this._surface$, +alpha);
    }

    getAlphaMod(): { alpha: number, res: number } {
        let alpha$ = Ref.alloc(Uint8);
        let res = lib.SDL_GetSurfaceAlphaMod(this._surface$, alpha$);
        return {alpha: alpha$.deref(), res};
    }

    setBlendMode(bm: BlendMode): number {
        return lib.SDL_SetSurfaceBlendMode(this._surface$, bm);
    }

    getBlendMode(): { mode: BlendMode, res: number } {
        let mode$ = Ref.alloc(Uint8);
        let res = lib.SDL_GetSurfaceBlendMode(this._surface$, mode$);
        return {mode: mode$.deref(), res};
    }

    setClipRect(x: number, y: number, w: number, h: number): number {
        let rect = new Rect({x, y, w, h});
        return lib.SDL_SetClipRect(this._surface$, rect.ref());
    }

    getClipRect(): { x: number, y: number, w: number, h: number } {
        let rect = new Rect();
        lib.SDL_GetClipRect(this._surface$, rect.ref());
        return {x: rect.x, y: rect.y, w: rect.w, h: rect.h};
    }

    convert(pixelFormatPtr: Pointer, flags: number): Surface {
        return new Surface(lib.SDL_ConvertSurface(this._surface$, pixelFormatPtr, flags));
    }

    convertFormat(pixelFormat: number, flags: number): Surface {
        return new Surface(lib.SDL_ConvertSurfaceFormat(this._surface$, pixelFormat, flags));
    }

    fillRect(x: number, y: number, w: number, h: number, color: number): number {
        let rect = new Rect({x, y, w, h});
        return lib.SDL_FillRect(this._surface$, rect.ref(), color);
    }

    fillRects(rects:Array<{x: number, y: number, w: number, h: number}>, color: number): number {
        let rectList = new RectArray(rects.length);
        rects.forEach((rect: {x: number, y: number, w: number, h: number}, index: number) => {
            rectList[index] = new Rect({x: rect.x, y: rect.y, w: rect.w, h:rect.h});
        });
        return lib.SDL_FillRects(this._surface$, rectList, rects.length, color);
    }

    upperBlit(srcRect: {x: number, y: number, w: number, h: number},
              dst: Surface, dstRect: {x: number, y: number, w: number, h: number}): number {
        return lib.SDL_UpperBlit(this._surface$, new Rect(srcRect).ref(), dst._surface$, new Rect(dstRect).ref());
    }

    lowerBlit(srcRect: {x: number, y: number, w: number, h: number},
              dst: Surface, dstRect: {x: number, y: number, w: number, h: number}): number {
        return lib.SDL_LowerBlit(this._surface$, new Rect(srcRect).ref(), dst._surface$, new Rect(dstRect).ref());
    }

    softStretch(srcRect: {x: number, y: number, w: number, h: number},
                dst: Surface, dstRect: {x: number, y: number, w: number, h: number}): number {
        return lib.SDL_SoftStretch(this._surface$, new Rect(srcRect).ref(), dst._surface$, new Rect(dstRect).ref());
    }

    upperBlitScaled(srcRect: {x: number, y: number, w: number, h: number},
              dst: Surface, dstRect: {x: number, y: number, w: number, h: number}): number {
        return lib.SDL_UpperBlitScaled(this._surface$, new Rect(srcRect).ref(), dst._surface$, new Rect(dstRect).ref());
    }

    lowerBlitScaled(srcRect: {x: number, y: number, w: number, h: number},
              dst: Surface, dstRect: {x: number, y: number, w: number, h: number}): number {
        return lib.SDL_LowerBlitScaled(this._surface$, new Rect(srcRect).ref(), dst._surface$, new Rect(dstRect).ref());
    }
    static createRGBSurface(flags: Uint32, width: Int32, height: Int32, depth: Int32,
                            Rmask: Uint32, Gmask: Uint32, Bmask: Uint32, Amask: Uint32): Surface {
        return new Surface(lib.SDL_CreateRGBSurface(flags, width, height, depth, Rmask, Gmask, Bmask, Amask));
    }

    static createRGBSurfaceFrom(pixels: Pointer, width: Int32, height: Int32, depth: Int32, pitch: Int32,
                                Rmask: Uint32, Gmask: Uint32, Bmask: Uint32, Amask: Uint32): Surface {
        return new Surface(lib.SDL_CreateRGBSurfaceFrom(pixels, width, height, depth, pitch, Rmask, Gmask, Bmask, Amask));
    }

    static loadBMP_RW(src: Pointer, freeSrc: Int32): Surface {
        return new Surface(lib.SDL_LoadBMP_RW(src, freeSrc));
    }

    static convertPixels(width: number, height: number, srcFormat: number, src: Pointer, srcPitch: number,
                         dstFormat: number, dst: Pointer, dstPitch: number): number {
        return lib.SDL_ConvertPixels(width, height, srcFormat, src, srcPitch, dstFormat, dst, dstPitch);
    }
}
