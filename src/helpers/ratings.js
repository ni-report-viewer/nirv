import _ from "lodash";
import Papa from "papaparse";

export const ratingsToCSV = async (subjectRatings) => {
  const reviewedRatings = _.filter(Object.values(subjectRatings), (o) => {
    return o.reviewed;
  });

  const csvRows = reviewedRatings.map((o) => {
    return _.pick(o, ["subject", "rating", "whenRated"]);
  });

  if (csvRows.length === 0) {
    return;
  }

  const delimiter = ",";
  const header = Object.keys(csvRows[0]).join(delimiter) + "\n";

  let csv = header;
  csvRows.forEach((o) => {
    csv += Object.values(o).join(delimiter) + "\n";
  });

  let csvData = new Blob([csv], { type: "text/csv" });
  let csvUrl = URL.createObjectURL(csvData);

  let hiddenElement = document.createElement("a");
  hiddenElement.href = csvUrl;
  hiddenElement.target = "_blank";

  const curtime = new Date().toISOString().replace(/[-:]/g, "").split(".")[0];
  hiddenElement.download = "dwiqc_ratings_" + curtime + ".csv";
  hiddenElement.click();
};

export const initParticipantRatings = (participantReports) => {
  return _.reduce(
    Object.keys(participantReports),
    (o, k) => (
      (o[k] = {
        participant: k,
        rating: null,
        whenRated: null,
        reviewed: false,
      }),
      o
    ),
    {}
  );
};

export const csvToRatings = (ratingsCsvFile) => {
  return new Promise((resolve, reject) => {
    Papa.parse(ratingsCsvFile, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        return results.data.reduce((m, v) => {
          m[v.subject] = Object.assign({ reviewed: true }, v);
          return m;
        }, {});
      },
      error: reject,
    });
  });
};
