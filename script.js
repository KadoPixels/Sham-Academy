// Load users from users.json and store in localStorage
fetch("users.json")
    .then(response => response.json())
    .then(data => {
        localStorage.setItem("users", JSON.stringify(data.users));
    });

function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let users = JSON.parse(localStorage.getItem("users"));

    let user = users.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        window.location.href = "home.html";
    } else {
        document.getElementById("error-message").innerText = "Wrong username or password";
    }
}

// Redirect to login if user is not logged in
if (window.location.pathname.includes("home.html")) {
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
        window.location.href = "login.html";
    }
}
//new part
function toggleAssignmentForm() {
    const form = document.getElementById("assignment-form");
    form.style.display = form.style.display === "none" ? "block" : "none";
}

// Add assignment to the list
function addAssignment() {
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

    // Get assignments from localStorage, or use an empty array if none exist
    const assignments = JSON.parse(localStorage.getItem("assignments")) || [];

    // Add the new assignment to the list
    assignments.push(assignment);

    // Save assignments back to localStorage
    localStorage.setItem("assignments", JSON.stringify(assignments));

    // Clear input fields
    document.getElementById("assignment-title").value = "";
    document.getElementById("assignment-desc").value = "";

    // Hide the form
    toggleAssignmentForm();

    // Display updated list of assignments
    displayAssignments();
}

// Display all assignments from localStorage
function displayAssignments() {
    const assignments = JSON.parse(localStorage.getItem("assignments")) || [];
    const homeworkList = document.getElementById("homework-list");
    
    // Clear current list
    homeworkList.innerHTML = "";

    // Populate the homework list
    assignments.forEach((assignment) => {
        const assignmentElement = document.createElement("div");
        assignmentElement.classList.add("assignment-item");

        assignmentElement.innerHTML = `
            <h4>${assignment.title}</h4>
            <p>${assignment.description}</p>
            <small>Assigned on: ${assignment.date}</small>
        `;
        
        homeworkList.appendChild(assignmentElement);
    });
}

// Initial call to display existing assignments
displayAssignments();

