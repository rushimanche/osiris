import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgSaveUserData } from "./types/osiris/osiris/tx";
import { MsgCreatePost } from "./types/osiris/osiris/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/osiris.osiris.MsgSaveUserData", MsgSaveUserData],
    ["/osiris.osiris.MsgCreatePost", MsgCreatePost],
    
];

export { msgTypes }