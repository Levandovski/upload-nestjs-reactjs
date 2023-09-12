export const download = (item: any) => {
  //Convertendo ArrayBuffer em ArrayBuffer de Memoria
  const buffer = new Uint8Array(item.file.data);
  //Criando Blob
  const blob = new Blob([buffer], { type: item.type });
  //Criando url temporaria para download
  const file = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = file;
  link.download = item.filename;
  link.dispatchEvent(new MouseEvent('click'));

  return item;
};

export const convertImgBlobUrl = (file: any) => {
  return URL.createObjectURL(
    new Blob([new Uint8Array(file.file.data)], { type: file.type }),
  );
};
