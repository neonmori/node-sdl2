import {Lib} from '../ffiHelper';
import * as Struct from 'ref-struct';
import * as Ref from 'ref';
import * as ArrayType from 'ref-array';
import {Int32, PInt32, Uint32, Void} from "../types";

export const Point = Struct({
    x: Int32,
    y: Int32,
});
export const Rect = Struct({
    x: Int32,
    y: Int32,
    w: Int32,
    h: Int32,
});
export const PPoint = Ref.refType(Point);
export const PRect  = Ref.refType(Rect);
export const RectArray = ArrayType(Rect);
export const PointArray = ArrayType(Point);

let lib = Object.create(null);
Lib({
    SDL_HasIntersection: [ Uint32, [ PRect, PRect, ] ],
    SDL_IntersectRect: [ Uint32, [ PRect, PRect, PRect, ] ],
    SDL_UnionRect: [ Void, [ PRect, PRect, PRect, ] ],
    SDL_EnclosePoints: [ Uint32, [ PPoint, Int32, PRect, PRect, ] ],
    SDL_IntersectRectAndLine: [ Uint32, [ PRect, PInt32, PInt32, PInt32, PInt32, ] ],
}, lib);

