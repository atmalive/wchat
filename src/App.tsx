import { useState, useEffect } from "react";
import { Chat, Contacts, LoginForm, QRCode } from "./components";
import { getStateInstance } from "./api/green-api.ts";

export default function App() {
    const [loading, setLoading] = useState<boolean>(false);
    const [idInstance, setIdInstance] = useState<string>("");
    const [apiTokenInstance, setApiTokenInstance] = useState<string>("");
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [instanceState, setInstanceState] = useState<string>("");
    const [contacts, setContacts] = useState<string[]>([]);
    const [selectedContact, setSelectedContact] = useState<string | null>(null);

    const checkInstanceState = async (): Promise<void> => {
        setLoading(true);
        const state = await getStateInstance(idInstance, apiTokenInstance);
        setInstanceState(state);
        setLoading(false);
    };

    const handleAddContact = (phone: string): void => {
        if (!phone.trim()) return;
        if (!contacts.includes(phone)) {
            setContacts((prev) => [...prev, phone]);
        }
    };

    const handleDeleteContact = (phone: string): void => {
        setContacts((prev) => prev.filter((contact) => contact !== phone));

        if (selectedContact === phone) {
            setSelectedContact(null);
        }
    };

    const handleLogin = (id: string, token: string): void => {
        setIdInstance(id);
        setApiTokenInstance(token);
        setIsLoggedIn(true);
        localStorage.setItem("idInstance", id);
        localStorage.setItem("apiTokenInstance", token);
    };

    const handleLogout = (): void => {
        localStorage.removeItem("idInstance");
        localStorage.removeItem("apiTokenInstance");
        setIdInstance("");
        setApiTokenInstance("");
        setIsLoggedIn(false);
        setInstanceState("");
    };

    useEffect(() => {
        const storedIdInstance = localStorage.getItem("idInstance");
        const storedApiTokenInstance = localStorage.getItem("apiTokenInstance");
        if (storedIdInstance && storedApiTokenInstance) {
            setIdInstance(storedIdInstance);
            setApiTokenInstance(storedApiTokenInstance);
            setIsLoggedIn(true);
        }
    }, []);

    useEffect(() => {
        if (isLoggedIn && idInstance && apiTokenInstance) {
            checkInstanceState();
        }
    }, [isLoggedIn, idInstance, apiTokenInstance]);

    return (
        <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center">
            {!isLoggedIn ? (
                <LoginForm onLogin={handleLogin} loading={loading} />
            ) : instanceState !== "authorized" ? (
                <QRCode
                    instanceState={instanceState}
                    onLogout={handleLogout}
                    checkInstanceState={checkInstanceState}
                />
            ) : (
                <div className="w-full relative max-w-5xl h-[600px] bg-white flex rounded shadow">
                    <Contacts
                        contacts={contacts}
                        onAddContact={handleAddContact}
                        onSelectContact={setSelectedContact}
                        selectedContact={selectedContact}
                        onDeleteContact={handleDeleteContact}
                    />
                    <div className="flex flex-col flex-1">
                        <button
                            onClick={handleLogout}
                            className="absolute top-2 right-2 bg-red-500 hover:opacity-80 transition cursor-pointer text-white p-2 m-2 rounded self-end">
                            Выйти
                        </button>
                        <Chat
                            selectedContact={selectedContact}
                            idInstance={idInstance}
                            apiTokenInstance={apiTokenInstance}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}