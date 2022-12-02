# Development

### Link to Deployed Website

[The link](https://happychimp747.github.io/react-project/)

### Goal and Value of the Application

This application helps remote workers form the initial plans
for a year-long staycation across the world. It shows important
information to especially help initial stage of trip planning.

### Usability Principles Considered

Visually, country names and pictures are 
most important and therefore prominent features of the app.

Users will have the option to see the country offering the
longest visa first or to see the country with lowest visa
fee first. This is intended to match user expectations as
they explore different destinations.

An aggregator lets the users know which categories have been
chosen. This status helps guide users find new features to
add their trips.

The checkboxes use "AND" operations. This choice matches
user's expectations that certain countries may provide more
than one feature.

### Organization of Components

Each country is shown via a `MainItem` component in
`MainItem.jsx`. Information for each item is held
in `assets/main-data.json`.

An `Aggregator.jsx` component shows the aggregated information.
Aggregated values are passed in as props.

### How Data is Passed Down Through Components

A dictionary for each item is passed as `item` prop to the
component through a mapping operation from the `filteredItem` state.

In addition, all filtering and sorting information is also
held in `assets`, and then passed into HTML elements through a
similar mechanism.

### How the User Triggers State Changes

When the user checks on different features a country
provides,
`checkedCats` is updated accordingly. It tracks the
categories shown in the app. At the same time, `filteredItems` 
updates to include all items selected. When none of the
categories are checked, `filteredItems` include all items 
in the dataset.

When the user clicks on one of the sorting keys,
the `sortKey`
state variable is updated. In turn, the app updates the
sequence of items on display. A "recommended value" is
provided by default.

When the user selects their favorite
countries, `selectedItems` updates to reflect the countries
chosen. In
turn, the "Favorite countries" section aggregates properties
of these selected items and shows them. At the same time,
a `selectedStatus` state updates to reflect whether
the `MainItem` component shows the "Add to your trip" or
the "Remove" button.
