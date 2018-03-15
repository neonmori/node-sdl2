import {Lib} from '../ffiHelper';
import * as Struct from 'ref-struct';
import * as Ref from 'ref';
import {Int32, PInt32, PPVoid, PVoid, Uint32, Void} from "../types";

export enum Bool {
    FALSE = 0,
    TRUE = 1,
}

export const SpinLock = Int32;
export const PSpinLock = PInt32;
export const AtomicT = Struct({value: Int32});
export const PAtomicT = Ref.refType(AtomicT);

let lib = Object.create(null);
Lib({
    SDL_AtomicTryLock: [ Uint32, [ PSpinLock, ] ],
    SDL_AtomicLock: [ Void, [ PSpinLock, ] ],
    SDL_AtomicUnlock: [ Void, [ PSpinLock, ] ],
    SDL_AtomicCAS: [ Uint32, [ PAtomicT, Int32, Int32, ] ],
    SDL_AtomicSet: [ Int32, [ PAtomicT, Int32, ] ],
    SDL_AtomicGet: [ Int32, [ PAtomicT, ] ],
    SDL_AtomicAdd: [ Int32, [ PAtomicT, Int32, ] ],
    SDL_AtomicCASPtr: [ Uint32, [ PPVoid, PVoid, PVoid, ] ],
    SDL_AtomicSetPtr: [ PVoid, [ PPVoid, PVoid, ] ],
    SDL_AtomicGetPtr: [ PVoid, [ PPVoid, ] ],
}, lib);

// TODO export sdl-atomic if require.

