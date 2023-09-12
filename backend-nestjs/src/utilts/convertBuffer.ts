export const convertToBufferInBase64 = (buffer: Buffer) => {
  return buffer.toString('base64');
};

export const convertToBase64InBuffer = (base64: string) => {
  return Buffer.from(base64, 'base64');
};
