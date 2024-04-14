var recipes;
var categories;
$(document).ready(function () {
    try {

        // CHECK THE USER ID AND ROLE
        var category = sessionStorage.getItem("category");
        var list = sessionStorage.getItem("list");
        if (category == 'undefined' || category == null || category == undefined || list == 'undefined' || list == null || list == undefined) {
            window.location.href = "../index.html";
        } else {
            $("#title").append(`<h1>` + sessionStorage.getItem("list") + ` Recipes` + `</h1>`);
            ajax("/GetRecipeList","get",{category: category, list: list }, function showRecipe(data) {
                recipes = JSON.parse(data);
                console.log(recipes);
                // APPEND THE RECIPE LIST DATA INTO THE DIV
                for (var i = 0; i < recipes.length; i++) {
                    var code = `<div class="col-12 col-sm-6 col-lg-3 res" id="box">
                    <div class="single-best-receipe-area mb-30">
                    <a href="#" onclick="view(` + recipes[i].recipe_id + `)">
                        <div class="recipe-img" id="recipe-img`+ i + `"></div>
                        <div class="receipe-content">
                                <h5>` + recipes[i].title + `</h5>
                            </a>
                            <div class="ratings">`;

                    for (var j = 0; j < 5; j++) {
                        if (j < recipes[i].rating) {
                            code += `<i class="fa fa-star" id="star" aria-hidden="true"></i>`;
                        } else {
                            code += `<i class="fa fa-star-o" id="star" aria-hidden="true"></i>`;
                        }
                    }
                    code += "<span title='Rating Count' style='color: black;'> ( " + recipes[i].rating_count + ` ) </span><button class="delete" onclick="deleteRecipe(` + recipes[i].recipe_id + `)"> <i class="fas fa-trash"></i> </button><br></div>
                        </div>
                    </div>
                </div>`;
                    $("#recipes").append(code);
                    $("#recipe-img" + i).css({ "background-image": "url(" + recipes[i].img + ")" })
                    if (sessionStorage.getItem("role") == "user") {
                        $(".delete").hide();
                    }
                    console.log("Recipe_id :::" + recipes[i].recipe_id + " Rating ::: " + recipes[i].rating);
                }

            })

        }
    } catch {
        console.log("Error on load recipes");
    }

});

// SEARCH BAR FUNCTION
function search() {
    try {
        let filter = $("#search").val().toUpperCase();
        let item = $($('.res'));
        let l = $("h5");
        for (var i = 0; i <= l.length; i++) {
            let a = $(item[i]).find('h5')[0];
            let value = a.innerHTML || a.innerText || a.textContent;
            if (value.toUpperCase().indexOf(filter) > -1) {
                $(item[i]).show()
            } else {
                $(item[i]).hide()
            }
        }
    } catch {
        console.log("Error on searching recipes")
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

            });
        });
    } catch {
        console.log("Error on delete Recipe")
    }
}


// FUNCTION TO GET RECIPE LIST

function recipeList(list, category) {
    try {
        sessionStorage.setItem("category", category);
        sessionStorage.setItem("list", list);
        location.reload();
    } catch {
        console.log("Error on redirect to recipe list page")
    }
}


