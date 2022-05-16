<template>
  <b-container class="px-0">
    <TheTopbar sidebarOn isGroupReport />
    <b-container class="px-0 mx-0" v-if="store.participantMetrics">
      <TheExplainer :explainer-text="explainerText.metrics" />
      <b-form-group class="text-left" label="Select scatterplot metrics">
        <b-form-checkbox-group
          id="checkbox-group-scatter"
          v-model="scatterMetrics"
          :options="store.metricOptions"
          name="scatter-metrics"
        ></b-form-checkbox-group>
      </b-form-group>

      <ScatterplotMatrix
        :dataProp="groupReport.participants"
        :metricsProp="scatterMetrics"
        v-on:updateBrushedSubjects="updateBrushedParticipants"
        v-on:updateSelectedSubject="updateSelectedParticipant"
      />

      <b-form-group class="text-left" label="Select swarm plot metrics">
        <b-form-checkbox-group
          id="checkbox-group-swarm"
          v-model="swarmMetrics"
          :options="store.metricOptions"
          name="swarm-metrics"
        ></b-form-checkbox-group>
      </b-form-group>

      <div v-if="groupReport.participants.length > 100">
        <SwarmPlot
          v-for="metric in swarmMetrics"
          :key="metric"
          :data="groupReport.participants"
          :metric="metric"
          v-on:updateBrushedSubjects="updateBrushedParticipants"
          v-on:updateSelectedSubject="updateSelectedParticipant"
        />
      </div>
      <div v-else>
        <ViolinPlot
          v-for="metric in swarmMetrics"
          :key="metric"
          :data="groupReport.participants"
          :metric="metric"
          v-on:updateBrushedSubjects="updateBrushedParticipants"
          v-on:updateSelectedSubject="updateSelectedParticipant"
        ></ViolinPlot>
      </div>

      <b-card
        class="text-left p-0 mb-5 mt-2"
        footer="This list scrolls left/right. Click on a participant ID to go to their report."
      >
        <template v-slot:header>
          <b-row class="d-flex align-items-center">
            <b-col cols="7" class="text-left">
              <h5 class="m-0">
                Selected subjects: {{ store.brushedParticipants.length }}
              </h5>
            </b-col>
            <b-col cols="5" class="text-right">
              <b-button
                @click="copyBrushedSubjectsToClipboard()"
                id="clipboard-button"
                variant="outline-primary"
                class="m-0"
              >
                <b-icon
                  icon="clipboard"
                  class="p m-0"
                  aria-hidden="true"
                ></b-icon>
              </b-button>
              <b-tooltip target="clipboard-button" triggers="hover"
                >copy subject list to clipboard</b-tooltip
              >
            </b-col>
          </b-row>
        </template>
        <b-card-text>
          <b-nav vertical class="pb-0 text-left brushed-subject-nav">
            <b-nav-item
              v-for="subject in store.brushedParticipants"
              :key="subject"
              @click="updateSelectedParticipant(subject)"
              >{{ subject }}</b-nav-item
            >
          </b-nav>
        </b-card-text>
      </b-card>
    </b-container>

    <TheSpinner v-else />
  </b-container>
</template>

<script>
import { ref } from "@vue/composition-api";
import TheExplainer from "@/components/TheExplainer";
import ScatterplotMatrix from "@/components/ScatterplotMatrix";
import TheSpinner from "@/components/TheSpinner";
import TheTopbar from "@/components/TheTopbar";
import SwarmPlot from "@/components/ViolinPlot";
import ViolinPlot from "@/components/ViolinPlot.vue";
import { useReportStore } from "@/stores/store";

export default {
  name: "ReportGroup",
  components: {
    TheExplainer,
    ScatterplotMatrix,
    TheSpinner,
    TheTopbar,
    SwarmPlot,
    ViolinPlot,
  },
  setup() {
    const store = useReportStore();
    const scatterMetrics = ref([]);
    const swarmMetrics = ref([]);

    const updateSelectedParticipant = (participant) => {
      store.selectParticipant(participant);
    };

    const groupReport = { participants: store.participantMetrics };

    const explainerText = {
      metrics: "TODO: explainer text for metrics",
    };

    const brushedSubjects = store.metricOptions.reduce(
      (o, key) => ({
        ...o,
        [key]: null,
      }),
      {}
    );
    brushedSubjects.scatterplotMatrix = null;

    const copyBrushedSubjectsToClipboard = () => {
      navigator.clipboard.writeText(store.brushedParticipants.join());
    };

    const updateBrushedParticipants = (brushedParticipantData) => {
      brushedSubjects[brushedParticipantData.metric] =
        brushedParticipantData.brushed;

      const filteredBrushedSubs = Object.values(brushedSubjects).filter(
        (element) => element !== null
      );

      store.brushedParticipants = filteredBrushedSubs.length
        ? filteredBrushedSubs.reduce(
            (accumulator, currentValue) =>
              accumulator.filter((d) => currentValue.includes(d)),
            store.participantMetrics.map((d) => d.participant_session_id)
          )
        : [];
    };

    return {
      store,
      groupReport,
      updateSelectedParticipant,
      updateBrushedParticipants,
      scatterMetrics,
      swarmMetrics,
      explainerText,
      copyBrushedSubjectsToClipboard,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.brushed-subject-nav {
  overflow: scroll;
  height: 100px;
}
</style>
