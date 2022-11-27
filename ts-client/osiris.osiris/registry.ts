import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgCreatePost } from "./types/osiris/osiris/tx";
import { MsgSaveUserData } from "./types/osiris/osiris/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/osiris.osiris.MsgCreatePost", MsgCreatePost],
    ["/osiris.osiris.MsgSaveUserData", MsgSaveUserData],
    
];

export { msgTypes }