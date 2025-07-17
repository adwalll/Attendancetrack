# Attendance Tracker Web Application

A modern, responsive web application for tracking attendance across multiple subjects with persistent data storage.

## Features

- **Add Subjects**: Add subjects individually or generate multiple subjects at once
- **Track Attendance**: Mark attendance as Present or Absent for each subject
- **Real-time Calculations**: Automatic calculation of attendance percentages for individual subjects and overall
- **Data Persistence**: All data is saved locally using localStorage and persists across browser sessions
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Visual Feedback**: Color-coded attendance percentages (Green: ≥75%, Yellow: 50-74%, Red: <50%)
- **Bulk Operations**: Clear all data or reset attendance while keeping subjects

## How to Use

### Getting Started
1. Open `index.html` in any modern web browser
2. The application will load with an empty state showing 0% overall attendance

### Adding Subjects

**Method 1: Auto-generate Multiple Subjects**
1. Enter the number of subjects (1-20) in the "Number of Subjects" field
2. Press Tab or click outside the field to auto-generate subjects with default names (Mathematics, Physics, Chemistry, etc.)

**Method 2: Add Individual Subjects**
1. Enter a subject name in the "Subject Name" field
2. Click "Add Subject" button or press Enter
3. The subject will appear as a tile in the subjects section

### Tracking Attendance

For each subject tile:
- **Present Button**: Increases both total classes and attended classes
- **Absent Button**: Increases only total classes (attended classes remain unchanged)
- **Remove Subject Button**: Permanently removes the subject and all its data

### Understanding the Display

**Overall Attendance**: Shows the combined attendance percentage across all subjects
- Displayed at the top with color coding based on percentage
- Updates automatically when you mark attendance

**Subject Tiles**: Each subject shows:
- Subject name
- Attended classes count
- Total classes count
- Individual attendance percentage
- Present/Absent buttons
- Remove subject button

### Data Management

**Automatic Saving**: All data is automatically saved to your browser's local storage every time you make changes

**Clear All Data**: Removes all subjects and attendance data permanently

**Reset Attendance**: Keeps all subjects but resets attendance counts to zero

### Keyboard Shortcuts

- **Ctrl/Cmd + Enter**: Add subject (when subject name field is focused)
- **Escape**: Clear input fields and remove focus
- **Enter**: Add subject (when subject name field is focused)
- **Tab**: Navigate between fields

## Technical Details

### Files Included
- `index.html`: Main HTML structure
- `style.css`: Responsive CSS styling with modern design
- `script.js`: JavaScript functionality for attendance tracking and data persistence

### Browser Compatibility
- Works in all modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Uses localStorage for data persistence

### Data Storage
- All data is stored locally in your browser using localStorage
- Data persists across browser sessions
- No external server or internet connection required
- Data is specific to the browser and device used

## Features in Detail

### Responsive Design
- Mobile-first approach with touch-friendly buttons
- Flexible grid layout that adapts to screen size
- Optimized for both portrait and landscape orientations

### Visual Design
- Modern gradient backgrounds
- Smooth hover animations and transitions
- Color-coded attendance percentages for quick visual feedback
- Professional typography and spacing

### Data Validation
- Prevents duplicate subject names
- Validates input fields before processing
- Handles edge cases gracefully

### Performance
- Lightweight and fast loading
- Efficient DOM updates
- Auto-save functionality with minimal performance impact

## Troubleshooting

**Data Not Saving**: Ensure your browser supports localStorage and has it enabled

**Subjects Not Appearing**: Check browser console for JavaScript errors

**Responsive Issues**: Try refreshing the page or clearing browser cache

**Performance Issues**: Clear old data using the "Clear All Data" button if you have many subjects

## Future Enhancements

The application is designed to be easily extensible. Potential future features could include:
- Export/import functionality for data backup
- Subject categories and grouping
- Attendance goals and notifications
- Historical attendance tracking
- Integration with calendar applications

---

Enjoy tracking your attendance with this modern, user-friendly application!

