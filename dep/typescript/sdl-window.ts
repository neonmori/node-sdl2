import {Lib} from '../ffiHelper';
import * as FFI from 'ffi';
import * as Struct from 'ref-struct';
import * as Ref from 'ref';
import * as ArrayType from 'ref-array';
import {
    CString, Double, Float, Int32, PFloat, PInt32, Pointer, PPVoid, PUint16, PUint32, PUint8, PVoid, RGBA, Uint32,
    Uint8,
    Void, WH, XY, XYWH
} from "../types";
import {Point, PPoint, PRect, Rect} from "./sdl-rect";
import {PTexture, Texture} from "./sdl-texture";
import {BlendMode, PSurface, Surface} from "./sdl-surface";
import {sdlError} from "./sdl-error";
import {PPRenderer, PRenderer, Renderer, RendererFlags} from "./sdl-renderer";

export enum WindowFlags {
    WINDOW_FULLSCREEN = 1,
    WINDOW_OPENGL = 2,
    WINDOW_SHOWN = 4,
    WINDOW_HIDDEN = 8,
    WINDOW_BORDERLESS = 16,
    WINDOW_RESIZABLE = 32,
    WINDOW_MINIMIZED = 64,
    WINDOW_MAXIMIZED = 128,
    WINDOW_INPUT_GRABBED = 256,
    WINDOW_INPUT_FOCUS = 512,
    WINDOW_MOUSE_FOCUS = 1024,
    WINDOW_FULLSCREEN_DESKTOP = 4097,
    WINDOW_FOREIGN = 2048,
    WINDOW_ALLOW_HIGHDPI = 8192,
    WINDOW_MOUSE_CAPTURE = 16384,
}

export enum WindowEventID {
    WINDOWEVENT_NONE = 0,
    WINDOWEVENT_SHOWN = 1,
    WINDOWEVENT_HIDDEN = 2,
    WINDOWEVENT_EXPOSED = 3,
    WINDOWEVENT_MOVED = 4,
    WINDOWEVENT_RESIZED = 5,
    WINDOWEVENT_SIZE_CHANGED = 6,
    WINDOWEVENT_MINIMIZED = 7,
    WINDOWEVENT_MAXIMIZED = 8,
    WINDOWEVENT_RESTORED = 9,
    WINDOWEVENT_ENTER = 10,
    WINDOWEVENT_LEAVE = 11,
    WINDOWEVENT_FOCUS_GAINED = 12,
    WINDOWEVENT_FOCUS_LOST = 13,
    WINDOWEVENT_CLOSE = 14,
}

export enum GLattr {
    GL_RED_SIZE = 0,
    GL_GREEN_SIZE = 1,
    GL_BLUE_SIZE = 2,
    GL_ALPHA_SIZE = 3,
    GL_BUFFER_SIZE = 4,
    GL_DOUBLEBUFFER = 5,
    GL_DEPTH_SIZE = 6,
    GL_STENCIL_SIZE = 7,
    GL_ACCUM_RED_SIZE = 8,
    GL_ACCUM_GREEN_SIZE = 9,
    GL_ACCUM_BLUE_SIZE = 10,
    GL_ACCUM_ALPHA_SIZE = 11,
    GL_STEREO = 12,
    GL_MULTISAMPLEBUFFERS = 13,
    GL_MULTISAMPLESAMPLES = 14,
    GL_ACCELERATED_VISUAL = 15,
    GL_RETAINED_BACKING = 16,
    GL_CONTEXT_MAJOR_VERSION = 17,
    GL_CONTEXT_MINOR_VERSION = 18,
    GL_CONTEXT_EGL = 19,
    GL_CONTEXT_FLAGS = 20,
    GL_CONTEXT_PROFILE_MASK = 21,
    GL_SHARE_WITH_CURRENT_CONTEXT = 22,
    GL_FRAMEBUFFER_SRGB_CAPABLE = 23,
    GL_CONTEXT_RELEASE_BEHAVIOR = 24,
}

export enum GLprofile {
    GL_CONTEXT_PROFILE_CORE = 1,
    GL_CONTEXT_PROFILE_COMPATIBILITY = 2,
    GL_CONTEXT_PROFILE_ES = 4,
}

export enum GLcontextFlag {
    GL_CONTEXT_DEBUG_FLAG = 1,
    GL_CONTEXT_FORWARD_COMPATIBLE_FLAG = 2,
    GL_CONTEXT_ROBUST_ACCESS_FLAG = 4,
    GL_CONTEXT_RESET_ISOLATION_FLAG = 8,
}

export enum GLcontextReleaseFlag {
    GL_CONTEXT_RELEASE_BEHAVIOR_NONE = 0,
    GL_CONTEXT_RELEASE_BEHAVIOR_FLUSH = 1,
}

export enum HitTestResult {
    HITTEST_NORMAL = 0,
    HITTEST_DRAGGABLE = 1,
    HITTEST_RESIZE_TOPLEFT = 2,
    HITTEST_RESIZE_TOP = 3,
    HITTEST_RESIZE_TOPRIGHT = 4,
    HITTEST_RESIZE_RIGHT = 5,
    HITTEST_RESIZE_BOTTOMRIGHT = 6,
    HITTEST_RESIZE_BOTTOM = 7,
    HITTEST_RESIZE_BOTTOMLEFT = 8,
    HITTEST_RESIZE_LEFT = 9,
}

export enum HitTestResult {
    HITTEST_NORMAL = 0,
    HITTEST_DRAGGABLE = 1,
    HITTEST_RESIZE_TOPLEFT = 2,
    HITTEST_RESIZE_TOP = 3,
    HITTEST_RESIZE_TOPRIGHT = 4,
    HITTEST_RESIZE_RIGHT = 5,
    HITTEST_RESIZE_BOTTOMRIGHT = 6,
    HITTEST_RESIZE_BOTTOM = 7,
    HITTEST_RESIZE_BOTTOMLEFT = 8,
    HITTEST_RESIZE_LEFT = 9,
}

export const DisplayMode = Struct({
    format: Uint32,
    w: Int32,
    h: Int32,
    refresh_rate: Int32,
    driverdata: PVoid,
});
export const PDisplayMode = Ref.refType(DisplayMode);

export const cWindow = Void;
export const PWindow = PVoid;
export const PPWindow = PPVoid;
export const GLContext = PVoid;

export const HitTestLambda = FFI.Function(Uint32, [PWindow, PPoint, PVoid,]);

let lib = Object.create(null);
Lib({
    SDL_GetNumVideoDrivers: [Int32, []],
    SDL_GetVideoDriver: [CString, [Int32,]],
    SDL_VideoInit: [Int32, [CString,]],
    SDL_VideoQuit: [Void, []],
    SDL_GetCurrentVideoDriver: [CString, []],
    SDL_GetNumVideoDisplays: [Int32, []],
    SDL_GetDisplayName: [CString, [Int32,]],
    SDL_GetDisplayBounds: [Int32, [Int32, PRect,]],
    SDL_GetDisplayDPI: [Int32, [Int32, PFloat, PFloat, PFloat,]],
    SDL_GetNumDisplayModes: [Int32, [Int32,]],
    SDL_GetDisplayMode: [Int32, [Int32, Int32, PDisplayMode,]],
    SDL_GetDesktopDisplayMode: [Int32, [Int32, PDisplayMode,]],
    SDL_GetCurrentDisplayMode: [Int32, [Int32, PDisplayMode,]],
    SDL_GetClosestDisplayMode: [PDisplayMode, [Int32, PDisplayMode, PDisplayMode,]],

    // Window Related
    SDL_GetWindowDisplayIndex: [Int32, [PWindow,]],
    SDL_SetWindowDisplayMode: [Int32, [PWindow, PDisplayMode,]],
    SDL_GetWindowDisplayMode: [Int32, [PWindow, PDisplayMode,]],
    SDL_GetWindowPixelFormat: [Uint32, [PWindow,]],
    SDL_CreateWindow: [PWindow, [CString, Int32, Int32, Int32, Int32, Uint32,]],
    SDL_CreateWindowFrom: [PWindow, [PVoid,]],
    SDL_GetWindowID: [Uint32, [PWindow,]],
    SDL_GetWindowFromID: [PWindow, [Uint32,]],
    SDL_GetWindowFlags: [Uint32, [PWindow,]],
    SDL_SetWindowTitle: [Void, [PWindow, CString,]],
    SDL_GetWindowTitle: [CString, [PWindow,]],
    SDL_SetWindowIcon: [Void, [PWindow, PSurface,]],
    SDL_SetWindowData: [PVoid, [PWindow, CString, PVoid,]],
    SDL_GetWindowData: [PVoid, [PWindow, CString,]],
    SDL_SetWindowPosition: [Void, [PWindow, Int32, Int32,]],
    SDL_GetWindowPosition: [Void, [PWindow, PInt32, PInt32,]],
    SDL_SetWindowSize: [Void, [PWindow, Int32, Int32,]],
    SDL_GetWindowSize: [Void, [PWindow, PInt32, PInt32,]],
    SDL_SetWindowMinimumSize: [Void, [PWindow, Int32, Int32,]],
    SDL_GetWindowMinimumSize: [Void, [PWindow, PInt32, PInt32,]],
    SDL_SetWindowMaximumSize: [Void, [PWindow, Int32, Int32,]],
    SDL_GetWindowMaximumSize: [Void, [PWindow, PInt32, PInt32,]],
    SDL_SetWindowBordered: [Void, [PWindow, Uint32,]],
    SDL_ShowWindow: [Void, [PWindow,]],
    SDL_HideWindow: [Void, [PWindow,]],
    SDL_RaiseWindow: [Void, [PWindow,]],
    SDL_MaximizeWindow: [Void, [PWindow,]],
    SDL_MinimizeWindow: [Void, [PWindow,]],
    SDL_RestoreWindow: [Void, [PWindow,]],
    SDL_SetWindowFullscreen: [Int32, [PWindow, Uint32,]],
    SDL_GetWindowSurface: [PSurface, [PWindow,]],
    SDL_UpdateWindowSurface: [Int32, [PWindow,]],
    SDL_UpdateWindowSurfaceRects: [Int32, [PWindow, PRect, Int32,]],
    SDL_SetWindowGrab: [Void, [PWindow, Uint32,]],
    SDL_GetWindowGrab: [Uint32, [PWindow,]],
    SDL_GetGrabbedWindow: [PWindow, []],
    SDL_SetWindowBrightness: [Int32, [PWindow, Float,]],
    SDL_GetWindowBrightness: [Float, [PWindow,]],
    SDL_SetWindowGammaRamp: [Int32, [PWindow, PUint16, PUint16, PUint16,]],
    SDL_GetWindowGammaRamp: [Int32, [PWindow, PUint16, PUint16, PUint16,]],
    SDL_SetWindowHitTest: [Int32, [PWindow, HitTestLambda, PVoid,]],
    SDL_DestroyWindow: [Void, [PWindow,]],

    // ScreenSaver
    SDL_IsScreenSaverEnabled: [Uint32, []],
    SDL_EnableScreenSaver: [Void, []],
    SDL_DisableScreenSaver: [Void, []],
    // GL
    SDL_GL_LoadLibrary: [Int32, [CString,]],
    SDL_GL_GetProcAddress: [PVoid, [CString,]],
    SDL_GL_UnloadLibrary: [Void, []],
    SDL_GL_ExtensionSupported: [Uint32, [CString,]],
    SDL_GL_ResetAttributes: [Void, []],
    SDL_GL_SetAttribute: [Int32, [Uint32, Int32,]],
    SDL_GL_GetAttribute: [Int32, [Uint32, PInt32,]],
    SDL_GL_CreateContext: [GLContext, [PWindow,]],
    SDL_GL_MakeCurrent: [Int32, [PWindow, GLContext,]],
    SDL_GL_GetCurrentWindow: [PWindow, []],
    SDL_GL_GetCurrentContext: [GLContext, []],
    SDL_GL_GetDrawableSize: [Void, [PWindow, PInt32, PInt32,]],
    SDL_GL_SetSwapInterval: [Int32, [Int32,]],
    SDL_GL_GetSwapInterval: [Int32, []],
    SDL_GL_SwapWindow: [Void, [PWindow,]],
    SDL_GL_DeleteContext: [Void, [GLContext,]],

    // renderer related
    SDL_CreateWindowAndRenderer: [Int32, [Int32, Int32, Uint32, PPWindow, PPRenderer,]],
    SDL_CreateRenderer: [PRenderer, [PWindow, Int32, Uint32,]],
    SDL_GetRenderer: [PRenderer, [PWindow,]],
}, lib);

export class VideoGL {
    // SDL_GL_LoadLibrary: [Int32, [CString,]],
    // SDL_GL_GetProcAddress: [PVoid, [CString,]],
    // SDL_GL_UnloadLibrary: [Void, []],
    // SDL_GL_ExtensionSupported: [Uint32, [CString,]],
    // SDL_GL_ResetAttributes: [Void, []],
    // SDL_GL_SetAttribute: [Int32, [Uint32, Int32,]],
    // SDL_GL_GetAttribute: [Int32, [Uint32, PInt32,]],
    // SDL_GL_CreateContext: [GLContext, [PWindow,]],
    // SDL_GL_MakeCurrent: [Int32, [PWindow, GLContext,]],
    // SDL_GL_GetCurrentContext: [GLContext, []],
    // SDL_GL_GetDrawableSize: [Void, [PWindow, PInt32, PInt32,]],
    // SDL_GL_SetSwapInterval: [Int32, [Int32,]],
    // SDL_GL_GetSwapInterval: [Int32, []],
    // SDL_GL_SwapWindow: [Void, [PWindow,]],
    // SDL_GL_DeleteContext: [Void, [GLContext,]],
    static getCurrentWindow(): Window {
        return new Window(lib.SDL_GL_GetCurrentWindow());
    }
}

export class Video {
    static getNumVideoDrivers(): number {
        return lib.SDL_GetNumVideoDrivers();
    }

    static getVideoDriver(index: number): string {
        return lib.SDL_GetVideoDriver(index);
    }

    static init(driverName: string) {
        if (0 != lib.SDL_VideoInit(driverName)) {
            throw sdlError();
        }
    }

    static quit() {
        lib.SDL_VideoQuit();
    }

    static getCurrentVideoDriver(): string {
        return lib.SDL_GetCurrentVideoDriver();
    }

    static getNumVideoDisplays(): number {
        return lib.SDL_GetNumVideoDisplays();
    }

    static getDisplayName(index: number): string {
        return lib.SDL_GetDisplayName(index);
    }

    static getDisplayBounds(index: number): XYWH {
        let rect = Rect();
        if (0 != lib.SDL_GetDisplayBounds(index, rect.ref())) {
            throw sdlError();
        }
        return {x: rect.x, y: rect.y, w: rect.w, h: rect.h};
    }

    static getDisplayDPI(index: number): { ddpi: number, hdpi: number, vdpi: number } {
        let d$ = Ref.alloc(Float);
        let h$ = Ref.alloc(Float);
        let v$ = Ref.alloc(Float);
        if (0 != lib.SDL_GetDisplayDPI(index, d$, h$, v$)) {
            throw sdlError();
        }
        return {ddpi: d$.deref(), hdpi: h$.deref(), vdpi: v$.deref()};
    }

    static getNumDisplayModes(index: number): number {
        let num = lib.SDL_GetNumDisplayModes(index);
        if (0 > num) {
            throw sdlError();
        }
        return num;
    }

    static getDisplayMode(displayIndex: number, modeIndex: number): {
        format: number, w: number, h: number, refreshRate: number,
    } {
        let dm = DisplayMode();
        if (0 != lib.SDL_GetDisplayMode(displayIndex, modeIndex, dm.ref())) {
            throw sdlError();
        }
        return {format: dm.format, w: dm.w, h: dm.h, refreshRate: dm.refresh_rate};
    }

    static getDesktopDisplayMode(displayIndex: number): {
        format: number, w: number, h: number, refreshRate: number,
    } {
        let dm = DisplayMode();
        if (0 != lib.SDL_GetDesktopDisplayMode(displayIndex, dm.ref())) {
            throw sdlError();
        }
        return {format: dm.format, w: dm.w, h: dm.h, refreshRate: dm.refresh_rate};
    }

    static getCurrentDisplayMode(displayIndex: number): {
        format: number, w: number, h: number, refreshRate: number,
    } {
        let dm = DisplayMode();
        if (0 != lib.SDL_GetCurrentDisplayMode(displayIndex, dm.ref())) {
            throw sdlError();
        }
        return {format: dm.format, w: dm.w, h: dm.h, refreshRate: dm.refresh_rate};
    }

    static getClosestDisplayMode(displayIndex: number, mode: Pointer, closest: Pointer): {
        format: number, w: number, h: number, refreshRate: number,
    } {
        let res = lib.SDL_GetClosestDisplayMode(displayIndex, mode, closest);
        if (res.isNull()) {
            throw sdlError();
        }
        let dm = res.deref();
        return {format: dm.format, w: dm.w, h: dm.h, refreshRate: dm.refresh_rate};
    }

    static isScreenSaverEnabled(): number {
        return 0 != lib.SDL_IsScreenSaverEnabled();
    }

    static enableScreenSaver() {
        lib.SDL_EnableScreenSaver();
    }

    static disableScreenSaver() {
        lib.SDL_DisableScreenSaver();
    }
}

export class Window {
    constructor(private _window$: Pointer) {
    }

    get cptr(): Pointer {
        return this._window$;
    }

    createRenderer(index: number, flags: RendererFlags): Renderer {
        return new Renderer(lib.SDL_CreateRenderer(this._window$, index, flags));
    }

    get renderer(): Renderer {
        return new Renderer(lib.SDL_GetRenderer(this._window$));
    }

    static createWindowAndRenderer(w: number, h: number, flags: WindowFlags): { window: Window, renderer: Renderer } {
        let window$ = Ref.alloc(PWindow);
        let renderer$ = Ref.alloc(PRenderer);
        if (0 != lib.SDL_CreateWindowAndRenderer(w, h, flags, window$, renderer$)) {
            throw sdlError();
        }
        return {window: new Window(window$), renderer: new Renderer(renderer$)};
    }

    static create(title: string, ps: XYWH, flags: WindowFlags): Window {
        return new Window(lib.SDL_CreateWindow(title, ps.x, ps.y, ps.w, ps.h, flags));
    }

    static createFrom(data: Buffer): Window {
        return new Window(lib.SDL_CreateWindowFrom(data.ref()));
    }

    static getFromID(id: number): Window {
        return new Window(lib.SDL_GetWindowFromID(id));
    }

    static getGrabbed(): Window {
        return new Window(lib.SDL_GetGrabbedWindow());
    }
}