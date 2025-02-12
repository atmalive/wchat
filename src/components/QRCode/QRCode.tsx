import React from "react";

interface QRCodeProps {
    instanceState: string;
    onLogout: () => void;
    checkInstanceState: () => void;
}

export const QRCode: React.FC<QRCodeProps> = ({ instanceState, onLogout, checkInstanceState }) => {
    return (
        <div className="flex flex-col gap-5 bg-white p-10 rounded shadow w-full max-w-md">
            <h2 className="text-xl text-black mb-4 font-semibold">Привязка телефона</h2>
            <p className="mb-2 text-black">
                Текущий статус: <strong>{instanceState}</strong>
            </p>

            {instanceState === "notAuthorized" && (
                <>
                    <p className="mb-4 text-sm text-gray-600">
                        Отсканируйте QR-код в личном кабинете Green-API с помощью WhatsApp (Меню →
                        Linked devices / Связанные устройства).
                    </p>
                </>
            )}

            <button
                onClick={checkInstanceState}
                className="bg-green-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-green-600 mt-4">
                Проверить статус
            </button>
            <button
                onClick={onLogout}
                className="bg-red-500 text-white p-2 m-2 rounded self-end cursor-pointer">
                Выйти
            </button>
        </div>
    );
};