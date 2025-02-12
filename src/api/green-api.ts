const getBaseUrl = (idInstance: string) => `https://${idInstance.slice(0, 4)}.api.green-api.com`;

export const getStateInstance = async (
    idInstance: string,
    apiTokenInstance: string,
): Promise<string> => {
    const url = `${getBaseUrl(idInstance)}/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`;

    console.log("Запрос в greenApi:", url);

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data?.stateInstance || "notAuthorized";
    } catch (error) {
        console.error("Ошибка при получении статуса Instance", error);
        return "notAuthorized";
    }
};

export const getQRCodeInstance = async (idInstance: string, apiTokenInstance: string) => {
    const url = `${getBaseUrl(idInstance)}/waInstance${idInstance}/qr/${apiTokenInstance}`;

    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error("Ошибка при получении QR-кода:", error);
        return null;
    }
};

export const sendMessageInstance = async (
    idInstance: string,
    apiTokenInstance: string,
    chatId: string,
    message: string,
) => {
    const url = `${getBaseUrl(idInstance)}/waInstance${idInstance}/SendMessage/${apiTokenInstance}`;

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chatId, message }),
        });

        return await res.json();
    } catch (error) {
        console.error("Ошибка при отправке сообщения:", error);
        return null;
    }
};

export const deleteNotificationInstance = async (
    idInstance: string,
    apiTokenInstance: string,
    receiptId: string,
) => {
    const url = `${getBaseUrl(idInstance)}/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`;

    try {
        await fetch(url, { method: "DELETE" });
    } catch (error) {
        console.error("Ошибка при удалении уведомления:", error);
    }
};

export const receiveMessagesInstance = async (
    idInstance: string,
    apiTokenInstance: string,
    timeout: number,
) => {
    const url = `${getBaseUrl(idInstance)}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}?receiveTimeout=${timeout}`;

    try {
        const resp = await fetch(url);
        return await resp.json();
    } catch (error) {
        console.error("Ошибка при получении сообщений:", error);
        return null;
    }
};