<template>
  <b-sidebar
    id="sidebar-backdrop"
    title="Study overview"
    backdrop-variant="dark"
    backdrop
    lazy
    shadow
    :visible="showSidebar"
  >
    <TheExplainer :explainer-text="sidebarExplainerText" />

    <b-nav vertical pills class="w-100">
      <b-nav-item
        class="mx-1"
        :active="store.currentParticipant === 'study'"
        @click="store.selectParticipant('study')"
      >
        {{ store.studyId }}
      </b-nav-item>
      <input
        class="m-1"
        v-model="store.sidebarFilter"
        placeholder="filter participants"
      />
      <b-nav-item
        class="mx-1"
        v-for="participant in store.filteredParticipants"
        :key="participant"
        :active="participant === store.currentParticipant"
        @click="store.selectParticipant(participant)"
      >
        <b-icon
          class="mr-2"
          align-self="end"
          icon="check-circle-fill"
          scale="0.9"
          variant="success"
          v-if="store.participantRatings[participant].reviewed"
        ></b-icon>
        <b-icon
          class="mr-2"
          icon="circle"
          scale="0.5"
          variant="secondary"
          v-else
        ></b-icon>
        {{ participant }}
      </b-nav-item>
    </b-nav>
  </b-sidebar>
</template>

<script>
import TheExplainer from "@/components/TheExplainer";
import { useReportStore } from "@/stores/store";

export default {
  name: "TheSidebar",
  components: {
    TheExplainer,
  },
  setup() {
    const store = useReportStore();
    const showSidebar = true;
    const sidebarExplainerText =
      "Select a participant below to see their report. Or select the study ID at the top to see a group summary. You can filter the participant list using the text input. You can close this sidebar by clicking on the 'x' in the top right or by simply clicking outside of the sidebar.";

    return {
      showSidebar,
      sidebarExplainerText,
      store,
    };
  },
};
</script>
