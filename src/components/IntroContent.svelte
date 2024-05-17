<script>
  import Icon from "./Icons.svelte"

  export let filteredData
  const totalEntries = filteredData.length
</script>

<div class="wrapper">
  <main class="container intro-content">
    <p class="intro-content__overline--small">
      Clean Resilient States Initiative
    </p>
    <p class="intro-content__overline--regular">
      by the Energy Security and Climate Change Program
    </p>
    <h1 class="intro-content__title">Template for a database SPA</h1>
    <p class="intro-content__introduction">
      A curated database of state-level activities facilitating emissions
      reductions, positive economic outcomes, and climate resilience—from the <a
        class="intro-content__link"
        href="https://www.csis.org/programs/energy-security-and-climate-change-program/projects/clean-resilient-states-initiative"
        target="_blank">Clean Resilient States Initiative</a
      >, created by the CSIS Energy Security & Climate Change Program.
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
