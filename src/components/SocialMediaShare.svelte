<script>
  import Icon from "./Icons.svelte"
</script>

<ul class="social">
  <li class="social__item">
    <a
      href="https://www.facebook.com/CSIS.org"
      class="social__link"
      target="_blank"
      aria-label="Visit the CSIS Facebook page"
    >
      <Icon class="icon__social" name="Icon-Facebook" />
    </a>
  </li>
  <li class="social__item">
    <a
      href="https://twitter.com/csis"
      class="social__link"
      target="_blank"
      aria-label="Visit the CSIS Twitter page"
    >
      <Icon class="icon__social" name="Icon-twitter" />
    </a>
  </li>
  <li class="social__item">
    <a
      href="https://www.linkedin.com/company/csis-japan-chair/"
      class="social__link"
      target="_blank"
      aria-label="Visit the Japan Chair LinkedIn page"
    >
      <Icon class="icon__social" name="Icon-linkedin" />
    </a>
  </li>
  <li class="social__item">
    <a
      href="https://www.instagram.com/csis/"
      class="social__link"
      target="_blank"
      aria-label="Visit the CSIS Instagram page"
    >
      <Icon class="icon__social" name="Icon-instagram" />
    </a>
  </li>
  <li class="social__item">
    <a
      href="https://www.youtube.com/user/csisdc"
      class="social__link"
      target="_blank"
      aria-label="Visit the CSIS Youtube page"
    >
      <Icon class="icon__social" name="Icon-youtube" />
    </a>
  </li>
</ul>

<style lang="scss">
  @use "../scss/components/social-share";
</style>
