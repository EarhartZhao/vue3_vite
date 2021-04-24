export const downFile = (title: string, url: string) => {
  const a = document.createElement("a");
  a.href = url;
  // a.target = "_blank";
  a.download = title;
  a.click();
};
export const downBlob = (title: string, res: Blob) => {
  let blob = new Blob([res], {
    type: "application/octet-stream;charset=UTF-8",
  });
  let downloadElement = document.createElement("a");
  let href = window.URL.createObjectURL(blob); //创建下载的链接
  downloadElement.href = href;
  downloadElement.download = title; //下载后文件名
  document.body.appendChild(downloadElement);
  downloadElement.click(); //点击下载
  document.body.removeChild(downloadElement); //下载完成移除元素
  window.URL.revokeObjectURL(href);
};
