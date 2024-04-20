let instraRow = [0];
let ingredRow = [0];
let instraCount = 1;
let ingredCount = 1;
let base64String = "";
var response;

var instructions, title, category, dish, cuisine, prepare, cooking, total, yield, about, ingredients, userID;

$(document).ready(function () {
    // MOBILE MENU
    var menu = $('ul#navigation');
    if (menu.length) {
        menu.slicknav({
            prependTo: ".mobile_menu",
            closedSymbol: '+',
            openedSymbol: '-'
        });
    };

    var id = sessionStorage.getItem("User_id");
    var role = sessionStorage.getItem("role");
    // CHECK THE USER ID
    if ((id == 'undefined' || id == null || id == undefined) && (role == 'undefined' || role == null || role == undefined) ) {
        window.location.href = "../views/login.html";
    }

    try {
        // TITLE VALIDATION
        $("#title").blur(function () {
            var name = $(this).val().trim();
            if (name.length == 0) {
                $('.title-msg').addClass('invalid-msg').html('Title is required');
                $(this).addClass('invalid-input').removeClass('valid-input');
            } else {
                $('.title-msg').empty();
                $(this).addClass('valid-input').removeClass('invalid-input');
            }
        });

        // YIELD VALIDATION
        $("#yield").blur(function () {
            var name = $(this).val().trim();
            if (name.length == 0) {
                $('.yield-msg').addClass('invalid-msg').html('Yield is required');
                $(this).addClass('invalid-input').removeClass('valid-input');
            } else {
                $('.yield-msg').empty();
                $(this).addClass('valid-input').removeClass('invalid-input');
            }
        });

        // DISH TYPE VALIDATION
        $("#d-type").blur(function () {
            var name = $(this).val().trim();
            if (name.length == 0) {
                $('.dish-msg').addClass('invalid-msg').html('Dish tipe is required');
                $(this).addClass('invalid-input').removeClass('valid-input');
            } else {
                $('.dish-msg').empty();
                $(this).addClass('valid-input').removeClass('invalid-input');
            }
        });


        // CUISINE TYPE VALIDATION
        $("#c-type").blur(function () {
            var name = $(this).val().trim();
            if (name.length == 0) {
                $('.cuisine-msg').addClass('invalid-msg').html('Cuisine type is required');
                $(this).addClass('invalid-input').removeClass('valid-input');
            } else {
                $('.cuisine-msg').empty();
                $(this).addClass('valid-input').removeClass('invalid-input');
            }
        });

        // PREPARATION TIME VALIDATION
        $("#prepare").blur(function () {
            var name = $(this).val().trim();
            if (name.length == 0) {
                $('.prepare-msg').addClass('invalid-msg').html('Prepare Time is required');
                $(this).addClass('invalid-input').removeClass('valid-input');
            } else {
                $('.prepare-msg').empty();
                $(this).addClass('valid-input').removeClass('invalid-input');
            }
        });

        // TOTAL TIME VALIDATION
        $("#total").blur(function () {
            var name = $(this).val().trim();
            if (name.length == 0) {
                $('.total-msg').addClass('invalid-msg').html('Total time is required');
                $(this).addClass('invalid-input').removeClass('valid-input');
            } else {
                $('.total-msg').empty();
                $(this).addClass('valid-input').removeClass('invalid-input');
            }
        });

        // ABOUT  VALIDATION
        $("#about").blur(function () {
            var name = $(this).val().trim();
            if (name.length == 0) {
                $('.about-msg').addClass('invalid-msg').html('About is required');
                $(this).addClass('invalid-input').removeClass('valid-input');
            } else {
                $('.about-msg').empty();
                $(this).addClass('valid-input').removeClass('invalid-input');
            }
        });


        // COOKING TIME VALIDATION
        $("#cooking").blur(function () {
            var name = $(this).val().trim();
            if (name.length == 0) {
                $('.cook-msg').addClass('invalid-msg').html('Cooking time is required');
                $(this).addClass('invalid-input').removeClass('valid-input');
            } else {
                $('.cook-msg').empty();
                $(this).addClass('valid-input').removeClass('invalid-input');
            }
        });

        // INGREDIENTS VALIDATION
        $(".ingred").blur(function () {
            var name = $(this).val().trim();
            if (name.length == 0) {
                $('.ingred-msg').addClass('invalid-msg').html('Ingredients is required');
                $(this).addClass('invalid-input').removeClass('valid-input');
            } else {
                $('.ingred-msg').empty();
                $(this).addClass('valid-input').removeClass('invalid-input');
            }
        });

        // INSTRUCTION VALIDATION
        $(".instra").blur(function () {
            var name = $(this).val().trim();
            if (name.length == 0) {
                $('.instruct-msg').addClass('invalid-msg').html('Instruction is required');
                $(this).addClass('invalid-input').removeClass('valid-input');
            } else {
                $('.instruct-msg').empty();
                $(this).addClass('valid-input').removeClass('invalid-input');
            }
        });

        // ADD INSTRUCTION 
        $("#addinstra").click(function (e) {
            add($(this).val());
            e.preventDefault();
        });

        // ADD INGREDIENTS
        $('#addingred').click(function (e) {
            add($(this).val());
            e.preventDefault();
        });

    } catch {
        console.log("Error on validation")
    }

    // SUBMIT BUTTON CLICK FUNCTION
    $("#submit").click(function (e) {
        instructions = getInstraData();
        title = $("#title").val();
        category = $('input[name="Category"]:checked').val();
        dish = $("#d-type").val();
        cuisine = $("#c-type").val();
        prepare = $("#prepare").val();
        cooking = $("#cooking").val();
        total = $("#total").val();
        yield = $("#yield").val();
        about = $("#about").val();
        ingredients = getIngredData();
        userID = sessionStorage.getItem("User_id");
        var userdataobj = null;
        try {
            // VALIDATION --------------
            if (
                title.length != 0 &&
                category != null &&
                dish.length != 0 &&
                cuisine.length != 0 &&
                prepare.length != 0 &&
                cooking.length != 0 &&
                total.length != 0 &&
                yield.length != 0 &&
                about.length != 0 &&
                ingredients.length != 0 &&
                instructions.length != 0 &&
                base64String.length != 0 &&
                userID.length != 0
            ) {
                userdataobj = {
                    Title: title,
                    UserID: userID,
                    Category: category,
                    Dish: dish,
                    Cuisine: cuisine,
                    Prepare: prepare,
                    Cooking: cooking,
                    Total: total,
                    Yield: yield,
                    About: about,
                    Ingredients: JSON.stringify(ingredients),
                    Instructions: JSON.stringify(instructions),
                    Img: base64String
                };
            } else {
                alert("Enter valid input");
                console.log("Enter valid input");
            }

            if (userdataobj != null) {
                ajax("/InsertRecipe","post",userdataobj, function (data, result) {
                    console.log("Data saved \nResponse : " + result + "\nData" + data);
                    response = JSON.parse(data);
                    if (response.status == "true") {
                        console.log("Data saved \nResponse : " + result + "\nData" + data);
                        window.location.assign("../views/myRecipes.html");
                    } else {
                        alert(response.status);
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


    // UPDATE BUTTON CLICK FUNCTION
    $("#update").click(function (e) {
        instructions = getInstraData();
        title = $("#title").val();
        category = $('input[name="Category"]:checked').val();
        dish = $("#d-type").val();
        cuisine = $("#c-type").val();
        prepare = $("#prepare").val();
        cooking = $("#cooking").val();
        total = $("#total").val();
        yield = $("#yield").val();
        about = $("#about").val();
        ingredients = getIngredData();
        userID = sessionStorage.getItem("User_id");
        var userdataobj = null;
        try {
            // VALIDATION --------------
            if (
                title.length != 0 &&
                category != null &&
                dish.length != 0 &&
                cuisine.length != 0 &&
                prepare.length != 0 &&
                cooking.length != 0 &&
                total.length != 0 &&
                yield.length != 0 &&
                about.length != 0 &&
                ingredients.length != 0 &&
                instructions.length != 0 &&
                userID.length != 0
            ) {
                if (base64String.length == 0) {
                    userdataobj = {
                        Title: title,
                        UserID: userID,
                        Category: category,
                        Dish: dish,
                        Cuisine: cuisine,
                        Prepare: prepare,
                        Cooking: cooking,
                        Total: total,
                        Yield: yield,
                        About: about,
                        Ingredients: JSON.stringify(ingredients),
                        Instructions: JSON.stringify(instructions),
                        recipe_id: sessionStorage.getItem("edit_recipe_id"),
                        Img_avl: 0
                    };
                } else {
                    userdataobj = {
                        Title: title,
                        UserID: userID,
                        Category: category,
                        Dish: dish,
                        Cuisine: cuisine,
                        Prepare: prepare,
                        Cooking: cooking,
                        Total: total,
                        Yield: yield,
                        About: about,
                        Ingredients: JSON.stringify(ingredients),
                        Instructions: JSON.stringify(instructions),
                        Img: base64String,
                        recipe_id: sessionStorage.getItem("edit_recipe_id"),
                        Img_avl: 1
                    };
                }
            } else {
                alert("Enter valid input");
                console.log("Enter valid input");
            }

            if (userdataobj != null) {
                ajax("/UpdateRecipe","post",userdataobj, function (data, result) {
                    response = JSON.parse(data);
                    if (response.status == "true") {
                        console.log("Data saved \nResponse : " + result + "\nData" + data);
                        sessionStorage.removeItem("edit_recipe_id");
                        window.location.assign("../views/myRecipes.html");
                    } else {
                        alert(response.status);
                    }
                })
            }
            e.preventDefault();
        } catch {
            e.preventDefault();
            alert("Error on Storing data");
            console.log("Error on data storing");
        }
    });

});


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

// FUNCTION TO LOGOUT
function logout() {
    try {
        sessionStorage.clear();
        window.location.href = "login.html";
    } catch {
        console.log("Error on logout function")
    }
}

// FUNCTION TO LOAD DATA TO FORM
function loadData(data) {

    try {
        $("#title").val(data.title);
        for (i of $('input[name="Category"]')) {
            if (i.value == data.category) {
                $(i).prop("checked", true);
            }
        }
        $("#d-type").val(data.dish);
        $("#c-type").val(data.cuisine);
        $("#prepare").val(data.prepare_time);
        $("#cooking").val(data.cooking_time);
        $("#total").val(data.total_time);
        $("#yield").val(data.yield);
        $("#about").val(data.about);
        $("#show").append(`<img src="` + data.img + `" >`);

        var ingred = JSON.parse(data.ingredients);
        $("#ingred0").val(ingred[0]);
        var i = 1;
        for (var j = 1; j < ingred.length; j++) {
            add('ingred');
            $("#ingred" + ingredRow[i]).val(ingred[j]);
            i++;
        }

        var instruc = JSON.parse(data.instructions);
        console.log(instruc);
        $("#instra0").val(instruc[0]);
        var i = 1;
        for (var j = 1; j < instruc.length; j++) {
            add('instra');
            console.log(instruc[j]);
            $("#instra" + instraRow[i]).val(instruc[j]);
            i++;
        }
    } catch {
        console.log("Error on Load data into the form")
    }
}

// ADD INSTRUCTION AND INGREDIENTS TEXT BOX
function add(id) {
    try {
        if (id === 'ingred') {
            if (ingredRow.length < 50) {
                var addrow = '<div class="row" id="' + id + 'row' + ingredCount + '"> <input class="input100 ingred" type="text" id="' + id + ingredCount + '"><label class="ingred-msg"></label><button id="delete" onclick="return ' + id + 'del(' + ingredCount + ')">Del</button></div>';
                ingredRow.push(ingredCount);
                $('#' + id).append(addrow);
                console.log(ingredRow);
                ingredCount++;
            } else {
                alert("Max Step 20");
            }
        } else {
            if (instraRow.length < 25) {
                var addrow = '<div class="row" id="' + id + 'row' + instraCount + '"> <textarea class="input100 instra" cols="50" rows="5" type="text" id="' + id + instraCount + '"></textarea><label class="instruct-msg"></label><button id="delete" onclick="return ' + id + 'del(' + instraCount + ')">Del</button></div>';
                instraRow.push(instraCount);
                $('#' + id).append(addrow);
                console.log(instraRow);
                instraCount++;
            } else {
                alert("Max Step 20");
            }
        }
    } catch {
        console.log("Error on add rows in form")
    }

}

// REMOVE THE DELETED ELEMENTS FROM THE ARRAY
function instradel(ind) {
    try {
        instraRow.splice(instraRow.indexOf(ind), 1);
        $("#instrarow" + ind).remove();
        return false;
    } catch {
        console.log("Error on instruction delete function")
    }
}

// REMOVE THE DELETED ELEMENTS FROM THE ARRAY
function ingreddel(ind) {
    try {
        ingredRow.splice(ingredRow.indexOf(ind), 1);
        $("#ingredrow" + ind).remove();
        return false;
    } catch {
        console.log("Error on ingredients delete function")
    }
}


// GET THE INSTRUCTION TEXT FIELD DATA
function getInstraData() {
    try {
        var res = [];
        for (var i = 0; i < instraRow.length; i++) {
            if ($("#instra" + instraRow[i]).val() == "") {
                console.log("false");
                return "";
            }
            res.push($("#instra" + instraRow[i]).val())
        }
        console.log("Instractions ::: " + res)
        return res;
    } catch {
        console.log("Error on get the value from instruction text box")
    }
}


// GET THE INGREDIENTS TEXT FIELD DATA

function getIngredData() {
    try {
        var res = [];
        for (var i = 0; i < ingredRow.length; i++) {
            if ($("#ingred" + ingredRow[i]).val() == "") {
                console.log("false");
                return "";
            }
            res.push($("#ingred" + ingredRow[i]).val())
        }
        console.log("Ingredients ::: " + res);
        return res;
    } catch {
        console.log("Error on get the value from ingredients text box")
    }
}

// IMAGE CONVERTION PROCESS
function imageUploaded(element) {
    try {
        console.log(element.files);
        var file = element.files[0];
        console.log(element);
        if (element.files[0].size < 5000000) { // LESS THEN 5MB
            var reader = new FileReader();
            reader.onloadend = function () {
                console.log('RESULT', reader.result)
                base64String = reader.result;
            }
            reader.readAsDataURL(file);
            $('.img-msg').empty();
        } else {
            $('.img-msg').addClass('invalid-msg').html('upload lesser than 5MB image file');
        }
    } catch {
        console.log("Error on image uploading")
    }
}


// UPDATE FORM PAGR CONTENTS
function updatepage() {
    try {
        var html = loadHTML();
        $('body').append(html);
        $("#submit").hide();
        if(sessionStorage.getItem("name").length<6){
            $("#id-name").html("Hi " + sessionStorage.getItem("name")+" ");
        }else{
            $("#id-name").html("Hi " + sessionStorage.getItem("name").slice(0, 5)+"... ");
        }
        if (sessionStorage.getItem("edit_recipe_id") != null && sessionStorage.getItem("edit_recipe_id").length != 0) {

            ajax("/Recipe","get",{ method: "recipeDetails", recipe_id: sessionStorage.getItem("edit_recipe_id") }, function (detail, result) {
                var response = JSON.parse(detail);
                console.log("Data saved \nResponse : " + result + "\nData" + detail)
                if (response.status == "true") {
                    loadData(response);
                } else {
                    alert("Data Not Available");
                }
            });

        }
    } catch {
        console.log("Error on update form page function")
    }
}

// ADD FORM PAGE CONTENTS
function addpage() {
    try {
        var html = loadHTML();
        $('body').append(html);
        $("#update").hide();
        if(sessionStorage.getItem("name").length<6){
            $("#id-name").html("Hi " + sessionStorage.getItem("name")+" ");
        }else{
            $("#id-name").html("Hi " + sessionStorage.getItem("name").slice(0, 5)+"... ");
        }
    } catch {
        console.log("Error on add form page function")
    }
}

// HTML CODE TO LOAD ON FORM PAGE
function loadHTML() {
    return `<header>
        <div class="header-area ">
            <div id="sticky-header" class="main-header-area ">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-xl-3 col-lg-2">
                            <div class="logo">
                                <a href="index.html">
                                    <img class="logo-pic" src="../img/logo.png" alt="">
                                </a>
                            </div>
                        </div>
                        <div class="col-xl-9 col-lg-10">
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
        </div>
    </header>
    <div class="limiter">
        <div class="container-login100">
            <div class="wrap-login100">
                <div class="login100-form-title">
                    <span class="login100-form-title-1">
                        Recipe Form
                    </span>
                </div>

                <form class="login100-form validate-form" method="post">
                    <div class="wrap-input100 m-b-26" >
                        <span class="label-input100">Title<span class="required">*</span></span>
                        <input class="input100" type="text" id="title" placeholder="Recipe Title">
                        <label class="title-msg"></label>
                    </div>
                    <div class="validate-input m-b-26" >
                        <span class="label-input100">Category<span class="required">*</span></span>
                        <div class="radio">
                            <input type="radio" id="Veg" value="Veg" name="Category">
                            <label for="Veg">Veg</label>
                            <input type="radio" id="Non-veg" value="Non Veg" name="Category">
                            <label for="Non-veg">Non-veg</label>
                        </div>
                    </div>
                    <div class="wrap-input100 m-b-26" >
                        <span class="label-input100">Dish type<span class="required">*</span></span>
                        <div class="select">
                            <select class="input100" name="Dish type" id="d-type">
                                <option value="Main Dish">Main Dish</option>
                                <option value="Side Dish">Side Dish</option>
                                <option value="Soup">Soup</option>
                                <option value="Salad">Salad</option>
                                <option value="Dessert">Dessert</option>
                                <option value="Drinks">Drinks</option>
                                <option value="Snacks">Snacks</option>                                
                                <option value="Other">Other</option>
                                <option value="" selected>None</option>
                            </select>
                        </div>
                        <label class="dish-msg"></label>
                    </div>
                    <div class="wrap-input100 validate-input m-b-26">
                        <span class="label-input100">Cuisine type<span class="required">*</span></span>
                        <div class="select">
                            <select class="input100" name="cuisine" id="c-type">
                                <option value="Indian">Indian</option>
                                <option value="Italian">Italian</option>
                                <option value="Continental">Continental</option>
                                <option value="Chinese">Chinese</option>
                                <option value="Other">Other</option>
                                <option value="" selected>None</option>
                            </select>
                        </div>
                        <label class="cuisine-msg"></label>
                    </div>
                    <div class="wrap-input100 validate-input m-b-26" >
                        <span class="label-input100" for="preparation">Preparation Time:<span class="required">*</span></span>
                        <input class="input100" type="number" placeholder="in mins Ex: 5" id="prepare">
                        <label class="prepare-msg"></label>
                    </div>
                    <div class="wrap-input100 validate-input m-b-18" >
                        <label class="label-input100" for="cooking">Cooking Time:<span class="required">*</span></label>
                        <input class="input100" placeholder="in mins Ex: 5" type="number" id="cooking">
                        <label class="cook-msg"></label>
                    </div>
                    <div class="wrap-input100 validate-input m-b-18" >
                        <label class="label-input100" for="Total">Total Time:<span class="required">*</span></label>
                        <input class="input100" type="number" placeholder="in mins Ex: 5" id="total">
                        <label class="total-msg"></label>
                    </div>
                    <div class="wrap-input100 validate-input m-b-18" >
                        <lable class="label-input100">Yield:<span class="required">*</span></lable>
                        <input class="input100" type="text" placeholder="Yield Ex: 5 Serving" id="yield">
                        <label class="yield-msg"></label>
                    </div>
                    <div class="wrap-input100 validate-input m-b-18" >
                        <label class="label-input100">About Recipe:<span class="required">*</span></label>
                        <textarea class="input100" placeholder="Highlight of the recipe" type="text" id="about" cols="50" rows="5"  style="margin-top: 13px;"></textarea>
                        <label class="about-msg"></label>
                    </div>
                    <div class="wrap-input100 validate-input m-b-26" >
                        <label class="label-input100">Ingredients:<span class="required">*</span></label>
                        <div id="ingred">
                            <div class="row">
                                <input class="input100 ingred" type="text" placeholder="point by point" id="ingred0">
                                <label class="ingred-msg"></label>
                            </div>
                        </div>
                        <button class="add" id="addingred" value="ingred">Add</button>
                    </div>
                    <div class="validate-input m-b-26"  style="width: 100%; margin-top: 15px;"> 
                        <label class="label-input100">Instruction:<span class="required">*</span></label>
                        <div id="instra">
                            <div class="row" id="row">
                                <textarea class="input100 instra" cols="50" rows="5" placeholder="step by step"  type="text" id="instra0"></textarea>
                                <label class="instruct-msg"></label>
                            </div>
                        </div>
                        <button class="add" id="addinstra" value="instra">Add</button>
                    </div>
                    
                    <div class="validate-input m-b-18">
                        <label class="label-input100" for="img">Picture:<span class="required">*</span></label>
                        <div id="show"></div>
                        <input class="img" type="file" accept="image/jpeg, image/png" id="img" onchange="imageUploaded(this)">
                        <label class="img-msg"></label>
                        
                    </div>
                    <div>
                        <button class="hover-button" type="reset">Reset</button>
                        <button class="hover-button button" id="submit" type="submit">Submit</button>
                        <button class="hover-button button"  id="update" type="submit" >Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>`;
}

