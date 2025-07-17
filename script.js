// Global variables
let subjects = [];

// DOM elements
const numSubjectsInput = document.getElementById('num-subjects');
const subjectNameInput = document.getElementById('subject-name');
const addSubjectBtn = document.getElementById('add-subject-btn');
const clearAllBtn = document.getElementById('clear-all-btn');
const resetAttendanceBtn = document.getElementById('reset-attendance-btn');
const exportDataBtn = document.getElementById('export-data-btn');
const importFileInput = document.getElementById('import-file');
const subjectsContainer = document.getElementById('subjects-container');
const overallPercentageSpan = document.getElementById('overall-percentage');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    renderSubjects();
    updateOverallAttendance();
    setupEventListeners();
});

// Event listeners
function setupEventListeners() {
    addSubjectBtn.addEventListener('click', addSubject);
    clearAllBtn.addEventListener('click', clearAllData);
    resetAttendanceBtn.addEventListener('click', resetAttendance);
    exportDataBtn.addEventListener('click', exportData);
    importFileInput.addEventListener('change', importData);
    
    // Allow adding subject with Enter key
    subjectNameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addSubject();
        }
    });
    
    // Auto-generate subject names based on number input
    numSubjectsInput.addEventListener('change', function() {
        const numSubjects = parseInt(this.value);
        if (numSubjects > 0 && numSubjects <= 20) {
            generateSubjectNames(numSubjects);
        }
    });
}

// Generate subject names automatically
function generateSubjectNames(numSubjects) {
    const defaultNames = [
        'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English',
        'History', 'Geography', 'Computer Science', 'Economics', 'Psychology',
        'Philosophy', 'Art', 'Music', 'Physical Education', 'Literature',
        'Statistics', 'Calculus', 'Algebra', 'Geometry', 'Trigonometry'
    ];
    
    // Clear existing subjects
    subjects = [];
    
    // Add subjects with default names
    for (let i = 0; i < numSubjects; i++) {
        const subjectName = defaultNames[i] || `Subject ${i + 1}`;
        subjects.push({
            id: Date.now() + i,
            name: subjectName,
            totalClasses: 0,
            attendedClasses: 0
        });
    }
    
    saveData();
    renderSubjects();
    updateOverallAttendance();
    
    // Clear the input
    numSubjectsInput.value = '';
}

// Add a single subject
function addSubject() {
    const subjectName = subjectNameInput.value.trim();
    
    if (!subjectName) {
        alert('Please enter a subject name');
        return;
    }
    
    // Check if subject already exists
    if (subjects.some(subject => subject.name.toLowerCase() === subjectName.toLowerCase())) {
        alert('Subject already exists');
        return;
    }
    
    const newSubject = {
        id: Date.now(),
        name: subjectName,
        totalClasses: 0,
        attendedClasses: 0
    };
    
    subjects.push(newSubject);
    subjectNameInput.value = '';
    
    saveData();
    renderSubjects();
    updateOverallAttendance();
}

// Remove a subject
function removeSubject(subjectId) {
    if (confirm('Are you sure you want to remove this subject?')) {
        subjects = subjects.filter(subject => subject.id !== subjectId);
        saveData();
        renderSubjects();
        updateOverallAttendance();
    }
}

// Mark attendance as present
function markPresent(subjectId) {
    const subject = subjects.find(s => s.id === subjectId);
    if (subject) {
        subject.totalClasses++;
        subject.attendedClasses++;
        saveData();
        renderSubjects();
        updateOverallAttendance();
    }
}

// Mark attendance as absent
function markAbsent(subjectId) {
    const subject = subjects.find(s => s.id === subjectId);
    if (subject) {
        subject.totalClasses++;
        saveData();
        renderSubjects();
        updateOverallAttendance();
    }
}

// Calculate attendance percentage for a subject
function calculateAttendancePercentage(subject) {
    if (subject.totalClasses === 0) return 0;
    return Math.round((subject.attendedClasses / subject.totalClasses) * 100);
}

// Calculate overall attendance percentage
function calculateOverallAttendance() {
    if (subjects.length === 0) return 0;
    
    let totalClasses = 0;
    let totalAttended = 0;
    
    subjects.forEach(subject => {
        totalClasses += subject.totalClasses;
        totalAttended += subject.attendedClasses;
    });
    
    if (totalClasses === 0) return 0;
    return Math.round((totalAttended / totalClasses) * 100);
}

// Update overall attendance display
function updateOverallAttendance() {
    const percentage = calculateOverallAttendance();
    overallPercentageSpan.textContent = `${percentage}%`;
    
    // Change color based on attendance percentage
    const overallAttendanceDiv = document.querySelector('.overall-attendance');
    overallAttendanceDiv.className = 'overall-attendance';
    
    if (percentage >= 75) {
        overallAttendanceDiv.style.background = 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)';
    } else if (percentage >= 50) {
        overallAttendanceDiv.style.background = 'linear-gradient(135deg, #feca57 0%, #ff9ff3 100%)';
    } else {
        overallAttendanceDiv.style.background = 'linear-gradient(135deg, #f56565 0%, #e53e3e 100%)';
    }
}

// Render all subjects
function renderSubjects() {
    if (subjects.length === 0) {
        subjectsContainer.innerHTML = `
            <div class="empty-state">
                <h4>No subjects added yet</h4>
                <p>Add subjects using the form above to start tracking attendance</p>
            </div>
        `;
        return;
    }
    
    subjectsContainer.innerHTML = subjects.map(subject => {
        const percentage = calculateAttendancePercentage(subject);
        return `
            <div class="subject-tile">
                <div class="subject-name">${subject.name}</div>
                <div class="attendance-info">
                    <div>
                        <div class="label">Attended</div>
                        <div class="value">${subject.attendedClasses}</div>
                    </div>
                    <div>
                        <div class="label">Total</div>
                        <div class="value">${subject.totalClasses}</div>
                    </div>
                    <div>
                        <div class="label">Percentage</div>
                        <div class="value percentage">${percentage}%</div>
                    </div>
                </div>
                <div class="attendance-buttons">
                    <button class="present-btn" onclick="markPresent(${subject.id})">
                        Present
                    </button>
                    <button class="absent-btn" onclick="markAbsent(${subject.id})">
                        Absent
                    </button>
                </div>
                <button class="remove-btn" onclick="removeSubject(${subject.id})">
                    Remove Subject
                </button>
            </div>
        `;
    }).join('');
}

// Clear all data
function clearAllData() {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
        subjects = [];
        localStorage.removeItem('attendanceData');
        renderSubjects();
        updateOverallAttendance();
    }
}

// Reset attendance (keep subjects but reset attendance data)
function resetAttendance() {
    if (confirm('Are you sure you want to reset all attendance data? This will keep your subjects but reset all attendance records.')) {
        subjects.forEach(subject => {
            subject.totalClasses = 0;
            subject.attendedClasses = 0;
        });
        saveData();
        renderSubjects();
        updateOverallAttendance();
    }
}

// Save data to localStorage
function saveData() {
    try {
        localStorage.setItem('attendanceData', JSON.stringify(subjects));
    } catch (error) {
        console.error('Error saving data:', error);
        alert('Error saving data. Please check if your browser supports localStorage.');
    }
}

// Load data from localStorage
function loadData() {
    try {
        const savedData = localStorage.getItem('attendanceData');
        if (savedData) {
            subjects = JSON.parse(savedData);
        }
    } catch (error) {
        console.error('Error loading data:', error);
        subjects = [];
    }
}

// Export data as JSON
function exportData() {
    try {
        const dataStr = JSON.stringify(subjects, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'attendance_data.json';
        link.click();
        URL.revokeObjectURL(url);
        alert('Data exported successfully!');
    } catch (error) {
        console.error('Error exporting data:', error);
        alert('Error exporting data. Please try again.');
    }
}

// Import data from JSON
function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            
            // Validate the structure
            if (!Array.isArray(importedData)) {
                alert('Invalid file format: Data should be an array.');
                return;
            }
            
            // Validate each subject object
            for (let i = 0; i < importedData.length; i++) {
                const subject = importedData[i];
                if (!subject.hasOwnProperty('id') || 
                    !subject.hasOwnProperty('name') || 
                    !subject.hasOwnProperty('totalClasses') || 
                    !subject.hasOwnProperty('attendedClasses')) {
                    alert(`Invalid subject structure at index ${i}. Required fields: id, name, totalClasses, attendedClasses.`);
                    return;
                }
                
                // Validate data types
                if (typeof subject.id !== 'number' ||
                    typeof subject.name !== 'string' ||
                    typeof subject.totalClasses !== 'number' ||
                    typeof subject.attendedClasses !== 'number') {
                    alert(`Invalid data types at index ${i}. Check that id, totalClasses, and attendedClasses are numbers, and name is a string.`);
                    return;
                }
                
                // Validate logical constraints
                if (subject.totalClasses < 0 || subject.attendedClasses < 0 || subject.attendedClasses > subject.totalClasses) {
                    alert(`Invalid attendance data at index ${i}. Attended classes cannot be negative or greater than total classes.`);
                    return;
                }
            }
            
            // If validation passes, import the data
            subjects = importedData;
            localStorage.setItem('attendanceData', JSON.stringify(subjects));
            renderSubjects();
            updateOverallAttendance();
            alert('Data imported successfully! The page will refresh to show the imported data.');
            
            // Auto-refresh the page
            setTimeout(() => {
                location.reload();
            }, 1000);
            
        } catch (error) {
            console.error('Error importing data:', error);
            alert('Error reading file. Please ensure it is a valid JSON file.');
        }
    };
    reader.readAsText(file);
    
    // Clear the file input so the same file can be imported again if needed
    event.target.value = '';
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to add subject
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        addSubject();
    }
    
    // Escape to clear input
    if (e.key === 'Escape') {
        subjectNameInput.value = '';
        numSubjectsInput.value = '';
        subjectNameInput.blur();
        numSubjectsInput.blur();
    }
});

// Auto-save every 30 seconds (in case of unexpected closure)
setInterval(saveData, 30000);

