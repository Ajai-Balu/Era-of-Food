
$(document).ready(function () {
    try {
        ajax("/GetDetails","get",{ method: "usersList" }, function (data, result) {
            console.log("Data saved \nResponse : " + result);
            //CALL GETDATA FUNCTION TO GET TABLE DATA FROM BACKEND 
            dataTable(data);
        }
        );
    } catch {
        console.log("Error on user validation")
    }

});

// LOAD THE USERS DETAILS INTO THE DATATABLE 
function dataTable(data) {
    try {
        //PARSE THE STRING VALUE INTO ARRAY
        var formData = JSON.parse(data);

        var columns = [
            { data: "user_id", title: "User_id" },
            { data: "name", title: "Name" },
            { data: "age", title: "Age" },
            { data: "email", title: "E-mail" },
            { data: "gender", title: "Gender" },
            { data: "phone_number", title: "Phone_number" },
            { data: "likes", title: "Users Likes" },
            { data: "count", title: "No Of Posts" },
            {
                mRender: function (data, type, row) {
                    return `<button class="table-delete" id="button" onclick="deleteUser(` + row.user_id + `)">DELETE</button><br>`
                }, title: "Action"
            }
        ];


        //INSERT THE DATA INTO THE TABLE
        new DataTable("#users", {
            lengthMenu: [
                [50, 100],
                [50, 100]
            ],
            data: formData,
            columns: columns,
            deferRender: true,
            autoWidth: true,
            responsive: true,
            lengthChange: true,
            ordering: true
        });
    } catch {
        console.log("Error on load user dataTable")
    }
}


// FUNCTION TO GET RECIPE LIST

function recipeList(list, category) {
    try {
        sessionStorage.setItem("category", category);
        sessionStorage.setItem("list", list);
        window.location.href = "adminRecipeList.html";
    } catch {
        console.log("Error on redirect to recipe list page")
    }
}

// DELETE THE USERS
function deleteUser(id) {
    try {
        confirmDelete(function () {
            ajax("/User","get",{ method: "deleteUser", user_id: id }, function (data, result) {
                console.log("Data saved \nResponse : " + result);
                var response = JSON.parse(data);
                if (response.status == "true") {
                    console.log("Data saved \nResponse : " + result + "\nData" + data);
                    location.reload();
                } else {
                    alert("Something went Wrong");
                }

            }
            );
        });
    } catch {
        console.log("Error on delete user")
    }
}

