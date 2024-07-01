<script>
  import Header from "./Header.svelte"
  import IntroContent from "./IntroContent.svelte"
  import Options from "./Options.svelte"
  import Table from "./Table.svelte"
  import About from "./About.svelte"
  import PhotoCredits from "./PhotoCredits.svelte"
  import Footer from "./Footer.svelte"

  export let dataset
  let currentPage = 1
  let itemsPerPage = 11
  let selectedEra = ""
  let selectedType = ""
  let selectedMonth = ""
  let selectedYear = ""
  let searchText
  $: row = { isOpen: false }

  // $: totalEntries = filteredData.length

  // info to keep track
  // filteredActivity == filteredDocument
  // filteredState == filteredEra
  // filteredState == filteredType
  // filteredResource == filteredMonth
  // filteredAuthority == filteredYear

  $: filteredData = () => {
    return dataset.data
      .filter((row) => {
        const rowDate = new Date(row.date_string)
        const rowYear = row.date.getFullYear()
        const rowMonth = row.date.toLocaleString("default", { month: "long" })

        const filteredDocument = searchText ? searchText : row.title
        const filteredEra = selectedEra ? selectedEra : row.era
        const filteredType = selectedType ? selectedType : row.type
        const filteredMonth = selectedMonth ? selectedMonth : rowMonth
        const filteredYear = selectedYear ? selectedYear : rowYear

        return (
          (row.title.toLowerCase().includes(filteredDocument.toLowerCase()) ||
            row.description.toLowerCase().includes(filteredDocument.toLowerCase()) ||
            row.type.toLowerCase().includes(filteredDocument.toLowerCase()) ||
            row.era.toLowerCase().includes(filteredDocument.toLowerCase()) ||
            row.source
              .toLowerCase()
              .includes(filteredDocument.toLowerCase())) &&
          row.type === filteredType &&
          row.era === filteredEra &&
          rowMonth === filteredMonth &&
          rowYear === filteredYear
        )
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date))
  }
</script>

<div id="site-content">
  <Header />

  <IntroContent filteredData={filteredData()} />

  <section class="table-container">
    <Options
      {dataset}
      filteredData={filteredData()}
      bind:currentPage
      bind:itemsPerPage
      bind:row
      bind:selectedEra
      bind:selectedType
      bind:selectedMonth
      bind:selectedYear
      bind:searchText
    />

    <Table filteredData={filteredData()} bind:row bind:currentPage bind:itemsPerPage />
  </section>
  <About />
  <PhotoCredits />
  <Footer />
</div>

<style lang="scss">
  @use "../scss/components/table-container";
</style>
