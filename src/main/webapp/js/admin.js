
$(document).ready(function () {
    try {
        ajax("/GetDetails","get",{ method: "getcounts" }, function (data, result) {
            var response = JSON.parse(data);
            $(".noOfUsers").append(response.user_count);
            $(".noOfRecipes").append(response.recipe_count);
        })
        ajax("/GetDetails","get",{ method: "getTopRecipes" }, function (data, result) {
            console.log("Data saved \nResponse : " + result + "\nData" + data);
            showRecipe(data);
        });
    } catch {
        console.log("Error on user validation or ajax call function")
    }
});

// FUNCTION TO LOAD THE RECIPE DIV

function showRecipe(data) {
    try {
        var recipes = JSON.parse(data);
        console.log(recipes);
        for (var i = 0; i < recipes.length; i++) {
            var code = `<div class="col-12 col-sm-6 col-lg-3" id="box">
        <div class="single-best-receipe-area mb-30">
        <a href="#" onclick="view(` + recipes[i].recipe_id + `)">
            <div class="recipe-img" id="recipe-img`+ i + `"></div>
            <div class="receipe-content">
                    <h5>` + recipes[i].title + `</h5>
                </a>
                <div class="ratings">`;

            for (var j = 0; j < 5; j++) {
                if (j < recipes[i].rating) {
                    code += `<i class="fa fa-star" aria-hidden="true"></i>`;
                } else {
                    code += `<i class="fa fa-star-o" aria-hidden="true"></i>`;
                }
            }
            code += "<span title='Rating Count' style='color: black;'> ( " + recipes[i].rating_count + ` ) </span><button class="delete" onclick="deleteRecipe(` + recipes[i].recipe_id + `)"> <i class="fas fa-trash" style=" padding: 6px; color: white; font-size: 15px;"></i> </button><br></div>
                        </div>
                    </div>
                </div>`;
            $("#recipes").append(code);
            $("#recipe-img" + i).css({ "background-image": "url(" + recipes[i].img + ")" })

            console.log("Recipe_id :::" + recipes[i].recipe_id + " Rating ::: " + recipes[i].rating);
        }
    } catch {
        console.log("Error occur on load top recipe data");
    }
}

// FUNCTION TO GET RECIPE LIST

function recipeList(list, category) {
    try {
        sessionStorage.setItem("category", category);
        sessionStorage.setItem("list", list);
        window.location.href = "adminRecipeList.html";
    } catch {
        console.log("Error on recipelist function");
    }
}

// FUNCTION TO DELETE THE RECIPE

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

            }
            );
        });
    } catch {
        console.log("Error on delete recipe function");
    }
}

