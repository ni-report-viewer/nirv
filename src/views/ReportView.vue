<template>
  <b-container fluid class="px-0 m-3">
    <b-container fluid class="px-0" v-if="store.participantMetrics">
      <TheSidebar />
      <ReportGroup v-if="store.currentParticipant === 'study'" />
      <ReportParticipant v-else />
    </b-container>
    <TheSpinner v-else />
  </b-container>
</template>

<script>
import TheSidebar from "@/components/TheSidebar";
import TheSpinner from "@/components/TheSpinner";
import ReportGroup from "@/components/ReportGroup";
import ReportParticipant from "@/components/ReportParticipant";
import { useReportStore } from "@/stores/store";

export default {
  name: "ReportView",
  components: {
    ReportGroup,
    ReportParticipant,
    TheSpinner,
    TheSidebar,
  },
  setup() {
    const store = useReportStore();
    const selectedRating = store.participantRatings[store.selectedParticipant];

    return {
      store,
      selectedRating,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
