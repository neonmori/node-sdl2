import {Lib} from '../ffiHelper';
import * as ArrayType from 'ref-array';
import * as Struct from 'ref-struct';
import * as Ref from 'ref';
import {Float, Int32, PInt32, PUint16, PUint32, PUint8, PVoid, Uint32, Uint8, Void} from "../types";

export enum PixelType {
    SDL_PIXELTYPE_UNKNOWN = 0,
    SDL_PIXELTYPE_INDEX1 = 1,
    SDL_PIXELTYPE_INDEX4 = 2,
    SDL_PIXELTYPE_INDEX8 = 3,
    SDL_PIXELTYPE_PACKED8 = 4,
    SDL_PIXELTYPE_PACKED16 = 5,
    SDL_PIXELTYPE_PACKED32 = 6,
    SDL_PIXELTYPE_ARRAYU8 = 7,
    SDL_PIXELTYPE_ARRAYU16 = 8,
    SDL_PIXELTYPE_ARRAYU32 = 9,
    SDL_PIXELTYPE_ARRAYF16 = 10,
    SDL_PIXELTYPE_ARRAYF32 = 11,
}

export const Color = Struct({
    r: Uint8,
    g: Uint8,
    b: Uint8,
    a: Uint8,
});
export const PColor = Ref.refType(Color);

export const Palette = Struct({
    ncolors: Int32,
    colors: PColor,
    version: Uint32,
    refcount: Int32,
});
export const PPalette = Ref.refType(Palette);

export const PixelFormat = Struct({
    format: Uint32,
    palette: PPalette,
    BitsPerPixel: Uint8,
    BytesPerPixel: Uint8,
    padding: ArrayType(Uint8, 2),
    Rmask: Uint32,
    Gmask: Uint32,
    Bmask: Uint32,
    Amask: Uint32,
    Rloss: Uint8,
    Gloss: Uint8,
    Bloss: Uint8,
    Aloss: Uint8,
    Rshift: Uint8,
    Gshift: Uint8,
    Bshift: Uint8,
    Ashift: Uint8,
    refcount: Int32,
    next: PVoid,
});
export const PPixelFormat = Ref.refType(PixelFormat);

let lib = Object.create(null);
Lib({
    SDL_GetPixelFormatName: [ String, [ Uint32, ] ],
    SDL_PixelFormatEnumToMasks: [ Uint32, [ Uint32, PInt32, PUint32, PUint32, PUint32, PUint32, ] ],
    SDL_MasksToPixelFormatEnum: [ Uint32, [ Int32, Uint32, Uint32, Uint32, Uint32, ] ],
    SDL_AllocFormat: [ PPixelFormat, [ Uint32, ] ],
    SDL_FreeFormat: [ Void, [ PPixelFormat, ] ],
    SDL_AllocPalette: [ PPalette, [ Int32, ] ],
    SDL_SetPixelFormatPalette: [ Int32, [ PPixelFormat, PPalette, ] ],
    SDL_SetPaletteColors: [ Int32, [ PPalette, PColor, Int32, Int32, ] ],
    SDL_FreePalette: [ Void, [ PPalette, ] ],
    SDL_MapRGB: [ Uint32, [ PPixelFormat, Uint8, Uint8, Uint8, ] ],
    SDL_MapRGBA: [ Uint32, [ PPixelFormat, Uint8, Uint8, Uint8, Uint8, ] ],
    SDL_GetRGB: [ Void, [ Uint32, PPixelFormat, PUint8, PUint8, PUint8, ] ],
    SDL_GetRGBA: [ Void, [ Uint32, PPixelFormat, PUint8, PUint8, PUint8, PUint8, ] ],
    SDL_CalculateGammaRamp: [ Void, [ Float, PUint16, ] ],
}, lib);

