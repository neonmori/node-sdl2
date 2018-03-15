import {Lib} from '../ffiHelper';
import * as Struct from 'ref-struct';
import * as Ref from 'ref';
import {Int32, PInt32, PPVoid, PVoid, Uint32, Void} from "../types";

// export const Pixel

let lib = Object.create(null);
Lib({
    // SDL_CreateRGBSurface: [ SDL_Surface_ptr, [ Uint32, int32, int32, int32, Uint32, Uint32, Uint32, Uint32, ] ],
    // SDL_CreateRGBSurfaceFrom: [ SDL_Surface_ptr, [ voit_ptr, int32, int32, int32, int32, Uint32, Uint32, Uint32, Uint32, ] ],
    // SDL_FreeSurface: [ voit, [ SDL_Surface_ptr, ] ],
    // SDL_SetSurfacePalette: [ int32, [ SDL_Surface_ptr, SDL_Palette_ptr, ] ],
    // SDL_LockSurface: [ int32, [ SDL_Surface_ptr, ] ],
    // SDL_UnlockSurface: [ voit, [ SDL_Surface_ptr, ] ],
    // SDL_LoadBMP_RW: [ SDL_Surface_ptr, [ SDL_RWops_ptr, int32, ] ],
    // SDL_SaveBMP_RW: [ int32, [ SDL_Surface_ptr, SDL_RWops_ptr, int32, ] ],
    // SDL_SetSurfaceRLE: [ int32, [ SDL_Surface_ptr, int32, ] ],
    // SDL_SetColorKey: [ int32, [ SDL_Surface_ptr, int32, Uint32, ] ],
    // SDL_GetColorKey: [ int32, [ SDL_Surface_ptr, Uint32_ptr, ] ],
    // SDL_SetSurfaceColorMod: [ int32, [ SDL_Surface_ptr, Uint8, Uint8, Uint8, ] ],
    // SDL_GetSurfaceColorMod: [ int32, [ SDL_Surface_ptr, Uint8_ptr, Uint8_ptr, Uint8_ptr, ] ],
    // SDL_SetSurfaceAlphaMod: [ int32, [ SDL_Surface_ptr, Uint8, ] ],
    // SDL_GetSurfaceAlphaMod: [ int32, [ SDL_Surface_ptr, Uint8_ptr, ] ],
    // SDL_SetSurfaceBlendMode: [ int32, [ SDL_Surface_ptr, uint32, ] ],
    // SDL_GetSurfaceBlendMode: [ int32, [ SDL_Surface_ptr, uint32_ptr, ] ],
    // SDL_SetClipRect: [ uint32, [ SDL_Surface_ptr, SDL_Rect_ptr, ] ],
    // SDL_GetClipRect: [ voit, [ SDL_Surface_ptr, SDL_Rect_ptr, ] ],
    // SDL_ConvertSurface: [ SDL_Surface_ptr, [ SDL_Surface_ptr, SDL_PixelFormat_ptr, Uint32, ] ],
    // SDL_ConvertSurfaceFormat: [ SDL_Surface_ptr, [ SDL_Surface_ptr, Uint32, Uint32, ] ],
    // SDL_ConvertPixels: [ int32, [ int32, int32, Uint32, voit_ptr, int32, Uint32, voit_ptr, int32, ] ],
    // SDL_FillRect: [ int32, [ SDL_Surface_ptr, SDL_Rect_ptr, Uint32, ] ],
    // SDL_FillRects: [ int32, [ SDL_Surface_ptr, SDL_Rect_ptr, int32, Uint32, ] ],
    // SDL_UpperBlit: [ int32, [ SDL_Surface_ptr, SDL_Rect_ptr, SDL_Surface_ptr, SDL_Rect_ptr, ] ],
    // SDL_LowerBlit: [ int32, [ SDL_Surface_ptr, SDL_Rect_ptr, SDL_Surface_ptr, SDL_Rect_ptr, ] ],
    // SDL_SoftStretch: [ int32, [ SDL_Surface_ptr, SDL_Rect_ptr, SDL_Surface_ptr, SDL_Rect_ptr, ] ],
    // SDL_UpperBlitScaled: [ int32, [ SDL_Surface_ptr, SDL_Rect_ptr, SDL_Surface_ptr, SDL_Rect_ptr, ] ],
    // SDL_LowerBlitScaled: [ int32, [ SDL_Surface_ptr, SDL_Rect_ptr, SDL_Surface_ptr, SDL_Rect_ptr, ] ],
}, lib);