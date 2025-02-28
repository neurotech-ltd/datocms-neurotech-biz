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
                    <ResponsiveImage data={member.image.responsiveImage} imgClass="member-photo-img"></ResponsiveImage>
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
        flex-direction: column;
        width: 100%;
        min-height: 350px;
        padding: var(--page-margin);
    }

    /*@media (min-width: 768px) {*/
    /*    .team-block-member {*/
    /*        flex-direction: row;*/
    /*    }*/
    /*}*/
    @media (min-width: 1024px) {
        .team-block-member {
            flex-direction: row;
        }
    }

    .member-photo {
        width: 300px;
        height: 300px;
        min-height: 300px;
        min-width: 300px;
        max-width: 300px;
        max-height: 300px;
        object-fit: contain;
        border-radius: 1000px;
        overflow: hidden;
        align-self: center;
    }

    .member-details {
        padding-top: var(--page-margin);
    }
    /* Tighten up the spacing between the pronouns and role*/
    .member-details > p{
        margin-bottom: 0;
    }
    .member-details > p:last-child{
        margin-top: 1rem;
    }

    @media (min-width: 1024px) {
        .member-details {
            padding-top: 0;
            margin-left: var(--page-margin); /* space away from image. */
        }


    }

    :global(.team-block picture > .member-photo-img) {
        width: 300px !important;
        height: 300px !important;
        object-fit: cover;
    }

</style>
