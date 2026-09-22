// Get registration form
const registerForm =
    document.getElementById("registerForm");

// Get message box
const message =
    document.getElementById("message");


// When form is submitted
registerForm.addEventListener("submit", function(event) {

    // Stop page from refreshing
    event.preventDefault();


    // Get values from form
    const name =
        document.getElementById("name").value;

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;


    // First check whether email already exists
    fetch("http://localhost:3000/users")

        .then(function(response) {

            return response.json();

        })

        .then(function(users) {

            // Check existing email
            const existingUser = users.find(function(user) {

                return user.email === email;

            });


            // If email already exists
            if (existingUser) {

                message.textContent =
                    "Email already registered.";

                return;
            }


            // Create new user object
            const newUser = {

                name: name,

                email: email,

                password: password

            };


            // Send new user to JSON Server
            return fetch("http://localhost:3000/users", {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(newUser)

            });

        })

        .then(function(response) {

            // If no response because email existed
            if (!response) {
                return;
            }

            return response.json();

        })

        .then(function(data) {

            // If user was successfully added
            if (data) {

                message.textContent =
                    "Account created successfully!";

                // Clear form
                registerForm.reset();

                // Go to login after 1 second
                setTimeout(function() {

                    window.location.href =
                        "login.html";

                }, 1000);

            }

        })

        .catch(function(error) {

            console.log(error);

            message.textContent =
                "Something went wrong. Please try again.";

        });

});