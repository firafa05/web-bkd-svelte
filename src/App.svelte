<script lang="ts">
  import Router from 'svelte-spa-router';
  import routes from './router';
  import Navbar from "./lib/Layouts/Navbar.svelte";
  import Topbar from "./lib/Layouts/Topbar.svelte";
  import Spinner from "./lib/Layouts/Spinner.svelte";
  import Footer from "./lib/Layouts/Footer.svelte";
</script>


<div>
    <Spinner />
    <Topbar />
    <Navbar />
    <Router {routes} />
    <Footer />
</div>
