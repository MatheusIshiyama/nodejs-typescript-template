import crypto, { Cipher, Decipher } from 'crypto';

import cacheService from '@services/cacheService';

const algorithm: string = 'aes-256-cbc';

const secretKey: string = process.env.ENCRYPT_KEY!;
const secretIv: string = process.env.ENCRYPT_IV!;

function getKeyAndIv(): { key: Buffer; iv: Buffer } {
  const keyCached: Buffer | null = cacheService.get('encrypt_key') as Buffer;

  const key: Buffer = keyCached || Buffer.from(secretKey, 'hex'); // AES-256 key

  if (!keyCached) cacheService.set('encrypt_key', key);

  const ivCached: Buffer | null = cacheService.get('encrypt_iv') as Buffer;

  const iv: Buffer = ivCached || Buffer.from(secretIv, 'hex'); // AES block size is 16 bytes

  if (!ivCached) cacheService.set('encrypt_iv', iv);

  return { key, iv };
}

export function encrypt(text: string): string {
  const { key, iv } = getKeyAndIv();

  const cipher: Cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted: string = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return encrypted;
}

export function decrypt(encryptedText: string): string {
  const { key, iv } = getKeyAndIv();

  const decipher: Decipher = crypto.createDecipheriv(algorithm, key, iv);

  let decrypted: string = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}
