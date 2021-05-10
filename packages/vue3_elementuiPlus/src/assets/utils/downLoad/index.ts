import { cfg } from '../../axios/index'

export const downFile = (title: string, url: string) => {
  const a = document.createElement("a");
  a.href = cfg.UPLOAD_URL + url;
  // a.target = "_blank";
  a.download = title;
  a.click();
};

export const downBlob = (title: string, res: Blob) => {
  let blob = new Blob([res], {
    type: "application/octet-stream;charset=UTF-8",
  });
  let downloadElement = document.createElement("a");
  let href = window.URL.createObjectURL(blob);
  downloadElement.href = href;
  downloadElement.download = title;
  document.body.appendChild(downloadElement);
  downloadElement.click();
  document.body.removeChild(downloadElement);
  window.URL.revokeObjectURL(href);
};

export const downBlobJson = (title: string, res: Blob) => {
  let url = window.URL.createObjectURL(new Blob([res]));
  let link = document.createElement("a");
  link.style.display = "none";
  link.href = url;
  link.setAttribute("download", title);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
