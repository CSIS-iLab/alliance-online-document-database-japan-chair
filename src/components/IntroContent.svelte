<script>
  import Icon from "./Icons.svelte"

  export let filteredData
  const totalEntries = filteredData.length
</script>

<div class="wrapper">
  <main class="container container--desktop intro-content --desktop">
    <p class="intro-content__overline--small">
      <!-- The Evolution of the U.S. - Japan Alliance -->
    </p>
    <p class="intro-content__overline--regular">Alliance Online</p>
    <h1 class="intro-content__title">U.S.-Japan Policy Database</h1>
    <p class="intro-content__introduction">
      A curated database of official documents to help users understand the
      history of the U.S.-Japan Alliance from the post-WWII period to the
      present day. This is part of the Alliance Online project, created by the <a
        class="intro-content__link"
        href="https://www.csis.org/programs/japan-chair"
        target="_blank">CSIS Japan Chair Program</a
      >.
      <span class="intro-content__more-link" style="white-space: pre">Learn more about this database <a class="intro-content__link svelte-15fn2qg" href="#about">here.
      <!-- <span class="intro-content__more__icon-container">
          <Icon class="icon__info" name="Icon-info" />
      </span> -->
      </a></span>
      
    </p>
    <!-- <p class="intro-content__more">
      <a class="intro-content__link intro-content__link--more" href="#about"
        ><span>More on this database</span></a
      >
    </p> -->
  </main>
</div>

<main class="container container--mobile intro-content">
  <p class="intro-content__overline--small">
    <!-- The Evolution of the U.S. - Japan Alliance -->
  </p>
  <p class="intro-content__overline--regular">Alliance Online</p>
  <h1 class="intro-content__title">U.S.-Japan Policy Database</h1>
  <p class="intro-content__introduction">
    A curated database of official documents to help users understand the
    history of the U.S.-Japan Alliance from the post-WWII period to the
    present day. This is part of the Alliance Online project, created by the <a
      class="intro-content__link"
      href="https://www.csis.org/programs/japan-chair"
      target="_blank">CSIS Japan Chair Program</a
    >.
    <span class="intro-content__more-link" style="white-space: pre">Learn more about this database <a class="intro-content__link svelte-15fn2qg" href="#about">here.
    <!-- <span class="intro-content__more__icon-container">
        <Icon class="icon__info" name="Icon-info" />
    </span> -->
    </a></span>
    
  </p>
  <!-- <p class="intro-content__more">
    <a class="intro-content__link intro-content__link--more" href="#about"
      ><span>More on this database</span></a
    >
  </p> -->
</main>
<!-- <div class="container"></div> -->

<style lang="scss">
  @use "../scss/components/intro-content";
</style>
