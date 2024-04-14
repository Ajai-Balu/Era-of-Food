$(document).ready(function () {
    var id = sessionStorage.getItem("User_id");
    var role = sessionStorage.getItem("role");
    if ((id == 'undefined' || id == null || id == undefined) && (role == 'undefined' || role == null || role == undefined)) {
        window.location.href = "../views/login.html";
    }else if (role == "user") {// CHECK THE USER ROLE 
        $('header').append(`<div class="header-area ">
            <div id="sticky-header" class="main-header-area ">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-xl-3 col-lg-2">
                            <div class="logo">
                                <a href="../index.html">
                                    <img class="logo-pic" src="../img/logo.png" alt="">
                                </a>
                            </div>
                        </div>
                        <div class="col-xl-9 col-lg-6">
                            <div class="main-menu   d-none d-lg-block">
                                <nav>
                                    <ul id="navigation">
                                        <li><a href="../index.html">home</a></li>
                                        <li><a href="form.html">Add</a></li>
                                        <li><a href="#">Category <i class="ti-angle-down"></i></a>
                                            <ul class="submenu">
                                                <li><a href="#" onclick="recipeList('Veg','Category')">Veg</a></li>
                                                <li><a href="#" onclick="recipeList('Non Veg','Category')">Non Veg</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="#">Recipes <i class="ti-angle-down"></i></a>
                                            <ul class="submenu">
                                                <li><a href="#" onclick="recipeList('All','Recipes')">All</a></li>
                                                <li><a href="#" onclick="recipeList('Main Dish','Recipes')">Main Dish</a></li>
                                                <li><a href="#" onclick="recipeList('Side Dish','Recipes')">Side Dish</a></li>
                                                <li><a href="#" onclick="recipeList('Soup','Recipes')">Soup</a></li>
                                                <li><a href="#" onclick="recipeList('Salad','Recipes')">Salad</a></li>
                                                <li><a href="#" onclick="recipeList('Dessert','Recipes')">Dessert</a></li>
                                                <li><a href="#" onclick="recipeList('Drinks','Recipes')">Drinks</a></li>
                                                <li><a href="#" onclick="recipeList('Snacks','Recipes')">Snacks</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="#">Cuisine <i class="ti-angle-down"></i></a>
                                            <ul class="submenu">
                                                <li><a href="#" onclick="recipeList('All','Cuisine')">All</a></li>
                                                <li><a href="#" onclick="recipeList('Indian','Cuisine')">Indian</a></li>
                                                <li><a href="#" onclick="recipeList('Continental','Cuisine')">Continental</a></li>
                                                <li><a href="#" onclick="recipeList('Italian','Cuisine')">Italian</a></li>
                                                <li><a href="#" onclick="recipeList('Chinese','Cuisine')">Chinese</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="#"><span id="id-name">Profile </span><i class="ti-angle-down"></i></a>
                                            <ul class="submenu">
                                                <li><a href="profile.html">Profile</a></li>
                                                <li><a href="myRecipes.html">My Recipes</a></li>
                                                <li><a href="#" onclick="logout()">Logout</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="mobile_menu d-block d-lg-none"></div>
                        </div>
                    </div>

                </div>
            </div>
        </div>`);
    } else {
        $('header').append(`<div class="header-area ">
        <div id="sticky-header" class="main-header-area ">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-xl-3 col-lg-2">
                        <div class="logo">
                            <a href="../admin/adminIndex.html">
                                <img class="logo-pic" src="../img/logo.png" alt="">
                            </a>
                        </div>
                    </div>
                    <div class="col-xl-9 col-lg-10">
                        <div class="main-menu   d-none d-lg-block">
                            <nav>
                                <ul id="navigation">
                                    <li><a href="../admin/adminIndex.html">home</a></li>
                                    <li><a href="../admin/user.html">Users</a></li>
                                    <li><a href="#">Category <i class="ti-angle-down"></i></a>
                                        <ul class="submenu">
                                            <li><a href="#" onclick="recipeList('Veg','Category')">Veg</a></li>
                                            <li><a href="#" onclick="recipeList('Non Veg','Category')">Non Veg</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li><a href="#">Recipes <i class="ti-angle-down"></i></a>
                                        <ul class="submenu">
                                            <li><a href="#" onclick="recipeList('All','Recipes')">All</a></li>
                                            <li><a href="#" onclick="recipeList('Main Dish','Recipes')">Main Dish</a></li>
                                            <li><a href="#" onclick="recipeList('Side Dish','Recipes')">Side Dish</a></li>
                                            <li><a href="#" onclick="recipeList('Soup','Recipes')">Soup</a></li>
                                            <li><a href="#" onclick="recipeList('Salad','Recipes')">Salad</a></li>
                                            <li><a href="#" onclick="recipeList('Dessert','Recipes')">Dessert</a></li>
                                            <li><a href="#" onclick="recipeList('Drinks','Recipes')">Drinks</a></li>
                                            <li><a href="#" onclick="recipeList('Snacks','Recipes')">Snacks</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="#">Cuisine <i class="ti-angle-down"></i></a>
                                        <ul class="submenu">
                                            <li><a href="#" onclick="recipeList('All','Cuisine')">All</a></li>
                                            <li><a href="#" onclick="recipeList('Indian','Cuisine')">Indian</a></li>
                                            <li><a href="#" onclick="recipeList('Continental','Cuisine')">Continental</a></li>
                                            <li><a href="#" onclick="recipeList('Italian','Cuisine')">Italian</a></li>
                                            <li><a href="#" onclick="recipeList('Chinese','Cuisine')">Chinese</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="../views/profile.html"><span id="id-name">Profile </span><i class="ti-angle-down"></i></a>
                                        <ul class="submenu">
                                            <li><a href="../views/profile.html">Profile</a></li>
                                            <li><a href="#" onclick="logout()">Logout</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mobile_menu d-block d-lg-none"></div>
                    </div>
                </div>

            </div>
        </div>
    </div>`)
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

    // CHECK THE USER NAME LENGTH TO DISPLAY ON NAV BAR
    if(sessionStorage.getItem("name").length<6){
        $("#id-name").html("Hi " + sessionStorage.getItem("name")+ " ");
    }else{
        $("#id-name").html("Hi " + sessionStorage.getItem("name").slice(0, 5)+"... ");
    }
});



// FUNCTION TO LOGOUT AND IT CLEARS SESSION STORAGE

function logout() {
    try {
        sessionStorage.clear();
        window.location.href = "../views/login.html";
    }catch{
        console.log("Error on logout");
    }
}

// FUNCTION REDIRECT TO VIEW THE RECIPE PAGE

function view(id) {
    try {
        sessionStorage.setItem("recipe_id", id);
        window.location.href = "../views/recipePage.html";
    } catch {
        console.log("Error on redirect to recipe page")
    }
}