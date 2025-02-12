import React, { useEffect, useState } from "react";
import { getQRCodeInstance } from "../../api/green-api.ts";

interface QRCodeProps {
    idInstance: string;
    apiTokenInstance: string;
    instanceState: string;
    onLogout: () => void;
    checkInstanceState: () => void;
}

export const QRCode: React.FC<QRCodeProps> = ({
                                                  idInstance,
                                                  apiTokenInstance,
                                                  instanceState,
                                                  onLogout,
                                                  checkInstanceState,
                                              }) => {
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [loadingQr, setLoadingQr] = useState(false);

    const fetchQRCode = async () => {
        setLoadingQr(true);
        try {
            const response = await getQRCodeInstance(idInstance, apiTokenInstance);
            if (response?.type === "qrCode" && response.message) {
                setQrCode(response.message);
            } else {
                console.error(response);
            }
        } catch (error) {
            console.error("Ошибка при получении QR:", error);
        } finally {
            setLoadingQr(false);
        }
    };

    useEffect(() => {
        if (instanceState === "notAuthorized" && !qrCode) {
            fetchQRCode();
        }
    }, [instanceState, qrCode]);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (qrCode) {
            timer = setTimeout(() => {
                setQrCode(null);
            }, 20000);
        }
        return () => {
            clearTimeout(timer);
        };
    }, [qrCode]);

    return (
        <div className="flex flex-col gap-5 bg-white p-10 rounded shadow w-full max-w-md">
            <h2 className="text-xl text-black mb-4 font-semibold">Привязка телефона</h2>
            <p className="mb-2 text-black">
                Текущий статус: <strong>{instanceState}</strong>
            </p>

            {instanceState === "notAuthorized" && (
                <p className="mb-4 text-sm text-gray-600">
                    Отсканируйте QR-код с помощью WhatsApp
                    (Menu → Linked device).
                </p>
            )}

            {instanceState === "notAuthorized" && (
                <>
                    {loadingQr && <p className="mb-4 text-sm text-gray-600">Идет запрос QRCode..</p>}
                    {!loadingQr && qrCode && (
                        <img
                            src={`data:image/png;base64,${qrCode}`}
                            alt="QR Code"
                            className="mx-auto mb-4 border"
                        />
                    )}
                    {!loadingQr && !qrCode && (
                        <button
                            onClick={fetchQRCode}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            disabled={loadingQr}
                        >
                            Получить QR
                        </button>
                    )}
                </>
            )}

            <button
                onClick={checkInstanceState}
                className="bg-green-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-green-600 mt-4"
                disabled={loadingQr}
            >
                Проверить статус
            </button>
            <button
                onClick={onLogout}
                className="bg-red-500 text-white p-2 m-2 rounded self-end cursor-pointer"
                disabled={loadingQr}
            >
                Выйти
            </button>
        </div>
    );
};