import crypto from "node:crypto";
import fs from "node:fs/promises";

export type Algorithm = "AES-CBC" | "AES-GCM";

export type KeyLength = 128 | 192 | 256;

export type TagLength = 32 | 64 | 128;

export interface EncryptDecryptOptions {
  algorithm?: Algorithm;
  secretKey?: string;
  keyUsages?: KeyUsage[];
  extractable?: boolean;
  keyType?: KeyType;
  keyLength?: KeyLength;
  tagLength?: TagLength;
  encoding?: BufferEncoding;
  iterations?: number;
  salt?: number;
}

class CryptoSubtleShield {
  private algorithm: Algorithm;
  private secretKey: string;
  private extractable: boolean;
  private keyLength: KeyLength;
  private keyUsages: KeyUsage[];
  private tagLength: TagLength;
  private encoding: BufferEncoding;
  private iterations: number;
  private salt: number;

  constructor(options: EncryptDecryptOptions = {}) {
    const {
      algorithm = "AES-GCM",
      secretKey = "",
      extractable = false,
      keyLength = 256,
      tagLength = 128,
      keyUsages = ["encrypt", "decrypt"],
      encoding = "hex",
      iterations = 1000,
      salt = 16,
    } = options;
    this.algorithm = algorithm;
    this.secretKey = secretKey.trim();
    this.extractable = extractable;
    this.keyLength = keyLength;
    this.keyUsages = keyUsages;
    this.tagLength = tagLength;
    this.encoding = encoding;
    this.iterations = iterations;
    this.salt = salt;
  }

  public setSecretKey(secretKey: string) {
    this.secretKey = secretKey.trim();
  }

  public setAlgorithm(algorithm: Algorithm, keyLength: KeyLength) {
    this.algorithm = algorithm;
    this.keyLength = keyLength;
  }

  private generateSecretKey(secretKey: string) {
    const secretKeyLen = this.keyLength / 8;
    const secretBuffer = Buffer.from(secretKey, "utf8");
    if (secretKeyLen === secretKey.length) return secretBuffer;
    return crypto.pbkdf2Sync(
      secretBuffer,
      secretBuffer,
      this.iterations,
      secretKeyLen,
      "sha256"
    );
  }

  private async driveKeyAlgorithm(secretKey?: string) {
    try {
      const secret = secretKey || this.secretKey;
      if (typeof secret !== "string" || !secret.trim())
        throw new Error("Invalid secret key!");
      const secretBuffer = this.generateSecretKey(secret);
      const iv = new Uint8Array(16);
      const algorithm = { name: this.algorithm, iv, tagLength: this.tagLength };
      const key = await crypto.subtle.importKey(
        "raw",
        secretBuffer,
        { name: this.algorithm, length: this.keyLength },
        this.extractable,
        this.keyUsages
      );
      return { key, algorithm };
    } catch (error) {
      throw new Error(`Error while generate key! ${error}`);
    }
  }

  private arrayBufferToBuffer(arrayBuffer: ArrayBuffer) {
    const salt = crypto.randomBytes(this.salt);
    const salt2 = crypto.randomBytes(this.salt);
    const buffer = new Uint8Array(arrayBuffer);
    return Buffer.concat([salt, buffer, salt2]);
  }

  private decodeBuffer(buffer: Buffer) {
    const salt = buffer.subarray(this.salt);
    const data = salt.subarray(0, salt.length - this.salt);
    return data;
  }

  public async encryptText(text: string, secret?: string) {
    try {
      const { key, algorithm } = await this.driveKeyAlgorithm(secret);
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      const arrayBuffer = await crypto.subtle.encrypt(algorithm, key, data);
      return this.arrayBufferToBuffer(arrayBuffer).toString(this.encoding);
    } catch (error) {
      throw new Error(`Error while encrypt the text! ${error}`);
    }
  }

  public async decryptText(encryptedText: string, secret?: string) {
    try {
      const { key, algorithm } = await this.driveKeyAlgorithm(secret);
      const buffer = Buffer.from(encryptedText, this.encoding);
      const data = this.decodeBuffer(buffer);
      const decrypted = await crypto.subtle.decrypt(algorithm, key, data);
      const decoder = new TextDecoder();
      return decoder.decode(decrypted);
    } catch (error) {
      throw new Error(`Error while decrypt the text! ${error}`);
    }
  }

  public async encryptFile(
    inputFilePath: string,
    outputFilePath: string | null = null,
    secret?: string
  ) {
    try {
      const { key, algorithm } = await this.driveKeyAlgorithm(secret);
      const data = await fs.readFile(inputFilePath);
      const encryptedData = await crypto.subtle.encrypt(algorithm, key, data);
      const buffer = this.arrayBufferToBuffer(encryptedData);
      const outPath = outputFilePath || inputFilePath;
      await fs.writeFile(outPath, buffer);
      return true;
    } catch (error) {
      throw new Error(`Error while encrypt file! ${error}`);
    }
  }

  public async decryptFile(
    encryptedFilePath: string,
    outputFilePath: string | null = null,
    secret?: string
  ) {
    try {
      const { key, algorithm } = await this.driveKeyAlgorithm(secret);
      const buffer = await fs.readFile(encryptedFilePath);
      const data = this.decodeBuffer(buffer);
      const decrypted = await crypto.subtle.decrypt(algorithm, key, data);
      const outPath = outputFilePath || encryptedFilePath;
      const decryptedBuffer = new Uint8Array(decrypted);
      await fs.writeFile(outPath, decryptedBuffer);
      return true;
    } catch (error) {
      throw new Error(`Error while decrypt file! ${error}`);
    }
  }
}
export default CryptoSubtleShield;
