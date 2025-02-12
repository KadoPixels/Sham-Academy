// Import the functions you need from the Firebase SDKs
import { db, collection, addDoc, getDocs } from './firebase.js';

// Reference to the "assignments" collection in Firestore
const assignmentsRef = collection(db, "assignments");

// Toggle the assignment form visibility
function toggleAssignmentForm() {
    const form = document.getElementById("assignment-form");
    form.style.display = form.style.display === "none" ? "block" : "none";
}

// Add assignment to Firestore
async function addAssignment() {
    const title = document.getElementById("assignment-title").value;
    const desc = document.getElementById("assignment-desc").value;

    // Ensure both title and description are entered
    if (!title || !desc) {
        alert("Please fill in both the title and description.");
        return;
    }

    // Create an assignment object
    const assignment = {
        title: title,
        description: desc,
        date: new Date().toLocaleDateString(), // Assign the current date
    };

    try {
        // Add the assignment to Firestore
        await addDoc(assignmentsRef, assignment);

        // Clear input fields
        document.getElementById("assignment-title").value = "";
        document.getElementById("assignment-desc").value = "";

        // Hide the form
        toggleAssignmentForm();

        // Display updated list of assignments
        displayAssignments();
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

// Display all assignments from Firestore
async function displayAssignments() {
    const homeworkList = document.getElementById("homework-list");

    // Clear current list
    homeworkList.innerHTML = "";

    try {
        // Fetch all assignments from Firestore
        const querySnapshot = await getDocs(assignmentsRef);

        // Populate the homework list
        querySnapshot.forEach((doc) => {
            const assignment = doc.data();
            const assignmentElement = document.createElement("div");
            assignmentElement.classList.add("assignment-item");

            assignmentElement.innerHTML = `
                <h4>${assignment.title}</h4>
                <p>${assignment.description}</p>
                <small>Assigned on: ${assignment.date}</small>
            `;
            
            homeworkList.appendChild(assignmentElement);
        });
    } catch (e) {
        console.error("Error getting documents: ", e);
    }
}

// Initial call to display existing assignments
displayAssignments();
