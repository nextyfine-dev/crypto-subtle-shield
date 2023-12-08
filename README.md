# CryptoSubtleShield 🛡️

CryptoSubtleShield is a Node.js library for easy encryption and decryption using various algorithms. It provides a convenient interface to Node.js's built-in crypto module and offers additional features for enhanced control and security.

## Table of Contents

- [CryptoSubtleShield 🛡️](#cryptosubtleshield-️)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Initialization](#initialization)
    - [Setting the Secret Key](#setting-the-secret-key)
    - [Basic Usage](#basic-usage)
      - [CommonJS](#commonjs)
      - [ES6 Module](#es6-module)
    - [File Encryption](#file-encryption)
      - [CommonJS](#commonjs-1)
      - [ES6 Module](#es6-module-1)
  - [API Documentation](#api-documentation)
    - [`CryptoSubtleShield(options)`](#cryptosubtleshieldoptions)
    - [`setSecretKey(secretKey)`](#setsecretkeysecretkey)
    - [`setAlgorithm(algorithm, keyLength)`](#setalgorithmalgorithm-keylength)
    - [`encryptText(text, secret?)`](#encrypttexttext-secret)
    - [`decryptText(encryptedText, secret?)`](#decrypttextencryptedtext-secret)
    - [`encryptFile(inputFilePath, outputFilePath?, secret?)`](#encryptfileinputfilepath-outputfilepath-secret)
    - [`decryptFile(encryptedFilePath, outputFilePath?, secret?)`](#decryptfileencryptedfilepath-outputfilepath-secret)
    - [`EncryptDecryptOptions`](#encryptdecryptoptions)
  - [License](#license)

## Features

- 🚀 Encrypt and decrypt text.
- 📁 Encrypt and decrypt files.
- 🔐 Supports multiple encryption algorithms (AES-CBC, AES-GCM).
- 🛠️ Customizable encryption options.
- 🔑 Uses PBKDF2 for key derivation.
- ⚙️ Options for key length, tag length, encoding, and more.
  ...

## Installation

To install CryptoSubtleShield, use npm, yarn or bun:

```bash
npm install crypto-subtle-shield
```

```bash
yarn add crypto-subtle-shield
```

```bash
bun add crypto-subtle-shield
```

## Usage

### Initialization

```javascript
// CommonJS
const CryptoSubtleShield = require("crypto-subtle-shield").default;
const cryptoShield = new CryptoSubtleShield();

// ESM
import CryptoSubtleShield from "crypto-subtle-shield";
const cryptoShield = new CryptoSubtleShield();
```

### Setting the Secret Key

```javascript
const secretKey = "my-secret-key";

// Set the key while initialize
const cryptoShield = new CryptoSubtleShield({ secretKey });

// OR

// Add secretKey after initialize it.
const cryptoShield = new CryptoShield();
cryptoShield.setSecretKey(secretKey);

// OR

// pass secretKey while encrypting or decrypting
await cryptoShield.encryptText(text, "your-secret-key");
```

### Basic Usage

#### CommonJS

```typescript
const CryptoSubtleShield = require("crypto-subtle-shield");

const cryptoShield = new CryptoSubtleShield();

const plaintext = "Hello, CryptoSubtleShield!";
const encryptedText = await cryptoShield.encryptText(
  plaintext,
  "your-secret-key"
);
console.log("Encrypted:", encryptedText);

const decryptedText = await cryptoShield.decryptText(
  encryptedText,
  "your-secret-key"
);
console.log("Decrypted:", decryptedText);
```

#### ES6 Module

```typescript
import CryptoSubtleShield from "crypto-subtle-shield";

const cryptoShield = new CryptoSubtleShield();

cryptoShield.setSecretKey("your-secret-key");

const plaintext = "Hello, CryptoSubtleShield!";
const encryptedText = await cryptoShield.encryptText(plaintext);
console.log("Encrypted:", encryptedText);

const decryptedText = await cryptoShield.decryptText(encryptedText);
console.log("Decrypted:", decryptedText);
```

### File Encryption

#### CommonJS

```typescript
const CryptoSubtleShield = require("crypto-subtle-shield");

const secretKey = "your-secret-key";

const cryptoShield = new CryptoSubtleShield({ secretKey });

const inputFile = "path/to/your/file.txt";
const encryptedFile = "path/to/your/encrypted/file.txt";

await cryptoShield.encryptFile(inputFile, encryptedFile);
console.log("File Encrypted:", encryptedFile);

const decryptedFile = "path/to/your/decrypted/file.txt";
await cryptoShield.decryptFile(encryptedFile, decryptedFile);
console.log("File Decrypted:", decryptedFile);
```

#### ES6 Module

```typescript
import CryptoSubtleShield from "crypto-subtle-shield";

const cryptoShield = new CryptoSubtleShield();

const inputFile = "path/to/your/file.txt";
const encryptedFile = "path/to/your/encrypted/file.txt";

await cryptoShield.encryptFile(inputFile, encryptedFile, "your-secret-key");
console.log("File Encrypted:", encryptedFile);

const decryptedFile = "path/to/your/decrypted/file.txt";
await cryptoShield.decryptFile(encryptedFile, decryptedFile, "your-secret-key");
console.log("File Decrypted:", decryptedFile);
```

## API Documentation

### `CryptoSubtleShield(options)`

Creates a new instance of CryptoSubtleShield.

- `options` (optional): An object with configuration options. See [EncryptDecryptOptions](#encryptdecryptoptions) for details.

### `setSecretKey(secretKey)`

Sets the secret key for encryption and decryption.

- `secretKey`: The secret key to set.

### `setAlgorithm(algorithm, keyLength)`

Sets the encryption algorithm and key length.

- `algorithm`: The encryption algorithm (AES-CBC or AES-GCM).
- `keyLength`: The key length (128, 192, or 256).

### `encryptText(text, secret?)`

Encrypts a text string.

- `text`: The text to encrypt.
- `secret` (optional): The secret key. If not provided, the instance's secret key is used.

Returns a Promise that resolves to the encrypted text.

### `decryptText(encryptedText, secret?)`

Decrypts an encrypted text string.

- `encryptedText`: The text to decrypt.
- `secret` (optional): The secret key. If not provided, the instance's secret key is used.

Returns a Promise that resolves to the decrypted text.

### `encryptFile(inputFilePath, outputFilePath?, secret?)`

Encrypts a file.

- `inputFilePath`: The path to the input file.
- `outputFilePath` (optional): The path to the output file. If not provided, the input file is overwritten.
- `secret` (optional): The secret key. If not provided, the instance's secret key is used.

Returns a Promise that resolves when the file is successfully encrypted.

### `decryptFile(encryptedFilePath, outputFilePath?, secret?)`

Decrypts an encrypted file.

- `encryptedFilePath`: The path to the encrypted file.
- `outputFilePath` (optional): The path to the output file. If not provided, the decrypted file is overwritten.
- `secret` (optional): The secret key. If not provided, the instance's secret key is used.

Returns a Promise that resolves when the file is successfully decrypted.

### `EncryptDecryptOptions`

An object with configuration options for CryptoSubtleShield.

- `algorithm` (optional): The encryption algorithm (AES-CBC or AES-GCM). Default is AES-GCM.
- `secretKey` (optional): The secret key for encryption and decryption. If not provided, it must be set later using `setSecretKey`.
- `keyUsages` (optional): An array of key usages (encrypt, decrypt, etc.). Default is ['encrypt', 'decrypt'].
- `extractable` (optional): Whether the key should be extractable. Default is false.
- `keyType` (optional): The type of key to import. Default is 'raw'.
- `keyLength` (optional): The key length (128, 192, or 256). Default is 256.
- `tagLength` (optional): The tag length for authentication (32, 64, or 128). Default is 128.
- `encoding` (optional): The encoding for text conversion. Default is 'hex'.
- `iterations` (optional): The number of iterations

for PBKDF2 key derivation. Default is 1000.

- `salt` (optional): The length of the salt for PBKDF2 key derivation. Default is 16.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
