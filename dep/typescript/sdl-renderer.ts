import {Lib} from '../ffiHelper';
import * as FFI from 'ffi';
import * as Struct from 'ref-struct';
import * as Ref from 'ref';
import {Int32, Pointer, PUint32, PUint8, PVoid, Uint32, Uint8, Void} from "../types";
import {PPalette, PPixelFormat} from './sdl-pixels';
import {PRect, Rect, RectArray} from "./sdl-rect";
import {PRWOps} from "./sdl-rwops";
import {PTexture, Texture} from "./sdl-texture";
import {Surface} from "./sdl-surface";


let lib = Object.create(null);
Lib({
    SDL_GetNumRenderDrivers: [ int32, [ ] ],
    SDL_GetRenderDriverInfo: [ int32, [ int32, SDL_RendererInfo_ptr, ] ],
    SDL_CreateWindowAndRenderer: [ int32, [ int32, int32, Uint32, SDL_Window_ptr_ptr, SDL_Renderer_ptr_ptr, ] ],
    SDL_CreateRenderer: [ SDL_Renderer_ptr, [ SDL_Window_ptr, int32, Uint32, ] ],
    SDL_CreateSoftwareRenderer: [ SDL_Renderer_ptr, [ SDL_Surface_ptr, ] ],
    SDL_GetRenderer: [ SDL_Renderer_ptr, [ SDL_Window_ptr, ] ],
    SDL_GetRendererInfo: [ int32, [ SDL_Renderer_ptr, SDL_RendererInfo_ptr, ] ],
    SDL_GetRendererOutputSize: [ int32, [ SDL_Renderer_ptr, int32_ptr, int32_ptr, ] ],
    SDL_CreateTexture: [ PTexture, [ SDL_Renderer_ptr, Uint32, int32, int32, int32, ] ],
    SDL_CreateTextureFromSurface: [ PTexture, [ SDL_Renderer_ptr, SDL_Surface_ptr, ] ],
    SDL_RenderTargetSupported: [ uint32, [ SDL_Renderer_ptr, ] ],
    SDL_SetRenderTarget: [ int32, [ SDL_Renderer_ptr, PTexture, ] ],
    SDL_GetRenderTarget: [ PTexture, [ SDL_Renderer_ptr, ] ],
    SDL_RenderSetLogicalSize: [ int32, [ SDL_Renderer_ptr, int32, int32, ] ],
    SDL_RenderGetLogicalSize: [ voit, [ SDL_Renderer_ptr, int32_ptr, int32_ptr, ] ],
    SDL_RenderSetViewport: [ int32, [ SDL_Renderer_ptr, SDL_Rect_ptr, ] ],
    SDL_RenderGetViewport: [ voit, [ SDL_Renderer_ptr, SDL_Rect_ptr, ] ],
    SDL_RenderSetClipRect: [ int32, [ SDL_Renderer_ptr, SDL_Rect_ptr, ] ],
    SDL_RenderGetClipRect: [ voit, [ SDL_Renderer_ptr, SDL_Rect_ptr, ] ],
    SDL_RenderIsClipEnabled: [ uint32, [ SDL_Renderer_ptr, ] ],
    SDL_RenderSetScale: [ int32, [ SDL_Renderer_ptr, float, float, ] ],
    SDL_RenderGetScale: [ voit, [ SDL_Renderer_ptr, float_ptr, float_ptr, ] ],
    SDL_SetRenderDrawColor: [ int32, [ SDL_Renderer_ptr, Uint8, Uint8, Uint8, Uint8, ] ],
    SDL_GetRenderDrawColor: [ int32, [ SDL_Renderer_ptr, Uint8_ptr, Uint8_ptr, Uint8_ptr, Uint8_ptr, ] ],
    SDL_SetRenderDrawBlendMode: [ int32, [ SDL_Renderer_ptr, uint32, ] ],
    SDL_GetRenderDrawBlendMode: [ int32, [ SDL_Renderer_ptr, uint32_ptr, ] ],
    SDL_RenderClear: [ int32, [ SDL_Renderer_ptr, ] ],
    SDL_RenderDrawPoint: [ int32, [ SDL_Renderer_ptr, int32, int32, ] ],
    SDL_RenderDrawPoints: [ int32, [ SDL_Renderer_ptr, SDL_Point_ptr, int32, ] ],
    SDL_RenderDrawLine: [ int32, [ SDL_Renderer_ptr, int32, int32, int32, int32, ] ],
    SDL_RenderDrawLines: [ int32, [ SDL_Renderer_ptr, SDL_Point_ptr, int32, ] ],
    SDL_RenderDrawRect: [ int32, [ SDL_Renderer_ptr, SDL_Rect_ptr, ] ],
    SDL_RenderDrawRects: [ int32, [ SDL_Renderer_ptr, SDL_Rect_ptr, int32, ] ],
    SDL_RenderFillRect: [ int32, [ SDL_Renderer_ptr, SDL_Rect_ptr, ] ],
    SDL_RenderFillRects: [ int32, [ SDL_Renderer_ptr, SDL_Rect_ptr, int32, ] ],
    SDL_RenderCopy: [ int32, [ SDL_Renderer_ptr, PTexture, SDL_Rect_ptr, SDL_Rect_ptr, ] ],
    SDL_RenderCopyEx: [ int32, [ SDL_Renderer_ptr, PTexture, SDL_Rect_ptr, SDL_Rect_ptr, double, SDL_Point_ptr, uint32, ] ],
    SDL_RenderReadPixels: [ int32, [ SDL_Renderer_ptr, SDL_Rect_ptr, Uint32, voit_ptr, int32, ] ],
    SDL_RenderPresent: [ voit, [ SDL_Renderer_ptr, ] ],
    SDL_DestroyTexture: [ voit, [ PTexture, ] ],
    SDL_DestroyRenderer: [ voit, [ SDL_Renderer_ptr, ] ],
    SDL_GL_BindTexture: [ int32, [ PTexture, float_ptr, float_ptr, ] ],
    SDL_GL_UnbindTexture: [ int32, [ PTexture, ] ],
}, lib);

export class Renderer {
    constructor(private _renderer$: Pointer) {

    }

    createTexture(format: number, access: number, w: number, h: number): Texture {
        return new Texture(lib.SDL_CreateTexture(this._renderer$, format, access, w, h));
    }

    createTextureFromSurface(surface: Surface): Texture {
        return new Texture(lib.SDL_CreateTextureFromSurface(this._renderer$, surface.surface));
    }
}