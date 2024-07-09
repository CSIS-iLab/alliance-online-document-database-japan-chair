<script>
  export let filteredData
  const totalEntries = filteredData.length
</script>

<div class="wrapper">
  <main class="container intro-content">
    <p class="intro-content__overline--small"></p>
    <p class="show-on-mobile intro-content__overline--regular">
      Alliance Online
    </p>
    <h1 class="show-on-mobile intro-content__title">
      U.S.-Japan Alliance Database
    </h1>
    <p class="desktop intro-content__introduction">
      A curated database of official documents to help users understand the
      history of the U.S.-Japan Alliance from the post-WWII period to the
      present day. This is part of the Alliance Online project, created by the <a
        class="intro-content__link"
        href="https://www.csis.org/programs/japan-chair"
        target="_blank">CSIS Japan Chair Program</a
      >.
      <span class="intro-content__more-link" style="white-space: pre"
        >Learn more about this database <a
          class="intro-content__link svelte-15fn2qg"
          href="#about"
          >here.
        </a></span
      >
    </p>
  </main>
</div>

<main class="container mobile intro-content intro-content--mobile">
  <p class="intro-content__overline--small"></p>
  <p class="intro-content__introduction">
    A curated database of official documents to help users understand the
    history of the U.S.-Japan Alliance from the post-WWII period to the present
    day. This is part of the Alliance Online project, created by the <a
      class="intro-content__link"
      href="https://www.csis.org/programs/japan-chair"
      target="_blank">CSIS Japan Chair Program</a
    >.
    <span class="intro-content__more-link" style="white-space: pre"
      >Learn more about this database <a
        class="intro-content__link svelte-15fn2qg"
        href="#about"
        >here.
      </a></span
    >
  </p>
</main>

<style lang="scss">
  @use "../scss/components/intro-content";
</style>
