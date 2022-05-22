<template>
  <b-button-toolbar class="sticky-top ml-2">
    <b-button-group>
      <b-button
        v-b-toggle.sidebar-backdrop
        id="sidebar-button"
        variant="outline-primary"
        class="mb-2 header-button"
      >
        <b-icon icon="layout-sidebar" aria-hidden="true"></b-icon>
      </b-button>
      <b-button
        id="refresh-report"
        variant="outline-primary"
        class="mb-2 header-button"
        @click="refreshReport"
      >
        <b-icon icon="arrow-clockwise" aria-hidden="true"></b-icon>
      </b-button>
      <b-button
        id="download-button"
        variant="outline-primary"
        class="mb-2 header-button"
        @click="downloadReport"
      >
        <b-icon icon="download" aria-hidden="true"></b-icon>
      </b-button>
      <b-button
        id="stats-button"
        variant="outline-primary"
        class="mb-2 header-button"
        v-if="!isGroupReport"
      >
        <b-icon icon="bar-chart" aria-hidden="true"></b-icon>
      </b-button>
      <b-popover
        target="stats-button"
        placement="bottom"
        triggers="click"
        v-if="!isGroupReport"
      >
        <template v-slot:title>{{ subjectId }}</template>
        Here are distributions of some key QC metrics
      </b-popover>
      <b-button
        id="rating-button"
        variant="outline-primary"
        class="mb-2 header-button"
        v-if="!isGroupReport"
        v-b-modal.ratingmodal
      >
        <b-iconstack>
          <b-icon
            stacked
            icon="check-circle"
            scale="0.75"
            shift-v="6"
            shift-h="-6"
            aria-hidden="true"
          ></b-icon>
          <b-icon stacked icon="slash" scale="1.5" aria-hidden="true"></b-icon>
          <b-icon
            stacked
            icon="x-circle"
            scale="0.75"
            shift-v="-6"
            shift-h="6"
            aria-hidden="true"
          ></b-icon>
        </b-iconstack>
      </b-button>
      <b-modal
        id="ratingmodal"
        ref="ratingmodal"
        :title="subjectId"
        @ok="onModalOk"
        @hidden="handleHidden"
        v-if="!isGroupReport"
      >
        <div class="mb-2">Rate this subject:</div>
        <b-form
          ref="form"
          @submit.stop.prevent="handleSubmit"
          v-if="store.participantRatings[store.currentParticipant]"
        >
          <b-form-group
            id="input-group-overall"
            label-for="overall-rating"
            description="Rate the overall image quality."
            invalid-feedback="rating required"
            :state="
              store.participantRatings[store.currentParticipant].rating != null
            "
          >
            <b-form-radio-group
              id="overall-rating"
              v-model="
                store.participantRatings[store.currentParticipant].rating
              "
              :options="ratingOptions"
              button-variant="outline-primary"
              size="md"
              buttons
            ></b-form-radio-group>
          </b-form-group>
        </b-form>
      </b-modal>
      <b-button
        id="next-subject-button"
        variant="outline-primary"
        class="mb-2 header-button"
        @click="store.nextParticipant"
      >
        <b-icon icon="arrow-right-circle" aria-hidden="true"></b-icon>
      </b-button>
      <b-dropdown variant="outline-primary" class="mb-2 header-button">
        <template #button-content>
          <b-icon
            icon="three-dots"
            id="more-button"
            aria-hidden="true"
          ></b-icon>
        </template>
        <b-dropdown-item-button
          id="download-csv"
          variant="outline-primary"
          @click="store.downloadRatings()"
        >
          <b-iconstack class="mr-3" aria-hidden="true">
            <b-icon
              stacked
              icon="download"
              shift-h="-10"
              variant="outline-primary"
            ></b-icon>
            <b-icon
              stacked
              icon="list-check"
              shift-h="7"
              variant="outline-primary"
            ></b-icon>
          </b-iconstack>
          download ratings csv
        </b-dropdown-item-button>
        <b-dropdown-item-button
          id="upload-csv"
          variant="outline-primary"
          v-b-modal.csv-upload-modal
        >
          <b-iconstack class="mr-3" aria-hidden="true">
            <b-icon
              stacked
              icon="upload"
              shift-h="-10"
              variant="outline-primary"
            ></b-icon>
            <b-icon
              stacked
              icon="list-check"
              shift-h="7"
              variant="outline-primary"
            ></b-icon>
          </b-iconstack>
          upload ratings csv
        </b-dropdown-item-button>
        <b-dropdown-item-button
          id="file-issue"
          variant="outline-primary"
          onclick="window.open('https://github.com/ni-report-viewer/nirv/issues/new','_blank')"
        >
          <b-icon icon="bug" class="mr-3" aria-hidden="true"></b-icon>
          file bug report
        </b-dropdown-item-button>
      </b-dropdown>
    </b-button-group>

    <b-modal
      id="csv-upload-modal"
      ref="csv-upload-modal"
      title="Upload a ratings csv file"
      @ok="onCsvUploadOk"
    >
      <b-form-group
        label="Choose a previously downloaded ratings.csv file."
        class="mt-5 text-left"
      >
        <b-form-file
          v-model="ratingsCsvFile"
          :state="Boolean(ratingsCsvFile)"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
        ></b-form-file>
      </b-form-group>
    </b-modal>

    <b-tooltip target="sidebar-button" triggers="hover"
      >toggle sidebar</b-tooltip
    >
    <b-tooltip target="download-button" triggers="hover"
      >download this report html file</b-tooltip
    >
    <b-tooltip target="stats-button" triggers="hover" v-if="!isGroupReport"
      >show QC summary stats</b-tooltip
    >
    <b-tooltip target="rating-button" triggers="hover" v-if="!isGroupReport"
      >rate this subject</b-tooltip
    >
    <b-tooltip target="next-subject-button" triggers="hover"
      >view the next subject</b-tooltip
    >
    <b-tooltip target="more-button" triggers="hover">more options</b-tooltip>
  </b-button-toolbar>
</template>

<script>
import { ref } from "@vue/composition-api";
import { nextTick } from "@vue/composition-api";

// eslint-disable-next-line
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { useReportStore } from "@/stores/store";

export default {
  name: "TheTopBar",
  props: {
    report: {
      type: Object,
    },
    isGroupReport: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const store = useReportStore();

    const ratingsCsvFile = ref();
    const onCsvUploadOk = () => {
      store.readRatingsCsv(ratingsCsvFile);
    };

    const subjectId = props.report?.subject_id || "loading...";

    const ratingOptions = [
      { text: "Definitely Fail", value: "-2" },
      { text: "Probably Fail", value: "-1" },
      { text: "Not Sure", value: "0" },
      { text: "Probably Pass", value: "1" },
      { text: "Definitely Pass", value: "2" },
    ];

    const downloadReport = () => {
      console.log("Download is not yet implemented!");
    };

    const refreshReport = () => {
      document.getElementById("report-iframe").contentWindow.location.reload();
    };

    const checkFormValidity = () => {
      return store.participantRatings[store.currentParticipant].rating != null;
    };

    const handleHidden = () => {
      // If rater cancelled the rating form, reset the reviewed and whenRated
      // fields if the other fields are invalid
      if (!checkFormValidity()) {
        store.resetPartialRating();
      }
    };

    const handleSubmit = () => {
      if (!checkFormValidity()) {
        return;
      }

      store.participantRatings[store.currentParticipant].whenRated =
        new Date().toString();
      store.participantRatings[store.currentParticipant].reviewed = true;

      nextTick().then(() => {
        ratingmodal.value.hide();
      });
    };

    const onModalOk = (bvModalEvt) => {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      handleSubmit();
    };

    const ratingmodal = ref(null);

    return {
      store,
      ratingsCsvFile,
      onCsvUploadOk,
      ratingOptions,
      subjectId,
      handleHidden,
      handleSubmit,
      ratingmodal,
      downloadReport,
      refreshReport,
      onModalOk,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header-button:not(:hover) {
  background-color: #fff;
}
</style>
