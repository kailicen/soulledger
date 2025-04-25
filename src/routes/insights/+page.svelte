<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabaseClient';
  import LineChart from '$lib/LineChart.svelte';

  let entries: any[] = [];
  let labels: string[] = [];
  let energyData: number[] = [];
  let alignmentData: number[] = [];

  onMount(async () => {
    const { data } = await supabase
      .from('entries')
      .select('date, energy_level, alignment_score')
      .order('date', { ascending: true });

    if (data) {
      entries = data;
      labels = data.map((e) => e.date);
      energyData = data.map((e) => e.energy_level);
      alignmentData = data.map((e) => e.alignment_score);
    }
  });
</script>

<h2>Insights</h2>
{#if entries.length > 0}
  <LineChart {labels} {energyData} {alignmentData} />
{:else}
  <p>No data yet.</p>
{/if}
