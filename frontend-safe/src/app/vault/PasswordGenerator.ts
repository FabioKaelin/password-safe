export default function generatePassword(charset: string, length: number): string {
    if (length <= 0) return '';
    const randomChar = charset[Math.floor(Math.random() * charset.length)];
    return randomChar + generatePassword(charset, length - 1);
}