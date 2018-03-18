import {Lib} from '../ffiHelper';
import * as Struct from 'ref-struct';
import * as Ref from 'ref';
import * as ArrayType from 'ref-array';
import {
    CString, Double, Float, Int32, PFloat, PInt32, Pointer, PPVoid, PUint32, PUint8, PVoid, RGBA, Uint32, Uint8,
    Void, WH, XY, XYWH
} from "../types";
import {Point, PPoint, PRect, Rect} from "./sdl-rect";
import {PTexture, Texture} from "./sdl-texture";
import {BlendMode, PSurface, Surface} from "./sdl-surface";
import {sdlError} from "./sdl-error";

export enum RendererFlags {
    RENDERER_SOFTWARE = 1,
    RENDERER_ACCELERATED = 2,
    RENDERER_PRESENTVSYNC = 4,
    RENDERER_TARGETTEXTURE = 8,
}

export enum TextureAccess {
    TEXTUREACCESS_STATIC = 0,
    TEXTUREACCESS_STREAMING = 1,
    TEXTUREACCESS_TARGET = 2,
}

export enum TextureModulate {
    TEXTUREMODULATE_NONE = 0,
    TEXTUREMODULATE_COLOR = 1,
    TEXTUREMODULATE_ALPHA = 2,
}

export enum RendererFlip {
    FLIP_NONE = 0,
    FLIP_HORIZONTAL = 1,
    FLIP_VERTICAL = 2,
}

export const RendererInfo = Struct({
    name: CString,
    flags: Uint32,
    num_texture_formats: Uint32,
    texture_formats: ArrayType(Uint32, 16),
    max_texture_width: Int32,
    max_texture_height: Int32,
});
export const PRendererInfo = Ref.refType(RendererInfo);
export const PRenderer = PVoid;
export const PPRenderer = PPVoid;

let lib = Object.create(null);
Lib({
    SDL_GetNumRenderDrivers: [Int32, []],
    SDL_GetRenderDriverInfo: [Int32, [Int32, PRendererInfo,]],
    SDL_CreateSoftwareRenderer: [PRenderer, [PSurface,]],

    SDL_GetRendererInfo: [Int32, [PRenderer, PRendererInfo,]],
    SDL_GetRendererOutputSize: [Int32, [PRenderer, PInt32, PInt32,]],

    SDL_CreateTexture: [PTexture, [PRenderer, Uint32, Int32, Int32, Int32,]],
    SDL_CreateTextureFromSurface: [PTexture, [PRenderer, PSurface,]],

    SDL_RenderTargetSupported: [Uint32, [PRenderer,]],
    SDL_SetRenderTarget: [Int32, [PRenderer, PTexture,]],
    SDL_GetRenderTarget: [PTexture, [PRenderer,]],
    SDL_RenderSetLogicalSize: [Int32, [PRenderer, Int32, Int32,]],
    SDL_RenderGetLogicalSize: [Void, [PRenderer, PInt32, PInt32,]],
    SDL_RenderSetViewport: [Int32, [PRenderer, PRect,]],
    SDL_RenderGetViewport: [Void, [PRenderer, PRect,]],
    SDL_RenderSetClipRect: [Int32, [PRenderer, PRect,]],
    SDL_RenderGetClipRect: [Void, [PRenderer, PRect,]],
    SDL_RenderIsClipEnabled: [Uint32, [PRenderer,]],
    SDL_RenderSetScale: [Int32, [PRenderer, Float, Float,]],
    SDL_RenderGetScale: [Void, [PRenderer, PFloat, PFloat,]],
    SDL_SetRenderDrawColor: [Int32, [PRenderer, Uint8, Uint8, Uint8, Uint8,]],
    SDL_GetRenderDrawColor: [Int32, [PRenderer, PUint8, PUint8, PUint8, PUint8,]],
    SDL_SetRenderDrawBlendMode: [Int32, [PRenderer, Uint32,]],
    SDL_GetRenderDrawBlendMode: [Int32, [PRenderer, PUint32,]],

    SDL_RenderClear: [Int32, [PRenderer,]],
    SDL_RenderDrawPoint: [Int32, [PRenderer, Int32, Int32,]],
    SDL_RenderDrawPoints: [Int32, [PRenderer, PPoint, Int32,]],
    SDL_RenderDrawLine: [Int32, [PRenderer, Int32, Int32, Int32, Int32,]],
    SDL_RenderDrawLines: [Int32, [PRenderer, PPoint, Int32,]],
    SDL_RenderDrawRect: [Int32, [PRenderer, PRect,]],
    SDL_RenderDrawRects: [Int32, [PRenderer, PRect, Int32,]],
    SDL_RenderFillRect: [Int32, [PRenderer, PRect,]],
    SDL_RenderFillRects: [Int32, [PRenderer, PRect, Int32,]],
    SDL_RenderCopy: [Int32, [PRenderer, PTexture, PRect, PRect,]],
    SDL_RenderCopyEx: [Int32, [PRenderer, PTexture, PRect, PRect, Double, PPoint, Uint32,]],
    SDL_RenderReadPixels: [Int32, [PRenderer, PRect, Uint32, PVoid, Int32,]],
    SDL_RenderPresent: [Void, [PRenderer,]],
    SDL_DestroyRenderer: [Void, [PRenderer,]],
}, lib);

export class Renderer {
    constructor(private _renderer$: Pointer) {

    }

    get cptr(): Pointer {
        return this._renderer$;
    }

    get info(): {} {
        let renderInfo = new RendererInfo();
        if (0 != lib.SDL_GetRendererInfo(this._renderer$, renderInfo.ref())) {
            throw sdlError();
        }
        return renderInfo;
    }

    get outputSize(): WH {
        let w$ = Ref.alloc(Int32);
        let h$ = Ref.alloc(Int32);
        if (0 != lib.SDL_GetRendererOutputSize(this._renderer$, w$, h$)) {
            throw sdlError();
        }
        return {w: w$.deref(), h: h$.deref()};
    }

    createTexture(format: number, access: number, w: number, h: number): Texture {
        return new Texture(lib.SDL_CreateTexture(this._renderer$, format, access, w, h));
    }

    createTextureFromSurface(surface: Surface): Texture {
        return new Texture(lib.SDL_CreateTextureFromSurface(this._renderer$, surface.cptr));
    }

    targetSupported(): number {
        return lib.SDL_RenderTargetSupported(this._renderer$);
    }

    set target(texture: Texture) {
        if (0 != lib.SDL_SetRenderTarget(this._renderer$, texture.cptr)) {
            throw sdlError();
        }
    }

    get target(): Texture {
        return new Texture(lib.SDL_GetRenderTarget(this._renderer$));
    }

    set logicalSize(size: WH) {
        if (0 != lib.SDL_RenderSetLogicalSize(this._renderer$, size.w, size.h)) {
            throw sdlError();
        }
    }

    get logicalSize(): WH {
        let w$ = Ref.alloc(Int32);
        let h$ = Ref.alloc(Int32);
        lib.SDL_RenderGetLogicalSize(this._renderer$, w$, h$);
        return {w: w$.deref(), h: h$.deref()};
    }

    set viewport(r: XYWH) {
        if (0 != lib.SDL_RenderSetViewport(this._renderer$, new Rect(r).ref())) {
            throw sdlError();
        }
    }

    get viewport(): XYWH {
        let r = new Rect();
        lib.SDL_RenderGetViewport(this._renderer$, r.ref());
        return {x: r.x, y: r.y, w: r.w, h: r.h};
    }

    set clipRect(r: XYWH) {
        if (0 != lib.SDL_RenderSetClipRect(this._renderer$, new Rect(r).ref())) {
            throw sdlError();
        }
    }

    get clipRect(): XYWH {
        let r = new Rect();
        lib.SDL_RenderGetClipRect(this._renderer$, r.ref());
        return {x: r.x, y: r.y, w: r.w, h: r.h};
    }

    get isClipEnabled(): boolean {
        return 0 != lib.SDL_RenderIsClipEnabled(this._renderer$);
    }

    set scale(scale: WH) {
        if (0 != lib.SDL_RenderSetScale(this._renderer$, scale.w, scale.h)) {
            throw sdlError();
        }
    }

    get scale(): WH {
        let w$ = Ref.alloc(Float);
        let h$ = Ref.alloc(Float);
        lib.SDL_RenderGetScale(this._renderer$, w$, h$);
        return {w: w$.deref(), h: h$.deref()};
    }

    set drawColor(color: RGBA) {
        if (0 != lib.SDL_SetRenderDrawColor(this._renderer$, color.r, color.g, color.b, color.a)) {
            throw sdlError();
        }
    }

    get drawColor(): RGBA {
        let r$ = Ref.alloc(Uint8);
        let g$ = Ref.alloc(Uint8);
        let b$ = Ref.alloc(Uint8);
        let a$ = Ref.alloc(Uint8);
        lib.SDL_GetRenderDrawColor(this._renderer$, r$, g$, b$, a$);
        return {r: r$.deref(), g: g$.deref(), b: b$.deref(), a: a$.deref()};
    }

    set blendMode(bm: BlendMode) {
        if (0 != lib.SDL_SetRenderDrawBlendMode(this._renderer$, bm)) {
            throw sdlError();
        }
    }

    get blendMode(): BlendMode {
        let bm$ = Ref.alloc(Uint32);
        if (0 != lib.SDL_GetRenderDrawBlendMode(this._renderer$, bm$)) {
            throw sdlError();
        }
        return bm$.deref();
    }

    // SDL_RenderClear: [Int32, [PRenderer,]],
    clear() {
        if (0 != lib.SDL_RenderClear(this._renderer$)) {
            throw sdlError();
        }
    }

    // SDL_RenderDrawPoint: [Int32, [PRenderer, Int32, Int32,]],
    drawPoint(x: number, y: number) {
        if (0 != lib.SDL_RenderDrawPoint(this._renderer$, x, y)) {
            throw sdlError();
        }
    }

    drawPoints(points: Array<XY>) {
        let buf = new Buffer(Point.size * points.length);
        points.forEach((point: XY, index: number) => {
            buf.set(Point(point).ref(), index * Point.size);
        });
        if (0 != lib.SDL_RenderDrawPoints(this._renderer$, buf, points.length)) {
            throw sdlError();
        }
    }

    drawLine(x1: number, y1: number, x2: number, y2: number) {
        if (0 != lib.SDL_RenderDrawLine(this._renderer$, x1, y1, x2, y2)) {
            throw sdlError();
        }
    }

    drawLines(points: Array<XY>) {
        let buf = new Buffer(Point.size * points.length);
        points.forEach((point: XY, index: number) => {
            buf.set(Point(point).ref(), index * Point.size);
        });
        if (0 != lib.SDL_RenderDrawLines(this._renderer$, buf, points.length)) {
            throw sdlError();
        }
    }

    drawRect(r: XYWH) {
        if (0 != lib.SDL_RenderDrawRect(this._renderer$, new Rect(r).ref())) {
            throw sdlError();
        }
    }

    drawRects(rects: Array<XYWH>) {
        let buf = new Buffer(Rect.size * rects.length);
        rects.forEach((r: XYWH, index: number) => {
            buf.set(Rect(r).ref(), index * Rect.size);
        });
        if (0 != lib.SDL_RenderDrawRects(this._renderer$, buf, rects.length)) {
            throw sdlError();
        }
    }

    fillRect(r: XYWH) {
        if (0 != lib.SDL_RenderFillRect(this._renderer$, new Rect(r).ref())) {
            throw sdlError();
        }
    }

    fillRects(rects: Array<XYWH>) {
        let buf = new Buffer(Rect.size * rects.length);
        rects.forEach((r: XYWH, index: number) => {
            buf.set(Rect(r).ref(), index * Rect.size);
        });
        if (0 != lib.SDL_RenderFillRects(this._renderer$, buf, rects.length)) {
            throw sdlError();
        }
    }

    copy(texture: Texture, src: XYWH, dst: XYWH) {
        if (0 != lib.SDL_RenderCopy(this._renderer$, texture.cptr, Rect(src).ref(), Rect(dst).ref())) {
            throw sdlError();
        }
    }

    copyEx(texture: Texture, src: XYWH, dst: XYWH, angle: number, center: XY, flip: RendererFlip) {
        if (0 != lib.SDL_RenderCopyEx(this._renderer$, texture.cptr, Rect(src).ref(), Rect(dst).ref(), angle, Point(center).ref(), flip)) {
            throw sdlError();
        }
    }

    readPixels(rect: XYWH, format: number, pitch: number): Buffer {
        let _pitch = pitch || 4;
        let buf = new Buffer(rect.w * rect.h * pitch);
        if (0 != lib.SDL_RenderReadPixels(this._renderer$, Rect(rect).ref(), format, buf, _pitch)) {
            throw sdlError();
        }
        return buf;
    }

    present() {
        lib.SDL_RenderPresent(this._renderer$);
    }

    // SDL_DestroyRenderer: [Void, [PRenderer,]],
    destroy() {
        lib.SDL_DestroyRenderer(this._renderer$);
    }

    static getNumRenderDrivers(): number {
        return lib.SDL_GetNumRenderDrivers();
    }

    static getRenderDriverInfo(index: number): { renderInfo: {}, res: number } {
        let renderInfo = new RendererInfo();
        let res = lib.SDL_GetRenderDriverInfo(index, renderInfo.ref());
        return {renderInfo, res};
    }

    static createSoftwareRenderer(surface: Surface): Renderer {
        return new Renderer(lib.SDL_CreateSoftwareRenderer(surface.cptr));
    }
}