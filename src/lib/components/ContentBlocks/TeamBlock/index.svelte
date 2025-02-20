<script lang="ts">
  import {TeamBlockFragment} from "./fragments";
  import {readFragment, type FragmentOf} from '$lib/datocms/graphql';
  interface Props {
    data: FragmentOf<typeof TeamBlockFragment>;
  }
  let { data }: Props = $props();
  let unmaskedBlock = $derived(readFragment(TeamBlockFragment, data));
</script>

<div class="team-block">
    <h1>{unmaskedBlock.title}</h1>
    <p>{unmaskedBlock.description}</p>
    <div class="members">
        {#each unmaskedBlock.members as member, i}
            <div>
                <h1>{member.name}</h1>
                <p>{member.role}</p>
            </div>
        {/each}
    </div>
    <div class="partners">
        {#each unmaskedBlock.partners as member, i}
            <div>
                <span>{member.name}</span> ~ <span>{member.role}</span>
            </div>
        {/each}
    </div>
</div>

<style>
    /* set default margins of content.*/
    .team-block {
        /*background-color: pink;*/
    }
</style>
