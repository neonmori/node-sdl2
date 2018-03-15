import * as FFI from 'ffi';

FFI.Library(process.platform == 'win32' ? 'SDL2':'libSDL2', {}, exports);
