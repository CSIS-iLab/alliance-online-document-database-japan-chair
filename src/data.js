import { csv } from "d3-fetch"

// Tabs: will be the types
// filters: Era, Type, Month, Year
// 4 columns: Title, Date (EST), Type, Era
// Description and sources will be shown in the hide row
// console.log(era)
// era.push('hola')
// console.log(era)
// console.log([...era, "mundo"])
const URL =
  // "https://docs.google.com/spreadsheets/d/e/2PACX-1vSZbsWyNWxgbsJJd2AuaoNIJ2KkEplWSNK77gxcS_WndRrj1rNnPoxtPNl60HjlmdvQo4UvxBUMEi1S/pub?output=csv"
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSfFaPTW01u50nfDHC4RM0jk9FZD4MC5SYUtZkKjR88-8jx8Dd-8GQfkDY9UUp5ig/pub?gid=529193745&single=true&output=csv"

const policyGoals = [
  "Emissions_Reduction",
  "Economic_Development",
  "Resilience",
]
const tags = [
  "Anticipating_Climate_Impacts",
  "Comprehensive_Planning_Grid_Modernization",
  "Data_Transparency_or_Visualization",
  "Electric_Vehicles",
  "Energy_Storage",
  "Environmental_Justice",
  "Innovation_and_Clusters",
  "Local-Level_Planning_or_Support",
  "Microgrids",
  "Distributed_Energy_Resources_(DERs)",
  "Technology_or_System_Standards",
  "Workforce_Development",
]

export default function getData() {
  const dataPromise = csv(URL).then(processData)
  return dataPromise
}

function processData(res) {
  console.log(res)
  const data = res.map((row, index) => transformRow(row, index))

  return {
    data,
    era: getUniqueValues(data, "era"),
    type: getUniqueValues(data, "type"),
    months: getMonths(data),
    years: getYears(data),
    states: formatStates(data),
    tags: formatTags(tags),
    authority: formatUniqueValues(data, "authority"),
    resourceTypes: formatUniqueValues(data, "type_of_resource"),
    policyGoals,
  }
}

function transformRow(row, index) {
  return {
    id: index,
    date: new Date(row.Date),
    era: row.Era,
    title: row.Title,
    description: row.Description,
    type: row.Type,
    source: row.Text_Source_Display,
    source_link: row.Text_Source_Link,
  }
}

function getUniqueValues(data, key) {
  console.log(data)
  return [...new Set(data.map((row) => row[key]))]
}

function getMonths(data) {
  console.log(data)

  let months = data.map((row) =>
    row.date.toLocaleDateString(undefined, { month: "long" })
  )
  return [...new Set(months)]
}

function getYears(data) {
  let years = data.map((row) => new Date(row.date).getFullYear())
  return [...new Set(years)].sort(( a, b ) => a - b)
  
}

function filterByKeys(row, keys) {
  return keys.filter((key) => row[key])
}

function formatTags(tagArray) {
  return tagArray.map((tag) => tag.split("_").join(" "))
}

function formatUniqueValues(data, key) {
  return [...new Set(data.map((item) => item[key]))]
}

function formatStates(data) {
  const statesMap = new Map()
  data.forEach((item) => {
    if (!statesMap.has(item.state)) {
      statesMap.set(item.state, { name: item.state_name, value: item.state })
    }
  })
  return Array.from(statesMap.values())
}
