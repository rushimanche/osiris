/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "osiris.osiris";

export interface MsgCreatePost {
  creator: string;
  title: string;
  body: string;
}

export interface MsgCreatePostResponse {
}

export interface MsgSaveUserData {
  creator: string;
  message: string;
}

export interface MsgSaveUserDataResponse {
  id: number;
}

function createBaseMsgCreatePost(): MsgCreatePost {
  return { creator: "", title: "", body: "" };
}

export const MsgCreatePost = {
  encode(message: MsgCreatePost, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.title !== "") {
      writer.uint32(18).string(message.title);
    }
    if (message.body !== "") {
      writer.uint32(26).string(message.body);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreatePost {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreatePost();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.title = reader.string();
          break;
        case 3:
          message.body = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreatePost {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      title: isSet(object.title) ? String(object.title) : "",
      body: isSet(object.body) ? String(object.body) : "",
    };
  },

  toJSON(message: MsgCreatePost): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.title !== undefined && (obj.title = message.title);
    message.body !== undefined && (obj.body = message.body);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreatePost>, I>>(object: I): MsgCreatePost {
    const message = createBaseMsgCreatePost();
    message.creator = object.creator ?? "";
    message.title = object.title ?? "";
    message.body = object.body ?? "";
    return message;
  },
};

function createBaseMsgCreatePostResponse(): MsgCreatePostResponse {
  return {};
}

export const MsgCreatePostResponse = {
  encode(_: MsgCreatePostResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreatePostResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreatePostResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgCreatePostResponse {
    return {};
  },

  toJSON(_: MsgCreatePostResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreatePostResponse>, I>>(_: I): MsgCreatePostResponse {
    const message = createBaseMsgCreatePostResponse();
    return message;
  },
};

function createBaseMsgSaveUserData(): MsgSaveUserData {
  return { creator: "", message: "" };
}

export const MsgSaveUserData = {
  encode(message: MsgSaveUserData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSaveUserData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSaveUserData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.message = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSaveUserData {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      message: isSet(object.message) ? String(object.message) : "",
    };
  },

  toJSON(message: MsgSaveUserData): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSaveUserData>, I>>(object: I): MsgSaveUserData {
    const message = createBaseMsgSaveUserData();
    message.creator = object.creator ?? "";
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseMsgSaveUserDataResponse(): MsgSaveUserDataResponse {
  return { id: 0 };
}

export const MsgSaveUserDataResponse = {
  encode(message: MsgSaveUserDataResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSaveUserDataResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSaveUserDataResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSaveUserDataResponse {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: MsgSaveUserDataResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSaveUserDataResponse>, I>>(object: I): MsgSaveUserDataResponse {
    const message = createBaseMsgSaveUserDataResponse();
    message.id = object.id ?? 0;
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  CreatePost(request: MsgCreatePost): Promise<MsgCreatePostResponse>;
  /** this line is used by starport scaffolding # proto/tx/rpc */
  SaveUserData(request: MsgSaveUserData): Promise<MsgSaveUserDataResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreatePost = this.CreatePost.bind(this);
    this.SaveUserData = this.SaveUserData.bind(this);
  }
  CreatePost(request: MsgCreatePost): Promise<MsgCreatePostResponse> {
    const data = MsgCreatePost.encode(request).finish();
    const promise = this.rpc.request("osiris.osiris.Msg", "CreatePost", data);
    return promise.then((data) => MsgCreatePostResponse.decode(new _m0.Reader(data)));
  }

  SaveUserData(request: MsgSaveUserData): Promise<MsgSaveUserDataResponse> {
    const data = MsgSaveUserData.encode(request).finish();
    const promise = this.rpc.request("osiris.osiris.Msg", "SaveUserData", data);
    return promise.then((data) => MsgSaveUserDataResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
