import {Lib} from '../ffiHelper';
import * as FFI from 'ffi';
import * as Struct from 'ref-struct';
import * as Ref from 'ref';
import {Int32, Pointer, PUint32, PUint8, PVoid, Uint32, Uint8, Void} from "../types";
import {PPalette, PPixelFormat} from './sdl-pixels';
import {PRect, Rect} from "./sdl-rect";
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
    constructor(private _surface: Pointer) {
    }

    get w(): number {
        // (*_surface).w === _surface->w
        return this._surface.deref().w;
    }

    get h(): number {
        return this._surface.deref().h;
    }

    free(): void {
        lib.SDL_FreeSurface(this._surface);
    }

    // TODO: palette.unpack()
    setPalette(palette: any): Int32 {
        // palette: *Palette
        return lib.SDL_SetSurfacePalette(this._surface, palette);
    }

    lock(): Int32 {
        return lib.SDL_LockSurface(this._surface);
    }

    unlock(): void {
        lib.SDL_UnlockSurface(this._surface);
    }

    // SDL_SaveBMP_RW: [ Int32, [ PSurface, PRWOps, Int32, ] ],
    saveBMP_RW(dst: Pointer, freeDst: Int32): Int32 {
        return lib.SDL_SaveBMP_RW(this._surface, dst, freeDst);
    }

    // SaveBMP saves the surface to a BMP file.
    // (https://wiki.libsdl.org/SDL_SaveBMP)
    // func (surface *Surface) SaveBMP(file string) error {
    //     return surface.SaveBMPRW(RWFromFile(file, "wb"), 1)
    // }

    setRLE(flag: Int32): Int32 {
        return lib.SDL_SetSurfaceRLE(this._surface, flag);
    }

    setColorKey(flag: Int32, key: Uint32): Int32 {
        return lib.SDL_SetColorKey(this._surface, flag, key);
    }

    getColorKey(): { key: Uint32, res: Int32 } {
        let key_p = Ref.alloc(Uint32);
        let r = lib.SDL_GetColorKey(this._surface, key_p);
        return {key: key_p.deref(), res: r};
    }

    // SDL_SetSurfaceColorMod: [ Int32, [ PSurface, Uint8, Uint8, Uint8, ] ],

    // SDL_GetSurfaceColorMod: [ Int32, [ PSurface, PUint8, PUint8, PUint8, ] ],
    // SDL_SetSurfaceAlphaMod: [ Int32, [ PSurface, Uint8, ] ],
    // SDL_GetSurfaceAlphaMod: [ Int32, [ PSurface, PUint8, ] ],
    // SDL_SetSurfaceBlendMode: [ Int32, [ PSurface, Uint32, ] ],
    // SDL_GetSurfaceBlendMode: [ Int32, [ PSurface, PUint32, ] ],


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
}
