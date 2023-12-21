export const checkboxes = [
  {
    type: "selectGroup",
    title: "Regio",
    selects: [
      {
        name: "regio",
        type: "select",
        prefix: null,
        items: [
          { label: "Costa Cálida", value: "costa-calida" },
          { label: "Costa Blanca", value: "costa-blanca" },
        ],
      },
    ],
  },
  {
    type: "selectGroup",
    title: "Prijs",
    selects: [
      {
        prefix: "Van",
        name: "prijs_van",
        type: "select",
        items: [
          { label: "€ 0", value: "0" },
          { label: "€ 50.000", value: "50000" },
          { label: "€ 100.000", value: "100000" },
          { label: "€ 150.000", value: "150000" },
          { label: "€ 200.000", value: "200000" },
          { label: "Geen maximum", value: "max" },
        ],
      },
      {
        prefix: "Tot",
        name: "prijs_tot",
        type: "select",
        items: [
          { label: "€ 100.000", value: "100000" },
          { label: "€ 150.000", value: "150000" },
          { label: "€ 200.000", value: "200000" },
          { label: "€ 500.000", value: "500000" },
          { label: "Geen maximum", value: "max" },
        ],
      },
    ],
  },
  {
    title: "Soort aanbod",
    type: "checkbox",
    name: "soort_aanbod",
    items: [
      { label: "Appartement", value: "appartment" },
      { label: "Bungalow", value: "bungalow" },
      { label: "Duplex", value: "duplex" },
      { label: "Geschakelde woning", value: "geschakelde-woning" },
      { label: "Penthouse", value: "penthouse" },
      { label: "Townhouse", value: "townhouse" },
      { label: "Villa", value: "villa" },
    ],
  },
  {
    title: "Gebruiksoopervlakte wonen",
    name: "gebruiksoopervlakte_wonen",
    type: "radio",
    items: [
      { label: "50 m² of meer", value: "50" },
      { label: "75 m² of meer", value: "75" },
      { label: "100 m² of meer", value: "100" },
      { label: "150 m² of meer", value: "150" },
      { label: "250 m² of meer", value: "250" },
    ],
  },
  {
    title: "Perceeloppervlakte",
    name: "perceeloppervlakte",
    type: "radio",
    items: [
      { label: "250 m² of meer", value: "250" },
      { label: "500 m² of meer", value: "500" },
      { label: "1.000 m² of meer", value: "1000" },
      { label: "2.500 m² of meer", value: "2500" },
      { label: "5.000 m² of meer", value: "5000" },
    ],
  },
  {
    title: "Aantal slaapkamers",
    name: "aantal_slaapkamers",
    type: "radio",
    items: [
      { label: "1 kamer", value: "1" },
      { label: "2 of meer", value: "2" },
      { label: "3 of meer", value: "3" },
      { label: "4 of meer", value: "4" },
      { label: "5 of meer", value: "5" },
    ],
  },
  {
    title: "Aantal badkamers",
    name: "aantal_badkamers",
    type: "radio",
    items: [
      { label: "1 badkamer", value: "1" },
      { label: "2 of meer", value: "2" },
      { label: "3 of meer", value: "3" },
      { label: "4 of meer", value: "4" },
      { label: "5 of meer", value: "5" },
    ],
  },
  {
    title: "Buitenruimte",
    name: "buitenruimte",
    type: "checkbox",
    items: [
      { label: "Balkon", value: "balkon" },
      { label: "Darkterras", value: "darkterras" },
      { label: "Tuin", value: "tuin" },
    ],
  },
];
