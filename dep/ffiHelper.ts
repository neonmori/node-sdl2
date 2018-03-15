import * as FFI from 'ffi';

declare var process;
let file = process.platform === 'win32' ? 'SDL2' : 'libSDL2';

const Lib = (funcs, lib) => {
    FFI.Library(file, funcs, lib);
};

export {Lib};