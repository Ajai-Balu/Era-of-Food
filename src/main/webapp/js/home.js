
$(document).ready(function () {
    sessionStorage.setItem("list", "All");

    try {
        // DISPLAY SWAL CONTENT ON DASHBOARD
        if (sessionStorage.getItem("login") == "true") {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            Toast.fire({
                icon: 'success',
                title: 'Signed in successfully'
            })
            sessionStorage.removeItem("login");
        }


        try {

            // CHECK THE USER ID 
            var value = sessionStorage.getItem("User_id");
            if (value == 'undefined' || value == null || value == undefined) {
                window.location.href = "views/login.html";
            } else {
                ajax("/GetDetails","get",{ method: "getTopRecipes" }, function (data, result) {
                    console.log("Data saved \nResponse : " + result + "\nData" + data);
                    showRecipe(data);
                });
            }
        } catch {
            console.log("Error on showing top recipes")
        }

        // MOBILE MENU
        var menu = $('ul#navigation');
        if (menu.length) {
            menu.slicknav({
                prependTo: ".mobile_menu",
                closedSymbol: '+',
                openedSymbol: '-'
            });
        };
        if (sessionStorage.getItem("name").length < 6) {
            $("#id-name").append("Hi " + sessionStorage.getItem("name") + " ");
        } else {
            $("#id-name").append("Hi " + sessionStorage.getItem("name").slice(0, 5) + "... ");
        }



    } catch {
        console.log("error on home js file")
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
            code += " <span title='Rating Count' style='color: black;'>( " + recipes[i].rating_count + ` ) </span></div>
            </div>
        </div>
    </div>`;
            $("#recipes").append(code);
            $("#recipe-img" + i).css({ "background-image": "url(" + recipes[i].img + ")" })
            console.log("Recipe_id :::" + recipes[i].recipe_id + " Rating ::: " + recipes[i].rating);
        }
    } catch {
        console.log("Error occur on load top recipe data")
    }

}


// FUNCTION REDIRECT TO VIEW THE RECIPE PAGE

function view(id) {
    try {
        sessionStorage.setItem("recipe_id", id);
        window.location.href = "views/recipePage.html";
    } catch {
        console.log("Error on redirect to recipe page")
    }
}


// FUNCTION TO LOGOUT AND IT CLEARS SESSION STORAGE

function logout() {
    try {
        sessionStorage.clear();
        window.location.href = "views/login.html";
    } catch {
        console.log("Error on logout function")
    }
}

// FUNCTION TO GET RECIPE LIST

function recipeList(list, category) {
    try {
        sessionStorage.setItem("category", category);
        sessionStorage.setItem("list", list);
        window.location.href = "views/recipeList.html";
    } catch {
        console.log("Error on redirect to recipe list page")
    }
}

