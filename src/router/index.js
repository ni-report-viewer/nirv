import Vue from "vue";
import Router from "vue-router";
import HomeView from "@/views/HomeView";

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
      // route level code-splitting
      // this generates a separate chunk (report.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "report" */ "@/views/ReportView"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () =>
        import(/* webpackChunkName: "notFound" */ "@/views/NotFoundView"),
    },
  ],
});
