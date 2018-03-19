import {Lib} from '../ffiHelper';
import * as FFI from 'ffi';
import * as Struct from 'ref-struct';
import * as Ref from 'ref';
import * as ArrayType from 'ref-array';
import {
    Char,
    CString, Float, Int16, Int32, PFloat, PInt32, Pointer, PPVoid, PUint16, PVoid, Uint16, Uint32, Uint8, Void, WH, XY,
    XYWH
} from "../types";
import {PPoint, PRect, Rect} from "./sdl-rect";
import {PSurface, Surface} from "./sdl-surface";
import {sdlError} from "./sdl-error";
import {PPRenderer, PRenderer, Renderer, RendererFlags} from "./sdl-renderer";

export enum EventType {
    FIRSTEVENT = 0,
    QUIT = 256,
    APP_TERMINATING = 257,
    APP_LOWMEMORY = 258,
    APP_WILLENTERBACKGROUND = 259,
    APP_DIDENTERBACKGROUND = 260,
    APP_WILLENTERFOREGROUND = 261,
    APP_DIDENTERFOREGROUND = 262,
    WINDOWEVENT = 512,
    SYSWMEVENT = 513,
    KEYDOWN = 768,
    KEYUP = 769,
    TEXTEDITING = 770,
    TEXTINPUT = 771,
    KEYMAPCHANGED = 772,
    MOUSEMOTION = 1024,
    MOUSEBUTTONDOWN = 1025,
    MOUSEBUTTONUP = 1026,
    MOUSEWHEEL = 1027,
    JOYAXISMOTION = 1536,
    JOYBALLMOTION = 1537,
    JOYHATMOTION = 1538,
    JOYBUTTONDOWN = 1539,
    JOYBUTTONUP = 1540,
    JOYDEVICEADDED = 1541,
    JOYDEVICEREMOVED = 1542,
    CONTROLLERAXISMOTION = 1616,
    CONTROLLERBUTTONDOWN = 1617,
    CONTROLLERBUTTONUP = 1618,
    CONTROLLERDEVICEADDED = 1619,
    CONTROLLERDEVICEREMOVED = 1620,
    CONTROLLERDEVICEREMAPPED = 1621,
    FINGERDOWN = 1792,
    FINGERUP = 1793,
    FINGERMOTION = 1794,
    DOLLARGESTURE = 2048,
    DOLLARRECORD = 2049,
    MULTIGESTURE = 2050,
    CLIPBOARDUPDATE = 2304,
    DROPFILE = 4096,
    AUDIODEVICEADDED = 4352,
    AUDIODEVICEREMOVED = 4353,
    RENDER_TARGETS_RESET = 8192,
    RENDER_DEVICE_RESET = 8193,
    USEREVENT = 32768,
    LASTEVENT = 65535,
}

export enum EventAction {
    ADDEVENT = 0,
    PEEKEVENT = 1,
    GETEVENT = 2,
}

export const CommonEvent = Struct({
    type: Uint32,
    timestamp: Uint32,
});

export const WindowEvent = Struct({
    type: Uint32,
    timestamp: Uint32,
    windowID: Uint32,
    event: Uint8,
    padding1: Uint8,
    padding2: Uint8,
    padding3: Uint8,
    data1: Int32,
    data2: Int32,
});

// var SDL_Keysym = SDL_keyboard_lib.SDL_Keysym
export const KeyboardEvent = Struct({
    type: Uint32,
    timestamp: Uint32,
    windowID: Uint32,
    state: Uint8,
    repeat: Uint8,
    padding2: Uint8,
    padding3: Uint8,
    keysym: Keysym,
});

export const TextEditingEvent = Struct({
    type: Uint32,
    timestamp: Uint32,
    windowID: Uint32,
    text: ArrayType(Char, 32),
    start: Int32,
    length: Int32,
});

export const TextInputEvent = Struct({
    type: Uint32,
    timestamp: Uint32,
    windowID: Uint32,
    text: ArrayType(Char, 32),
});

export const MouseMotionEvent = Struct({
    type: Uint32,
    timestamp: Uint32,
    windowID: Uint32,
    which: Uint32,
    state: Uint32,
    x: Int32,
    y: Int32,
    xrel: Int32,
    yrel: Int32,
});

export const MouseButtonEvent = Struct({
    type: Uint32,
    timestamp: Uint32,
    windowID: Uint32,
    which: Uint32,
    button: Uint8,
    state: Uint8,
    clicks: Uint8,
    padding1: Uint8,
    x: Int32,
    y: Int32,
});

export const MouseWheelEvent = Struct({
    type: Uint32,
    timestamp: Uint32,
    windowID: Uint32,
    which: Uint32,
    x: Int32,
    y: Int32,
    direction: Uint32,
});

// var JoystickID = joystick_lib.JoystickID
var JoyAxisEvent = exports.JoyAxisEvent = Struct({
    type: Uint32,
    timestamp: Uint32,
    which: SDL_JoystickID,
    axis: Uint8,
    padding1: Uint8,
    padding2: Uint8,
    padding3: Uint8,
    value: Int16,
    padding4: Uint16,
})
var SDL_JoyBallEvent = exports.SDL_JoyBallEvent = Struct({
    type: Uint32,
    timestamp: Uint32,
    which: SDL_JoystickID,
    ball: Uint8,
    padding1: Uint8,
    padding2: Uint8,
    padding3: Uint8,
    xrel: Int16,
    yrel: Int16,
})
var SDL_JoyHatEvent = exports.SDL_JoyHatEvent = Struct({
    type: Uint32,
    timestamp: Uint32,
    which: SDL_JoystickID,
    hat: Uint8,
    value: Uint8,
    padding1: Uint8,
    padding2: Uint8,
})
var SDL_JoyButtonEvent = exports.SDL_JoyButtonEvent = Struct({
    type: Uint32,
    timestamp: Uint32,
    which: SDL_JoystickID,
    button: Uint8,
    state: Uint8,
    padding1: Uint8,
    padding2: Uint8,
})
var SDL_JoyDeviceEvent = exports.SDL_JoyDeviceEvent = Struct({
    type: Uint32,
    timestamp: Uint32,
    which: Int32,
})
var SDL_ControllerAxisEvent = exports.SDL_ControllerAxisEvent = Struct({
    type: Uint32,
    timestamp: Uint32,
    which: SDL_JoystickID,
    axis: Uint8,
    padding1: Uint8,
    padding2: Uint8,
    padding3: Uint8,
    value: Int16,
    padding4: Uint16,
})
var SDL_ControllerButtonEvent = exports.SDL_ControllerButtonEvent = Struct({
    type: Uint32,
    timestamp: Uint32,
    which: SDL_JoystickID,
    button: Uint8,
    state: Uint8,
    padding1: Uint8,
    padding2: Uint8,
})
var SDL_ControllerDeviceEvent = exports.SDL_ControllerDeviceEvent = Struct({
    type: Uint32,
    timestamp: Uint32,
    which: Int32,
})
var SDL_AudioDeviceEvent = exports.SDL_AudioDeviceEvent = Struct({
    type: Uint32,
    timestamp: Uint32,
    which: Uint32,
    iscapture: Uint8,
    padding1: Uint8,
    padding2: Uint8,
    padding3: Uint8,
})

var SDL_TouchID = SDL_touch_lib.SDL_TouchID
var SDL_FingerID = SDL_touch_lib.SDL_FingerID
var float = exports.float = ref.types.float
var SDL_TouchFingerEvent = exports.SDL_TouchFingerEvent = Struct({
    type: Uint32,
    timestamp: Uint32,
    touchId: SDL_TouchID,
    fingerId: SDL_FingerID,
    x: float,
    y: float,
    dx: float,
    dy: float,
    pressure: float,
})
var SDL_MultiGestureEvent = exports.SDL_MultiGestureEvent = Struct({
    type: Uint32,
    timestamp: Uint32,
    touchId: SDL_TouchID,
    dTheta: float,
    dDist: float,
    x: float,
    y: float,
    numFingers: Uint16,
    padding: Uint16,
})
var SDL_GestureID = SDL_gesture_lib.SDL_GestureID
var SDL_DollarGestureEvent = exports.SDL_DollarGestureEvent = Struct({
    type: Uint32,
    timestamp: Uint32,
    touchId: SDL_TouchID,
    gestureId: SDL_GestureID,
    numFingers: Uint32,
    error: float,
    x: float,
    y: float,
})

var SDL_DropEvent = exports.SDL_DropEvent = Struct({
    type: Uint32,
    timestamp: Uint32,
    file: CString,
})
var SDL_QuitEvent = exports.SDL_QuitEvent = Struct({
    type: Uint32,
    timestamp: Uint32,
})
var SDL_OSEvent = exports.SDL_OSEvent = Struct({
    type: Uint32,
    timestamp: Uint32,
})

var SDL_UserEvent = exports.SDL_UserEvent = Struct({
    type: Uint32,
    timestamp: Uint32,
    windowID: Uint32,
    code: Int32,
    data1: voit_ptr,
    data2: voit_ptr,
})
var SDL_SysWMmsg = exports.SDL_SysWMmsg = voit
var SDL_SysWMmsg_ptr = exports.SDL_SysWMmsg_ptr = ref.refType(SDL_SysWMmsg)
var SDL_SysWMEvent = exports.SDL_SysWMEvent = Struct({
    type: Uint32,
    timestamp: Uint32,
    msg: SDL_SysWMmsg_ptr,
})
var c__U_SDL_Event_FI_padding_arr = ArrayType(Uint8, 56)
var SDL_Event = exports.SDL_Event = Union({
    type: Uint32,
    common: SDL_CommonEvent,
    window: SDL_WindowEvent,
    key: SDL_KeyboardEvent,
    edit: SDL_TextEditingEvent,
    text: SDL_TextInputEvent,
    motion: SDL_MouseMotionEvent,
    button: SDL_MouseButtonEvent,
    wheel: SDL_MouseWheelEvent,
    jaxis: SDL_JoyAxisEvent,
    jball: SDL_JoyBallEvent,
    jhat: SDL_JoyHatEvent,
    jbutton: SDL_JoyButtonEvent,
    jdevice: SDL_JoyDeviceEvent,
    caxis: SDL_ControllerAxisEvent,
    cbutton: SDL_ControllerButtonEvent,
    cdevice: SDL_ControllerDeviceEvent,
    adevice: SDL_AudioDeviceEvent,
    quit: SDL_QuitEvent,
    user: SDL_UserEvent,
    syswm: SDL_SysWMEvent,
    tfinger: SDL_TouchFingerEvent,
    mgesture: SDL_MultiGestureEvent,
    dgesture: SDL_DollarGestureEvent,
    drop: SDL_DropEvent,
    padding: c__U_SDL_Event_FI_padding_arr,
})
var int32 = exports.int32 = ref.types.int32
var SDL_Event_ptr = exports.SDL_Event_ptr = ref.refType(SDL_Event)
var SDL_EventFilter = exports.SDL_EventFilter = FFI.Function( int32, [ voit_ptr, SDL_Event_ptr, ] )
var SDL_EventFilter_ptr = exports.SDL_EventFilter_ptr = ref.refType(SDL_EventFilter)
var voit_ptr_ptr = exports.voit_ptr_ptr = ref.refType(voit_ptr)


let lib = Object.create(null);
Lib({
    SDL_PumpEvents: [ voit, [ ] ],
    SDL_PeepEvents: [ int32, [ SDL_Event_ptr, int32, uint32, Uint32, Uint32, ] ],
    SDL_HasEvent: [ uint32, [ Uint32, ] ],
    SDL_HasEvents: [ uint32, [ Uint32, Uint32, ] ],
    SDL_FlushEvent: [ voit, [ Uint32, ] ],
    SDL_FlushEvents: [ voit, [ Uint32, Uint32, ] ],
    SDL_PollEvent: [ int32, [ SDL_Event_ptr, ] ],
    SDL_WaitEvent: [ int32, [ SDL_Event_ptr, ] ],
    SDL_WaitEventTimeout: [ int32, [ SDL_Event_ptr, int32, ] ],
    SDL_PushEvent: [ int32, [ SDL_Event_ptr, ] ],
    SDL_SetEventFilter: [ voit, [ SDL_EventFilter, voit_ptr, ] ],
    SDL_GetEventFilter: [ uint32, [ SDL_EventFilter_ptr, voit_ptr_ptr, ] ],
    SDL_AddEventWatch: [ voit, [ SDL_EventFilter, voit_ptr, ] ],
    SDL_DelEventWatch: [ voit, [ SDL_EventFilter, voit_ptr, ] ],
    SDL_FilterEvents: [ voit, [ SDL_EventFilter, voit_ptr, ] ],
    SDL_EventState: [ Uint8, [ Uint32, int32, ] ],
    SDL_RegisterEvents: [ Uint32, [ int32, ] ],
}, lib);

