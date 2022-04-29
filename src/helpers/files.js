import _ from "lodash";
import Papa from "papaparse";

const getFileDepth = (file, sourceType = "file") => {
  if (sourceType === "file") {
    return file.webkitRelativePath.split("/").length;
  } else if (sourceType === "s3") {
    return file.split("/").length;
  }
};

export const selectRootFile = (matchedFiles) => {
  // if there are multiple matching files, select the one closest to the root
  // directory
  if (matchedFiles.length === 1) {
    return matchedFiles[0];
  } else {
    const groupedFiles = _.groupBy(matchedFiles, getFileDepth);
    const smallest = Math.min(...Object.keys(groupedFiles));
    const rootFiles = groupedFiles[smallest];
    if (rootFiles.length === 1) {
      return rootFiles[0];
    } else {
      return null;
    }
  }
};

export const readCsv = (input, isURL = false) => {
  return new Promise((resolve, reject) => {
    Papa.parse(input, {
      download: isURL,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data),
      error: reject,
    });
  });
};

export const readJson = (inputFile) => {
  const tempFileReader = new FileReader();

  return new Promise((resolve, reject) => {
    tempFileReader.onerror = () => {
      tempFileReader.abort();
      reject(new DOMException("Problem parsing input file."));
    };

    tempFileReader.onload = () => {
      resolve({
        file: inputFile,
        contents: JSON.parse(tempFileReader.result),
      });
    };
    tempFileReader.readAsText(inputFile);
  });
};

export const concatParticipantSessionIds = (participants) => {
  return participants.map((participant) => {
    return {
      participant_session_id:
        "session_id" in participant
          ? [participant.participant_id, participant.session_id]
              .join("_")
              .replace(/_+$/, "")
              .replace("_", " ")
          : participant.participant_id,
      ...participant,
    };
  });
};

export const getMetrics = (participantInfo) =>
  // eslint-disable-next-line no-unused-vars
  participantInfo.map(({ path_to_report, ...rest }) => rest);

export const getReportPaths = (participantInfo) =>
  participantInfo.reduce((accumulator, currentValue) => {
    accumulator[currentValue.participant_session_id] =
      currentValue.path_to_report;
    return accumulator;
  }, {});
