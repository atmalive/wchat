import React, { useState, useEffect, useRef } from "react";
import { Message } from "../Message/Message.tsx";
import { formatPhoneNumber } from "../../utils/formatPhoneNumber.ts";
import { MessageType } from "../../types/types.ts";
import {
    deleteNotificationInstance,
    receiveMessagesInstance,
    sendMessageInstance,
} from "../../api/green-api.ts";

interface ChatProps {
    selectedContact: string | null;
    apiTokenInstance: string;
    idInstance: string;
}
const time = 5000;

export const Chat: React.FC<ChatProps> = ({ selectedContact, idInstance, apiTokenInstance }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [messageText, setMessageText] = useState<string>("");
    const scrollRef = useRef<HTMLDivElement | null>(null);

    const seconds = Math.round(time / 1000);

    useEffect(() => {
        setMessages([]);
    }, [selectedContact]);

    const sendMessage = async () => {
        if (!messageText.trim()) return;
        setLoading(true);

        try {
            const chatId = `${selectedContact}@c.us`;
            const data = await sendMessageInstance(
                idInstance,
                apiTokenInstance,
                chatId,
                messageText,
            );

            if (data?.idMessage) {
                const newMsg: MessageType = {
                    id: data.idMessage,
                    text: messageText,
                    sender: "me",
                    timestamp: new Date().toLocaleTimeString(),
                };
                setMessages((prev) => [...prev, newMsg]);
                setMessageText("");
            }
        } finally {
            setLoading(false);
        }
    };

    const receiveMessages = async () => {
        const data = await receiveMessagesInstance(idInstance, apiTokenInstance, seconds);

        if (data && data.body) {
            const { receiptId, body } = data;
            if (body.typeWebhook === "incomingMessageReceived") {
                const sender = body.senderData?.sender;
                if (sender && sender.includes(selectedContact!)) {
                    const newMessage: MessageType = {
                        id: body.idMessage,
                        text: body.messageData?.textMessageData?.textMessage ?? "",
                        sender,
                        timestamp: new Date().toLocaleTimeString(),
                    };

                    setMessages((prev) => {
                        if (!prev.some((msg) => msg.id === newMessage.id)) {
                            return [...prev, newMessage];
                        }
                        return prev;
                    });
                }
            }
            await deleteNotificationInstance(idInstance, apiTokenInstance, receiptId);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };

    useEffect(() => {
        if (selectedContact) {
            const intervalId = setInterval(receiveMessages, time);
            return () => clearInterval(intervalId);
        }
    }, [selectedContact]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    if (!selectedContact) {
        return (
            <div className="w-2/3 text-xl flex items-center justify-center text-gray-500">
                Выберите контакт
            </div>
        );
    }

    return (
        <div className="w-full h-dvh max-h-[600px] flex flex-col">
            <div className="p-4 border-b bg-gray-50">
                <h3 className="text-lg text-black font-semibold">
                    Чат: {formatPhoneNumber(selectedContact)}
                </h3>
            </div>

            <div ref={scrollRef} className="flex-1 gap-3 overflow-y-auto p-4">
                {messages.map((msg) => (
                    <Message key={msg.id} msg={msg} />
                ))}
            </div>

            <div className="p-4 mt-auto border-t flex">
                <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="border border-black text-black rounded-l p-2 w-full"
                    placeholder="Введите сообщение"
                    onKeyDown={handleKeyDown}
                />
                <button
                    onClick={sendMessage}
                    disabled={loading}
                    className={` text-white px-4 py-2 rounded-r cursor-pointer hover:opacity-80 ${loading ? "bg-gray-400" : "bg-green-500"}`}>
                    Отправить
                </button>
            </div>
        </div>
    );
};