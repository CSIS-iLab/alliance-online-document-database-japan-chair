<script>
  import SocialShare from "./SocialShare.svelte"
</script>

<header class="header">
  <div class="header__inner">
    <a
      href="https://www.csis.org"
      alt="CSIS website logo"
      title="Visit CSIS website"
      aria-label="Visit CSIS website"
      target="_blank"
    >
      <span class="header__logo"></span>
    </a>
    <SocialShare />
  </div>
</header>

<style lang="scss">
  @use "../scss/layout/header";
</style>
