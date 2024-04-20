var response;
$(document).ready(function () {
    // PASSWORD VALIDATION
    $("#pass").blur(function () {
        var pass = $(this).val().trim();
        if (pass.length == 0) {
            $('.pass-msg').addClass('invalid-msg').text('Password is required');
            $(this).addClass('invalid-input').removeClass('valid-input');
        } else if (pass.length < 8) {
            $('.pass-msg').addClass('invalid-msg').text("Password Invalid (min : 8 character)");
            $(this).addClass('invalid-input').removeClass('valid-input');
        } else {
            $('.pass-msg').empty();
            $(this).addClass('valid-input').removeClass('invalid-input');
        }
    });

    // E-MAIL VALIDATION
    $("#email").blur(function () {
        var email = $(this).val().trim();
        var validemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email.length == 0) {
            $(".email-msg").addClass("invalid-msg").text("Email  is required");
            $(this).addClass("invalid-input").removeClass("valid-input");
            email_verify = false;
        } else if (!validemail.test(email)) {
            email_verify = false;
            $(".email-msg").addClass("invalid-msg").text("Email  Invalid");
            $(this).addClass("invalid-input").removeClass("valid-input");
        } else {
            $(".email-msg").empty();
            email_verify = true;
            $(this).addClass("valid-input").removeClass("invalid-input");
        }
    });

    // SUBMIT BUTTON CLICK FUNCTION 
    $("#submit").click(function (e) {
        var email = $("#email").val().trim();
        var pass = $("#pass").val().trim();
        var userdataobj = null;
        try {
            // VALIDATION --------------
            if (
                email.length != 0 &&
                pass.length >= 8

            ) {
                userdataobj = {
                    Email: email,
                    Pass: btoa(pass)
                };
                console.log(userdataobj);
            } else {
                alert("Enter valid input");
                console.log("Enter valid input");
            }
            if (userdataobj != null) {
                ajax("/Login","post",userdataobj,function (data, result) {
                        console.log("Data saved \nResponse : " + result + "\nData" + data);
                        response = JSON.parse(data);
                        if (response.status == "true") {
                            // SET THE VALUE TO SESSION STORAGE
                            sessionStorage.setItem("User_id", response.User_id);
                            sessionStorage.setItem("role", response.role);
                            sessionStorage.setItem("name", response.name);
                            sessionStorage.setItem("login","true");
                            // CHECK THE USER ROLE
                            if (response.role == "user") {
                                window.location.assign("../index.html");
                            } else if (response.role == "admin") {
                                window.location.assign("../admin/adminIndex.html");
                            }

                        } else {
                            alert("Response: " + response.status);
                        }

                    }
                );
            }
            e.preventDefault();
        } catch {
            e.preventDefault();
            alert("Error on Storing data");
            console.log("Error on data storing");
        }
    });
});
