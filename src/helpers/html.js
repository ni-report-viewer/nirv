import { basename, dirname, relative } from "path";

export const readHtml = (inputFile) => {
  const tempFileReader = new FileReader();

  return new Promise((resolve, reject) => {
    tempFileReader.onerror = () => {
      tempFileReader.abort();
      reject(new DOMException("Problem parsing input file."));
    };

    tempFileReader.onload = () => {
      resolve(tempFileReader.result);
    };
    tempFileReader.readAsText(inputFile);
  });
};

const participantRe = /sub-[a-z0-9]+/gi;
const sessionRe = /ses-[a-z0-9]+/gi;

export const getParticipantId = (inputString) =>
  inputString.match(participantRe);
export const getSessionId = (inputString) => inputString.match(sessionRe);

const getBase64 = (inputFile) => {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onerror = (error) => {
      reader.abort();
      reject(error);
    };

    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader.readAsDataURL(inputFile);
  });
};

const relativeWithDot = (from, to) => {
  const relativePath = relative(dirname(from), to);
  return relativePath.startsWith(".") ? relativePath : `./${relativePath}`;
};

const replaceDataUriAttributes = (doc, substr, replacement) => {
  const srcNodeList = doc.querySelectorAll("[src],[data],[href]");
  for (const node of srcNodeList) {
    if (node.getAttribute("src") === substr) {
      node.setAttribute("src", String.raw`${replacement}`);
    } else if (node.getAttribute("data") === substr) {
      node.setAttribute("data", String.raw`${replacement}`);
    } else if (node.getAttribute("href") === substr) {
      node.setAttribute("href", String.raw`${replacement}`);
      node.setAttribute("download", basename(substr));
    }
  }

  return doc;
};

export const insertDataUrisIntoHtml = async (
  htmlString,
  htmlPath,
  participantFiles
) => {
  const filesInHtml = participantFiles.filter((file) => {
    const relPath = relativeWithDot(htmlPath, file.$path);
    return file.$path !== htmlPath && htmlString.includes(relPath);
  });

  let doc = new DOMParser().parseFromString(htmlString, "text/html");

  for (const file of filesInHtml) {
    const relPath = relativeWithDot(htmlPath, file.$path);
    const base64 = await getBase64(file);
    doc = replaceDataUriAttributes(doc, relPath, base64);
  }

  return new XMLSerializer().serializeToString(doc);
};
