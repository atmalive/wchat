export const formatPhoneNumber = (phone: string): string => {
    const digits = phone.replace(/\D/g, "");

    let countryCode = "";
    let numberPart = digits;

    if (digits.startsWith("7")) {
        countryCode = "+7";
        numberPart = digits.slice(1);
    } else if (digits.startsWith("3")) {
        countryCode = `+${digits.slice(0, 2)}`;
        numberPart = digits.slice(2);
    } else {
        return phone;
    }

    if (numberPart.length >= 10) {
        return `${countryCode}(${numberPart.slice(0, 3)})${numberPart.slice(3, 6)}-${numberPart.slice(6, 8)}-${numberPart.slice(8, 10)}`;
    } else {
        return `${countryCode}(${numberPart})`;
    }
};