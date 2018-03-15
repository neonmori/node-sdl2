import * as FFI from 'ffi';
import * as ArrayType from 'ref-array';
import * as Struct from 'ref-struct';
import * as Union from 'ref-union';
import * as Ref from 'ref';
import {ffilib} from "./ffiHelper";

const voit = exports.voit = Ref.types.void;

export {voit}

ffilib({}, exports);
