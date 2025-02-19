<script lang="ts">
  // https://github.com/sveltejs/svelte/issues/13868
  //  https://stackoverflow.com/questions/61826138/how-to-animate-an-element-on-an-inner-change-with-svelte
  // https://svelte.dev/docs/svelte/animate
  import { onMount, onDestroy } from 'svelte';
  import { writable } from 'svelte/store';

  interface Props {
    fadeIn?: boolean;
    slideUp?: boolean;
    sticky?: boolean;
    children?: import('svelte').Snippet;
    delay?: number;
  }

  let isVisible = writable(false);
  let { sticky = false, fadeIn = true, slideUp = true, delay = 0, children }: Props = $props();
  let element;

  function checkVisibility(element) {
    const rect = element.getBoundingClientRect();
    const isAboveViewport = rect.bottom < 0;
    const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
    if (isInViewport || isAboveViewport) {
      isVisible.set(true);
      if (sticky == true) {
        observer.disconnect();
      }
    } else {
      isVisible.set(false);
      // when an element is invisible off the page, we don't currently want to delay
      // its animation when it does appear on the apge.
      // Delay is used for timing elements that appear on the page together.
      // This may not work in all scenarios and require a different approach.
      delay = 0;
    }
  }

  onMount(() => {
    let observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible.set(entry.isIntersecting);
          if (entry.isIntersecting == true && sticky) {
            observer.disconnect();
          }
        });
      },
      { threshold: 0 },
    );

    observer.observe(element);

    checkVisibility(element);

    onDestroy(() => {
      observer.disconnect();
    });
  });
</script>

<!-- Attempt to use svelte transition with isVisible but it just breaks. so sticking with css. -->
<!--{#key $isVisible}-->
<!--    <div-->
<!--            bind:this={element}-->
<!--            class:visible={$isVisible}-->
<!--            transition:fade-->
<!--    >-->
<!--        {@render children?.()}-->
<!--    </div>-->
<!--{/key}-->

<div
  bind:this={element}
  class:slide-up={slideUp}
  class:fade-in={fadeIn}
  class:visible={$isVisible}
  style="animation-name: {fadeIn && $isVisible ? 'fadeIn' : ''}, {slideUp && $isVisible
    ? 'slideUp'
    : ''}; animation-duration: 0.5s; animation-fill-mode: forwards; animation-delay: {delay *
    420}ms"
>
  {@render children?.()}
</div>

<!--  -global ensure svelte doesnt remove the css. -->
<style>
  @keyframes -global-fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .fade-in {
    opacity: 0;
  }

  @keyframes -global-slideUp {
    from {
      transform: translateY(20px);
    }
    to {
      transform: translateY(0);
    }
  }

  .slide-up {
    transform: translateY(20px);
  }
</style>
