const API = "http://localhost:5000/api/requests";


// ===============================
// ELEMENTS
// ===============================

const requestForm = document.getElementById("requestForm");

const requestsContainer =
    document.getElementById("requestsContainer");

const totalRequests =
    document.getElementById("totalRequests");

const highRequests =
    document.getElementById("highRequests");

const requestCount =
    document.getElementById("requestCount");


const editModal =
    document.getElementById("editModal");

const editForm =
    document.getElementById("editForm");

const closeModal =
    document.getElementById("closeModal");


// ===============================
// GET ALL REQUESTS
// ===============================

async function loadRequests() {

    try {

        const response = await fetch(API);

        if (!response.ok) {
            throw new Error("Failed to load requests");
        }

        const requests = await response.json();

        displayRequests(requests);

    } catch (error) {

        console.error(error);

        requestsContainer.innerHTML = `
            <div class="empty-state">
                <h3>Unable to load requests</h3>
                <p>Make sure the server is running.</p>
            </div>
        `;

    }

}


// ===============================
// DISPLAY REQUESTS
// ===============================

function displayRequests(requests) {

    totalRequests.textContent = requests.length;

    const highPriority = requests.filter(
        request => request.priority === "High"
    );

    highRequests.textContent = highPriority.length;

    requestCount.textContent =
        `${requests.length} request${requests.length !== 1 ? "s" : ""}`;


    if (requests.length === 0) {

        requestsContainer.innerHTML = `
            <div class="empty-state">

                <div class="empty-icon">
                    ✓
                </div>

                <h3>
                    No requests yet
                </h3>

                <p>
                    Your submitted requests will appear here.
                </p>

            </div>
        `;

        return;
    }


    requestsContainer.innerHTML = "";


    requests
        .slice()
        .reverse()
        .forEach(request => {

            const card = document.createElement("div");

            card.className = "request-card";


            let priorityClass = "";

            if (request.priority === "High") {
                priorityClass = "priority-high";
            }

            else if (request.priority === "Medium") {
                priorityClass = "priority-medium";
            }

            else {
                priorityClass = "priority-low";
            }


            card.innerHTML = `

                <div class="request-top">

                    <div>

                        <div class="request-name">
                            ${escapeHTML(request.studentName)}
                        </div>

                        <div class="request-email">
                            ${escapeHTML(request.email)}
                        </div>

                    </div>

                    <strong>
                        #${request.id}
                    </strong>

                </div>


                <div class="tags">

                    <span class="tag">
                        ${escapeHTML(request.category)}
                    </span>

                    <span class="tag ${priorityClass}">
                        ${escapeHTML(request.priority)}
                    </span>

                </div>


                <div class="description">

                    ${escapeHTML(request.description)}

                </div>


                <div class="actions">

                    <button
                        class="action-btn edit-btn"
                        onclick="openEdit(${request.id})"
                    >
                        Edit
                    </button>

                    <button
                        class="action-btn delete-btn"
                        onclick="deleteRequest(${request.id})"
                    >
                        Delete
                    </button>

                </div>

            `;


            requestsContainer.appendChild(card);

        });

}


// ===============================
// SUBMIT NEW REQUEST
// ===============================

requestForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const newRequest = {

            studentName:
                document.getElementById("studentName").value,

            email:
                document.getElementById("email").value,

            category:
                document.getElementById("category").value,

            description:
                document.getElementById("description").value,

            priority:
                document.getElementById("priority").value

        };


        try {

            const response = await fetch(API, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(newRequest)

            });


            if (!response.ok) {

                throw new Error(
                    "Failed to create request"
                );

            }


            const savedRequest =
                await response.json();

            console.log(
                "Saved:",
                savedRequest
            );


            requestForm.reset();


            await loadRequests();


            alert(
                "Request submitted successfully!"
            );


        } catch (error) {

            console.error(error);

            alert(
                "Request submit nahi hua. Server check karo."
            );

        }

    }
);


// ===============================
// OPEN EDIT MODAL
// ===============================

async function openEdit(id) {

    try {

        const response =
            await fetch(`${API}/${id}`);


        if (!response.ok) {

            throw new Error(
                "Request not found"
            );

        }


        const request =
            await response.json();


        document.getElementById("editId").value =
            request.id;

        document.getElementById("editStudentName").value =
            request.studentName;

        document.getElementById("editEmail").value =
            request.email;

        document.getElementById("editCategory").value =
            request.category;

        document.getElementById("editPriority").value =
            request.priority;

        document.getElementById("editDescription").value =
            request.description;


        editModal.classList.remove("hidden");


    } catch (error) {

        console.error(error);

        alert("Unable to open request.");

    }

}


// ===============================
// UPDATE REQUEST
// ===============================

editForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const id =
            document.getElementById("editId").value;


        const updatedRequest = {

            studentName:
                document.getElementById(
                    "editStudentName"
                ).value,

            email:
                document.getElementById(
                    "editEmail"
                ).value,

            category:
                document.getElementById(
                    "editCategory"
                ).value,

            priority:
                document.getElementById(
                    "editPriority"
                ).value,

            description:
                document.getElementById(
                    "editDescription"
                ).value

        };


        try {

            const response = await fetch(
                `${API}/${id}`,
                {

                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(updatedRequest)

                }
            );


            if (!response.ok) {

                throw new Error(
                    "Update failed"
                );

            }


            await response.json();


            editModal.classList.add("hidden");


            await loadRequests();


            alert(
                "Request updated successfully!"
            );


        } catch (error) {

            console.error(error);

            alert(
                "Request update nahi hua."
            );

        }

    }
);


// ===============================
// DELETE REQUEST
// ===============================

async function deleteRequest(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this request?"
        );


    if (!confirmDelete) {
        return;
    }


    try {

        const response = await fetch(
            `${API}/${id}`,
            {
                method: "DELETE"
            }
        );


        if (!response.ok) {

            throw new Error(
                "Delete failed"
            );

        }


        await response.json();


        await loadRequests();


        alert(
            "Request deleted successfully!"
        );


    } catch (error) {

        console.error(error);

        alert(
            "Request delete nahi hua."
        );

    }

}


// ===============================
// CLOSE MODAL
// ===============================

closeModal.addEventListener(
    "click",
    function () {

        editModal.classList.add("hidden");

    }
);


editModal.addEventListener(
    "click",
    function (event) {

        if (event.target === editModal) {

            editModal.classList.add("hidden");

        }

    }
);


// ===============================
// SECURITY HELPER
// ===============================

function escapeHTML(value) {

    const div = document.createElement("div");

    div.textContent = value;

    return div.innerHTML;

}


// ===============================
// LOAD DATA WHEN PAGE OPENS
// ===============================

loadRequests();