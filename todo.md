## Phase 1: Plan and design the web application structure
- [ ] Define data structure for subjects and attendance.
- [ ] Outline the user interface components.

## Phase 2: Create HTML structure for the attendance tracker
- [x] Create `index.html`.
- [x] Add input fields for subject name and number of subjects.
- [x] Add a container for subject tiles.
- [x] Add a display for overall attendance percentage.

## Phase 3: Implement CSS styling for responsive design
- [x] Create `style.css`.
- [x] Style the input section.
- [x] Style the subject tiles and buttons.
- [x] Style the overall attendance display.
- [x] Ensure responsiveness for different screen sizes.

## Phase 4: Develop JavaScript functionality for attendance tracking and data persistence
- [x] Create `script.js`.
- [x] Implement functions to add new subjects.
- [x] Implement functions to handle 'Present' and 'Absent' clicks.
- [x] Implement logic to calculate and display overall attendance percentage.
- [x] Implement data saving and loading using `localStorage`.

## Phase 5: Test the application and ensure all features work correctly
- [x] Test adding and removing subjects.
- [x] Test 'Present' and 'Absent' functionality.
- [x] Test data persistence across browser sessions.
- [x] Test responsiveness.

## Phase 6: Deliver the completed web application to the user
- [x] Package the files.
- [x] Provide instructions for use.




### Data Structure:
- `subjects`: Array of objects, each object representing a subject.
  - `name`: String, subject name.
  - `totalClasses`: Integer, total classes for the subject.
  - `attendedClasses`: Integer, classes attended for the subject.

### UI Components:
- Input for number of subjects.
- Input for subject names.
- Button to add subjects.
- Container for subject tiles.
- Each subject tile:
  - Subject name display.
  - 'Present' button.
  - 'Absent' button.
- Overall attendance percentage display.

