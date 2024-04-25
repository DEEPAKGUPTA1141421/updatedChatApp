import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addMembers, deleteChat, getChatDetails, getMessages, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMember, renameGroup, sendAttachments } from "../controllers/chat.js";
import { attachmentsMulter } from "../middlewares/multer.js";
import { addMemberValidator, chatIdValidator, newGroupValidator, renameValidator, sendAttachmentsValidator, validateHandler } from "../lib/validators.js";
const chatRoutes = express.Router();
chatRoutes.use(isAuthenticated);
chatRoutes.post("/new",newGroupValidator(),validateHandler,newGroupChat);
chatRoutes.get("/my",getMyChats);
chatRoutes.get("/my/groups",getMyGroups);
chatRoutes.put("/addmembers",addMemberValidator(),validateHandler,addMembers);
chatRoutes.put("/removemember",removeMember);
chatRoutes.delete("/leave/:id",chatIdValidator(),validateHandler,leaveGroup);
chatRoutes.post("/message",sendAttachmentsValidator(),validateHandler,attachmentsMulter,sendAttachments);
chatRoutes.get("/message/:id",chatIdValidator(),validateHandler,getMessages);
chatRoutes.route("/:id").get(chatIdValidator(),validateHandler,getChatDetails).put(renameValidator(),validateHandler,renameGroup).delete(chatIdValidator(),validateHandler,deleteChat);
export default chatRoutes;