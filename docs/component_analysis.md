# UI Component Toolkit: Inventory and Gap Analysis

## 1. Objective

The goal of this analysis was to inventory our existing UI components, identify gaps by comparing our library against popular toolkits like Shadcn/UI and Material UI, and propose a clear plan for implementing missing components, while adhering to the project's core philosophy of being lightweight and CSS-driven.

## 2. Existing Component Inventory

Our library currently contains a comprehensive set of 44 components:

- accordion
- alert
- alert-dialog
- aspect-ratio
- avatar
- badge
- breadcrumb
- button
- calendar
- card
- carousel
- checkbox
- collapsible
- combobox
- context-menu
- date-picker
- dialog
- drawer
- dropdown-menu
- hover-card
- input
- label
- menubar
- navigation-menu
- pagination
- popover
- progress
- radio-group
- resizable
- scroll-area
- select
- separator
- sheet
- sidebar
- skeleton
- slider
- switch
- table
- tabs
- textarea
- toggle
- toggle-group
- tooltip
- typography

## 3. Gap Analysis and Prioritization

By comparing our library to developer expectations set by Shadcn/UI and Material UI, several common component patterns were identified as missing.

Based on the criteria of being a common developer need and having a low JavaScript implementation cost (<500 bytes), the following gaps have been prioritized for implementation.

### High Priority (Common & Low JS Cost)

1.  **Chip:** For displaying tags, filters, or choices.
2.  **Button Group:** For grouping related buttons.
3.  **Rating:** For star ratings.
4.  **Text Field:** A composite input component that includes a label and helper text.
5.  **List:** A styled list component.
6.  **Input OTP:** For one-time password entry.
7.  **Timeline:** For displaying a sequence of events.
8.  **Responsive Layout:** A helper for creating common responsive layouts (e.g., two columns stacking on mobile).

### Lower Priority (Higher JS Cost or Less Common)

-   **Stepper:** Useful for multi-step processes but requires more state management.
-   **Data Table:** A feature-rich table with sorting and filtering would be valuable but would exceed the low-JS-cost goal. This is a candidate for future work.
-   **App Bar / Bottom Navigation:** Common, but can often be composed from other primitives.

## 4. Proposals for New Components

Here are the detailed proposals for the 8 high-priority components.

---

### 4.1. Chip Component

*   **Description:** A compact element for displaying tags, filters, or choices. Chips can be static or dismissible.
*   **Implementation Strategy:** This can be created with `createSimpleComponent` wrapping a `div` or `span`. The dismiss functionality can be handled by an optional `button` passed as a child, ensuring the component itself remains JS-free.
*   **Props and CSS Attributes:**
    *   `p="chip"`: Base attribute for styling.
    *   `variant="default|secondary|destructive|outline"`: For different visual styles.
    *   `size="sm|md|lg"`: To control the size.
    *   `disabled`: To apply a disabled state.
*   **Usage Example:**
    ```tsx
    <Chip>Default Chip</Chip>
    <Chip variant="destructive">Destructive Chip</Chip>
    <Chip>
      Removable Tag
      <button aria-label="Remove" style={{marginLeft: '0.5rem'}}>X</button>
    </Chip>
    ```

---

### 4.2. Button Group Component

*   **Description:** A container to group related buttons into a single, segmented control.
*   **Implementation Strategy:** A `createSimpleComponent` wrapping a `div`. The styling will be handled purely by CSS, using adjacent sibling selectors to manage the borders between buttons.
*   **Props and CSS Attributes:**
    *   `p="button-group"`: Base attribute for the container.
    *   `orientation="horizontal|vertical"`: To control the layout flow (defaults to `horizontal`).
*   **Usage Example:**
    ```tsx
    <ButtonGroup>
      <Button variant="outline">Left</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Right</Button>
    </ButtonGroup>
    ```

---

### 4.3. Rating Component

*   **Description:** A component for viewing and setting a rating, typically with stars.
*   **Implementation Strategy:** A custom component that cleverly uses native `<input type="radio">` elements and CSS for a zero-JS interactive experience. The state is managed natively by the browser's form handling.
*   **Props and CSS Attributes:**
    *   `p="rating"`: Base attribute for the container.
    *   `value="3"`: The current rating value.
    *   `max="5"`: The maximum number of stars.
    *   `disabled`: To make the rating display-only.
*   **Usage Example:**
    ```tsx
    <form>
      <Rating name="product-rating" max={5} />
    </form>
    ```

---

### 4.4. Text Field Component

*   **Description:** A composite component that groups a `Label`, `Input`, and helper/error text into a single, standard form control.
*   **Implementation Strategy:** A custom component that composes the existing `Label` and `Input` components. It will not be a `createSimpleComponent` but a wrapper that provides a more convenient API for a very common pattern.
*   **Props and CSS Attributes:**
    *   `p="text-field"`: Base attribute for the container.
    *   `label`: The text for the `Label`.
    *   `helperText`: Text to display below the input for hints or errors.
    *   `error`: A boolean to trigger the error state styling.
    *   Other props will be passed down to the underlying `Input`.
*   **Usage Example:**
    ```tsx
    <TextField
      label="Email Address"
      type="email"
      helperText="Please enter a valid email."
      error
    />
    ```

---

### 4.5. List Component

*   **Description:** A set of styled components for creating consistent ordered and unordered lists.
*   **Implementation Strategy:** A family of `createSimpleComponent` components: `List` (for `<ul>` or `<ol>`) and `ListItem` (for `<li>`).
*   **Props and CSS Attributes:**
    *   `p="list"`: Base attribute for the list container.
    *   `p="list-item"`: Base attribute for each list item.
    *   `variant="ordered|unordered"`: On the `List` component.
*   **Usage Example:**
    ```tsx
    <List>
      <ListItem>First item</ListItem>
      <ListItem>Second item</ListItem>
    </List>
    ```

---

### 4.6. Input OTP Component

*   **Description:** A set of inputs for entering a one-time password or verification code.
*   **Implementation Strategy:** A custom component that renders a series of `Input` elements. It will require a small, efficient script (< 500b) to handle auto-focusing to the next input and pasting.
*   **Props and CSS Attributes:**
    *   `p="input-otp"`: Base attribute for the container.
    *   `length={6}`: The number of inputs to render.
    *   `onComplete`: A callback that fires when the OTP is fully entered.
*   **Usage Example:**
    ```tsx
    <InputOTP length={6} onComplete={(otp) => console.log(otp)} />
    ```

---

### 4.7. Timeline Component

*   **Description:** A component to display a series of events in chronological order.
*   **Implementation Strategy:** A set of `createSimpleComponent` components (`Timeline`, `TimelineItem`, `TimelineDot`, etc.). The connecting lines and layout will be managed entirely with CSS pseudo-elements, making it zero-JS.
*   **Props and CSS Attributes:**
    *   `p="timeline"`: Base attribute for the container.
    *   `p="timeline-item"`: For each event item.
    *   `p="timeline-dot"`: For the marker on the timeline.
*   **Usage Example:**
    ```tsx
    <Timeline>
      <TimelineItem>
        <TimelineDot />
        <TimelineContent>Event 1</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineDot />
        <TimelineContent>Event 2</TimelineContent>
      </TimelineItem>
    </Timeline>
    ```

---

### 4.8. Responsive Layout Component

*   **Description:** A simple, responsive layout container that displays two columns side-by-side on larger screens and stacks them on mobile.
*   **Implementation Strategy:** A `createSimpleComponent` wrapping a `div`. The layout logic will be handled purely by CSS media queries using Flexbox or Grid.
*   **Props and CSS Attributes:**
    *   `p="responsive-layout"`: Base attribute for the container.
    *   `breakpoint="md"`: The screen width at which the layout switches from stacked to side-by-side.
*   **Usage Example:**
    ```tsx
    <ResponsiveLayout breakpoint="lg">
      <div>Column 1 Content</div>
      <div>Column 2 Content</div>
    </ResponsiveLayout>
    ```
