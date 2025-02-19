<script lang="ts">
  // export let href:string = '';
  interface Props {
    label?: string;
    rounded?: boolean;
  }

  let { label = '', rounded = false }: Props = $props();
</script>

<div class="pill {rounded ? 'rounded' : ''}">{label}</div>

<style>
  /*.pills {*/
  /*    width: 100%;*/
  /*    display: flex;*/
  /*    flex-direction: row;*/
  /*    gap: 16px;*/
  /*    margin-bottom: 16px;*/
  /*    flex-wrap: wrap;*/
  /*}*/

  .pill {
    display: inline-block;
    padding: 8px 8px;
    min-width: 42px;
    min-height: 32px;
    /*border-radius: 25px;*/
    /*background-color: var(--btn-color-fill);*/
    /*border: 2px solid var(--btn-color-stroke);*/
    color: var(--text-color);
    text-align: center;
    text-decoration: none;
    font-size: 14px;
    font-weight: 400;
    transition:
      background-color 0.3s,
      border-color 0.3s;
    justify-self: flex-start;
  }

  .rounded {
    border-radius: 25px;
    background-color: var(--btn-color-fill);
    border: 2px solid var(--btn-color-stroke);
  }
</style>
