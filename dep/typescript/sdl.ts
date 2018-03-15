import {Lib} from '../ffiHelper';
import {Int32, Uint32, Void} from "../types";

//TODO: var SDL_stdinc_lib = require('./SDL_stdinc')
let lib = Object.create(null);
Lib({
    SDL_Init: [Int32, [Uint32]],
    SDL_InitSubSystem: [ Int32, [ Uint32, ] ],
    SDL_QuitSubSystem: [ Void, [ Uint32, ] ],
    SDL_WasInit: [ Uint32, [ Uint32, ] ],
    SDL_Quit: [ Void, [ ] ],
}, lib);

export enum InitFlag {
    INIT_TIMER          = 0x00000001,
    INIT_AUDIO          = 0x00000010,
    INIT_VIDEO          = 0x00000020,  /**< INIT_VIDEO implies INIT_EVENTS */
    INIT_JOYSTICK       = 0x00000200,  /**< INIT_JOYSTICK implies INIT_EVENTS */
    INIT_HAPTIC         = 0x00001000,
    INIT_GAMECONTROLLER = 0x00002000,  /**< INIT_GAMECONTROLLER implies SDL_INIT_JOYSTICK */
    INIT_EVENTS         = 0x00004000,
    INIT_NOPARACHUTE    = 0x00100000,  /**< compatibility; this flag is ignored. */
    INIT_EVERYTHING     = INIT_TIMER | INIT_AUDIO | INIT_VIDEO | INIT_EVENTS | INIT_JOYSTICK | INIT_HAPTIC | INIT_GAMECONTROLLER
}

export function init(flags: InitFlag): number {
    return lib.SDL_Init(flags);
}

export function initSubSystem(flags: InitFlag): number {
    return lib.SDL_InitSubSystem(flags);
}

export function quitSubSystem(flags: InitFlag): void {
    return lib.SDL_QuitSubSystem(flags);
}

export function wasInit(flags: InitFlag): number {
    return lib.SDL_WasInit(flags);
}

export function quit(): void {
    return lib.SDL_Quit();
}