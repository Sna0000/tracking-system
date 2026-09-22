const loginForm = document.getElementById("loginForm");

const errorMsg = document.getElementById("errorMsg");


loginForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const enteredEmail =
        document.getElementById("email").value;

    const enteredPassword =
        document.getElementById("password").value;


  
    fetch("http://localhost:3000/users")

        .then(function(response) {

            return response.json();

        })

        .then(function(users) {

         
            const matchedUser = users.find(function(user) {

                return user.email === enteredEmail &&
                       user.password === enteredPassword;

            });


            if (matchedUser) {

              
                localStorage.setItem(
                    "sctts_user",
                    matchedUser.name
                );

       
                window.location.href = "dashboard.html";

            }

        
            else {

                errorMsg.textContent =
                    "Invalid email or password.";

            }

        })

        .catch(function(error) {

            console.log(error);

            errorMsg.textContent =
                "Server error. Please start JSON Server.";

        });

});