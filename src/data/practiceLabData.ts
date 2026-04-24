export type CardTone = "what" | "why" | "when";

export interface PracticeExercise {
  id: number;
  title: string;
  prompt: string;
  timeTarget: string;
  cardType: CardTone;
}

export interface PracticeCategory {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  items: PracticeExercise[];
}

export const practiceLabCategories: PracticeCategory[] = [
  {
    "id": "ex-cat-1",
    "num": "1",
    "title": "Warmup / State Basics",
    "subtitle": "useState, events, controlled UI",
    "items": [
      {
        "id": 1,
        "title": "Simple Counter",
        "prompt": "Build a counter component with Increment and Decrement buttons. The count should never go below 0\\. Display the current count.",
        "timeTarget": "5-8 minutes",
        "cardType": "what"
      },
      {
        "id": 2,
        "title": "Counter with Step",
        "prompt": "Build a counter where the user can type a step value into an input. Increment and Decrement buttons should increase/decrease the count by that step. Default step is 1\\.",
        "timeTarget": "10 minutes",
        "cardType": "why"
      },
      {
        "id": 3,
        "title": "Counter with Min and Max",
        "prompt": "Build a counter that accepts `min` and `max` as props. Disable the Decrement button when count equals min. Disable the Increment button when count equals max.",
        "timeTarget": "10 minutes",
        "cardType": "when"
      },
      {
        "id": 4,
        "title": "Multiple Independent Counters",
        "prompt": "Render a list of 3 counters. Each counter must track its own state independently. Add a \"Reset All\" button at the top that resets all counters to 0\\.",
        "timeTarget": "12-15 minutes",
        "cardType": "what"
      },
      {
        "id": 5,
        "title": "Toggle Visibility",
        "prompt": "Build a component with a button that says \"Show\" and a paragraph of text. Clicking the button toggles the text visible or hidden. The button label should change to \"Hide\" when the text is visible and back to \"Show\" when hidden.",
        "timeTarget": "5-8 minutes",
        "cardType": "why"
      },
      {
        "id": 6,
        "title": "Like Button",
        "prompt": "Build a like button. It shows a count of likes starting at 0\\. Clicking it increments the count and changes the button appearance to indicate it is active (add a CSS class or change text to \"Liked\"). Clicking again un-likes it and decrements the count.",
        "timeTarget": "8-10 minutes",
        "cardType": "when"
      },
      {
        "id": 7,
        "title": "Color Switcher",
        "prompt": "Render a div with a fixed width and height. Below it, render three buttons: Red, Blue, Green. Clicking each button changes the background color of the div.",
        "timeTarget": "8 minutes",
        "cardType": "what"
      },
      {
        "id": 8,
        "title": "Character Counter",
        "prompt": "Build a textarea with a character counter below it. Display \"X / 200 characters used.\" The counter updates in real time as the user types. When the count exceeds 200, turn the counter text red and disable further input.",
        "timeTarget": "10-12 minutes",
        "cardType": "why"
      }
    ]
  },
  {
    "id": "ex-cat-2",
    "num": "2",
    "title": "Controlled Inputs and Forms",
    "subtitle": "Controlled inputs, validation, async submit",
    "items": [
      {
        "id": 9,
        "title": "Controlled Text Input",
        "prompt": "Build an input field and a paragraph below it. As the user types, the paragraph updates in real time to show \"You typed: \\[input value\\]\". Add a Clear button that empties the input.",
        "timeTarget": "8 minutes",
        "cardType": "when"
      },
      {
        "id": 10,
        "title": "Simple Login Form",
        "prompt": "Build a form with an email field and a password field. On submit, prevent the default behavior and console.log the values. Clear both fields after submit. Do not use any form library.",
        "timeTarget": "10 minutes",
        "cardType": "what"
      },
      {
        "id": 11,
        "title": "Form with Validation",
        "prompt": "Build a registration form with Name, Email, and Password fields. Validate on submit: Name must not be empty. Email must contain \"@\". Password must be at least 8 characters. Display an error message below each field that fails. Do not submit if any field is invalid. Show a success message when all fields pass.",
        "timeTarget": "20-25 minutes",
        "cardType": "why"
      },
      {
        "id": 12,
        "title": "Real-time Inline Validation",
        "prompt": "Build a single password input. As the user types, show a checklist below it that updates live: at least 8 characters, contains a number, contains an uppercase letter. Each rule shows a green checkmark when met and a red cross when not.",
        "timeTarget": "15-18 minutes",
        "cardType": "when"
      },
      {
        "id": 13,
        "title": "Form with Loading and Success State",
        "prompt": "Build a contact form with Name and Message fields. On submit, simulate an API call with a 1.5 second setTimeout. While waiting: disable the submit button and change its text to \"Sending...\". On success: clear the form and show \"Message sent\\!\". On simulated error (flip a boolean to test): show \"Failed to send. Try again.\"",
        "timeTarget": "20 minutes",
        "cardType": "what"
      },
      {
        "id": 14,
        "title": "Multi-field Dynamic Form",
        "prompt": "Build a form where the user can add multiple \"skill\" entries. Each entry has a text input. There is an \"Add Skill\" button that appends a new input field. Each input has a Remove button. On submit, log the array of non-empty skill values.",
        "timeTarget": "20-25 minutes",
        "cardType": "why"
      },
      {
        "id": 15,
        "title": "Select Dropdown with Dependent State",
        "prompt": "Render a country dropdown with three options: USA, Canada, UK. Below it, render a city dropdown. The city options should change based on the selected country. When the country changes, reset the city selection.",
        "timeTarget": "15 minutes",
        "cardType": "when"
      },
      {
        "id": 16,
        "title": "Controlled Checkbox Group",
        "prompt": "Render a list of 5 checkboxes with labels (e.g. fruits). Track which ones are checked. Below the list, display the count of selected items and a comma-separated list of the selected labels.",
        "timeTarget": "12 minutes",
        "cardType": "what"
      }
    ]
  },
  {
    "id": "ex-cat-3",
    "num": "3",
    "title": "List Rendering and Array Manipulation",
    "subtitle": ".map(), .filter(), key prop, mutations",
    "items": [
      {
        "id": 17,
        "title": "Render a Static List",
        "prompt": "Given this array hardcoded in the component:\n\nconst fruits \\= \\[\"Apple\", \"Banana\", \"Cherry\", \"Mango\", \"Grape\"\\]\n\nRender it as an unordered list. Each item must have a correct key prop.",
        "timeTarget": "5 minutes",
        "cardType": "why"
      },
      {
        "id": 18,
        "title": "Render a List of Objects",
        "prompt": "Given:\n\nconst users \\= \\[  \n  { id: 1, name: \"Ana\", role: \"Admin\" },  \n  { id: 2, name: \"Ben\", role: \"Editor\" },  \n  { id: 3, name: \"Cara\", role: \"Viewer\" },  \n\\]\n\nRender each user in a card showing their name and role. Extract a `UserCard` component that receives `name` and `role` as props.",
        "timeTarget": "12 minutes",
        "cardType": "when"
      },
      {
        "id": 19,
        "title": "Add and Remove from List",
        "prompt": "Render an input and an Add button. Typing a name and clicking Add appends it to a displayed list. Each list item has a Remove button that deletes only that item. Do not mutate state directly.",
        "timeTarget": "15 minutes",
        "cardType": "what"
      },
      {
        "id": 20,
        "title": "Toggle Item in List",
        "prompt": "Render a todo list where each item is a string. Clicking an item toggles it as \"done\" (show strikethrough). Items are stored as objects `{ id, text, done }`. Do not add or remove items — only toggle.",
        "timeTarget": "12 minutes",
        "cardType": "why"
      },
      {
        "id": 21,
        "title": "Reorder List (Move Up / Move Down)",
        "prompt": "Render a list of 4 items. Each item has a Move Up and Move Down button. Move Up swaps it with the item above (disabled on the first item). Move Down swaps with the item below (disabled on the last item).",
        "timeTarget": "20-25 minutes",
        "cardType": "when"
      },
      {
        "id": 22,
        "title": "Sort a List",
        "prompt": "Render a list of numbers: `[42, 7, 19, 3, 88, 25]`. Add two buttons: Sort Ascending and Sort Descending. Clicking each re-renders the list in that order. Do not mutate the original array.",
        "timeTarget": "10 minutes",
        "cardType": "what"
      },
      {
        "id": 23,
        "title": "Render Nested List",
        "prompt": "Given:\n\nconst categories \\= \\[  \n  { id: 1, name: \"Frontend\", items: \\[\"React\", \"CSS\", \"HTML\"\\] },  \n  { id: 2, name: \"Backend\", items: \\[\"Node\", \"SQL\", \"REST\"\\] },  \n\\]\n\nRender each category as a heading with its items as a sub-list below it.",
        "timeTarget": "10 minutes",
        "cardType": "why"
      }
    ]
  },
  {
    "id": "ex-cat-4",
    "num": "4",
    "title": "Search and Filter",
    "subtitle": "Derived state, debounce",
    "items": [
      {
        "id": 24,
        "title": "Filter List by Text Input",
        "prompt": "Fetch from `https://jsonplaceholder.typicode.com/users` and render all user names. Add a text input above the list. As the user types, filter the displayed names to only those that contain the input text (case-insensitive). Do not store the filtered result in state — derive it during render.",
        "timeTarget": "18-20 minutes",
        "cardType": "when"
      },
      {
        "id": 25,
        "title": "Filter by Category",
        "prompt": "Given a hardcoded list of products with a `category` field (e.g. \"Electronics\", \"Clothing\", \"Food\"), render the full list. Add a dropdown to filter by category. Include an \"All\" option that shows everything.",
        "timeTarget": "15 minutes",
        "cardType": "what"
      },
      {
        "id": 26,
        "title": "Filter by Multiple Criteria",
        "prompt": "Given a list of employees with `name`, `department`, and `active` fields, render all employees. Add a text input to filter by name and a checkbox that when checked shows only active employees. Both filters must work simultaneously.",
        "timeTarget": "20-25 minutes",
        "cardType": "why"
      },
      {
        "id": 27,
        "title": "Debounced Search Input",
        "prompt": "Build a search input. As the user types, wait 500ms after they stop typing before filtering the list (or making an API call). While waiting, show a subtle \"Searching...\" indicator. Implement debounce manually with `setTimeout` and `clearTimeout` inside `useEffect` — no library.",
        "timeTarget": "20 minutes",
        "cardType": "when"
      },
      {
        "id": 28,
        "title": "Highlight Search Term in Results",
        "prompt": "Build a text search over a hardcoded list of sentences. As the user types, filter the list to matching sentences and wrap the matching substring in a `<mark>` tag to highlight it. Handle case-insensitive matching.",
        "timeTarget": "20-25 minutes",
        "cardType": "what"
      }
    ]
  },
  {
    "id": "ex-cat-5",
    "num": "5",
    "title": "Data Fetching",
    "subtitle": "useEffect, fetch, loading/error/success",
    "items": [
      {
        "id": 29,
        "title": "Fetch on Mount, Render List",
        "prompt": "Fetch from `https://jsonplaceholder.typicode.com/posts?_limit=10` on mount. Display each post's title and body. Show \"Loading...\" while fetching. Show \"Something went wrong.\" if the fetch fails.",
        "timeTarget": "12-15 minutes",
        "cardType": "why"
      },
      {
        "id": 30,
        "title": "Fetch on Button Click",
        "prompt": "Build a component with a \"Load Users\" button. Only when the button is clicked should it fetch from `https://jsonplaceholder.typicode.com/users`. Show a loading state on the button itself while fetching. Render the user names after the data arrives.",
        "timeTarget": "15 minutes",
        "cardType": "when"
      },
      {
        "id": 31,
        "title": "Fetch with URL Parameter",
        "prompt": "Build a component that takes a `userId` prop (start with `1`). Fetch from `https://jsonplaceholder.typicode.com/users/${userId}` and display the user's name, email, and city. Handle loading and error states.",
        "timeTarget": "15 minutes",
        "cardType": "what"
      },
      {
        "id": 32,
        "title": "Fetch with Refetch on ID Change",
        "prompt": "Render a row of buttons numbered 1 through 5\\. When a button is clicked, fetch `https://jsonplaceholder.typicode.com/users/${id}` and display the user's details. The selected button should appear visually active. Handle loading state between fetches.",
        "timeTarget": "20 minutes",
        "cardType": "why"
      },
      {
        "id": 33,
        "title": "Parallel Fetch",
        "prompt": "Simultaneously fetch `https://jsonplaceholder.typicode.com/users/1` and `https://jsonplaceholder.typicode.com/posts?userId=1` using `Promise.all`. Display the user's name as a heading and the count of their posts below it. Use one shared loading state for both requests.",
        "timeTarget": "18-20 minutes",
        "cardType": "when"
      },
      {
        "id": 34,
        "title": "Sequential Fetch (Fetch B depends on Fetch A)",
        "prompt": "First fetch a user from `https://jsonplaceholder.typicode.com/users/1`. Then, using the user's id, fetch their todos from `https://jsonplaceholder.typicode.com/todos?userId=1`. Render the user's name and the list of their todo titles. Handle each loading step clearly.",
        "timeTarget": "20 minutes",
        "cardType": "what"
      },
      {
        "id": 35,
        "title": "Fetch with Conditional Rendering on Data Shape",
        "prompt": "Fetch `https://jsonplaceholder.typicode.com/users/1`. Display the user's name. If `address.city` is `\"Gwenborough\"`, show a badge \"Home City\". If `company.bs` contains the word \"e-enable\", show a second badge \"Tech Company\". Otherwise show nothing for those fields.",
        "timeTarget": "15 minutes",
        "cardType": "why"
      },
      {
        "id": 36,
        "title": "POST Request from a Form",
        "prompt": "Build a form with Title and Body text fields. On submit, POST the data to `https://jsonplaceholder.typicode.com/posts` with `Content-Type: application/json`. Disable the submit button while waiting. On success (check for `res.ok`), show the returned post id in a success message. On failure, show an error.",
        "timeTarget": "20-25 minutes",
        "cardType": "when"
      },
      {
        "id": 37,
        "title": "Refresh / Re-fetch on Demand",
        "prompt": "Fetch a random user from `https://randomuser.me/api/` and display their name, email, and photo. Add a \"Get New User\" button that fetches again and replaces the displayed data. Show a loading spinner (text is fine) during each fetch.",
        "timeTarget": "15-18 minutes",
        "cardType": "what"
      }
    ]
  },
  {
    "id": "ex-cat-6",
    "num": "6",
    "title": "CRUD Patterns",
    "subtitle": "Array operations, combined state",
    "items": [
      {
        "id": 38,
        "title": "Full CRUD Todo List",
        "prompt": "Build a todo list. The user can add a todo via an input and button. Each todo shows a checkbox to toggle completion (strikethrough when done). Each todo has an inline Edit button that replaces the text with an input pre-filled with the current value and a Save button. Each todo has a Delete button. Do not mutate state arrays directly.",
        "timeTarget": "25-30 minutes",
        "cardType": "why"
      },
      {
        "id": 39,
        "title": "Shopping Cart",
        "prompt": "Given a hardcoded array of 4 products (name, price), render each with an \"Add to Cart\" button. Render a cart sidebar showing added items and their quantities. If the same product is added twice, increment its quantity. Show the total price at the bottom. Add a Remove button per cart item.",
        "timeTarget": "25-30 minutes",
        "cardType": "when"
      },
      {
        "id": 40,
        "title": "Note Taking App",
        "prompt": "Build a notes app. The user can create a note by typing in a textarea and clicking Save. Notes render as cards in a grid. Each card has an Edit button (opens back into the textarea pre-filled) and a Delete button. Show \"No notes yet\" when the list is empty.",
        "timeTarget": "25-30 minutes",
        "cardType": "what"
      },
      {
        "id": 41,
        "title": "Inventory Manager",
        "prompt": "Given a hardcoded list of items `{ id, name, quantity }`, render a table with each item's name and quantity. Add a \"+\" and \"-\" button per row to increment/decrement quantity. Quantity minimum is 0\\. Show the total quantity of all items at the bottom.",
        "timeTarget": "20 minutes",
        "cardType": "why"
      }
    ]
  },
  {
    "id": "ex-cat-7",
    "num": "7",
    "title": "Component Decomposition and Props",
    "subtitle": "Component boundaries, lifting state",
    "items": [
      {
        "id": 42,
        "title": "Extract Component from Inline JSX",
        "prompt": "Start with all UI in `App`. You render a list of 3 user cards inline in JSX (name, email, role). The interviewer then asks: extract a `UserCard` component, then extract a `UserList` component that takes the array as a prop. Justify each extraction verbally.",
        "timeTarget": "12-15 minutes",
        "cardType": "when"
      },
      {
        "id": 43,
        "title": "Stateful Parent, Stateless Children",
        "prompt": "Build a rating widget. The parent holds the current rating in state. It renders 5 `Star` child components. Each `Star` receives `filled` (boolean) and `onClick` as props. Clicking a star sets the rating in the parent. The star renders filled or empty based on its prop.",
        "timeTarget": "15-18 minutes",
        "cardType": "what"
      },
      {
        "id": 44,
        "title": "Lifting State Up",
        "prompt": "Build two sibling components: a `NumberInput` where the user types a number, and a `NumberDisplay` that shows the number doubled. Neither component should hold the primary state. Lift the value into their shared parent and pass it down as props.",
        "timeTarget": "12 minutes",
        "cardType": "why"
      },
      {
        "id": 45,
        "title": "Passing Functions as Props",
        "prompt": "Build a `TaskList` parent that holds an array of tasks in state. It renders a `Task` child component per item, passing the task text and an `onDelete` function as props. The delete button lives in the child but triggers the state update in the parent.",
        "timeTarget": "12-15 minutes",
        "cardType": "when"
      },
      {
        "id": 46,
        "title": "Reusable Button Component",
        "prompt": "Build a reusable `Button` component that accepts `label`, `onClick`, `disabled`, and `variant` (\"primary\" or \"danger\") as props. Primary renders with a blue background; danger with red. Use it in 3 different places in `App` with different props.",
        "timeTarget": "12 minutes",
        "cardType": "what"
      }
    ]
  },
  {
    "id": "ex-cat-8",
    "num": "8",
    "title": "Conditional Rendering",
    "subtitle": "Render patterns, role-based UI",
    "items": [
      {
        "id": 47,
        "title": "Auth Gate",
        "prompt": "Build a component with a boolean `isLoggedIn` state defaulting to false. If false, render a Login button. If true, render a welcome message and a Logout button. Clicking Login sets to true; Logout sets to false.",
        "timeTarget": "8 minutes",
        "cardType": "why"
      },
      {
        "id": 48,
        "title": "Loading / Error / Empty / Data States",
        "prompt": "Build a user list component with four distinct render states: loading (show spinner text), error (show error message \\+ retry button), empty (show \"No users found\"), and data (show the list). Control which state renders by toggling flags — no actual fetch needed. The interviewer wants to see you handle all four cases explicitly.",
        "timeTarget": "15 minutes",
        "cardType": "when"
      },
      {
        "id": 49,
        "title": "Role-Based UI",
        "prompt": "The component receives a `role` prop: \"admin\", \"editor\", or \"viewer\". Admin sees all three of: Edit, Delete, and View buttons. Editor sees Edit and View. Viewer sees only View. Avoid copy-pasting conditionals — use a clean, maintainable pattern.",
        "timeTarget": "12-15 minutes",
        "cardType": "what"
      },
      {
        "id": 50,
        "title": "Notification Banner",
        "prompt": "Build a notification banner component. It accepts a `type` prop: \"success\", \"error\", or \"warning\". Each type renders a different background color and icon text (e.g. \"✓\", \"✕\", \"⚠\"). It also accepts a `message` prop and an `onClose` callback. Clicking X calls `onClose`.",
        "timeTarget": "12 minutes",
        "cardType": "why"
      }
    ]
  },
  {
    "id": "ex-cat-9",
    "num": "9",
    "title": "Interactive UI Widgets",
    "subtitle": "Local state, timers, composition",
    "items": [
      {
        "id": 51,
        "title": "Accordion",
        "prompt": "Build an accordion with 4 sections, each with a title and body text. Clicking a title expands that section's body. Only one section can be open at a time. Clicking an open section closes it. No external component library.",
        "timeTarget": "18-20 minutes",
        "cardType": "when"
      },
      {
        "id": 52,
        "title": "Tabs",
        "prompt": "Build a tabbed interface with 3 tabs (e.g. Profile, Posts, Settings). Each tab shows different content. The active tab should be visually distinct. Clicking a tab updates the view without navigating away.",
        "timeTarget": "15 minutes",
        "cardType": "what"
      },
      {
        "id": 53,
        "title": "Modal Dialog",
        "prompt": "Build a page with an \"Open Modal\" button. Clicking it shows a modal overlay. The modal contains a title, some body text, and a Close button. Clicking Close or clicking outside the modal closes it. Do not use any library.",
        "timeTarget": "18-20 minutes",
        "cardType": "why"
      },
      {
        "id": 54,
        "title": "Star Rating Widget",
        "prompt": "Build a star rating component. Render 5 stars. Hovering over a star highlights it and all stars before it. Clicking sets the permanent rating. Display the current rating as text below (e.g. \"3 / 5\"). Allow clearing the rating.",
        "timeTarget": "18-20 minutes",
        "cardType": "when"
      },
      {
        "id": 55,
        "title": "Progress Bar",
        "prompt": "Build a component with a progress bar (a styled div with percentage width) and two buttons: \\+10% and \\-10%. The bar width reflects the current percentage. Clamp it between 0% and 100%. Display the percentage as text.",
        "timeTarget": "10 minutes",
        "cardType": "what"
      },
      {
        "id": 56,
        "title": "Image Carousel",
        "prompt": "Given an array of 5 image URLs (use placeholders like `https://picsum.photos/400/300?image=1`), build a carousel. Show one image at a time with Prev and Next buttons. Disable Prev on the first image and Next on the last. Show the current index (e.g. \"2 / 5\").",
        "timeTarget": "20 minutes",
        "cardType": "why"
      },
      {
        "id": 57,
        "title": "Timer / Stopwatch",
        "prompt": "Build a stopwatch. It shows MM:SS format. Start button begins counting. Pause stops it at the current value. Reset sets it back to 00:00. Use `setInterval` inside `useEffect`. Handle cleanup to prevent memory leaks.",
        "timeTarget": "20-25 minutes",
        "cardType": "when"
      },
      {
        "id": 58,
        "title": "Countdown Timer",
        "prompt": "Build a countdown timer. The user enters a number of seconds in an input and clicks Start. The timer counts down to 0 and shows \"Time's up\\!\" when done. Add a Reset button. Prevent countdown below 0\\. Handle the `setInterval` cleanup.",
        "timeTarget": "20-25 minutes",
        "cardType": "what"
      },
      {
        "id": 59,
        "title": "Stepper / Multi-step UI",
        "prompt": "Build a 3-step form wizard. Step 1: enter your name. Step 2: enter your email. Step 3: show a summary of name and email with a Submit button. Next/Back buttons navigate between steps. The Next button on step 1 and 2 should be disabled if the current step's field is empty.",
        "timeTarget": "25-30 minutes",
        "cardType": "why"
      },
      {
        "id": 60,
        "title": "Drag to Reorder (Simple)",
        "prompt": "Render a list of 4 items. Each item has a Move Up and Move Down button (no drag-and-drop API required). Implement the reorder logic using only array operations — no mutation. Disable Move Up on the first item and Move Down on the last.",
        "timeTarget": "20 minutes",
        "cardType": "when"
      }
    ]
  },
  {
    "id": "ex-cat-10",
    "num": "10",
    "title": "Data Tables",
    "subtitle": "Sorting, pagination, combined filters",
    "items": [
      {
        "id": 61,
        "title": "Render a Data Table",
        "prompt": "Fetch from `https://jsonplaceholder.typicode.com/users` and render the results in an HTML table with columns: Name, Email, Phone, City (from `address.city`). Show a loading row while fetching.",
        "timeTarget": "15 minutes",
        "cardType": "what"
      },
      {
        "id": 62,
        "title": "Sortable Table",
        "prompt": "Render a table of 6 hardcoded employees with `name`, `age`, and `salary` columns. Clicking a column header sorts the table by that column ascending. Clicking again sorts descending. Indicate the sort direction in the header.",
        "timeTarget": "20-25 minutes",
        "cardType": "why"
      },
      {
        "id": 63,
        "title": "Searchable and Filterable Table",
        "prompt": "Fetch user data and render it in a table. Add a search input above the table that filters rows by name in real time. Add a second filter: a select dropdown to filter by `address.city`. Both filters must work together.",
        "timeTarget": "25-30 minutes",
        "cardType": "when"
      },
      {
        "id": 64,
        "title": "Paginated List",
        "prompt": "Fetch all 100 posts from `https://jsonplaceholder.typicode.com/posts`. Display 10 at a time. Add Prev and Next buttons. Show \"Page X of 10\". Disable Prev on page 1 and Next on page 10\\. Do the pagination on the frontend, not via API query params.",
        "timeTarget": "25 minutes",
        "cardType": "what"
      },
      {
        "id": 65,
        "title": "Paginated API Fetch",
        "prompt": "Fetch `https://jsonplaceholder.typicode.com/posts?_page=1&_limit=5`. Add Prev and Next buttons. Each click fetches the corresponding page from the API with updated query params. Show a loading state between page changes. Disable Prev on page 1\\.",
        "timeTarget": "25 minutes",
        "cardType": "why"
      }
    ]
  },
  {
    "id": "ex-cat-11",
    "num": "11",
    "title": "useRef and DOM Access",
    "subtitle": "DOM access, previous value",
    "items": [
      {
        "id": 66,
        "title": "Auto-focus Input",
        "prompt": "Build a component with a text input and a button. When the component mounts, the input should automatically receive focus. The button should also manually re-focus the input when clicked. Use `useRef`.",
        "timeTarget": "8-10 minutes",
        "cardType": "when"
      },
      {
        "id": 67,
        "title": "Scroll to Section",
        "prompt": "Build a page with a nav bar containing three links: Section 1, Section 2, Section 3\\. Each link should smoothly scroll to the corresponding section div without using `<a>` tags or routing. Use `useRef` and `scrollIntoView`.",
        "timeTarget": "12-15 minutes",
        "cardType": "what"
      },
      {
        "id": 68,
        "title": "Previous Value Tracker",
        "prompt": "Build a counter. Each time the count changes, display both the current value and the previous value. Implement `usePrevious` behavior using `useRef` to store the previous value across renders.",
        "timeTarget": "15 minutes",
        "cardType": "why"
      }
    ]
  },
  {
    "id": "ex-cat-12",
    "num": "12",
    "title": "localStorage Persistence",
    "subtitle": "Persistence pattern",
    "items": [
      {
        "id": 69,
        "title": "Persist Counter to localStorage",
        "prompt": "Build a counter. Its value should survive page refresh. On mount, initialize state from `localStorage.getItem`. On every change, write the new value back to `localStorage`. Add a Reset button that clears both state and localStorage.",
        "timeTarget": "12-15 minutes",
        "cardType": "when"
      },
      {
        "id": 70,
        "title": "Persist Todo List",
        "prompt": "Build a todo list that persists to `localStorage`. On mount, load existing todos. On every change (add, delete, toggle), sync back to localStorage. The data must survive a page refresh.",
        "timeTarget": "20-25 minutes",
        "cardType": "what"
      },
      {
        "id": 71,
        "title": "Theme Preference Persistence",
        "prompt": "Build a light/dark toggle. The body background and text color should change accordingly. Store the preference in `localStorage` so it persists across refreshes. On mount, read from localStorage and apply the stored theme before rendering.",
        "timeTarget": "15 minutes",
        "cardType": "why"
      }
    ]
  },
  {
    "id": "ex-cat-13",
    "num": "13",
    "title": "useReducer",
    "subtitle": "Reducer pattern, action types",
    "items": [
      {
        "id": 72,
        "title": "Counter with useReducer",
        "prompt": "Rebuild Exercise 1 (counter) but use `useReducer` instead of `useState`. Define a reducer with action types: `INCREMENT`, `DECREMENT`, `RESET`. The interviewer wants to see you know when to use `useReducer` — be prepared to explain the decision.",
        "timeTarget": "12 minutes",
        "cardType": "when"
      },
      {
        "id": 73,
        "title": "Todo List with useReducer",
        "prompt": "Rebuild the CRUD todo list (Exercise 38\\) using `useReducer`. Define action types: `ADD`, `TOGGLE`, `DELETE`. All state transitions must go through the reducer. No `useState` for the todos array.",
        "timeTarget": "25-30 minutes",
        "cardType": "what"
      },
      {
        "id": 74,
        "title": "Form State with useReducer",
        "prompt": "Build a multi-field form (name, email, password) where all field values are managed in a single `useReducer` instead of three separate `useState` calls. Use a generic `UPDATE_FIELD` action type with a field name payload.",
        "timeTarget": "20 minutes",
        "cardType": "why"
      }
    ]
  },
  {
    "id": "ex-cat-14",
    "num": "14",
    "title": "Component Decomposition Under Pressure",
    "subtitle": "Refactoring, prop drilling",
    "items": [
      {
        "id": 75,
        "title": "Build Then Decompose",
        "prompt": "Build a working product listing page entirely in one component first: fetch products, render them with name/price/category, add a search filter. Once it works, the interviewer will ask you to decompose it into: `ProductList`, `ProductCard`, and `SearchBar` components without breaking any functionality.",
        "timeTarget": "30 minutes",
        "cardType": "when"
      },
      {
        "id": 76,
        "title": "Identify and Fix Prop Drilling",
        "prompt": "You are given a component tree where a `user` object is passed through 3 levels of components that do not use it — only the deepest child displays it. Refactor it. You may use prop drilling differently, Context, or component composition. Explain your choice.",
        "timeTarget": "20 minutes",
        "cardType": "what"
      }
    ]
  },
  {
    "id": "ex-cat-15",
    "num": "15",
    "title": "Bug Fixing",
    "subtitle": "Stale closure, mutation, memory leak",
    "items": [
      {
        "id": 77,
        "title": "Fix Stale Closure in useEffect",
        "prompt": "The following component has a bug — the count displayed in the alert after 3 seconds is always 0 no matter how many times you click:\n\nuseEffect(() \\=\\> {  \n  const timer \\= setTimeout(() \\=\\> {  \n    alert(\\`Count is ${count}\\`);  \n  }, 3000);  \n}, \\[\\]);\n\nFind and fix the bug. Explain why it happens.",
        "timeTarget": "10 minutes",
        "cardType": "why"
      },
      {
        "id": 78,
        "title": "Fix Direct State Mutation",
        "prompt": "The following todo toggle is broken — clicking does not update the UI:\n\nconst toggle \\= (id) \\=\\> {  \n  const todo \\= todos.find(t \\=\\> t.id \\=== id);  \n  todo.done \\= \\!todo.done;  \n  setTodos(todos);  \n};\n\nFix it without changing the surrounding logic. Explain the root cause.",
        "timeTarget": "8 minutes",
        "cardType": "when"
      },
      {
        "id": 79,
        "title": "Fix Missing key Prop",
        "prompt": "A list renders correctly but React logs a warning. The list uses array index as key. Explain why this is a problem (the interviewer will ask) and fix it using stable IDs, also adding a case where items can be reordered to demonstrate why index is dangerous.",
        "timeTarget": "10 minutes",
        "cardType": "what"
      },
      {
        "id": 80,
        "title": "Fix Infinite Render Loop",
        "prompt": "This component re-renders infinitely. Find and fix the bug:\n\nuseEffect(() \\=\\> {  \n  setData(fetchSomeData());  \n});\n\nExplain what causes the loop and what the correct dependency array should be.",
        "timeTarget": "8 minutes",
        "cardType": "why"
      },
      {
        "id": 81,
        "title": "Fix Memory Leak on Unmount",
        "prompt": "This component sets state after an async operation, but the component may unmount before the fetch completes:\n\nuseEffect(() \\=\\> {  \n  fetch('/api/data')  \n    .then(r \\=\\> r.json())  \n    .then(d \\=\\> setData(d));  \n}, \\[\\]);\n\nAdd a cleanup mechanism using an `isMounted` flag or `AbortController` to prevent the setState call after unmount.",
        "timeTarget": "15 minutes",
        "cardType": "when"
      },
      {
        "id": 82,
        "title": "Fix Form Uncontrolled/Controlled Conflict",
        "prompt": "A form input switches between controlled and uncontrolled, causing a React warning. The bug:\n\nconst \\[value, setValue\\] \\= useState(undefined);\n\nFix it and explain the distinction between a controlled and an uncontrolled input to the interviewer.",
        "timeTarget": "8 minutes",
        "cardType": "what"
      }
    ]
  },
  {
    "id": "ex-cat-16",
    "num": "16",
    "title": "TypeScript Variants",
    "subtitle": "Interfaces, event types, unions",
    "items": [
      {
        "id": 83,
        "title": "Type a Fetch Response (TypeScript)",
        "prompt": "Fetch users from JSONPlaceholder. Define an `interface User` with `id`, `name`, and `email`. Type the `useState` as `useState<User[]>([])`. Type the `loading` and `error` states. No `any` allowed.",
        "timeTarget": "15-18 minutes",
        "cardType": "why"
      },
      {
        "id": 84,
        "title": "Type Component Props (TypeScript)",
        "prompt": "Build a `UserCard` component that receives `name: string`, `email: string`, `age: number`, and `onDelete: (id: number) => void` as props. Define a `Props` interface. The parent must pass correctly typed values.",
        "timeTarget": "12 minutes",
        "cardType": "when"
      },
      {
        "id": 85,
        "title": "Type Event Handlers (TypeScript)",
        "prompt": "Build a controlled input. Type the `onChange` handler correctly as `React.ChangeEvent<HTMLInputElement>`. Type the `onSubmit` as `React.FormEvent<HTMLFormElement>`. The interviewer will watch whether you reach for `any` on the event.",
        "timeTarget": "10 minutes",
        "cardType": "what"
      },
      {
        "id": 86,
        "title": "Type an API Response with Union (TypeScript)",
        "prompt": "Build a fetch component where the state can be one of three types: `{ status: \"loading\" }`, `{ status: \"error\"; message: string }`, or `{ status: \"success\"; data: User[] }`. Use a discriminated union type. Render differently based on `status`.",
        "timeTarget": "20-25 minutes",
        "cardType": "why"
      },
      {
        "id": 87,
        "title": "Type useReducer Actions (TypeScript)",
        "prompt": "Rebuild the todo reducer (Exercise 73\\) with TypeScript. Define a union type for actions: `{ type: \"ADD\"; payload: string } | { type: \"TOGGLE\"; payload: number } | { type: \"DELETE\"; payload: number }`. The reducer must be fully typed with no `any`.",
        "timeTarget": "25 minutes",
        "cardType": "when"
      }
    ]
  },
  {
    "id": "ex-cat-17",
    "num": "17",
    "title": "Layout and CSS",
    "subtitle": "Flexbox, grid, positioning",
    "items": [
      {
        "id": 88,
        "title": "Flexbox Navigation Bar",
        "prompt": "Build a navbar with a logo on the left and nav links on the right, all on the same row. Use only Flexbox — no library. It should be responsive enough that you can explain what would happen on a narrower screen.",
        "timeTarget": "10-12 minutes",
        "cardType": "what"
      },
      {
        "id": 89,
        "title": "CSS Grid Card Layout",
        "prompt": "Render 6 product cards in a grid. On wide screens: 3 columns. Use CSS Grid with `grid-template-columns: repeat(3, 1fr)`. Add gap between cards. Each card should have consistent height with the content at the top and a button pinned to the bottom.",
        "timeTarget": "12-15 minutes",
        "cardType": "why"
      },
      {
        "id": 90,
        "title": "Centered Modal Overlay",
        "prompt": "Without a library, build a modal overlay that covers the full viewport with a semi-transparent dark background. The modal box itself should be centered both horizontally and vertically. Use Flexbox on the overlay. The modal should not affect page scroll.",
        "timeTarget": "12 minutes",
        "cardType": "when"
      },
      {
        "id": 91,
        "title": "Sticky Header with Scrollable Content",
        "prompt": "Build a layout where a header is fixed at the top of the viewport and does not scroll. The content below scrolls independently. Add a sidebar that also does not scroll. Use CSS position or Flexbox — no library.",
        "timeTarget": "12-15 minutes",
        "cardType": "what"
      }
    ]
  },
  {
    "id": "ex-cat-18",
    "num": "18",
    "title": "Realistic End-to-End Mini Apps",
    "subtitle": "Combined all skills",
    "items": [
      {
        "id": 92,
        "title": "User Directory with Search and Detail View",
        "prompt": "Fetch all users from JSONPlaceholder. Render them as a searchable list. Clicking a user name fetches and displays their full details (including their posts count from a second fetch) in a detail panel on the right. The list stays visible. Handle all loading and error states.",
        "timeTarget": "30-35 minutes",
        "cardType": "why"
      },
      {
        "id": 93,
        "title": "Simple Kanban Board",
        "prompt": "Build a 3-column kanban: Todo, In Progress, Done. Each column has a hardcoded set of tasks. Each task card has buttons to move it to the adjacent column (right arrow moves forward, left arrow moves back). Tasks should not appear in more than one column. No drag-and-drop required.",
        "timeTarget": "30 minutes",
        "cardType": "when"
      },
      {
        "id": 94,
        "title": "Quiz App",
        "prompt": "Build a quiz with 3 hardcoded questions, each with 4 options. Show one question at a time. After selecting an answer, show if it was correct (green) or wrong (red with the correct answer highlighted). A Next button advances to the next question. At the end, show the final score.",
        "timeTarget": "30-35 minutes",
        "cardType": "what"
      },
      {
        "id": 95,
        "title": "Basic Expense Tracker",
        "prompt": "Build an expense tracker. The user enters a description and amount and clicks Add. Expenses render as a list with a delete button per item. Show the total at the bottom. Totals and list should update immediately on add or delete.",
        "timeTarget": "20-25 minutes",
        "cardType": "why"
      },
      {
        "id": 96,
        "title": "Searchable Product Catalog with Cart",
        "prompt": "Given a hardcoded array of 8 products (name, price, category), render them as cards with an \"Add to Cart\" button. Add a search input and a category dropdown filter. Add a cart icon in the header showing item count. Clicking it opens a cart summary with item names, quantities, and total price.",
        "timeTarget": "35-40 minutes",
        "cardType": "when"
      },
      {
        "id": 97,
        "title": "Pagination \\+ Search Combined",
        "prompt": "Fetch all 100 posts from JSONPlaceholder. Implement client-side pagination (10 per page) and a search filter by title. When the user types in the search box, reset to page 1 and filter results. Pagination should reflect only the filtered count (e.g. \"Page 1 of 3\" when 25 results match).",
        "timeTarget": "30-35 minutes",
        "cardType": "what"
      },
      {
        "id": 98,
        "title": "Recursive Folder Tree",
        "prompt": "Given a nested data structure:\n\nconst tree \\= {  \n  name: \"root\",  \n  children: \\[  \n    { name: \"src\", children: \\[  \n      { name: \"components\", children: \\[\\] },  \n      { name: \"utils\", children: \\[\\] }  \n    \\]},  \n    { name: \"public\", children: \\[\\] }  \n  \\]  \n}\n\nBuild a `FolderNode` component that renders itself recursively. Each folder can be clicked to expand or collapse its children. This is a stretch task — the interviewer wants to see how you think, not just whether you finish.",
        "timeTarget": "25-30 minutes",
        "cardType": "why"
      }
    ]
  }
];
