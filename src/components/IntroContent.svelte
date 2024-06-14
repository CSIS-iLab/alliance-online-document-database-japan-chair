<script>
  import Icon from "./Icons.svelte"

  export let filteredData
  const totalEntries = filteredData.length
</script>

<div class="wrapper">
  <main class="container intro-content">
    <p class="intro-content__overline--small">
      The Evolution of the U.S. - Japan Alliance
    </p>
    <p class="intro-content__overline--regular">by the Japan Chair Program</p>
    <h1 class="intro-content__title">Alliance Online Database</h1>
    <p class="intro-content__introduction">
      A curated database of official documents to help users understand the
      history of the U.S.-Japan Alliance from the post-WWII period to the
      present day. This is part of the Alliance Online project, created by the <a
        class="intro-content__link"
        href="https://www.csis.org/programs/japan-chair"
        target="_blank">CSIS Japan Chair Program</a
      >.
    </p>
    <p class="intro-content__more">
      <a class="intro-content__link intro-content__link--more" href="#about"
        ><span class="intro-content__more__icon-container">
          <Icon class="icon__info" name="Icon-info" />
        </span><span>More on this database</span></a
      >
    </p>
  </main>
  <div class="container"></div>
</div>

<style lang="scss">
  @use "../scss/components/intro-content";
</style>
