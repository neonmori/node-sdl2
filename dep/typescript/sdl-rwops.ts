import {Lib} from '../ffiHelper';
import * as Struct from 'ref-struct';
import * as Union from 'ref-union';
import * as Ref from 'ref';
import {CString, Int32, PUint8, PVoid, SizeT, Uint16, Uint32, Uint64, Uint8, Void} from "../types";

export const RWOpsMem = Struct({
    base: PUint8,
    here: PUint8,
    stop: PUint8,
});
export const RWOpsUnknown = Struct({
    data1: PVoid,
    data2: PVoid,
});
export const RWOpsHiddenUnion = Union({
    mem: RWOpsMem,
    unknown: RWOpsUnknown,
});
export const RWOps = Struct({
    size: PVoid,
    seek: PVoid,
    read: PVoid,
    write: PVoid,
    close: PVoid,
    type: Uint32,
    hidden: RWOpsHiddenUnion,
});
export const PRWOps = Ref.refType(RWOps);

let lib = Object.create(null);
Lib({
    SDL_RWFromFile: [ PRWOps, [ CString, CString, ] ],
    SDL_RWFromFP: [ PRWOps, [ PVoid, Uint32, ] ],
    SDL_RWFromMem: [ PRWOps, [ PVoid, Int32, ] ],
    SDL_RWFromConstMem: [ PRWOps, [ PVoid, Int32, ] ],
    SDL_AllocRW: [ PRWOps, [ ] ],
    SDL_FreeRW: [ Void, [ PRWOps, ] ],
    SDL_ReadU8: [ Uint8, [ PRWOps, ] ],
    SDL_ReadLE16: [ Uint16, [ PRWOps, ] ],
    SDL_ReadBE16: [ Uint16, [ PRWOps, ] ],
    SDL_ReadLE32: [ Uint32, [ PRWOps, ] ],
    SDL_ReadBE32: [ Uint32, [ PRWOps, ] ],
    SDL_ReadLE64: [ Uint64, [ PRWOps, ] ],
    SDL_ReadBE64: [ Uint64, [ PRWOps, ] ],
    SDL_WriteU8: [ SizeT, [ PRWOps, Uint8, ] ],
    SDL_WriteLE16: [ SizeT, [ PRWOps, Uint16, ] ],
    SDL_WriteBE16: [ SizeT, [ PRWOps, Uint16, ] ],
    SDL_WriteLE32: [ SizeT, [ PRWOps, Uint32, ] ],
    SDL_WriteBE32: [ SizeT, [ PRWOps, Uint32, ] ],
    SDL_WriteLE64: [ SizeT, [ PRWOps, Uint64, ] ],
    SDL_WriteBE64: [ SizeT, [ PRWOps, Uint64, ] ],
}, lib);