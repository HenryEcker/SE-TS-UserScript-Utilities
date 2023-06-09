"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteChatMessage = exports.editChatMessage = exports.sendChatMessage = void 0;
const General_1 = require("../Utilities/General");
function sendChatMessage(roomId, messageText, chatFkey) {
    // Will respond with a 200 if successful with JSON {id: number; time: number;}
    // Will respond with a 409 if rate limited. The response message is plaintext not JSON
    return (0, General_1.ajaxPostWithData)(`/chats/${roomId}/messages/new`, {
        'text': messageText,
        'fkey': chatFkey
    });
}
exports.sendChatMessage = sendChatMessage;
function editChatMessage(messageId, updatedText, chatFkey) {
    return (0, General_1.ajaxPostWithData)(`/messages/${messageId}`, {
        'text': updatedText,
        'fkey': chatFkey
    });
}
exports.editChatMessage = editChatMessage;
function deleteChatMessage(messageId, chatFkey) {
    // Will respond with a 200 if successful and text "ok"
    // Will respond with a 200 if already deleted text "This message has already been deleted."
    return (0, General_1.ajaxPostWithData)(`/messages/${messageId}/delete`, {
        'fkey': chatFkey
    });
}
exports.deleteChatMessage = deleteChatMessage;
//# sourceMappingURL=Chat.js.map