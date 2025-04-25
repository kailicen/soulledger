<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabaseClient';
  import type { User } from '@supabase/supabase-js';
  import '@picocss/pico/css/pico.min.css';
  import '../app.css'

  let user: User | null = null;

  onMount(async () => {
    const { data } = await supabase.auth.getUser();
    user = data.user;
  });

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = '/';
  }
</script>

<header class="container hide-on-mobile">
  <nav>
    <ul>
      <li><strong><a href="/">SoulLedger</a></strong></li>
    </ul>
    <ul>
      <li><a href="/journal">Journal</a></li>
      <li><a href="/insights">Insights</a></li>
      <li><a href="/settings">Settings</a></li>
      {#if user}
        <li><small>Logged in as {user.email}</small></li>
        <li><button on:click={logout} class="secondary">Logout</button></li>
      {:else}
        <li><a href="/login">Login</a></li>
      {/if}
    </ul>
  </nav>
</header>
<!-- Minimal mobile header -->
<header class="mobile-header">
  <nav class="container">
    <ul>
      <li><strong>SoulLedger</strong></li>
    </ul>
    <ul>
      <li>
        {#if user}
          <button on:click={logout} class="secondary">Logout</button>
        {:else}
          <a href="/login" role="button" class="contrast">Login</a>
        {/if}
      </li>
    </ul>
  </nav>
</header>

<main class="container">
  <slot />
</main>

<!-- Mobile tab bar -->
<nav class="mobile-tabbar">
  <a href="/journal">📓 Journal</a>
  <a href="/insights">📈 Insights</a>
  <a href="/settings">⚙️ Settings</a>
</nav>

