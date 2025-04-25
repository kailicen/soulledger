<script lang="ts">
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';

  export let labels: string[] = [];
  export let energyData: number[] = [];
  export let alignmentData: number[] = [];

  let canvas: HTMLCanvasElement;
  let chart: Chart;

  onMount(() => {
    chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Energy',
            data: energyData,
            borderColor: 'rgb(255, 206, 86)',
            tension: 0.3,
          },
          {
            label: 'Alignment',
            data: alignmentData,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.3,
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        },
        scales: {
          y: {
            min: 0,
            max: 5
          }
        }
      }
    });
  });
</script>

<canvas bind:this={canvas}></canvas>
