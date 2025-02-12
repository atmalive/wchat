import React, { useState } from "react";
import { formatPhoneNumber } from "../../utils/formatPhoneNumber.ts";

interface ContactsProps {
    contacts: string[];
    onAddContact: (phone: string) => void;
    onSelectContact: (phone: string) => void;
    onDeleteContact: (phone: string) => void;
    selectedContact: string | null;
}

export const Contacts: React.FC<ContactsProps> = ({
    contacts,
    onAddContact,
    onSelectContact,
    onDeleteContact,
    selectedContact,
}) => {
    const [newContact, setNewContact] = useState("");

    const handleAdd = () => {
        if (!newContact || newContact.length < 10 || newContact.length > 15) {
            alert("Введите корректный номер телефона (10-15 цифр)");
            return;
        }
        if (!contacts.includes(newContact)) {
            onAddContact(newContact);
        }
        setNewContact("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleAdd();
        }
    };

    return (
        <div className="w-1/3 border-r border-gray-300 flex flex-col">
            <div className="p-4 border-b">
                <h3 className="text-lg text-black font-semibold mb-2">Контакты</h3>
                <div className="flex">
                    <input
                        type="text"
                        placeholder="Например: 79990000000"
                        className="border border-black text-black p-2 w-full rounded-l"
                        value={newContact}
                        onChange={(e) => setNewContact(e.target.value.replace(/\D/g, ""))}
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        onClick={handleAdd}
                        className="bg-green-500 hover:opacity-80 text-white px-4 py-2 rounded-r cursor-pointer">
                        +
                    </button>
                </div>
            </div>

            <div className="flex-1 gap-2 overflow-y-auto">
                {contacts.length === 0 ? (
                    <p className="text-center text-gray-500 mt-4">Нет контактов</p>
                ) : (
                    contacts.map((contact) => (
                        <div
                            key={contact}
                            onClick={() => onSelectContact(contact)}
                            className={`flex justify-between items-center cursor-pointer text-md p-1 font-bold text-black border-b hover:bg-gray-100 ${
                                selectedContact === contact ? "bg-gray-200" : ""
                            }`}>
                            <span>{formatPhoneNumber(contact)}</span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDeleteContact(contact);
                                }}
                                className="text-red-500 hover:bg-red-200 cursor-pointer text-lg font-bold p-2 hover:text-red-700">
                                ❌
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};