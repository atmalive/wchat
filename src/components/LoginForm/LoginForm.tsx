import React, { useState } from "react";
import { Button } from "../Button/Button.tsx";

interface LoginFormProps {
    loading: boolean;
    onLogin: (id: string, token: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin, loading }) => {
    const [id, setId] = useState<string>("");
    const [token, setToken] = useState<string>("");

    const isButtonDisabled = loading || !token || !id;

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (id && token) {
            onLogin(id, token);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 bg-white p-10 rounded shadow w-full max-w-md">
            <h2 className="text-xl mb-4 font-bold text-black">Вход в Green-API</h2>
            <div className="mb-4">
                <label className="block mb-1 font-medium text-black">idInstance</label>
                <input
                    type="text"
                    className="border text-black border-black w-full p-2 rounded"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-medium text-black">apiTokenInstance</label>
                <input
                    type="text"
                    className="border text-black border-black w-full p-2 rounded"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    required
                />
            </div>
            <Button isLoading={isButtonDisabled}>{loading ? "Загрузка..." : "Войти"}</Button>
        </form>
    );
};