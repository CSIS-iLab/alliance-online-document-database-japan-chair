<script>
  import { onMount } from "svelte"
  import Search from "./Search.svelte"
  import Select from "svelte-select"
  import Icon from "./Icons.svelte"

  export let dataset
  export let filteredData
  export let selectedEra = ""
  export let selectedType = ""
  export let selectedMonth = ""
  export let selectedYear = ""

  // export let selectedResourceType
  export let searchText = ""
  export let row

  // for pagination on the table
  export let currentPage
  export let itemsPerPage
  // export let totalEntries
  $: totalEntries = filteredData.length

  // const itemsPerPage = 14

  $: totalPages = Math.ceil(totalEntries / itemsPerPage)
  // resets page to 1 when user changes a dropdown filter
  $: if (selectedEra || selectedType || selectedMonth || selectedYear) {
    currentPage = 1
  }

  // Calculate the range of entries being shown
  $: startEntry = (currentPage - 1) * itemsPerPage + 1
  $: endEntry = Math.min(startEntry + itemsPerPage - 1, totalEntries)

  if (endEntry > totalEntries) {
    endEntry = totalEntries
  }

  // $: totalEntries = filteredData.length

  // $: console.log(filteredData)

  const documentsTotal = dataset.data.length
  function getTypesCount(era) {
    // return dataset.data.filter((row) => row.era.includes(era)).length
    return dataset.data.filter((row) => row.era === era).length
  }

  const optionIdentifier = "value"
  const labelIdentifier = "label"

  function updateActiveTab(val) {
    const value = val
      ? val
          .split(" ")
          .map((word) => word.toLowerCase())
          .join("-")
      : "all"
    const activeTab = document.querySelector(`.options__btn--tab--active`)
    const tabActivate = document.querySelector(
      `.options__btn--tab[data-tab="${value}"]`,
    )
    activeTab.classList.remove(
      "options__btn--tab--active",
      "options__btn--tab--the-strategic-bargain--active",
      "options__btn--tab--the-cold-war--active",
      "options__btn--tab--purpose-lost-and-regained--active",
      "options__btn--tab--the-war-on-terror-and-rebalance-to-asia--active",
      "options__btn--tab--alliance-integration--active",
      "options__btn--tab--all--active",
    )
    tabActivate.classList.add(
      "options__btn--tab--active",
      `options__btn--tab--${value}--active`,
    )
  }

  function removeRowActiveTitleStyle() {
    const title = document.querySelectorAll(".title--active")
    title.forEach((item) => {
      item.classList.remove("title--active")
    })
  }

  function removeExtraContentStyle() {
    const extraContent = document.querySelectorAll(".extra-content")
    extraContent.forEach((content) => {
      if (content.classList.contains("active")) {
        content.classList.remove("active")
        content.classList.add("hide")
      }
    })
  }

  function switchRowBottomLine() {
    const rowTitle = document.querySelectorAll(".title")
    const extraContent = document.querySelectorAll(".extra-content")
    extraContent.forEach((item) => {
      if (item.classList.contains("table__body__cell--border")) {
        item.classList.remove("table__body__cell--border")
      }
    })
    rowTitle.forEach((item) => {
      if (!item.classList.contains("table__body__cell--border")) {
        item.classList.add("table__body__cell--border")
      }
    })
  }

  function handleSelect(event, selectName) {
    if (row.isOpen) {
      row.isOpen = !row.isOpen
      removeRowActiveTitleStyle()
      removeExtraContentStyle()
      switchRowBottomLine()
    }

    if (selectName === "Era") {
      updateActiveTab(event.target.value)
      selectedEra = event.target.value
    } else if (selectName === "Era-link") {
      updateActiveTab(event)
      selectedEra = event.split("-").join(" ")
    } else if (selectName === "Month") {
      selectedMonth = event.detail.value
    } else if (selectName === "Year") {
      selectedYear = event.detail.value
    } else {
      selectedType = event.detail.value
    }
  }

  function handleClear(selectName) {
    if (row.isOpen) {
      row.isOpen = !row.isOpen
      removeRowActiveTitleStyle()
      removeExtraContentStyle()
      switchRowBottomLine()
    }
    if (selectName === "Era") {
      selectedEra = ""
    } else if (selectName === "Month") {
      selectedMonth = ""
    } else if (selectName === "Year") {
      selectedYear = ""
    } else {
      selectedType = ""
    }
  }

  // handle the icon
  const chevronUp =
    '<svg class="iconUp" width="16" height="10" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M28 15 14 0 0 15h28z" fill="#000"/></svg>'
  const chevronDown =
    '<svg class="iconDown" width="16" height="10" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="m0 0 14 15L28 0H0z" fill="#000"/></svg>'
  let chevron = chevronDown
  let isListOpen = false
  let listStateOpen = false

  $: chevron = isListOpen ? chevronUp : chevronDown

  /* ------------------------------------------------------ */
  /*                    Handle Pagination                   */
  /* ------------------------------------------------------ */
  // Handle clicking the pagination buttons
  function updateCurrentPage(newPage) {
    currentPage = newPage
  }

  function resetExtraContent() {
    document.querySelectorAll(".extra-content.active").forEach((content) => {
      content.classList.remove("active")
      content.classList.remove("table__body__cell--border")
      content.classList.add("hide")
    })

    document.querySelectorAll(".title--active").forEach((title) => {
      title.classList.remove("title--active")
      title.classList.add("table__body__cell--border")
    })
  }

  function goToNextPage() {
    if (currentPage < totalPages) {
      resetExtraContent()
      updateCurrentPage(currentPage + 1)
    }
  }
  
  function goToPreviousPage() {
    if (currentPage > 1) {
      resetExtraContent()
      updateCurrentPage(currentPage - 1)
    }
  }

  function handleScrollLeft() {
    const tableContainer = document.getElementById("table-body")
    const btnIconLeft = document.querySelector("#icon-scroll-left")
    const btnIconRight = document.querySelector("#icon-scroll-right")

    tableContainer.scrollLeft -= 100
    if (btnIconRight.classList.contains("inactive")) {
      btnIconRight.classList.remove("inactive")
    }
    if (tableContainer.scrollLeft === 0) {
      btnIconLeft.classList.add("inactive")
    }
  }

  function handleScrollRight() {
    const tableContainer = document.getElementById("table-body")
    const table = document.getElementsByClassName("table")[0]
    const btnIconLeft = document.querySelector("#icon-scroll-left")
    const btnIconRight = document.querySelector("#icon-scroll-right")
    tableContainer.scrollLeft += 100
    if (btnIconLeft.classList.contains("inactive")) {
      btnIconLeft.classList.remove("inactive")
    }
    if (
      Math.ceil(tableContainer.scrollLeft) + tableContainer.offsetWidth >=
      table.offsetWidth
    ) {
      btnIconRight.classList.add("inactive")
    }
  }

  onMount(() => {
    // Simulate a button click based on URL parameter
    // to filter by era when the user is redirected from the digital report
    const params = new URLSearchParams(window.location.search)
    selectedEra = params.get("era") ? params.get("era") : ""
    if (selectedEra !== "") {
      handleSelect(selectedEra, "Era-link")
    }

    isListOpen = false
    const tableContainer = document.getElementById("table-body")
    const table = document.getElementsByClassName("table")[0]
    const btnIconLeft = document.querySelector("#icon-scroll-left")
    const btnIconRight = document.querySelector("#icon-scroll-right")
    tableContainer.addEventListener("scroll", () => {
      const left = tableContainer.scrollLeft
      if (left > 0) {
        btnIconLeft.classList.remove("inactive")
      }
      if (
        Math.ceil(tableContainer.scrollLeft) + tableContainer.offsetWidth + 2 >=
        table.offsetWidth
      ) {
        btnIconRight.classList.add("inactive")
      }
      if (
        Math.ceil(tableContainer.scrollLeft) + tableContainer.offsetWidth + 2 <=
        table.offsetWidth
      ) {
        btnIconRight.classList.remove("inactive")
      }
      if (left === 0) {
        btnIconLeft.classList.add("inactive")
      }
    })
  })
</script>

<section class="table-container__header">
  <h2 class="table-container__subtitle">Explore Documents</h2>
</section>

<section class="options__container">
  <div class="options__header">
    <button
      class="options__btn options__btn--tab options__btn--tab--all options__btn--tab--active options__btn--tab--all--active"
      data-tab={"all"}
      on:click={(event) => handleSelect(event, "Era")}
    >
      <span class="era-name">All</span>
      <span class="era-years--all" aria-hidden="true">1951-2024</span>
    </button>
    {#each dataset.eras as era}
      <button
        class="options__btn options__btn--tab options__btn--tab--{era.title
          .split(' ')
          .map((word) => word.toLowerCase())
          .join('-')} "
        data-tab={era.title
          .split(" ")
          .map((word) => word.toLowerCase())
          .join("-")}
        value={era.title}
        on:click={(event) => handleSelect(event, "Era")}
      >
        <span class="era-name">{era.title}</span>
        <span class="era-years">{era.years}</span>
      </button>
    {/each}
  </div>
</section>
<div class="selects">
  <div class="select-container">
    <div class="label">Types</div>
    <Select
      indicatorSvg={chevron}
      showChevron={true}
      bind:listOpen={isListOpen}
      {optionIdentifier}
      {labelIdentifier}
      items={dataset.types}
      placeholder="Select a type"
      on:select={(event) => handleSelect(event, "Type")}
      on:clear={() => handleClear("Type")}
    />
  </div>

  <div class="select-container">
    <div class="label">Month</div>
    <Select
      indicatorSvg={chevron}
      showChevron={true}
      {optionIdentifier}
      {labelIdentifier}
      items={dataset.months}
      placeholder="Select month"
      on:select={(event) => handleSelect(event, "Month")}
      on:clear={() => handleClear("Month")}
    />
  </div>

  <div class="select-container">
    <div class="label">Year</div>
    <Select
      indicatorSvg={chevron}
      showChevron={true}
      {optionIdentifier}
      {labelIdentifier}
      items={dataset.years}
      placeholder="Select year"
      on:select={(event) => handleSelect(event, "Year")}
      on:clear={() => handleClear("Year")}
    />
  </div>
</div>
<div class="options options__container options__container--sticky">
  <section class="options__navigation">
    <Search bind:searchText />
    <div class="options__navigation-inner">
      <span class="options__table-total-entries"
        >Showing {startEntry}-{endEntry} of {totalEntries} {totalEntries > 1 ? "entries" : "entry"}</span
      >
      <button
        id="btn-scroll-left"
        class="btn btn--scroll btn--scroll--left"
        class:inactive={currentPage === 1}
        aria-label="Go to previous page"
        on:click={goToPreviousPage}
        disabled={currentPage === 1}
        ><Icon
          id="icon-scroll-left"
          name="Icon-left"
          class="icon {currentPage === 1 ? 'inactive' : ''}"
        /></button
      >
      <button
        id="btn-scroll-right"
        class="btn btn--scroll btn--scroll--right"
        class:inactive={currentPage === totalPages}
        aria-label="Go to next page"
        on:click={goToNextPage}
        disabled={currentPage === totalPages}
        ><Icon
          id="icon-scroll-right"
          name="Icon-right"
          class="icon {currentPage === totalPages ? 'inactive' : ''}"
        /></button
      >
    </div>
  </section>
</div>

<style lang="scss">
  @use "../scss/abstracts/" as *;
  @use "../scss/components/table-container";
  @use "../scss/components/button";
  @use "../scss/components/label";
  @use "../scss/components/select";
  @use "../scss/components/options";

  :global(.selectContainer) {
    &:hover {
      --borderRadius: 0;
      --background: #{$color-background-gray-100};
    }
  }

  :global(.selectContainer .item.active) {
    position: relative;
    --itemIsActiveBG: transparent;
    --itemIsActiveColor: $color-text-gray-500;
    --itemHoverBG: $color-background-gray-100;

    &::before {
      content: "L";
      font-family: arial;
      -ms-transform: scaleX(-1) rotate(-35deg); /* IE 9 */
      -webkit-transform: scaleX(-1) rotate(-35deg); /* Chrome, Safari, Opera */
      transform: scaleX(-1) rotate(-35deg);
      display: inline-block;
      line-height: 1rem;
      color: $color-brand-blue-600;
      text-align: center;
      font-size: 14px;
      position: absolute;
      left: 16px;
      top: 10px;
    }
  }

  :global(.selectContainer) {
    --internalPadding: 0 4px !important;
    --itemFirstBorderRadius: 2px;
  }

  :global(.selectContainer .item) {
    --itemPadding: #{rem(8)} #{rem(40)} #{rem(12)};
    text-overflow: unset !important;
    overflow: unset !important;
    white-space: unset !important;
  }
  :global(.listContainer) {
    --listBorderRadius: rem(2);
    --listZIndex: 15;
    --listMaxHeight: #{rem(450)};
    --height: 1.2;
    min-width: 250px !important;
  }

  :global(.iconDown) {
    pointer-events: none;
    filter: invert(29%) sepia(13%) saturate(765%) hue-rotate(181deg)
      brightness(95%) contrast(89%);

    &:hover,
    &:focus {
      // color brand blue 600
      filter: invert(39%) sepia(72%) saturate(6596%) hue-rotate(200deg)
        brightness(100%) contrast(84%);
    }
  }

  :global(.iconUp) {
    pointer-events: none;
    filter: invert(29%) sepia(13%) saturate(765%) hue-rotate(181deg)
      brightness(95%) contrast(89%);

    &:hover,
    &:focus {
      // color brand blue 600
      filter: invert(39%) sepia(72%) saturate(6596%) hue-rotate(200deg)
        brightness(100%) contrast(84%);
    }
  }

  :global(.clearSelect) {
    width: rem(16);
    height: rem(16);
  }

  :global(.selectContainer > input) {
    --inputPadding: 0 28px 0 4px;
  }

  :global(.indicator) {
    --indicatorRight: 4px;
    top: auto !important;
  }

  :global(.selectedItem) {
    color: $color-brand-blue-600;
  }
  .select-container :global(.selectContainer:hover .indicator) {
    // color brand blue 600
    filter: invert(39%) sepia(72%) saturate(6596%) hue-rotate(200deg)
      brightness(100%) contrast(84%);
  }

  .select-container :global(.selectContainer:focus-within .indicator) {
    // color brand blue 600
    filter: invert(39%) sepia(72%) saturate(6596%) hue-rotate(200deg)
      brightness(100%) contrast(84%);
  }
</style>
