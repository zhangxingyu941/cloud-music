import Recommend from "../views/recommend/Recommend.vue";
import Playlist from "../views/playlist/Playlist.vue";
import Ranking from "../views/ranking/Ranking.vue";
import Singer from "../views/singer/Singer.vue";
import Mv from "../views/mv/Mv.vue";
import My from "../views/my/My.vue";

export default [
  {
    path: "/",
    component: Recommend,
  },
  {
    path: "/playlist",
    component: Playlist,
  },
  {
    path: "/ranking",
    component: Ranking,
  },
  {
    path: "/singer",
    component: Singer,
  },
  {
    path: "/mv",
    component: Mv,
  },
  {
    path: "/my",
    component: My,
  },
];
