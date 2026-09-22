
const registerForm =
    document.getElementById("registerForm");

const message =
    document.getElementById("message");



registerForm.addEventListener("submit", function(event) {

    event.preventDefault();


   
    const name =
        document.getElementById("name").value;

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;


    
    fetch("http://localhost:3000/users")

        .then(function(response) {

            return response.json();

        })

        .then(function(users) {

           
            const existingUser = users.find(function(user) {

                return user.email === email;

            });


           
            if (existingUser) {

                message.textContent =
                    "Email already registered.";

                return;
            }


            
            const newUser = {

                name: name,

                email: email,

                password: password

            };


          
            return fetch("http://localhost:3000/users", {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(newUser)

            });

        })

        .then(function(response) {

           
            if (!response) {
                return;
            }

            return response.json();

        })

        .then(function(data) {

          
            if (data) {

                message.textContent =
                    "Account created successfully!";

               
                registerForm.reset();

                
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