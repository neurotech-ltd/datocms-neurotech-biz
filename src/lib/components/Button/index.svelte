<script lang="ts">
  interface Props {
    label?: string;
  }

  let { label = 'explore' }: Props = $props();
</script>

<button class="button">label</button>

<style>
  .button {
  }
</style>
