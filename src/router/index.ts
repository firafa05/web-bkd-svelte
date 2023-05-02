import Error404 from '../pages/Error404.svelte';
import Home from '../pages/home/index.svelte';
import Visimisi from '../pages/visimisi/index.svelte';

const routes = {
  '/': Home,
  '/visimisi': Visimisi,
  '*': Error404
};

export default routes;
