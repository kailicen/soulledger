<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabaseClient';

  let entry_text = '';
  let energy_level = 3;
  let alignment_score = 3;
  let entries: any[] = [];

  async function loadEntries() {
    const { data, error } = await supabase
      .from('entries')
      .select('*')
      .order('date', { ascending: false });

    if (data) entries = data;
    if (error) console.error(error);
  }

  async function submitEntry() {
    const user = await supabase.auth.getUser();
    const userId = user?.data?.user?.id;

    if (!userId) return alert('Please log in to save an entry.');

    const { error } = await supabase.from('entries').insert([{
      user_id: userId,
      entry_text,
      energy_level,
      alignment_score,
      date: new Date().toISOString().split('T')[0],
    }]);

    if (!error) {
      entry_text = '';
      energy_level = 3;
      alignment_score = 3;
      loadEntries();
    } else {
      console.error(error);
    }
  }

  onMount(loadEntries);
</script>

<h2>New Journal Entry</h2>

<form on:submit|preventDefault={submitEntry}>
  <label for="entry">Reflection</label>
  <textarea id="entry" bind:value={entry_text} rows="4"></textarea>

  <label for="energy">Energy: {energy_level}</label>
  <input id="energy" type="range" min="1" max="5" bind:value={energy_level} />

  <label for="alignment">Alignment: {alignment_score}</label>
  <input id="alignment" type="range" min="1" max="5" bind:value={alignment_score} />

  <button type="submit">Save Entry</button>
</form>

<hr />

<h3>Recent Entries</h3>

{#if entries.length === 0}
  <p>No entries yet.</p>
{:else}
  <ul>
    {#each entries as entry}
      <li>
        <strong>{entry.date}</strong><br />
        <em>Energy:</em> {entry.energy_level}, <em>Alignment:</em> {entry.alignment_score}
        <p>{entry.entry_text}</p>
      </li>
    {/each}
  </ul>
{/if}
