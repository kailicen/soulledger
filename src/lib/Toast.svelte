<script lang="ts">
  export let message = '';
  export let type: 'success' | 'error' = 'success';
</script>

{#if message}
  <div class="toast {type}">
    {message}
  </div>
{/if}

<style>
.toast {
  position: fixed;
  bottom: 4rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.75rem 1.25rem;
  border-radius: 6px;
  color: white;
  z-index: 100;
  animation: fade 4s ease-out forwards;
}

.toast.success {
  background: mediumseagreen;
}
.toast.error {
  background: crimson;
}

@keyframes fade {
  0% { opacity: 1; }
  80% { opacity: 1; }
  100% { opacity: 0; display: none; }
}
</style>
