const crypto = require('crypto')
const { ENCRYPTION_TYPE, ENCRYPTION_KEY, ENCRYPTION_IV } = process.env
const key = crypto
  .createHash('sha512')
  .update(ENCRYPTION_KEY)
  .digest('hex')
  .substring(0, 32)
const encryptionIV = crypto
  .createHash('sha512')
  .update(ENCRYPTION_IV)
  .digest('hex')
  .substring(0, 16)

// Encrypt data
module.exports.encryptData = function(data) {
  const cipher = crypto.createCipheriv(ENCRYPTION_TYPE, key, encryptionIV)
  return Buffer.from(
    cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
  ).toString('base64') // Encrypts data and converts to hex and base64
}

// Decrypt data
module.exports.decryptData = function(encryptedData) {
  const buff = Buffer.from(encryptedData, 'base64')
  const decipher = crypto.createDecipheriv(ENCRYPTION_TYPE, key, encryptionIV)
  return (
    decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
    decipher.final('utf8')
  ) // Decrypts data and converts to utf-8
}