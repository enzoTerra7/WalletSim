import bcrypt from "bcrypt";

const encryptData = async (plainData: string) => {
  const salt = 10;
  const encrypt = bcrypt.hash(plainData, salt);

  if (!encrypt) {
    return JSON.stringify({ payload: null });
  }

  return encrypt;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleEncryption = async (data: any) => {
  return await encryptData(JSON.stringify({ data }));
};

const handleDecryption = async (
  notEncryptedData: string | Buffer,
  encryptedData: string
) => {
  const decryptedData = await bcrypt.compare(notEncryptedData, encryptedData);

  return decryptedData;
};

export { handleEncryption, handleDecryption };
