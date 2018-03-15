import * as Ref from 'ref';

const Void = Ref.types.void;
const Int8 = Ref.types.int8;
const Uint8 = Ref.types.uint8;
const Int16 = Ref.types.int16;
const Uint16 = Ref.types.uint16;
const Int32 = Ref.types.int32;
const Uint32 = Ref.types.uint32;
const Int64 = Ref.types.int64;
const Uint64 = Ref.types.uint64;
const Float = Ref.types.float;
const Double = Ref.types.double;

const String = Ref.types.CString;
const Bool = Ref.types.bool;
const Byte = Ref.types.byte;

const Char = Ref.types.char;
const Uchar = Ref.types.uchar;
const Short = Ref.types.short;
const Ushort = Ref.types.ushort;
const Int = Ref.types.int;
const Uint = Ref.types.uint;
const Long = Ref.types.long;
const Ulong = Ref.types.ulong;
const Longlong = Ref.types.longlong;
const Ulonglong = Ref.types.ulonglong;
const SizeT = Ref.types.size_t;

const PVoid = Ref.refType(Void);
const PInt8 = Ref.refType(Int8);
const PUint8 = Ref.refType(Uint8);
const PInt16 = Ref.refType(Int16);
const PUint16 = Ref.refType(Uint16);
const PInt32 = Ref.refType(Int32);
const PUint32 = Ref.refType(Uint32);
const PInt64 = Ref.refType(Int64);
const PUint64 = Ref.refType(Uint64);
const PFloat = Ref.refType(Float);
const PDouble = Ref.refType(Double);

const PString = Ref.refType(String);
const PBool = Ref.refType(Bool);
const PByte = Ref.refType(Byte);

const PChar = Ref.refType(Char);
const PUchar = Ref.refType(Uchar);
const PShort = Ref.refType(Short);
const PUshort = Ref.refType(Ushort);
const PInt = Ref.refType(Int);
const PUint = Ref.refType(Uint);
const PLong = Ref.refType(Long);
const PUlong = Ref.refType(Ulong);
const PLonglong = Ref.refType(Longlong);
const PUlonglong = Ref.refType(Ulonglong);
const PSizeT = Ref.refType(SizeT);


export {
    Void,
    Int8,
    Uint8,
    Int16,
    Uint16,
    Int32,
    Uint32,
    Int64,
    Uint64,
    Float,
    Double,
    String,
    Bool,
    Byte,
    Char,
    Uchar,
    Short,
    Ushort,
    Int,
    Uint,
    Long,
    Ulong,
    Longlong,
    Ulonglong,
    SizeT,
    PVoid,
    PInt8,
    PUint8,
    PInt16,
    PUint16,
    PInt32,
    PUint32,
    PInt64,
    PUint64,
    PFloat,
    PDouble,
    PString,
    PBool,
    PByte,
    PChar,
    PUchar,
    PShort,
    PUshort,
    PInt,
    PUint,
    PLong,
    PUlong,
    PLonglong,
    PUlonglong,
    PSizeT
};
