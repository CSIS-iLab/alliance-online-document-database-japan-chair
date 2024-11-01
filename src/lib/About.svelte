<script>
  import Icon from "./Icons.svelte"
</script>

<section class="about" id="about">
  <div class="about__container">
    <h2 class="about__subtitle">About</h2>
    <div class="about__description">
      <p>
        The Japan Chair was established to provide a venue in Washington, DC for
        the study of U.S.-Japan relations and to increase mutual understanding.
        As Japan's role in Asian and global affairs continues to grow, the Japan
        Chair is charting a strategic agenda for the U.S.-Japan relationship.
        The Japan Chair is a unique platform to raise awareness of U.S.-Japan
        policy issues in a bilateral, regional, and global context.
      </p>
      <p>
        Alliance Online is a resource tool documenting the evolution of the
        U.S.-Japan alliance, a security relationship critical to the history—and
        future—of international relations in Asia. This database features
        official documents to help users understand the history of the
        U.S.-Japan Alliance from the post-WWII period to the present day.
      </p>
    </div>
    <div class="about__reports">
      <p class="about__reports__title">Associated Reports</p>
      <ul>
        <li>
          <a
            class="about__reports__link"
            href="https://features.csis.org/evolution-of-the-us-japan-security-partnership/"
            target="_blank"
            >Alliance Online: The Evolution of the U.S.-Japan Alliance<span
              class="icon-container"
              ><Icon class="icon__report" name="Icon-open-blank" /></span
            ></a
          >
        </li>
      </ul>
    </div>
    <div class="about__initiative">
      <p></p>
    </div>
    <div class="about__development">
      <h3 class="about__development__title">Development Team</h3>
      <p class="about__development__description">
        The U.S.-Japan Alliance Database is a product of the <a
          class="about__development__link"
          href="https://www.csis.org/programs/dracopoulos-ideas-lab"
          target="_blank">Andreas C. Dracopoulos iDeas Lab</a
        >, the in-house digital, multimedia, and design agency at the Center for
        Strategic and International Studies.
      </p>
      <p class="about__development__people">
        Produced by <a
          class="about__development__link"
          href="https://www.csis.org/people/jose-romero"
          target="_blank"
          rel="noopener noreferrer">José Romero</a
        >.
      </p>
      <p class="about__development__people">
        Cover design by <a
          class="about__development__link"
          href="https://www.csis.org/people/gina-kim"
          target="_blank"
          rel="noopener noreferrer">Gina Kim</a
        >.
      </p>
      <p class="about__development__people">
        Copyediting by <a
          class="about__development__link"
          href="https://www.csis.org/people/katherine-stark"
          target="_blank"
          rel="noopener noreferrer">Katherine Stark</a
        >.
      </p>
      <p class="about__development__people">
        Design by <a
          class="about__development__link"
          href="https://www.csis.org/people/sarah-grace"
          target="_blank"
          rel="noopener noreferrer">Sarah B. Grace</a
        >.
      </p>
    </div>
    <div class="back-top-container">
      <a class="back-top-container__link" href="#top"
        ><span>Back to Top</span><span
          class="back-top-container__icon-container back-top__icon-container"
        >
          <Icon class="icon__back-top" name="Icon-arrow-up" />
        </span>
      </a>
    </div>
  </div>
</section>

<style lang="scss">
  @use "../scss/components/about";
</style>
