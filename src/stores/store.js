// stores/counter.js
import { defineStore } from "pinia";
import {
  concatParticipantSessionIds,
  getMetrics,
  getReportPaths,
  readCsv,
  readJson,
  selectRootFile,
} from "@/helpers/files";
import {
  initParticipantRatings,
  ratingsToCSV,
  csvToRatings,
} from "@/helpers/ratings";
import {
  readHtml,
  getParticipantId,
  insertDataUrisIntoHtml,
} from "@/helpers/html";

export const useReportStore = defineStore({
  id: "report",
  state: () => {
    return {
      inputFiles: null,
      inputPaths: null,
      brushedParticipants: [],
      inputCsv: null,
      inputJson: null,
      inputJsonFile: null,
      participantRatings: null,
      participantMetrics: null,
      participantReports: null,
      participantReportPaths: null,
      currentParticipant: "study",
      currentHtml: null,
      sidebarFilter: "",
    };
  },
  getters: {
    studyId: (state) => {
      return state.inputJson?.studyId || "Study";
    },
    metricMetadata: (state) => {
      return state.inputJson?.variables;
    },
    metricOptions: (state) => {
      if (state.participantMetrics) {
        return Object.keys(state.participantMetrics[0])
          .filter(
            (k) =>
              ![
                "participant_id",
                "subject_id",
                "subject_session_id",
                "participant_session_id",
                "session_id",
                "file_name",
              ].includes(k)
          )
          .sort();
      }
      return null;
    },
    currentReport: (state) => {
      if (state.participantReports && state.currentParticipant !== "study") {
        return state.participantReports[state.currentParticipant];
      }
      return null;
    },
    allParticipants: (state) => {
      if (state.participantReports) {
        return Object.keys(state.participantReports);
      }
      return null;
    },
    filteredParticipants: (state) => {
      if (state.sidebarFilter) {
        return state.allParticipants.filter((s) =>
          s.includes(state.sidebarFilter)
        );
      }
      return state.allParticipants;
    },
  },
  actions: {
    async parseFiles(files) {
      const csvFiles = files.filter(
        (file) => file.name === "nirv_group_report.csv"
      );

      const jsonFiles = files.filter(
        (file) => file.name === "nirv_group_report.json"
      );

      if (csvFiles.length === 0) {
        throw new Error("NiRV CSV file not found.");
      }

      if (jsonFiles.length === 0) {
        throw new Error("NiRV JSON file not found.");
      }

      this.inputCsv = concatParticipantSessionIds(
        await readCsv(selectRootFile(csvFiles))
      );

      this.participantMetrics = getMetrics(this.inputCsv);
      this.participantReportPaths = getReportPaths(this.inputCsv);

      const participants = [
        ...new Set(this.inputCsv.map((row) => row.participant_id)),
      ];

      this.inputFiles = participants.reduce((acc, currentParticipant) => {
        acc[currentParticipant] = files.filter((file) =>
          file.$path.includes(currentParticipant)
        );
        return acc;
      }, {});

      this.inputPaths = participants.reduce((acc, currentParticipant) => {
        acc[currentParticipant] = files
          .filter((file) => file.$path.includes(currentParticipant))
          .map((file) => file.webkitRelativePath);
        return acc;
      }, {});

      const htmlFiles = files.filter((file) => file.name.endsWith(".html"));
      this.participantReports = Object.keys(this.participantReportPaths).reduce(
        (acc, currentValue) => {
          acc[currentValue] = htmlFiles.filter((file) =>
            file.$path.includes(this.participantReportPaths[currentValue])
          )[0];
          return acc;
        },
        {}
      );

      const { file, contents } = await readJson(selectRootFile(jsonFiles));
      this.inputJson = contents;
      this.inputJsonFile = file;
      this.participantRatings = initParticipantRatings(this.participantReports);
    },
    assignRating(newRating) {
      this.participantRatings = Object.assign(
        this.participantRatings,
        newRating
      );
    },
    resetPartialRating() {
      if (this.currentParticipant !== "study") {
        this.participantRatings[this.currentParticipant].reviewed = false;
        this.participantRatings[this.currentParticipant].whenRated = null;
      }
    },
    downloadRatings() {
      ratingsToCSV(this.participantRatings);
    },
    readRatingsCsv(inputCsvFile) {
      csvToRatings(inputCsvFile);
    },
    nextParticipant() {
      const nextIdx =
        this.currentParticipant !== "study"
          ? (this.filteredParticipants.indexOf(this.currentParticipant) + 1) %
            this.filteredParticipants.length
          : 0;
      this.selectParticipant(this.filteredParticipants[nextIdx]);
    },
    selectParticipant(participant) {
      this.currentParticipant = participant;
      this.currentHtml = null;

      if (participant !== "study") {
        const participantOnlyId = getParticipantId(participant);
        readHtml(this.currentReport)
          .then((result) =>
            insertDataUrisIntoHtml(
              result,
              this.currentReport.$path,
              this.inputFiles[participantOnlyId]
            )
          )
          .then((result) => {
            this.currentHtml = result;
          });
      }
    },
  },
});
