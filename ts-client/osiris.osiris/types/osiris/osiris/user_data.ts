/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "osiris.osiris";

export interface UserData {
  creator: string;
  message: string;
}

function createBaseUserData(): UserData {
  return { creator: "", message: "" };
}

export const UserData = {
  encode(message: UserData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserData();
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

  fromJSON(object: any): UserData {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      message: isSet(object.message) ? String(object.message) : "",
    };
  },

  toJSON(message: UserData): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UserData>, I>>(object: I): UserData {
    const message = createBaseUserData();
    message.creator = object.creator ?? "";
    message.message = object.message ?? "";
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
