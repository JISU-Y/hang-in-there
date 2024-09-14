import cryptoJS from 'crypto-js';

const createCryptoUtils = () => {
  const IV = process.env.secretKey?.substring(0, 16) || '';
  const cfg = {
    iv: cryptoJS.enc.Utf8.parse(IV),
    padding: cryptoJS.pad.Pkcs7,
    mode: cryptoJS.mode.CBC
  };
  const cryptoKey = cryptoJS.enc.Utf8.parse(process.env.secretKey || '');

  // 암호화 함수
  const encrypt = (data: string) => {
    return cryptoJS.AES.encrypt(data, cryptoKey, cfg).toString();
  };

  // 복호화 함수
  const decrypt = (data: string) => {
    return cryptoJS.AES.decrypt(data, cryptoKey, cfg).toString(
      cryptoJS.enc.Utf8
    );
  };

  // URI 인코딩 함수
  const encodeURIData = (data: string) => {
    return encodeURIComponent(encrypt(String(data)));
  };

  // URI 디코딩 함수
  const decodeURIData = (data: string) => {
    return decrypt(decodeURIComponent(data));
  };

  return {
    getCrypto: encrypt,
    deCrypto: decrypt,
    enCodeURI: encodeURIData,
    deCodeURI: decodeURIData
  };
};

const cryptoUtils = createCryptoUtils();

export default cryptoUtils;
