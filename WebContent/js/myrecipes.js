
$(document).ready(function () {
    try {
        ajax("/User","get",{ method: "myRecipes", user_id: sessionStorage.getItem("User_id") }, function (data, result) {
            console.log("Data saved \nResponse : " + result);
            //CALL GETDATA FUNCTION TO GET TABLE DATA FROM BACKEND 
            dataTable(data);
        });
    } catch {
        console.log("Error on user validation");
    }

});

function dataTable(data) {

    try {
        //PARSE THE STRING VALUE INTO ARRAY
        var formData = JSON.parse(data);

        // DATA TABLE COLUMNS AND DATA MAPING
        var columns = [
            {
                "render": function (data, type, JsonResultRow, meta) {
                    return '<img id="table-img" src="' + JsonResultRow.img + '">';
                }, title: "image"
            },
            {
                "render": function (data, type, JsonResultRow, meta) {
                    return `<a href="#" id="name" onclick="view(` + JsonResultRow.recipe_id + `)">` + JsonResultRow.title + `</a>`;
                }, title: "Title"
            },
            { data: "category", title: "Category" },
            { data: "cuisine", title: "Cuisine" },
            { data: "prepare_time", title: "Prepare Time" },
            { data: "cooking_time", title: "Cooking Time" },
            { data: "total_time", title: "Total Time" },
            { data: "yield", title: "Yield" },
            { data: "about", title: "About" },
            {
                data: "ingredients", title: "Ingredients"
            },
            { data: "instructions", title: "Instructions" },
            {
                mRender: function (data, type, row) {
                    return `<button class="table-edit" id="button" onclick="edit(` + row.recipe_id + `)">EDIT</button><br>
                <button class="table-delete" id="button" onclick="deleteRecipe(` + row.recipe_id + `)">DELETE</button><br>
                <button class="table-view" id="button" onclick="view(` + row.recipe_id + `)">View</button>`
                }, title: "Action"
            }
        ];


        //INSERT THE DATA INTO THE TABLE
        new DataTable("#myrecipe", {
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
            ordering: true,
            columnDefs: [{
                targets: [8, 9, 10],
                createdCell: function (cell) {
                    var rowCell = $(cell);
                    $(cell).contents().wrapAll("<div class='content'></div>");
                    var cellContent = rowCell.find(".content");

                    $(cell).append($("<a id='readmore'>Read more</a>"));
                    btn = $(cell).find("a");

                    cellContent.css({
                        "height": "100px",
                        "overflow": "hidden"
                    })
                    rowCell.data("isLess", true);

                    btn.click(function () {
                        var isLess = rowCell.data("isLess");
                        cellContent.css("height", isLess ? "auto" : "50px")
                        $(this).text(isLess ? "Read less" : "Read more")
                        rowCell.data("isLess", !isLess)
                    })
                }
            },
            {
                "targets": [9, 10], // The index of the column containing array data
                "render": function (data, type, row) {
                    // Split the data using the separator (| in this case) to get the array elements
                    const arrayData = data.split(',');

                    // Iterate through the array and build the content with line breaks
                    let content = '';
                    arrayData.forEach(value => {
                        content += value.replace("[", "").replace("]", "").replace('"', "").replace('"', "") + '<br>';
                    });

                    // Return the formatted content
                    return content;
                }
            }

            ]
        });
    } catch {
        console.log("Error on dataTable function")
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


// EDIT THE RECIPE DETAILS 

function edit(id) {
    try {
        sessionStorage.setItem("edit_recipe_id", id);
        window.location.assign("updateform.html");
    } catch {
        console.log("Error on redirect to edit form page");
    }
}

// DELETE THE RECIPES

function deleteRecipe(id) {
    try {
        confirmDelete(function () {
            ajax("/Recipe","get",{ method: "deleteRecipe", recipe_id: id }, function (data, result) {
                console.log("Data saved \nResponse : " + result);
                var response = JSON.parse(data);
                if (response.status == "true") {
                    console.log("Data saved \nResponse : " + result + "\nData" + data);
                    location.reload();
                } else {
                    alert("Something went Wrong");
                }

            });
        });
    } catch {
        console.log("Error on delete recipes");
    }
}
