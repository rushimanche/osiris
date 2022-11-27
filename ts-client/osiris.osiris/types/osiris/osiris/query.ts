/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../cosmos/base/query/v1beta1/pagination";
import { Params } from "./params";
import { UserData } from "./user_data";

export const protobufPackage = "osiris.osiris";

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params | undefined;
}

export interface QueryOsirisRequest {
}

export interface QueryOsirisResponse {
  text: string;
}

export interface QueryGetUserDataRequest {
  index: string;
}

export interface QueryGetUserDataResponse {
  userData: UserData | undefined;
}

export interface QueryAllUserDataRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllUserDataResponse {
  userData: UserData[];
  pagination: PageResponse | undefined;
}

function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}

export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
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

  fromJSON(_: any): QueryParamsRequest {
    return {};
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(_: I): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
};

function createBaseQueryParamsResponse(): QueryParamsResponse {
  return { params: undefined };
}

export const QueryParamsResponse = {
  encode(message: QueryParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryParamsResponse {
    return { params: isSet(object.params) ? Params.fromJSON(object.params) : undefined };
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(object: I): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    return message;
  },
};

function createBaseQueryOsirisRequest(): QueryOsirisRequest {
  return {};
}

export const QueryOsirisRequest = {
  encode(_: QueryOsirisRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryOsirisRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryOsirisRequest();
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

  fromJSON(_: any): QueryOsirisRequest {
    return {};
  },

  toJSON(_: QueryOsirisRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryOsirisRequest>, I>>(_: I): QueryOsirisRequest {
    const message = createBaseQueryOsirisRequest();
    return message;
  },
};

function createBaseQueryOsirisResponse(): QueryOsirisResponse {
  return { text: "" };
}

export const QueryOsirisResponse = {
  encode(message: QueryOsirisResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.text !== "") {
      writer.uint32(10).string(message.text);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryOsirisResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryOsirisResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.text = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryOsirisResponse {
    return { text: isSet(object.text) ? String(object.text) : "" };
  },

  toJSON(message: QueryOsirisResponse): unknown {
    const obj: any = {};
    message.text !== undefined && (obj.text = message.text);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryOsirisResponse>, I>>(object: I): QueryOsirisResponse {
    const message = createBaseQueryOsirisResponse();
    message.text = object.text ?? "";
    return message;
  },
};

function createBaseQueryGetUserDataRequest(): QueryGetUserDataRequest {
  return { index: "" };
}

export const QueryGetUserDataRequest = {
  encode(message: QueryGetUserDataRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.index !== "") {
      writer.uint32(10).string(message.index);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetUserDataRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetUserDataRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetUserDataRequest {
    return { index: isSet(object.index) ? String(object.index) : "" };
  },

  toJSON(message: QueryGetUserDataRequest): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetUserDataRequest>, I>>(object: I): QueryGetUserDataRequest {
    const message = createBaseQueryGetUserDataRequest();
    message.index = object.index ?? "";
    return message;
  },
};

function createBaseQueryGetUserDataResponse(): QueryGetUserDataResponse {
  return { userData: undefined };
}

export const QueryGetUserDataResponse = {
  encode(message: QueryGetUserDataResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userData !== undefined) {
      UserData.encode(message.userData, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetUserDataResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetUserDataResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userData = UserData.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetUserDataResponse {
    return { userData: isSet(object.userData) ? UserData.fromJSON(object.userData) : undefined };
  },

  toJSON(message: QueryGetUserDataResponse): unknown {
    const obj: any = {};
    message.userData !== undefined && (obj.userData = message.userData ? UserData.toJSON(message.userData) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetUserDataResponse>, I>>(object: I): QueryGetUserDataResponse {
    const message = createBaseQueryGetUserDataResponse();
    message.userData = (object.userData !== undefined && object.userData !== null)
      ? UserData.fromPartial(object.userData)
      : undefined;
    return message;
  },
};

function createBaseQueryAllUserDataRequest(): QueryAllUserDataRequest {
  return { pagination: undefined };
}

export const QueryAllUserDataRequest = {
  encode(message: QueryAllUserDataRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllUserDataRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllUserDataRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllUserDataRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllUserDataRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllUserDataRequest>, I>>(object: I): QueryAllUserDataRequest {
    const message = createBaseQueryAllUserDataRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllUserDataResponse(): QueryAllUserDataResponse {
  return { userData: [], pagination: undefined };
}

export const QueryAllUserDataResponse = {
  encode(message: QueryAllUserDataResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.userData) {
      UserData.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllUserDataResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllUserDataResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userData.push(UserData.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllUserDataResponse {
    return {
      userData: Array.isArray(object?.userData) ? object.userData.map((e: any) => UserData.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllUserDataResponse): unknown {
    const obj: any = {};
    if (message.userData) {
      obj.userData = message.userData.map((e) => e ? UserData.toJSON(e) : undefined);
    } else {
      obj.userData = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllUserDataResponse>, I>>(object: I): QueryAllUserDataResponse {
    const message = createBaseQueryAllUserDataResponse();
    message.userData = object.userData?.map((e) => UserData.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a list of Osiris items. */
  Osiris(request: QueryOsirisRequest): Promise<QueryOsirisResponse>;
  /** Queries a UserData by index. */
  UserData(request: QueryGetUserDataRequest): Promise<QueryGetUserDataResponse>;
  /** Queries a list of UserData items. */
  UserDataAll(request: QueryAllUserDataRequest): Promise<QueryAllUserDataResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.Osiris = this.Osiris.bind(this);
    this.UserData = this.UserData.bind(this);
    this.UserDataAll = this.UserDataAll.bind(this);
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("osiris.osiris.Query", "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(new _m0.Reader(data)));
  }

  Osiris(request: QueryOsirisRequest): Promise<QueryOsirisResponse> {
    const data = QueryOsirisRequest.encode(request).finish();
    const promise = this.rpc.request("osiris.osiris.Query", "Osiris", data);
    return promise.then((data) => QueryOsirisResponse.decode(new _m0.Reader(data)));
  }

  UserData(request: QueryGetUserDataRequest): Promise<QueryGetUserDataResponse> {
    const data = QueryGetUserDataRequest.encode(request).finish();
    const promise = this.rpc.request("osiris.osiris.Query", "UserData", data);
    return promise.then((data) => QueryGetUserDataResponse.decode(new _m0.Reader(data)));
  }

  UserDataAll(request: QueryAllUserDataRequest): Promise<QueryAllUserDataResponse> {
    const data = QueryAllUserDataRequest.encode(request).finish();
    const promise = this.rpc.request("osiris.osiris.Query", "UserDataAll", data);
    return promise.then((data) => QueryAllUserDataResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

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
