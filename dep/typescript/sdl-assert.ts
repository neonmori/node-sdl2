import {Lib} from '../ffiHelper';
import * as Struct from 'ref-struct';
import * as Ref from 'ref';
import * as FFI from 'ffi';
import {Int32, PVoid, Uint32, Void, CString, PPVoid} from "../types";

let lib = Object.create(null);
Lib({
    SDL_ReportAssertion: [ Uint32, [ PAssertData, CString, CString, Int32, ] ],
    SDL_SetAssertionHandler: [ Void, [ AssertionHandler, PVoid, ] ],
    SDL_GetDefaultAssertionHandler: [ AssertionHandler, [ ] ],
    SDL_GetAssertionHandler: [ AssertionHandler, [ PPVoid, ] ],
    SDL_GetAssertionReport: [ PAssertData, [ ] ],
    SDL_ResetAssertionReport: [ Void, [ ] ],
}, lib);

export enum AssertState {
    ASSERTION_RETRY = 0,
    ASSERTION_BREAK = 1,
    ASSERTION_ABORT = 2,
    ASSERTION_IGNORE = 3,
    ASSERTION_ALWAYS_IGNORE = 4,
}

export const AssertData = Struct({
    always_ignore: Int32,
    trigger_count: Uint32,
    condition: CString,
    filename: CString,
    linenum: Int32,
    function: CString,
    next: PVoid,
});

export const PAssertData = Ref.refType(AssertData);
export const AssertionHandler = FFI.Function(Uint32, [ PAssertData, PVoid, ]);

export function getAssertionHandler(): any {
    return lib.SDL_GetAssertionHandler();
}