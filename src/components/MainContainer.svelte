<script>
  import Header from "./Header.svelte"
  import IntroContent from "./IntroContent.svelte"
  import Options from "./Options.svelte"
  import Table from "./Table.svelte"
  import About from "./About.svelte"
  import Footer from "./Footer.svelte"

  export let dataset

  let selectedEra = ""
  let selectedType = ""
  let selectedMonth = ""
  let selectedYear = ""
  let selectedState = ""
  let selectedResourceType = ""
  let selectedAuthority = ""
  let selectedTags = []
  let selectedPolicyGoal = ""
  let searchText
  $: row = { isOpen: false }

  // info to keep track
  // filteredActivity == filteredDocument
  // filteredState == filteredEra
  // filteredState == filteredType
  // filteredResource == filteredMonth
  // filteredAuthority == filteredYear

  $: filteredData = () => {
    return dataset.data
      .filter((row) => {
        const filteredDocument = searchText ? searchText : row.title
        const filteredEra = selectedEra ? selectedEra : row.era
        const filteredType = selectedType ? selectedType : row.type
        const filteredMonth = selectedMonth ? selectedMonth : row.date
        const filteredYear = selectedYear ? selectedYear : row.date

        return (
          (row.title.toLowerCase().includes(filteredDocument.toLowerCase()) ||
            row.type.toLowerCase().includes(filteredDocument.toLowerCase()) ||
            row.era.toLowerCase().includes(filteredDocument.toLowerCase()) ||
            row.source
              .toLowerCase()
              .includes(filteredDocument.toLowerCase())) &&
          row.type === filteredType &&
          row.era === filteredEra &&
          row.date === filteredMonth &&
          row.date === filteredYear
        )
      })
      .sort((a, b) => {
        if (a.title < b.title) {
          return -1
        } else if (a.title > b.title) {
          return 1
        } else {
          return 0
        }
      })
  }
</script>

<div id="site-content">
  <Header />

  <IntroContent filteredData={filteredData()} />

  <section class="table-container">
    <Options
      {dataset}
      filteredData={filteredData()}
      bind:row
      bind:selectedAuthority
      bind:selectedResourceType
      bind:selectedState
      bind:selectedTags
      bind:selectedPolicyGoal
      bind:searchText
    />

    <Table filteredData={filteredData()} bind:row />
  </section>
  <About />
  <Footer />
</div>

<style lang="scss">
  @use "../scss/components/table-container";
</style>
