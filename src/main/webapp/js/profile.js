$(document).ready(function () {
    try {
        var id = sessionStorage.getItem("User_id");
        ajax("/User","get",{ method: "getUserDetails", user_id: id }, function (data, result) {
            console.log("Data saved \nResponse : " + result);
            loadUserData(data);
        });

        // EDIT BUTTON FUNCTION TO REDIRECT TO UPDATE FORM
        $("#edit").click(function () {
            sessionStorage.setItem("editUser", id);
            window.location.assign("updateUser.html");
        });

        if (sessionStorage.getItem("role") == "admin") {
            $("#total").empty();
        }
    } catch {
        console.log("Error on document ready function")
    }
});

// LOAD THE USER DETAILS INTO THE FORM
function loadUserData(data) {
    try {
        var response = JSON.parse(data);
        $("#name").append(response.name);
        $("#age").append(response.age);
        $("#phone").append(response.phone_number);
        $("#email").append(response.email);
        $("#totalrecipes").append(response.count);
        $("#likes").append(response.likes);
        $("#gender").append(response.gender);
    } catch {
        console.log("Error on load User data")
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

