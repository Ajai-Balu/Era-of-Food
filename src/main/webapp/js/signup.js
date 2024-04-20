var email_verify = false;
var name_verify = false;
var pass_verify = false;
var new_pass_verify = false;
var response, age, gender, phoneNum, email, likes, pass, conpass, Name;
var validName = /^[a-zA-Z ]*$/;
var validemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var passValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
$(document).ready(function () {
    try {

        // NAME VALIDATION
        $("#name").blur(function () {
            Name = $(this).val().trim();
            name_verify = false;
            if (Name.length == 0) {
                $('.name-msg').addClass('invalid-msg').html('Name &nbsp;is required');
                $(this).addClass('invalid-input').removeClass('valid-input');
            } else if (!validName.test(Name)) {
                $('.name-msg').addClass('invalid-msg').html('Name &nbsp;only characters are allowed');
                $(this).addClass('invalid-input').removeClass('valid-input');
            } else {
                name_verify = true;
                $('.name-msg').empty();
                $(this).addClass('valid-input').removeClass('invalid-input');
            }
        });

        // AGE VALIDATION
        $("#age").blur(function () {
            age = $(this).val().trim();
            if (age.length == 0) {
                $('.age-msg').addClass('invalid-msg').html('Age &nbsp;is Required');
                $(this).addClass('invalid-input').removeClass('valid-input');
            } else if (age <= 18) {
                $('.age-msg').addClass('invalid-msg').html('Age &nbsp;Should Be Above 18');
                $(this).addClass('invalid-input').removeClass('valid-input');
            } else {
                $('.age-msg').empty();
                $(this).addClass('valid-input').removeClass('invalid-input');
            }
        });

        // EMAIL VALIDATION
        $("#email").blur(function () {
            email = $(this).val().trim();
            email_verify = false;
            if (email.length == 0) {
                $(".email-msg").addClass("invalid-msg").html("Email &nbsp;is Required");
                $(this).addClass("invalid-input").removeClass("valid-input");
            } else if (!validemail.test(email)) {
                $(".email-msg").addClass("invalid-msg").html("Email &nbsp;Invalid");
                $(this).addClass("invalid-input").removeClass("valid-input");
            } else {
                $(".email-msg").empty();
                email_verify = true;
                $(this).addClass("valid-input").removeClass("invalid-input");
            }
        });

        // PHONE NUMBER VALIDATION
        $("#phone").blur(function () {
            phone = $(this).val().trim();
            if (phone.length == 0) {
                $('.phone-msg').addClass('invalid-msg').html('Phone Number &nbsp;is Required');
                $(this).addClass('invalid-input').removeClass('valid-input');
            } else if (phone.length < 10 || phone.length > 10) {
                $('.phone-msg').addClass('invalid-msg').html('Phone Number &nbsp;Invalid');
                $(this).addClass('invalid-input').removeClass('valid-input');
            } else {
                $('.phone-msg').empty();
                $(this).addClass('valid-input').removeClass('invalid-input');
            }
        });

        // PASSWORD VALIDATION
        $("#pass").on('input',function () {
            pass = $(this).val().trim();
            pass_verify = false;
            if (pass.length == 0) {
                $('.pass-msg').addClass('invalid-msg').html('Password &nbsp;is Required');
                $(this).addClass('invalid-input').removeClass('valid-input');
            } else if (pass.length < 8) {
                $('.pass-msg').addClass('invalid-msg').html("Password &nbsp;Invalid (min : 8 character)");
                $(this).addClass('invalid-input').removeClass('valid-input');
            }else if(!passValid.test(pass)){
                $('.pass-msg').addClass('invalid-msg').html("Password &nbsp;<small>( Must Contain Number,Specil Char,Capital Letter and Small Letter )<small>");
                $(this).addClass('invalid-input').removeClass('valid-input');
            }else {
                $('.pass-msg').empty();
                $(this).addClass('valid-input').removeClass('invalid-input');
                pass_verify = true;
            }
        });

        // NEW PASSWORD VALIDATION 
        $("#newpass").blur(function () {
            pass = $(this).val().trim();
            new_pass_verify = false;
            if (pass.length == 0) {
                $('.newpass-msg').addClass('invalid-msg').html('New Password &nbsp;is Required');
                $(this).addClass('invalid-input').removeClass('valid-input');
            } else if (pass.length < 8) {
                $('.newpass-msg').addClass('invalid-msg').html("New Password &nbsp;Invalid (min : 8 character)");
                $(this).addClass('invalid-input').removeClass('valid-input');
            }else if(!passValid.test(pass)){
                $('.newpass-msg').addClass('invalid-msg').html("New Password &nbsp;<small>( Must Contain Number,Specil Char,Capital Letter and Small Letter )<small>");
                $(this).addClass('invalid-input').removeClass('valid-input');
            } else {
                new_pass_verify = true;
                $('.newpass-msg').empty();
                $(this).addClass('valid-input').removeClass('invalid-input');
            }
        });


        // CONFIRM PASSWORD VALIDATION 

        $("#conpass").on('keyup', function () {
            password = $("#pass").val().trim();
            confirmPassword = $("#conpass").val().trim();
            if (confirmPassword.length == 0) {
                $('.conpass-msg').addClass('invalid-msg').html('Confirm Password &nbsp;is Required');
                $(this).addClass('invalid-input').removeClass('valid-input');
            } else if (password != confirmPassword) {
                $('.conpass-msg').addClass('invalid-msg').html("Confirm Password &nbsp;Doesn't Match");
                $(this).addClass('invalid-input').removeClass('valid-input');
            } else {
                $('.conpass-msg').empty();
                $(this).addClass('valid-input').removeClass('invalid-input');
            }
        });

        // CONFIRM NEW PASSWORD VALIDATION

        $("#connewpass").on('keyup', function () {
            password = $("#newpass").val().trim();
            confirmPassword = $("#connewpass").val().trim();
            if (confirmPassword.length == 0) {
                $('.connewpass-msg').addClass('invalid-msg').html('Confirm New Password &nbsp;is Required');
                $(this).addClass('invalid-input').removeClass('valid-input');
            } else if (password != confirmPassword) {
                $('.connewpass-msg').addClass('invalid-msg').html("Confirm New Password &nbsp;Doesn't Match");
                $(this).addClass('invalid-input').removeClass('valid-input');
            } else {
                $('.connewpass-msg').empty();
                $(this).addClass('valid-input').removeClass('invalid-input');
            }
        });
    } catch {
        console.log("Error on data validation")
    }

    // SUBMIT BUTTON CLICK FUNCTION
    $("#submit").click(function (e) {
        Name = $("#name").val().trim();
        age = $("#age").val().trim();
        gender = $('input[name="gender"]:checked').val().trim();
        phoneNum = $("#phone").val().trim();
        email = $("#email").val().trim();
        likes = $("input[name='likes']:checked").val().trim();
        pass = $("#pass").val().trim();
        conpass = $("#conpass").val().trim();
        var userdataobj = null;
        try {
            // VALIDATION --------------
            if (
                Name.length != 0 &&
                age >= 18 &&
                gender != null &&
                email.length != 0 &&
                phoneNum.length == 10 &&
                likes != null &&
                pass.length >= 8 &&
                pass == conpass &&
                name_verify == true &&
                email_verify == true &&
                pass_verify == true
            ) {
                userdataobj = {
                    Name: Name,
                    Age: age,
                    Gender: gender,
                    Email: email,
                    PhoneNumber: phoneNum,
                    Likes: likes,
                    Pass: btoa(pass)
                };
            } else {
                alert("Enter valid input");
                console.log("Enter valid input");
            }

            if (userdataobj != null) {
                ajax("/SignUp","post",userdataobj, function (data, result) {
                    console.log("Data saved \nResponse : " + result + "\nData" + data);
                    response = JSON.parse(data);
                    if (response.status == "true") {
                        console.log("Data saved \nResponse : " + response.status);
                        window.location.assign("login.html");
                    } else {
                        alert("Response : " + response.status);
                    }
                });
            }
            e.preventDefault();
        } catch {
            e.preventDefault();
            alert("Error on Storing data");
            console.log("Error on data storing");
        }
    });

    // UPADTE BUTTON CLICK FUNCTION
    $("#update").click(function (e) {
        Name = $("#name").val().trim();
        age = $("#age").val().trim();
        gender = $('input[name="gender"]:checked').val().trim();
        phoneNum = $("#phone").val().trim();
        email = $("#email").val().trim();
        likes = $("input[name='likes']:checked").val().trim();
        pass = $("#pass").val().trim();
        var newpass = $("#newpass").val().trim();
        conpass = $("#conpass").val().trim();
        var newconpass = $("#connewpass").val().trim();
        var userdataobj = null;
        try {
            // VALIDATION --------------
            if (
                Name.length != 0 &&
                age >= 18 &&
                gender != null &&
                email.length != 0 &&
                phoneNum.length == 10 &&
                likes != null &&
                pass.length >= 8 &&
                name_verify == true &&
                email_verify == true &&
                pass_verify == true
            ) {
                if (newpass.length != 0) {
                    if (newpass.length >= 8 &&
                        newpass == newconpass &&
                        new_pass_verify == true
                    ) {
                        userdataobj = {
                            Name: Name,
                            Age: age,
                            Gender: gender,
                            Email: email,
                            PhoneNumber: phoneNum,
                            Likes: likes,
                            Pass: btoa(pass),
                            NewPass: btoa(newpass),
                            UserID: sessionStorage.getItem("editUser"),
                            NewPass_avl: "true"
                        };
                    } else {
                        $('.newconpass-msg').addClass('invalid-msg').html("Confirm Password &nbsp;doesn't match");
                        $("#newconpass").addClass('invalid-input').removeClass('valid-input');
                        alert("Password Doesn't match");
                    }

                } else {
                    userdataobj = {
                        Name: Name,
                        Age: age,
                        Gender: gender,
                        Email: email,
                        PhoneNumber: phoneNum,
                        Likes: likes,
                        Pass: btoa(pass),
                        UserID: sessionStorage.getItem("editUser"),
                        NewPass_avl: "false"
                    };
                }
            } else {
                alert("Enter valid input");
                console.log("Enter valid input");
            }

            if (userdataobj != null) {
                ajax("/UpdateUser","post",userdataobj, function (data, result) {
                    console.log("Data saved \nResponse : " + result + "\nData" + data);
                    response = JSON.parse(data);
                    if (response.status == "true") {
                        console.log("Data saved \nResponse : " + response.status);
                        sessionStorage.removeItem("editUser");
                        sessionStorage.setItem("name", Name);
                        window.location.assign("profile.html");
                    } else if (response.status == "Incorrect password") {
                        alert("Response : " + response.status);
                        $('.pass-msg').addClass('invalid-msg').html("Password &nbsp;Incorrect");
                        $('#pass').addClass('invalid-input').removeClass('valid-input');
                    } else {
                        alert("Response : " + response.status);
                    }
                });
            }
            e.preventDefault();
        } catch {
            e.preventDefault();
            alert("Error on Storing data");
            console.log("Error on data storing");
        }
    });
});

// LOAD THE USER DETAILS TO FORM TO EDIT AND UPDATE
function loadData() {
    try {
        ajax("/User","get",{ method: "getUserDetails", user_id: sessionStorage.getItem("editUser") }, function (response, result) {
            var data = JSON.parse(response);
            $("#name").val(data.name);
            $("#age").val(data.age);
            for (i of $('input[name="gender"]')) {
                if (i.value == data.gender) {
                    $(i).prop("checked", true);
                }
            }
            $("#phone").val(data.phone_number);
            $("#email").val(data.email);
            for (i of $('input[name="likes"]')) {
                if (i.value == data.likes) {
                    $(i).prop("checked", true);
                }
            }
        })
    } catch {
        console.log("Error on load user data into the form")
    }
}


// FUNCTION TO GET RECIPE LIST
function recipeList(list, category) {
    try {
        sessionStorage.setItem("category", category);
        sessionStorage.setItem("list", list);
        window.location.href = "recipeList.html";
    } catch {
        console.log("Error on redirect to recipe list page")
    }
}




// SIGNUP FORM CONTENT
function signup() {
    try {
        var code = getcode();
        $("body").append(code);
        $("#title").append("SignUp");
        $("#newpassfield").hide();
        $("#newconpassfield").hide();
        $("#update").hide();
    } catch {
        console.log("Error on load sign up form")
    }
}

// USER DETAILS UPADTE FORM
function updateuser() {
    try {
        email_verify = true;
        name_verify = true;
        var code = getcode();
        $("body").append(code);
        $("#submit").attr("type", "button");
        $("#title").append("Update Form");
        $("#submit").hide();
        $("#login").hide();
        $("#oldconpass").hide();
        $(".login-box").css({ "top": "65%" });
        loadData();
    } catch {
        console.log("Error on update user form")
    }
}

// SIGNUP HTML PAGE
function getcode() {
    return `<div class="login-box">
    <h2 id="title"></h2>
    <form>
        <div class="user-box" id = "box">
            <i class="fas fa-user"></i>
            <input type="text" id="name" name="user" required>
            <label>Name<span class="required">*</span></label>
            <label class="name-msg"></label>
        </div>
        <div class="user-box">
            <i class="fas fa-child"></i><i class="fas fa-user-tie"></i>
            <input type="number" id="age" class="age" name="user" required>
            <label>Age<span class="required">*</span></label>
            <label class="age-msg"></label>
        </div>
        <div class="">
            <i class="fas fa-venus-mars"></i>
            <label>Gender<span class="required">*</span> :&nbsp;</label>
            <input type="radio" id="male" name="gender" value="male" required>
            <label for="male"><i class="fas fa-male"></i> Male &nbsp; &nbsp;</label>
            <input type="radio" id="female" name="gender" value="female">
            <label for="female"><i class="fas fa-female"></i> Female</label>

        </div><br>
        <div class="user-box">
            <i class="fas fa-paper-plane"></i>
            <input type="text" id="email" name="user" required>
            <label>Email<span class="required">*</span></label>
            <label class="email-msg"></label>
        </div>
        <div class="">
            <i class="fas fa-heart" style="color: #f03838;"></i>
            <label>Likes<span class="required">*</span> :&nbsp; &nbsp;</label>
            <input type="radio" id="veg" name="likes" value="Veg" required>
            <label for="veg"><i class="fas fa-carrot"></i> Veg &nbsp;&nbsp; &nbsp;</label>
            <input type="radio" id="nonveg" name="likes" value="NonVeg">
            <label for="nonveg"><i class="fas fa-drumstick-bite"></i> Non-Veg</label>
        </div><br>
        <div class="user-box">
            <i class="fas fa-phone-alt"></i>
            <input type="number" id="phone" name="user" required>
            <label>Phone Number<span class="required">*</span></label>
            <label class="phone-msg"></label>
        </div>
        <div class="user-box">
            <i class="fas fa-lock" aria-hidden="true"></i>
            <input type="password" id="pass" name="password" required>
            <label>Password<span class="required">*</span></label>
            <label class="pass-msg"></label>
        </div>
        <div class="user-box" id="newpassfield">
            <i class="fas fa-lock" aria-hidden="true"></i>
            <input type="password" id="newpass" name="password" required>
            <label>New Password</label>
            <label class="newpass-msg"></label>
        </div>
        <div class="user-box" id="newconpassfield">
            <i class="fas fa-lock" aria-hidden="true"></i>
            <input type="password" id="connewpass" name="password" required>
            <label>Confirm New Password</label>
            <label class="connewpass-msg"></label>
        </div>
        <div class="user-box" id="oldconpass">
            <i class="fas fa-lock" aria-hidden="true"></i>
            <input type="password" id="conpass" name="password" required>
            <label>Confirm Password<span class="required">*</span></label>
            <label class="conpass-msg"></label>
        </div>


        <button id="submit" type="submit">
            <span></span>
            <span></span>
            <span></span>
            <span></span>

            Submit
        </button>
        <button id="update" type="submit">
            <span></span>
            <span></span>
            <span></span>
            <span></span>

            Update
        </button>
        <a href="login.html" id="login" class="login-bt">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Login
        </a>
    </form>
</div>` ;
}