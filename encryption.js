const crypto = require('node:crypto')
const { ENCRYPTION_TYPE, ENCRYPTION_KEY, ENCRYPTION_IV } = process.env
const hashKey = crypto.createHash('sha256')
hashKey.update(ENCRYPTION_KEY)
const key = hashKey.digest() // .digest('hex').substring(0, 32) // Fix 2: no hex encoding

module.exports.encrypt = (encrypted) =>{
  const cipher = crypto.createDecipheriv('aes-256-cbc', key, ENCRYPTION_IV)
   cipher.setAutoPadding(false) // Fix 3: disable default PKCS#7 padding
  return Buffer.from(
    cipher.update(encrypted, 'utf8', 'hex') + cipher.final('utf8')
  ).toString("base64")
}
module.exports.decrypt = (encrypted) => {
  let data = Buffer.from(encrypted, "base64").toString()
  let aes = Buffer.from(data, "hex").toString()
  let decrypted = decipher.update(aes, 'hex', 'utf-8')
  decrypted += decipher.final('utf-8')
  return decrypted
}
 