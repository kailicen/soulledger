<script lang="ts">
  import { supabase } from '$lib/supabaseClient';
  import Toast from '$lib/Toast.svelte';

  let email = '';
  let toastMsg = '';
  let toastType: 'success' | 'error' = 'success';

  async function login() {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      toastType = 'error';
      toastMsg = 'Login failed: ' + error.message;
    } else {
      toastType = 'success';
      toastMsg = 'Check your email for the login link!';
    }

    // Clear after 4s
    setTimeout(() => (toastMsg = ''), 4000);
  }
</script>

<form on:submit|preventDefault={login}>
  <label for="email">Email</label>
  <input type="email" bind:value={email} />
  <button type="submit">Send Magic Link</button>
</form>

<Toast message={toastMsg} type={toastType} />
