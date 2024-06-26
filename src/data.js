import { csv } from "d3-fetch"

// Tabs: will be the types
// filters: Era, Type, Month, Year
// 4 columns: Title, Date (EST), Type, Era
// Description and sources will be shown in the hide row
const URL =
  // "https://docs.google.com/spreadsheets/d/e/2PACX-1vSZbsWyNWxgbsJJd2AuaoNIJ2KkEplWSNK77gxcS_WndRrj1rNnPoxtPNl60HjlmdvQo4UvxBUMEi1S/pub?output=csv"
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSfFaPTW01u50nfDHC4RM0jk9FZD4MC5SYUtZkKjR88-8jx8Dd-8GQfkDY9UUp5ig/pub?gid=529193745&single=true&output=csv"


// Array of months in the correct order
const orderedMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export default function getData() {
  const dataPromise = csv(URL).then(processData)
  return dataPromise
}

function processData(res) {
  const data = res.map((row, index) => transformRow(row, index))
  return {
    data,
    eras: getUniqueValues(data, "era_new"),
    // eras: getUniqueValues(data, "era"),
    types: getUniqueValues(data, "type"),
    months: getMonths(data),
    years: getYears(data),
  }
}

function transformRow(row, index) {
  return {
    id: index,
    date: new Date(row.Date),
    date_string: row.Date,
    era: row.Era.trim(),
    era_new: {
      era_title: row.Era.trim(),
      era_years: row.Era_Years.trim(),
    },
    eraYears: row.Era_Years,
    title: row.Title,
    description: row.Description,
    type: row.Type.trim(),
    source: row.Text_Source_Display,
    source_link: row.Text_Source_Link,
  }
}

function getUniqueValues(data, key) {
  if (key === "era_new") {
    const transformedEras = 
      data.map((row) => {
        return {
          title: row[key].era_title.trim(),
          years: row[key].era_years.trim(),
        }
      })
    return transformedEras.reduce((unique, current) => {
      if (
        !unique.some(
          (item) =>
            item.title === current.title
        )
      ) {
        unique.push(current)
      }
      return unique
    }, [])
    // return [...new Set(transformedEras.map((row) => JSON.stringify(row.era_new)))].map(era => JSON.parse(era))
    // return [...new Set(transformedEras)]
  }
  return [...new Set(data.map((row) => row[key].trim()))]
}

function getMonths(data) {
  // map data to only get the months
  let months = data.map((row) =>
    row.date.toLocaleDateString(undefined, { month: "long" })
  )
  // Sorting the array based on the index in 'orderedMonths'
  months.sort ( (a, b) => orderedMonths.indexOf(a) - orderedMonths.indexOf(b))
  return [...new Set(months)]
}

function getYears(data) {
  let years = data.map((row) => new Date(row.date).getFullYear())
  return [...new Set(years)].sort((a, b) => a - b)
}

function formatUniqueValues(data, key) {
  return [...new Set(data.map((item) => item[key]))]
}

