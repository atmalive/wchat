import React from "react";
import { MessageType } from "../../types/types.ts";

interface MessageProps {
    msg: MessageType;
}

export const Message: React.FC<MessageProps> = ({ msg }) => {
    const isMyMessage = msg.sender === "me";

    return (
        <div className={`mb-2 flex ${isMyMessage ? "justify-end" : "justify-start"}`}>
            <div
                className={`max-w-xs rounded px-3 py-2 text-sm shadow ${
                    isMyMessage ? "bg-green-100" : "bg-gray-100"
                }`}>
                <p className="break-words text-black">{msg.text}</p>
                <div className="text-right text-xs text-gray-500 mt-1">{msg.timestamp}</div>
            </div>
        </div>
    );
};