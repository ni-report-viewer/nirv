import Vue from "vue";
import Router from "vue-router";
import HomeView from "@/views/HomeView";
import ReportView from "@/views/ReportView";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/report",
      name: "Report",
      component: ReportView,
    },
  ],
});
