# Searchmetrics Coding Challenge

Searchmetrics Coding Task – Keyword Manager

## User Story

### Description

The goal of this task is to create a React application to manage and categorize search keywords.

```
Categories | Keywords
-------------------------------
cars       | audi, bmw, tires +

bikes      | bianchi +

fruit      | banana, avocado +

animals    | cat, dog, otter +

drinks     | tea, water +

+Add Category
```

### Functional Requirements

- The user should be able to create and delete keyword categories
- The user should be able to add and remove keywords. Each keyword belongs to a category
- When the category is created, the backend app should prefill it with keywords with a meaning similar to the category name
  - To find semantically similar keywords please use this free API: https://www.datamuse.com/api/
  - Please use up to 10 keywords with the highest score
- Use the provided mock-up as a starting point for the UI
- Please make the app look pretty on a standard screen size (but no need to make it responsive)

### Technical requirements

- The frontend application should be written in React.js
- The app should use GraphQL to communicate with an API
- There are no other restrictions in terms of technologies, but you can refer to our [Tech Radar (see)](https://status.searchmetrics.com/tech_radar/)
- Make sure the code is maintainable and extendable

To make it easier, we have created a [github template (see)](https://github.com/searchmetrics/coding-task-frontend-template) you can use

But you are free to use any tool you want, like codesandbox.io. If you have any questions, please feel free to reach out to us.

## Development Notes

- Features:
  - State management
  - API integration
  - Testing
- The state shape has been implemented by keepin in consideration the E-R model as shown, additionally to common UI/UX helpers used across the app. Specifically:

  - The `Categories` and the `Keywords`, are both each other paired in a _Many-To-Many_ relation (`n:m`) - 1 or more _keyowrds_ could be related to 1 or more _categories_ and vice-versa. Even if clearly expressed in the user story, the _One-To-Many_ relation has been substituted to the aforementioned one, to reflect more precisely a real scenario, in which some term could be redundant across various records. It has been abstracted throw the state shape itself, leaving its effective back-end implementation apart, due to a specific database missing in this very case.

  Some mocked data has been provided as the default state. The entire app state is managed in a single shape, due to ensure a proper level of performance.

- The required REST API has been integrated throw the [_Apollo REST Data Source API_ (see)](https://www.apollographql.com/docs/apollo-server/data/data-sources/), in order to keep its implementation in a single environment, allowing it - at the same time - to communicate with the rest of the GraphQL back-end server, by sharing data between the different layers.

More details are indicated inside the code comments - where needed. For any further in-depth consideration, please contact me on info@lucacattide.dev or feel free to open an issue.

## Testing

### Code Coverage

![Branches](./coverage/badge-branches.svg 'Coverage - Branches') ![Branches](./coverage/badge-functions.svg 'Coverage - Functions') ![Branches](./coverage/badge-lines.svg 'Coverage - Lines') ![Branches](./coverage/badge-statements.svg 'Coverage - Statements')
