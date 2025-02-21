<script lang="ts">
  import {TeamBlockFragment} from "./fragments";
  import {readFragment, type FragmentOf} from '$lib/datocms/graphql';
  import ResponsiveImage from "../../ResponsiveImage/index.svelte";

  interface Props {
    data: FragmentOf<typeof TeamBlockFragment>;
  }

  let {data}: Props = $props();
  let unmaskedBlock = $derived(readFragment(TeamBlockFragment, data));
</script>

<div class="team-block on_light">
    <div class="team-block-header centred_text_block {unmaskedBlock.style ?? 'on_light'}">
        <h2>{unmaskedBlock.title}</h2>
        {#if unmaskedBlock.description}
            <p>{unmaskedBlock.description}</p>
        {/if}
    </div>
    <div class="team-block-members">
        {#each unmaskedBlock.members as member, i}
            <div class="team-block-member">
                <div class="member-photo">
                    <ResponsiveImage data={member.image.responsiveImage} imgClass="member-photo-img" ></ResponsiveImage>
                </div>
                <div class="member-details">
                    <h1>{member.name}</h1>
                    <p>{member.pronouns}</p>
                    <p>{member.role}</p>
                    <p>{member.description}</p>
                </div>
            </div>
        {/each}
    </div>
    <div class="team-block-partners">
        {#each unmaskedBlock.partners as member, i}
            <div class="team-block-partner">
                <span>{member.name}</span> ~ <span>{member.role}</span>
            </div>
        {/each}
    </div>
</div>

<style>
    /* set default margins of content.*/
    .team-block {
        display: flex;
        flex-direction: column;
        margin: 0;
        padding: 0;
        height: fit-content;
        width: 100%;
        padding: var(--page-margin);

    }

    .team-block-header {
        display: flex;
        flex-direction: column;
        /*align-content: center;*/
        /*text-align: center;*/
        padding: var(--page-margin)
    }

    .team-block-header h2 {
        font-family: "Lato", serif;
        font-weight: 700;
        font-size: 48px;
    }

    .on_light {
        /*    Dark text on light background */
        background-color: #eaeaea;
        --text-color: #1C346C;
    }

    .on_dark {
        background-color: #1C346C;
        --text-color: white;
    }

    .centred_text_block {
        text-align: center;
        align-content: center;
        padding: var(--page-margin)
    }

    .team-block-members {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: fit-content;
    }

    .team-block-member {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 350px;
        padding: var(--page-margin);
        margin-bottom: calc(var(--page-margin ));
    }

    .member-photo{
        width: 300px;
        height: 300px;
        min-height: 300px;
        min-width: 300px;
        max-width: 300px;
        max-height: 300px;
        object-fit: contain;
        border-radius: 1000px;
        overflow: hidden;
    }
    .member-details{
        padding-left: var(--page-margin);
        padding-right: var(--page-margin);
    }
    .member-details > p:nth-child(2),
    .member-details > p:nth-child(3)
    {
        line-height: 0.5rem;
    }

    :global(.team-block picture > .member-photo-img){
        width: 300px !important;
        height: 300px !important;
        object-fit: cover;
    }

</style>
