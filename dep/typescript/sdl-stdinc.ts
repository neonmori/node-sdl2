import {Lib} from '../ffiHelper';
import * as ArrayType from 'ref-array';
import * as Struct from 'ref-struct';
import {
    CString, Double, Float, Int32, Int64, Long, PSizeT, PString, PVoid, PWcharT, SizeT, Uint32, Uint64,
    Ulong,
    Void
} from "../types";

export enum Bool {
    FALSE = 0,
    TRUE = 1,
}

export enum Dummy {
    DUMMY_ENUM_VALUE = 0
}

export const __va_list_tag = Struct({
    gp_offset: Uint32,
    fp_offset: Uint32,
    overflow_arg_area: PVoid,
    reg_save_area: PVoid,
});

export const VarArg = ArrayType(__va_list_tag, 1);
export const IConvT = PVoid;

let lib = Object.create(null);
Lib({
    SDL_malloc: [PVoid, [SizeT,]],
    SDL_calloc: [PVoid, [SizeT, SizeT,]],
    SDL_realloc: [PVoid, [PVoid, SizeT,]],
    SDL_free: [Void, [PVoid,]],
    SDL_getenv: [CString, [CString,]],
    SDL_setenv: [Int32, [CString, CString, Int32,]],
    SDL_qsort: [Void, [PVoid, SizeT, SizeT, PVoid,]],
    SDL_abs: [Int32, [Int32,]],
    SDL_isdigit: [Int32, [Int32,]],
    SDL_isspace: [Int32, [Int32,]],
    SDL_toupper: [Int32, [Int32,]],
    SDL_tolower: [Int32, [Int32,]],
    SDL_memset: [PVoid, [PVoid, Int32, SizeT,]],
    SDL_memcpy: [PVoid, [PVoid, PVoid, SizeT,]],
    SDL_memmove: [PVoid, [PVoid, PVoid, SizeT,]],
    SDL_memcmp: [Int32, [PVoid, PVoid, SizeT,]],
    SDL_wcslen: [SizeT, [PWcharT,]],
    SDL_wcslcpy: [SizeT, [PWcharT, PWcharT, SizeT,]],
    SDL_wcslcat: [SizeT, [PWcharT, PWcharT, SizeT,]],
    SDL_strlen: [SizeT, [CString,]],
    SDL_strlcpy: [SizeT, [CString, CString, SizeT,]],
    SDL_utf8strlcpy: [SizeT, [CString, CString, SizeT,]],
    SDL_strlcat: [SizeT, [CString, CString, SizeT,]],
    SDL_strdup: [CString, [CString,]],
    SDL_strrev: [CString, [CString,]],
    SDL_strupr: [CString, [CString,]],
    SDL_strlwr: [CString, [CString,]],
    SDL_strchr: [CString, [CString, Int32,]],
    SDL_strrchr: [CString, [CString, Int32,]],
    SDL_strstr: [CString, [CString, CString,]],
    SDL_itoa: [CString, [Int32, CString, Int32,]],
    SDL_uitoa: [CString, [Uint32, CString, Int32,]],
    SDL_ltoa: [CString, [Long, CString, Int32,]],
    SDL_ultoa: [CString, [Ulong, CString, Int32,]],
    SDL_lltoa: [CString, [Int64, CString, Int32,]],
    SDL_ulltoa: [CString, [Int64, CString, Int32,]],
    SDL_atoi: [Int32, [CString,]],
    SDL_atof: [Double, [CString,]],
    SDL_strtol: [Long, [CString, PString, Int32,]],
    SDL_strtoul: [Ulong, [CString, PString, Int32,]],
    SDL_strtoll: [Int64, [CString, PString, Int32,]],
    SDL_strtoull: [Uint64, [CString, PString, Int32,]],
    SDL_strtod: [Double, [CString, PString,]],
    SDL_strcmp: [Int32, [CString, CString,]],
    SDL_strncmp: [Int32, [CString, CString, SizeT,]],
    SDL_strcasecmp: [Int32, [CString, CString,]],
    SDL_strncasecmp: [Int32, [CString, CString, SizeT,]],
    SDL_sscanf: [Int32, [CString, CString,]],
    SDL_vsscanf: [Int32, [CString, CString, VarArg,]],
    SDL_snprintf: [Int32, [CString, SizeT, CString,]],
    SDL_vsnprintf: [Int32, [CString, SizeT, CString, VarArg,]],
    SDL_acos: [Double, [Double,]],
    SDL_asin: [Double, [Double,]],
    SDL_atan: [Double, [Double,]],
    SDL_atan2: [Double, [Double, Double,]],
    SDL_ceil: [Double, [Double,]],
    SDL_copysign: [Double, [Double, Double,]],
    SDL_cos: [Double, [Double,]],
    SDL_cosf: [Float, [Float,]],
    SDL_fabs: [Double, [Double,]],
    SDL_floor: [Double, [Double,]],
    SDL_log: [Double, [Double,]],
    SDL_pow: [Double, [Double, Double,]],
    SDL_scalbn: [Double, [Double, Int32,]],
    SDL_sin: [Double, [Double,]],
    SDL_sinf: [Float, [Float,]],
    SDL_sqrt: [Double, [Double,]],
    SDL_sqrtf: [Float, [Float,]],
    SDL_tan: [Double, [Double,]],
    SDL_tanf: [Float, [Float,]],
    SDL_iconv_open: [IConvT, [CString, CString,]],
    SDL_iconv_close: [Int32, [IConvT,]],
    SDL_iconv: [SizeT, [IConvT, PString, PSizeT, PString, PSizeT,]],
    SDL_iconv_CString: [CString, [CString, CString, CString, SizeT,]],
}, lib);
