import * as crypto from "crypto";

const algorithm: string = "aes-256-cbc";
const key: string = "O6HbuAkB4YRlIDxPAvLQLzEYVGlBlxJH";
const iv: string = "DsP3YvqI2PkOH0fT";

export function encrypt(text: string): string {
  const cipher: crypto.Cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted: Buffer = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString("hex");
}

export function decrypt(text: string): string {
  const encryptedText: Buffer = Buffer.from(text, "hex");
  const decipher: crypto.Decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  let decrypted: Buffer = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
