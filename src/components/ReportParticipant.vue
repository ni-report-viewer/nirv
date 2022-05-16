<template>
  <b-container class="px-0 d-flex flex-column">
    <TheTopbar />
    <b-container
      class="px-0 mx-0 d-flex flex-column flex-grow-1"
      v-if="store.currentHtml"
    >
      <h1>{{ store.currentParticipant }}</h1>
      <b-container
        fluid="lg"
        class="d-flex flex-column flex-grow-1 w-100 px-0 mx-0"
      >
        <!-- <div v-html="store.currentHtml"></div> -->
        <iframe
          class="w-100 flex-grow-1 px-0 mx-0"
          style="height: 70vh"
          :srcdoc="store.currentHtml"
        ></iframe>
      </b-container>
    </b-container>
    <TheSpinner v-else />
  </b-container>
</template>

<script>
import TheTopbar from "@/components/TheTopbar";
import TheSpinner from "@/components/TheSpinner";
// import ReportHtml from "@/components/ReportHtml";

import { useReportStore } from "@/stores/store";

export default {
  name: "ReportParticipant",
  components: {
    TheTopbar,
    TheSpinner,
    // ReportHtml,
  },
  setup() {
    const store = useReportStore();

    const currentParticipantHtml = async () => {
      return await store.currentParticipantHtml();
    };

    return {
      store,
      currentParticipantHtml,
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
</style>
