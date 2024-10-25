<script>
    import { Router, Route } from 'svelte-routing';
    import Home from '../components/Home.svelte';
    import EventDetail from '../components/EventDetail.svelte';
</script>

<Router>
    <Route path="/" component={Home} />
    <Route path="/event/:id" component={EventDetail} />
</Router>