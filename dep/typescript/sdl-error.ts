import {Lib} from '../ffiHelper';
import {String, Int, Int32, Void, Uint32} from "../types";

let lib = Object.create(null);
// 这里是实际上sdl2被ffi处理的位置
Lib({
    SDL_SetError: [ Int32, [ String, ] ],
    SDL_GetError: [ String, [ ] ],
    SDL_ClearError: [ Void, [ ] ],
    SDL_Error: [ Int32, [ Uint32, ] ],
}, exports);

// 这里的都算是方法声明
/**
 * 清除上一个错误的信息，只清除信息错误还在队列中，调用这个函数后再 getError 返回的不是前一个错误的信息， 而是
 * 空字符串。
 */
export function clearError(): void {
    return lib.SDL_ClearError();
}

/**
 * 返回上一个错误的相关信息。在调用该方法前可能发生了多个错误，但是只返回最后一个错误的信息。
 * @return 错误相关信息，或空字符串
 */
export function getError(): string {
    return lib.SDL_GetError();
}

/**
 * 设置 SDL 错误信息。
 * @return 始终返回 -1
 */
export function setError(message: any): -1 {
    message = '' + message;
    return lib.SDL_SetError(message);
}

export function Error()