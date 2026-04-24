**Comprehensive list of all possible live coding exercises for a junior React frontend developer interview** 

Every exercise is scoped to what the research confirmed as realistic for junior live sessions, with TypeScript variants included where relevant.

---

## **CATEGORY 1: Warmup / State Basics**

---

**Exercise 1 \- Simple Counter**

Prompt: Build a counter component with Increment and Decrement buttons. The count should never go below 0\. Display the current count.

Time target: 5-8 minutes

---

**Exercise 2 \- Counter with Step**

Prompt: Build a counter where the user can type a step value into an input. Increment and Decrement buttons should increase/decrease the count by that step. Default step is 1\.

Time target: 10 minutes

---

**Exercise 3 \- Counter with Min and Max**

Prompt: Build a counter that accepts `min` and `max` as props. Disable the Decrement button when count equals min. Disable the Increment button when count equals max.

Time target: 10 minutes

---

**Exercise 4 \- Multiple Independent Counters**

Prompt: Render a list of 3 counters. Each counter must track its own state independently. Add a "Reset All" button at the top that resets all counters to 0\.

Time target: 12-15 minutes

---

**Exercise 5 \- Toggle Visibility**

Prompt: Build a component with a button that says "Show" and a paragraph of text. Clicking the button toggles the text visible or hidden. The button label should change to "Hide" when the text is visible and back to "Show" when hidden.

Time target: 5-8 minutes

---

**Exercise 6 \- Like Button**

Prompt: Build a like button. It shows a count of likes starting at 0\. Clicking it increments the count and changes the button appearance to indicate it is active (add a CSS class or change text to "Liked"). Clicking again un-likes it and decrements the count.

Time target: 8-10 minutes

---

**Exercise 7 \- Color Switcher**

Prompt: Render a div with a fixed width and height. Below it, render three buttons: Red, Blue, Green. Clicking each button changes the background color of the div.

Time target: 8 minutes

---

**Exercise 8 \- Character Counter**

Prompt: Build a textarea with a character counter below it. Display "X / 200 characters used." The counter updates in real time as the user types. When the count exceeds 200, turn the counter text red and disable further input.

Time target: 10-12 minutes

---

## **CATEGORY 2: Controlled Inputs and Forms**

---

**Exercise 9 \- Controlled Text Input**

Prompt: Build an input field and a paragraph below it. As the user types, the paragraph updates in real time to show "You typed: \[input value\]". Add a Clear button that empties the input.

Time target: 8 minutes

---

**Exercise 10 \- Simple Login Form**

Prompt: Build a form with an email field and a password field. On submit, prevent the default behavior and console.log the values. Clear both fields after submit. Do not use any form library.

Time target: 10 minutes

---

**Exercise 11 \- Form with Validation**

Prompt: Build a registration form with Name, Email, and Password fields. Validate on submit: Name must not be empty. Email must contain "@". Password must be at least 8 characters. Display an error message below each field that fails. Do not submit if any field is invalid. Show a success message when all fields pass.

Time target: 20-25 minutes

---

**Exercise 12 \- Real-time Inline Validation**

Prompt: Build a single password input. As the user types, show a checklist below it that updates live: at least 8 characters, contains a number, contains an uppercase letter. Each rule shows a green checkmark when met and a red cross when not.

Time target: 15-18 minutes

---

**Exercise 13 \- Form with Loading and Success State**

Prompt: Build a contact form with Name and Message fields. On submit, simulate an API call with a 1.5 second setTimeout. While waiting: disable the submit button and change its text to "Sending...". On success: clear the form and show "Message sent\!". On simulated error (flip a boolean to test): show "Failed to send. Try again."

Time target: 20 minutes

---

**Exercise 14 \- Multi-field Dynamic Form**

Prompt: Build a form where the user can add multiple "skill" entries. Each entry has a text input. There is an "Add Skill" button that appends a new input field. Each input has a Remove button. On submit, log the array of non-empty skill values.

Time target: 20-25 minutes

---

**Exercise 15 \- Select Dropdown with Dependent State**

Prompt: Render a country dropdown with three options: USA, Canada, UK. Below it, render a city dropdown. The city options should change based on the selected country. When the country changes, reset the city selection.

Time target: 15 minutes

---

**Exercise 16 \- Controlled Checkbox Group**

Prompt: Render a list of 5 checkboxes with labels (e.g. fruits). Track which ones are checked. Below the list, display the count of selected items and a comma-separated list of the selected labels.

Time target: 12 minutes

---

## **CATEGORY 3: List Rendering and Array Manipulation**

---

**Exercise 17 \- Render a Static List**

Prompt: Given this array hardcoded in the component:

const fruits \= \["Apple", "Banana", "Cherry", "Mango", "Grape"\]

Render it as an unordered list. Each item must have a correct key prop.

Time target: 5 minutes

---

**Exercise 18 \- Render a List of Objects**

Prompt: Given:

const users \= \[  
  { id: 1, name: "Ana", role: "Admin" },  
  { id: 2, name: "Ben", role: "Editor" },  
  { id: 3, name: "Cara", role: "Viewer" },  
\]

Render each user in a card showing their name and role. Extract a `UserCard` component that receives `name` and `role` as props.

Time target: 12 minutes

---

**Exercise 19 \- Add and Remove from List**

Prompt: Render an input and an Add button. Typing a name and clicking Add appends it to a displayed list. Each list item has a Remove button that deletes only that item. Do not mutate state directly.

Time target: 15 minutes

---

**Exercise 20 \- Toggle Item in List**

Prompt: Render a todo list where each item is a string. Clicking an item toggles it as "done" (show strikethrough). Items are stored as objects `{ id, text, done }`. Do not add or remove items — only toggle.

Time target: 12 minutes

---

**Exercise 21 \- Reorder List (Move Up / Move Down)**

Prompt: Render a list of 4 items. Each item has a Move Up and Move Down button. Move Up swaps it with the item above (disabled on the first item). Move Down swaps with the item below (disabled on the last item).

Time target: 20-25 minutes

---

**Exercise 22 \- Sort a List**

Prompt: Render a list of numbers: `[42, 7, 19, 3, 88, 25]`. Add two buttons: Sort Ascending and Sort Descending. Clicking each re-renders the list in that order. Do not mutate the original array.

Time target: 10 minutes

---

**Exercise 23 \- Render Nested List**

Prompt: Given:

const categories \= \[  
  { id: 1, name: "Frontend", items: \["React", "CSS", "HTML"\] },  
  { id: 2, name: "Backend", items: \["Node", "SQL", "REST"\] },  
\]

Render each category as a heading with its items as a sub-list below it.

Time target: 10 minutes

---

## **CATEGORY 4: Search and Filter**

---

**Exercise 24 \- Filter List by Text Input**

Prompt: Fetch from `https://jsonplaceholder.typicode.com/users` and render all user names. Add a text input above the list. As the user types, filter the displayed names to only those that contain the input text (case-insensitive). Do not store the filtered result in state — derive it during render.

Time target: 18-20 minutes

---

**Exercise 25 \- Filter by Category**

Prompt: Given a hardcoded list of products with a `category` field (e.g. "Electronics", "Clothing", "Food"), render the full list. Add a dropdown to filter by category. Include an "All" option that shows everything.

Time target: 15 minutes

---

**Exercise 26 \- Filter by Multiple Criteria**

Prompt: Given a list of employees with `name`, `department`, and `active` fields, render all employees. Add a text input to filter by name and a checkbox that when checked shows only active employees. Both filters must work simultaneously.

Time target: 20-25 minutes

---

**Exercise 27 \- Debounced Search Input**

Prompt: Build a search input. As the user types, wait 500ms after they stop typing before filtering the list (or making an API call). While waiting, show a subtle "Searching..." indicator. Implement debounce manually with `setTimeout` and `clearTimeout` inside `useEffect` — no library.

Time target: 20 minutes

---

**Exercise 28 \- Highlight Search Term in Results**

Prompt: Build a text search over a hardcoded list of sentences. As the user types, filter the list to matching sentences and wrap the matching substring in a `<mark>` tag to highlight it. Handle case-insensitive matching.

Time target: 20-25 minutes

---

## **CATEGORY 5: Data Fetching**

---

**Exercise 29 \- Fetch on Mount, Render List**

Prompt: Fetch from `https://jsonplaceholder.typicode.com/posts?_limit=10` on mount. Display each post's title and body. Show "Loading..." while fetching. Show "Something went wrong." if the fetch fails.

Time target: 12-15 minutes

---

**Exercise 30 \- Fetch on Button Click**

Prompt: Build a component with a "Load Users" button. Only when the button is clicked should it fetch from `https://jsonplaceholder.typicode.com/users`. Show a loading state on the button itself while fetching. Render the user names after the data arrives.

Time target: 15 minutes

---

**Exercise 31 \- Fetch with URL Parameter**

Prompt: Build a component that takes a `userId` prop (start with `1`). Fetch from `https://jsonplaceholder.typicode.com/users/${userId}` and display the user's name, email, and city. Handle loading and error states.

Time target: 15 minutes

---

**Exercise 32 \- Fetch with Refetch on ID Change**

Prompt: Render a row of buttons numbered 1 through 5\. When a button is clicked, fetch `https://jsonplaceholder.typicode.com/users/${id}` and display the user's details. The selected button should appear visually active. Handle loading state between fetches.

Time target: 20 minutes

---

**Exercise 33 \- Parallel Fetch**

Prompt: Simultaneously fetch `https://jsonplaceholder.typicode.com/users/1` and `https://jsonplaceholder.typicode.com/posts?userId=1` using `Promise.all`. Display the user's name as a heading and the count of their posts below it. Use one shared loading state for both requests.

Time target: 18-20 minutes

---

**Exercise 34 \- Sequential Fetch (Fetch B depends on Fetch A)**

Prompt: First fetch a user from `https://jsonplaceholder.typicode.com/users/1`. Then, using the user's id, fetch their todos from `https://jsonplaceholder.typicode.com/todos?userId=1`. Render the user's name and the list of their todo titles. Handle each loading step clearly.

Time target: 20 minutes

---

**Exercise 35 \- Fetch with Conditional Rendering on Data Shape**

Prompt: Fetch `https://jsonplaceholder.typicode.com/users/1`. Display the user's name. If `address.city` is `"Gwenborough"`, show a badge "Home City". If `company.bs` contains the word "e-enable", show a second badge "Tech Company". Otherwise show nothing for those fields.

Time target: 15 minutes

---

**Exercise 36 \- POST Request from a Form**

Prompt: Build a form with Title and Body text fields. On submit, POST the data to `https://jsonplaceholder.typicode.com/posts` with `Content-Type: application/json`. Disable the submit button while waiting. On success (check for `res.ok`), show the returned post id in a success message. On failure, show an error.

Time target: 20-25 minutes

---

**Exercise 37 \- Refresh / Re-fetch on Demand**

Prompt: Fetch a random user from `https://randomuser.me/api/` and display their name, email, and photo. Add a "Get New User" button that fetches again and replaces the displayed data. Show a loading spinner (text is fine) during each fetch.

Time target: 15-18 minutes

---

## **CATEGORY 6: CRUD Patterns**

---

**Exercise 38 \- Full CRUD Todo List**

Prompt: Build a todo list. The user can add a todo via an input and button. Each todo shows a checkbox to toggle completion (strikethrough when done). Each todo has an inline Edit button that replaces the text with an input pre-filled with the current value and a Save button. Each todo has a Delete button. Do not mutate state arrays directly.

Time target: 25-30 minutes

---

**Exercise 39 \- Shopping Cart**

Prompt: Given a hardcoded array of 4 products (name, price), render each with an "Add to Cart" button. Render a cart sidebar showing added items and their quantities. If the same product is added twice, increment its quantity. Show the total price at the bottom. Add a Remove button per cart item.

Time target: 25-30 minutes

---

**Exercise 40 \- Note Taking App**

Prompt: Build a notes app. The user can create a note by typing in a textarea and clicking Save. Notes render as cards in a grid. Each card has an Edit button (opens back into the textarea pre-filled) and a Delete button. Show "No notes yet" when the list is empty.

Time target: 25-30 minutes

---

**Exercise 41 \- Inventory Manager**

Prompt: Given a hardcoded list of items `{ id, name, quantity }`, render a table with each item's name and quantity. Add a "+" and "-" button per row to increment/decrement quantity. Quantity minimum is 0\. Show the total quantity of all items at the bottom.

Time target: 20 minutes

---

## **CATEGORY 7: Component Decomposition and Props**

---

**Exercise 42 \- Extract Component from Inline JSX**

Prompt: Start with all UI in `App`. You render a list of 3 user cards inline in JSX (name, email, role). The interviewer then asks: extract a `UserCard` component, then extract a `UserList` component that takes the array as a prop. Justify each extraction verbally.

Time target: 12-15 minutes

---

**Exercise 43 \- Stateful Parent, Stateless Children**

Prompt: Build a rating widget. The parent holds the current rating in state. It renders 5 `Star` child components. Each `Star` receives `filled` (boolean) and `onClick` as props. Clicking a star sets the rating in the parent. The star renders filled or empty based on its prop.

Time target: 15-18 minutes

---

**Exercise 44 \- Lifting State Up**

Prompt: Build two sibling components: a `NumberInput` where the user types a number, and a `NumberDisplay` that shows the number doubled. Neither component should hold the primary state. Lift the value into their shared parent and pass it down as props.

Time target: 12 minutes

---

**Exercise 45 \- Passing Functions as Props**

Prompt: Build a `TaskList` parent that holds an array of tasks in state. It renders a `Task` child component per item, passing the task text and an `onDelete` function as props. The delete button lives in the child but triggers the state update in the parent.

Time target: 12-15 minutes

---

**Exercise 46 \- Reusable Button Component**

Prompt: Build a reusable `Button` component that accepts `label`, `onClick`, `disabled`, and `variant` ("primary" or "danger") as props. Primary renders with a blue background; danger with red. Use it in 3 different places in `App` with different props.

Time target: 12 minutes

---

## **CATEGORY 8: Conditional Rendering**

---

**Exercise 47 \- Auth Gate**

Prompt: Build a component with a boolean `isLoggedIn` state defaulting to false. If false, render a Login button. If true, render a welcome message and a Logout button. Clicking Login sets to true; Logout sets to false.

Time target: 8 minutes

---

**Exercise 48 \- Loading / Error / Empty / Data States**

Prompt: Build a user list component with four distinct render states: loading (show spinner text), error (show error message \+ retry button), empty (show "No users found"), and data (show the list). Control which state renders by toggling flags — no actual fetch needed. The interviewer wants to see you handle all four cases explicitly.

Time target: 15 minutes

---

**Exercise 49 \- Role-Based UI**

Prompt: The component receives a `role` prop: "admin", "editor", or "viewer". Admin sees all three of: Edit, Delete, and View buttons. Editor sees Edit and View. Viewer sees only View. Avoid copy-pasting conditionals — use a clean, maintainable pattern.

Time target: 12-15 minutes

---

**Exercise 50 \- Notification Banner**

Prompt: Build a notification banner component. It accepts a `type` prop: "success", "error", or "warning". Each type renders a different background color and icon text (e.g. "✓", "✕", "⚠"). It also accepts a `message` prop and an `onClose` callback. Clicking X calls `onClose`.

Time target: 12 minutes

---

## **CATEGORY 9: Interactive UI Widgets**

---

**Exercise 51 \- Accordion**

Prompt: Build an accordion with 4 sections, each with a title and body text. Clicking a title expands that section's body. Only one section can be open at a time. Clicking an open section closes it. No external component library.

Time target: 18-20 minutes

---

**Exercise 52 \- Tabs**

Prompt: Build a tabbed interface with 3 tabs (e.g. Profile, Posts, Settings). Each tab shows different content. The active tab should be visually distinct. Clicking a tab updates the view without navigating away.

Time target: 15 minutes

---

**Exercise 53 \- Modal Dialog**

Prompt: Build a page with an "Open Modal" button. Clicking it shows a modal overlay. The modal contains a title, some body text, and a Close button. Clicking Close or clicking outside the modal closes it. Do not use any library.

Time target: 18-20 minutes

---

**Exercise 54 \- Star Rating Widget**

Prompt: Build a star rating component. Render 5 stars. Hovering over a star highlights it and all stars before it. Clicking sets the permanent rating. Display the current rating as text below (e.g. "3 / 5"). Allow clearing the rating.

Time target: 18-20 minutes

---

**Exercise 55 \- Progress Bar**

Prompt: Build a component with a progress bar (a styled div with percentage width) and two buttons: \+10% and \-10%. The bar width reflects the current percentage. Clamp it between 0% and 100%. Display the percentage as text.

Time target: 10 minutes

---

**Exercise 56 \- Image Carousel**

Prompt: Given an array of 5 image URLs (use placeholders like `https://picsum.photos/400/300?image=1`), build a carousel. Show one image at a time with Prev and Next buttons. Disable Prev on the first image and Next on the last. Show the current index (e.g. "2 / 5").

Time target: 20 minutes

---

**Exercise 57 \- Timer / Stopwatch**

Prompt: Build a stopwatch. It shows MM:SS format. Start button begins counting. Pause stops it at the current value. Reset sets it back to 00:00. Use `setInterval` inside `useEffect`. Handle cleanup to prevent memory leaks.

Time target: 20-25 minutes

---

**Exercise 58 \- Countdown Timer**

Prompt: Build a countdown timer. The user enters a number of seconds in an input and clicks Start. The timer counts down to 0 and shows "Time's up\!" when done. Add a Reset button. Prevent countdown below 0\. Handle the `setInterval` cleanup.

Time target: 20-25 minutes

---

**Exercise 59 \- Stepper / Multi-step UI**

Prompt: Build a 3-step form wizard. Step 1: enter your name. Step 2: enter your email. Step 3: show a summary of name and email with a Submit button. Next/Back buttons navigate between steps. The Next button on step 1 and 2 should be disabled if the current step's field is empty.

Time target: 25-30 minutes

---

**Exercise 60 \- Drag to Reorder (Simple)**

Prompt: Render a list of 4 items. Each item has a Move Up and Move Down button (no drag-and-drop API required). Implement the reorder logic using only array operations — no mutation. Disable Move Up on the first item and Move Down on the last.

Time target: 20 minutes

---

## **CATEGORY 10: Data Tables**

---

**Exercise 61 \- Render a Data Table**

Prompt: Fetch from `https://jsonplaceholder.typicode.com/users` and render the results in an HTML table with columns: Name, Email, Phone, City (from `address.city`). Show a loading row while fetching.

Time target: 15 minutes

---

**Exercise 62 \- Sortable Table**

Prompt: Render a table of 6 hardcoded employees with `name`, `age`, and `salary` columns. Clicking a column header sorts the table by that column ascending. Clicking again sorts descending. Indicate the sort direction in the header.

Time target: 20-25 minutes

---

**Exercise 63 \- Searchable and Filterable Table**

Prompt: Fetch user data and render it in a table. Add a search input above the table that filters rows by name in real time. Add a second filter: a select dropdown to filter by `address.city`. Both filters must work together.

Time target: 25-30 minutes

---

**Exercise 64 \- Paginated List**

Prompt: Fetch all 100 posts from `https://jsonplaceholder.typicode.com/posts`. Display 10 at a time. Add Prev and Next buttons. Show "Page X of 10". Disable Prev on page 1 and Next on page 10\. Do the pagination on the frontend, not via API query params.

Time target: 25 minutes

---

**Exercise 65 \- Paginated API Fetch**

Prompt: Fetch `https://jsonplaceholder.typicode.com/posts?_page=1&_limit=5`. Add Prev and Next buttons. Each click fetches the corresponding page from the API with updated query params. Show a loading state between page changes. Disable Prev on page 1\.

Time target: 25 minutes

---

## **CATEGORY 11: useRef and DOM Access**

---

**Exercise 66 \- Auto-focus Input**

Prompt: Build a component with a text input and a button. When the component mounts, the input should automatically receive focus. The button should also manually re-focus the input when clicked. Use `useRef`.

Time target: 8-10 minutes

---

**Exercise 67 \- Scroll to Section**

Prompt: Build a page with a nav bar containing three links: Section 1, Section 2, Section 3\. Each link should smoothly scroll to the corresponding section div without using `<a>` tags or routing. Use `useRef` and `scrollIntoView`.

Time target: 12-15 minutes

---

**Exercise 68 \- Previous Value Tracker**

Prompt: Build a counter. Each time the count changes, display both the current value and the previous value. Implement `usePrevious` behavior using `useRef` to store the previous value across renders.

Time target: 15 minutes

---

## **CATEGORY 12: localStorage Persistence**

---

**Exercise 69 \- Persist Counter to localStorage**

Prompt: Build a counter. Its value should survive page refresh. On mount, initialize state from `localStorage.getItem`. On every change, write the new value back to `localStorage`. Add a Reset button that clears both state and localStorage.

Time target: 12-15 minutes

---

**Exercise 70 \- Persist Todo List**

Prompt: Build a todo list that persists to `localStorage`. On mount, load existing todos. On every change (add, delete, toggle), sync back to localStorage. The data must survive a page refresh.

Time target: 20-25 minutes

---

**Exercise 71 \- Theme Preference Persistence**

Prompt: Build a light/dark toggle. The body background and text color should change accordingly. Store the preference in `localStorage` so it persists across refreshes. On mount, read from localStorage and apply the stored theme before rendering.

Time target: 15 minutes

---

## **CATEGORY 13: useReducer**

---

**Exercise 72 \- Counter with useReducer**

Prompt: Rebuild Exercise 1 (counter) but use `useReducer` instead of `useState`. Define a reducer with action types: `INCREMENT`, `DECREMENT`, `RESET`. The interviewer wants to see you know when to use `useReducer` — be prepared to explain the decision.

Time target: 12 minutes

---

**Exercise 73 \- Todo List with useReducer**

Prompt: Rebuild the CRUD todo list (Exercise 38\) using `useReducer`. Define action types: `ADD`, `TOGGLE`, `DELETE`. All state transitions must go through the reducer. No `useState` for the todos array.

Time target: 25-30 minutes

---

**Exercise 74 \- Form State with useReducer**

Prompt: Build a multi-field form (name, email, password) where all field values are managed in a single `useReducer` instead of three separate `useState` calls. Use a generic `UPDATE_FIELD` action type with a field name payload.

Time target: 20 minutes

---

## **CATEGORY 14: Component Decomposition Under Pressure**

---

**Exercise 75 \- Build Then Decompose**

Prompt: Build a working product listing page entirely in one component first: fetch products, render them with name/price/category, add a search filter. Once it works, the interviewer will ask you to decompose it into: `ProductList`, `ProductCard`, and `SearchBar` components without breaking any functionality.

Time target: 30 minutes

---

**Exercise 76 \- Identify and Fix Prop Drilling**

Prompt: You are given a component tree where a `user` object is passed through 3 levels of components that do not use it — only the deepest child displays it. Refactor it. You may use prop drilling differently, Context, or component composition. Explain your choice.

Time target: 20 minutes

---

## **CATEGORY 15: Bug Fixing**

---

**Exercise 77 \- Fix Stale Closure in useEffect**

Prompt: The following component has a bug — the count displayed in the alert after 3 seconds is always 0 no matter how many times you click:

useEffect(() \=\> {  
  const timer \= setTimeout(() \=\> {  
    alert(\`Count is ${count}\`);  
  }, 3000);  
}, \[\]);

Find and fix the bug. Explain why it happens.

Time target: 10 minutes

---

**Exercise 78 \- Fix Direct State Mutation**

Prompt: The following todo toggle is broken — clicking does not update the UI:

const toggle \= (id) \=\> {  
  const todo \= todos.find(t \=\> t.id \=== id);  
  todo.done \= \!todo.done;  
  setTodos(todos);  
};

Fix it without changing the surrounding logic. Explain the root cause.

Time target: 8 minutes

---

**Exercise 79 \- Fix Missing key Prop**

Prompt: A list renders correctly but React logs a warning. The list uses array index as key. Explain why this is a problem (the interviewer will ask) and fix it using stable IDs, also adding a case where items can be reordered to demonstrate why index is dangerous.

Time target: 10 minutes

---

**Exercise 80 \- Fix Infinite Render Loop**

Prompt: This component re-renders infinitely. Find and fix the bug:

useEffect(() \=\> {  
  setData(fetchSomeData());  
});

Explain what causes the loop and what the correct dependency array should be.

Time target: 8 minutes

---

**Exercise 81 \- Fix Memory Leak on Unmount**

Prompt: This component sets state after an async operation, but the component may unmount before the fetch completes:

useEffect(() \=\> {  
  fetch('/api/data')  
    .then(r \=\> r.json())  
    .then(d \=\> setData(d));  
}, \[\]);

Add a cleanup mechanism using an `isMounted` flag or `AbortController` to prevent the setState call after unmount.

Time target: 15 minutes

---

**Exercise 82 \- Fix Form Uncontrolled/Controlled Conflict**

Prompt: A form input switches between controlled and uncontrolled, causing a React warning. The bug:

const \[value, setValue\] \= useState(undefined);

Fix it and explain the distinction between a controlled and an uncontrolled input to the interviewer.

Time target: 8 minutes

---

## **CATEGORY 16: TypeScript Variants**

These apply if the role specifies TypeScript. Each maps to a prior exercise.

---

**Exercise 83 \- Type a Fetch Response (TypeScript)**

Prompt: Fetch users from JSONPlaceholder. Define an `interface User` with `id`, `name`, and `email`. Type the `useState` as `useState<User[]>([])`. Type the `loading` and `error` states. No `any` allowed.

Time target: 15-18 minutes

---

**Exercise 84 \- Type Component Props (TypeScript)**

Prompt: Build a `UserCard` component that receives `name: string`, `email: string`, `age: number`, and `onDelete: (id: number) => void` as props. Define a `Props` interface. The parent must pass correctly typed values.

Time target: 12 minutes

---

**Exercise 85 \- Type Event Handlers (TypeScript)**

Prompt: Build a controlled input. Type the `onChange` handler correctly as `React.ChangeEvent<HTMLInputElement>`. Type the `onSubmit` as `React.FormEvent<HTMLFormElement>`. The interviewer will watch whether you reach for `any` on the event.

Time target: 10 minutes

---

**Exercise 86 \- Type an API Response with Union (TypeScript)**

Prompt: Build a fetch component where the state can be one of three types: `{ status: "loading" }`, `{ status: "error"; message: string }`, or `{ status: "success"; data: User[] }`. Use a discriminated union type. Render differently based on `status`.

Time target: 20-25 minutes

---

**Exercise 87 \- Type useReducer Actions (TypeScript)**

Prompt: Rebuild the todo reducer (Exercise 73\) with TypeScript. Define a union type for actions: `{ type: "ADD"; payload: string } | { type: "TOGGLE"; payload: number } | { type: "DELETE"; payload: number }`. The reducer must be fully typed with no `any`.

Time target: 25 minutes

---

## **CATEGORY 17: Layout and CSS**

---

**Exercise 88 \- Flexbox Navigation Bar**

Prompt: Build a navbar with a logo on the left and nav links on the right, all on the same row. Use only Flexbox — no library. It should be responsive enough that you can explain what would happen on a narrower screen.

Time target: 10-12 minutes

---

**Exercise 89 \- CSS Grid Card Layout**

Prompt: Render 6 product cards in a grid. On wide screens: 3 columns. Use CSS Grid with `grid-template-columns: repeat(3, 1fr)`. Add gap between cards. Each card should have consistent height with the content at the top and a button pinned to the bottom.

Time target: 12-15 minutes

---

**Exercise 90 \- Centered Modal Overlay**

Prompt: Without a library, build a modal overlay that covers the full viewport with a semi-transparent dark background. The modal box itself should be centered both horizontally and vertically. Use Flexbox on the overlay. The modal should not affect page scroll.

Time target: 12 minutes

---

**Exercise 91 \- Sticky Header with Scrollable Content**

Prompt: Build a layout where a header is fixed at the top of the viewport and does not scroll. The content below scrolls independently. Add a sidebar that also does not scroll. Use CSS position or Flexbox — no library.

Time target: 12-15 minutes

---

## **CATEGORY 18: Realistic End-to-End Mini Apps**

These are the hardest exercises. Expect these at the upper end of junior or when a company is testing for mid-level scope.

---

**Exercise 92 \- User Directory with Search and Detail View**

Prompt: Fetch all users from JSONPlaceholder. Render them as a searchable list. Clicking a user name fetches and displays their full details (including their posts count from a second fetch) in a detail panel on the right. The list stays visible. Handle all loading and error states.

Time target: 30-35 minutes

---

**Exercise 93 \- Simple Kanban Board**

Prompt: Build a 3-column kanban: Todo, In Progress, Done. Each column has a hardcoded set of tasks. Each task card has buttons to move it to the adjacent column (right arrow moves forward, left arrow moves back). Tasks should not appear in more than one column. No drag-and-drop required.

Time target: 30 minutes

---

**Exercise 94 \- Quiz App**

Prompt: Build a quiz with 3 hardcoded questions, each with 4 options. Show one question at a time. After selecting an answer, show if it was correct (green) or wrong (red with the correct answer highlighted). A Next button advances to the next question. At the end, show the final score.

Time target: 30-35 minutes

---

**Exercise 95 \- Basic Expense Tracker**

Prompt: Build an expense tracker. The user enters a description and amount and clicks Add. Expenses render as a list with a delete button per item. Show the total at the bottom. Totals and list should update immediately on add or delete.

Time target: 20-25 minutes

---

**Exercise 96 \- Searchable Product Catalog with Cart**

Prompt: Given a hardcoded array of 8 products (name, price, category), render them as cards with an "Add to Cart" button. Add a search input and a category dropdown filter. Add a cart icon in the header showing item count. Clicking it opens a cart summary with item names, quantities, and total price.

Time target: 35-40 minutes

---

**Exercise 97 \- Pagination \+ Search Combined**

Prompt: Fetch all 100 posts from JSONPlaceholder. Implement client-side pagination (10 per page) and a search filter by title. When the user types in the search box, reset to page 1 and filter results. Pagination should reflect only the filtered count (e.g. "Page 1 of 3" when 25 results match).

Time target: 30-35 minutes

---

**Exercise 98 \- Recursive Folder Tree**

Prompt: Given a nested data structure:

const tree \= {  
  name: "root",  
  children: \[  
    { name: "src", children: \[  
      { name: "components", children: \[\] },  
      { name: "utils", children: \[\] }  
    \]},  
    { name: "public", children: \[\] }  
  \]  
}

Build a `FolderNode` component that renders itself recursively. Each folder can be clicked to expand or collapse its children. This is a stretch task — the interviewer wants to see how you think, not just whether you finish.

Time target: 25-30 minutes

---

## **Summary Map**

| Category | Exercises | Core skill |
| ----- | ----- | ----- |
| State basics | 1-8 | useState, events, controlled UI |
| Forms | 9-16 | Controlled inputs, validation, async submit |
| List rendering | 17-23 | .map(), .filter(), key prop, mutations |
| Search / filter | 24-28 | Derived state, debounce |
| Data fetching | 29-37 | useEffect, fetch, loading/error/success |
| CRUD | 38-41 | Array operations, combined state |
| Props / decomposition | 42-46 | Component boundaries, lifting state |
| Conditional rendering | 47-50 | Render patterns, role-based UI |
| Widgets | 51-60 | Local state, timers, composition |
| Tables | 61-65 | Sorting, pagination, combined filters |
| useRef | 66-68 | DOM access, previous value |
| localStorage | 69-71 | Persistence pattern |
| useReducer | 72-74 | Reducer pattern, action types |
| Decomposition under pressure | 75-76 | Refactoring, prop drilling |
| Bug fixing | 77-82 | Stale closure, mutation, memory leak |
| TypeScript | 83-87 | Interfaces, event types, unions |
| CSS / layout | 88-91 | Flexbox, grid, positioning |
| Mini apps | 92-98 | Combined all skills |

**If you can complete exercises 1-74 fluently and explain your decisions out loud, you are prepared for 90% of what will appear in a junior React live coding session at a small to mid-sized company.**

Exercises 75-98 cover the remaining 10% — stretch tasks, bug fixing under pressure, and TypeScript scenarios that appear when companies are testing at the upper edge of the junior band.