<template>
  <b-container fluid class="px-0">
    <b-container fluid class="px-0" v-if="store.currentParticipantReport">
      <TheTopbar />
      <h1>{{ store.currentParticipant }}</h1>
      <p>{{ store.currentParticipantReport.name }}</p>
      <p>{{ store.currentParticipantReport.$path }}</p>
      <!-- <iframe
        :src="store.currentParticipantReport.$path"
        width="100%"
        height="100"
        frameborder="0"
      > -->
      <!-- </iframe> -->
    </b-container>
    <spinner v-else></spinner>
  </b-container>
</template>

<script>
import TheTopbar from "@/components/TheTopbar";
import { useReportStore } from "@/stores/store";

export default {
  name: "ReportParticipant",
  components: {
    TheTopbar,
  },
  setup() {
    const store = useReportStore();

    return {
      store,
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
