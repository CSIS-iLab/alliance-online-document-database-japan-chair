<script>
  import { onMount } from "svelte"
  import tooltip from "../js/tooltip"
  import Icon from "./Icons.svelte"
  import { CalculationInterpolation } from "sass"

  export let filteredData
  export let row

  /* ------------------------------------------------------ */
  /*                       Pagination                       */
  /* ------------------------------------------------------ */

  // Pagination state
  export let currentPage
  export let itemsPerPage

  // Compute the paginated data
  $: paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  $: sortClass = "inactive"

  const sortByColumns = ["title", "date (est)", "type", "era"]

  function handleClick(e) {
    let title = undefined
    let currentRow = undefined
    let extraContent = undefined

    if (e.target.parentNode.classList.contains("title")) {
      title = e.target.parentNode
      currentRow = title.nextElementSibling
      extraContent = e.target.parentNode.nextElementSibling
    } else {
      title = e.target.parentNode.parentNode
      currentRow = title.nextElementSibling
      extraContent = e.target.parentNode.parentNode.nextElementSibling
    }

    title.classList.toggle("title--active")
    title.classList.toggle("table__body__cell--border")
    currentRow.classList.toggle("table__body__cell--border")
    // Show/Hide extraContent
    extraContent.classList.toggle("active")
    extraContent.classList.toggle("hide")
    row.isOpen ? (row.isOpen = true) : (row.isOpen = !row.isOpen)
  }

  function handleKeydown(e, name) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      sort(e, name)
    }
  }

  const headerNames = ["Title", "Date (EST)", "Type", "Era"]

  $: sortBy = { col: "title", ascending: true }

  $: sort = (e, column) => {
    column = column.toLowerCase().replace(/\s/g, "_") // replace spaces using regex with undesrscore
    const iconsActive = document.querySelectorAll(".sort-icon--active")
    iconsActive.forEach((icon) => {
      icon.classList.remove("sort-icon--active")
    })
    if (sortBy.col == column) {
      sortBy.ascending = !sortBy.ascending
      sortClass = sortBy.ascending ? "active" : "inactive"
    } else {
      sortClass = "inactive"
      sortBy.col = column
      sortBy.ascending = true
    }

    // Modifier to sorting function for ascending or descending
    let sortModifier = sortBy.ascending ? 1 : -1

    // Sort by activity title
    if (column == "title") {
      return (filteredData = filteredData.sort((a, b) => {
        if (a.title < b.title) {
          return -1 * sortModifier
        } else if (a.title > b.title) {
          return 1 * sortModifier
        } else {
          return 0
        }
      }))
    }

    // sort by date
    if (column === "date_(est)") {
      return (filteredData = filteredData.sort((a, b) => {
        return (new Date(a.date) - new Date(b.date)) * sortModifier
      }))
    }

    let sort = (a, b) =>
      a[column] < b[column]
        ? -1 * sortModifier
        : a[column] > b[column]
          ? 1 * sortModifier
          : 0

    filteredData = filteredData.sort(sort)
  }

  onMount(() => {
    const iconsActive = document.querySelectorAll(".sort-icon--active")
    iconsActive.forEach((icon) => {
      icon.classList.remove("sort-icon--active")
    })
    const divTitle = document.querySelector(
      ".table__cell--header__container__title",
    )
    divTitle.children[1].children[1].classList.add("sort-icon--active")
    // Sync horizontal scroll of table header and table body
    // Inspired by https://codepen.io/Goweb/pen/rgrjWx
    const scrollSync = () => {
      const tableHeader = document.querySelector("#table-header")
      const tableBody = document.querySelector("#table-body")

      const bindSyncScrolling = (one, two) => {
        let echo = false
        const sync = (elOne, elTwo) => () =>
          (echo = !echo) &&
          ((elOne.scrollTop = elTwo.scrollTop),
          (elOne.scrollLeft = elTwo.scrollLeft))
        two.onscroll = sync(one, two)
        one.onscroll = sync(two, one)
      }
      bindSyncScrolling(tableHeader, tableBody)
    }
    scrollSync()
  })
</script>

<div class="table__wrapper">
  <div class="table__container table__container--sticky" id="table-header">
    <table class="table">
      <thead>
        <tr class="table__header-row">
          {#each headerNames as name}
            {#if name === "Era"}
              <!-- skip rendering the era column -->
            {:else}
              <th class="table__cell--header" scope="col">
                <div
                  class="table__cell--header__container table__cell--header__container__{name
                    .toLowerCase()
                    .split(' ')
                    .join('-')}"
                  on:click={sortByColumns.includes(name.toLowerCase())
                    ? (e) => sort(e, name)
                    : ""}
                  on:keydown={sortByColumns.includes(name.toLowerCase())
                    ? (e) => handleKeydown(e, name)
                    : ""}
                >
                  <span>{name}</span>
                  {#if sortByColumns.includes(name.toLowerCase())}
                    <div
                      class="sort-icons-container"
                      on:click={sortByColumns.includes(name.toLowerCase())
                        ? (e) => sort(e, name)
                        : ""}
                      on:keydown={sortByColumns.includes(name.toLowerCase())
                        ? (e) => handleKeydown(e, name)
                        : ""}
                    >
                      <button
                        class="sort-icon sort-icon--{sortBy.col ==
                          name.toLowerCase().split(' ').join('_') &&
                        sortBy.ascending
                          ? 'inactive'
                          : 'active'}"
                        on:keydown={sortByColumns.includes(name.toLowerCase())
                          ? (e) => handleKeydown(e, name)
                          : ""}>▲</button
                      >
                      <button
                        class="sort-icon sort-icon--{sortBy.col ==
                          name.toLowerCase().split(' ').join('_') &&
                        sortBy.ascending
                          ? 'active'
                          : 'inactive'}"
                        on:keydown={sortByColumns.includes(name.toLowerCase())
                          ? (e) => handleKeydown(e, name)
                          : ""}>▼</button
                      >
                    </div>
                  {/if}
                </div>
              </th>
            {/if}
          {/each}
        </tr>
      </thead>
    </table>
  </div>
  <div class="table__container" id="table-body">
    <table class="table table__body">
      <tbody>
        <!-- {#each filteredData as rows} -->
        {#each paginatedData as rows}
          <tr
            on:click={(e) => handleClick(e)}
            class="title table__body__cell--border"
          >
            <td class="table__body__cell table__body__cell--data"
              ><div class="table__body__cell__title-container">
                <span class="icon-container"></span>{rows.title}
              </div></td
            >
            <td class="table__body__cell table__body__cell--data"
              >{rows.date_string}</td
            >
            <td class="table__body__cell table__body__cell--data">
              {rows.type}
            </td>
          </tr>
          <tr class="extra-content hide">
            <td class="table__body__cell" colspan="6">
              <div class="extra-content__container">
                <div class="description">{rows.description}</div>
                <div class="link">
                  Source:
                  <a
                    href={rows.source_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    >{rows.source}<span class="icon-container--external"
                      ><Icon name="Icon-open-blank" class="icon" /></span
                    ></a
                  >
                  {#if rows.source === "U.S.-Japan Alliance Reference Book"}
                    <span
                      class="icon-tag-container"
                      use:tooltip={{ theme: "jc" }}
                      aria-hidden="true"
                      aria-label={"November 2019, compiled for OUSD-P IPSA EAS by Moriah E. Graham, Fletcher School of Law and Diplomacy."}
                      ><Icon name="Icon-info-alt" class="icon" /></span
                    >
                  {/if}
                </div>
              </div>
            </td>
          </tr>
        {:else}
          <tr>
            <td class="table__body__cell table__body__cell--no-data" colspan="6"
              ><p class="table__body__cell__no-data__title">0 entries found.</p>
              <p class="table__body__cell__no-data__desc">
                Try changing or removing filters to adjust the results.
              </p>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style lang="scss">
  @use "../scss/abstracts/" as *;
  @use "../scss/components/table";
  :global(.tippy-box[data-theme~="jc"]) {
    @extend %text-style-ui-4;
    font-family: $font-family-cardo;
    color: $color-text-gray-500;
    background-color: $color-background-white;
    padding: rem(6) rem(6) rem(8) rem(6);
    filter: drop-shadow(0px 1px 9px rgba(0, 0, 0, 0.06))
      drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.1));
  }

  :global(
      .tippy-box[data-theme~="jc"][data-placement^="top"]
        > .tippy-arrow::before,
      .tippy-box[data-theme~="jc"][data-placement^="bottom"]
        > .tippy-arrow::before,
      .tippy-box[data-theme~="jc"][data-placement^="left"]
        > .tippy-arrow::before,
      .tippy-box[data-theme~="jc"][data-placement^="right"]
        > .tippy-arrow::before
    ) {
    border-top-color: $color-background-white;
  }
</style>
