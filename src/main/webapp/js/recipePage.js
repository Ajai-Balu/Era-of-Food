var cmd;
var recipeid;
var rating;
$(document).ready(function () {
    try {
        var id = sessionStorage.getItem("User_id");
        // COMMENT TEXT BOX VALIDATION
        $("#cmd").blur(function () {
            cmd = $(this).val().trim();
            if (cmd.length == 0) {
                $('.cmd-msg').addClass('invalid-msg').html('Give some comments');
                $(this).addClass('invalid-input').removeClass('valid-input');
            } else {
                $('.cmd-msg').empty();
                $(this).addClass('valid-input').removeClass('invalid-input');
            }
        });
    } catch {
        console.log("Error on validation process");
    }

    try {
        // APPEND THE RATING BUTTON DIV
        $("#ratbtn").click(function () {
            Swal.fire({
                title: 'Rating',
                html: `<div id="rating-box">
            <div class="star-widget">
                <input type="radio" value="5" name="rate" id="rate-5">
                <label for="rate-5" class="fas fa-star"></label>
                <input type="radio" value="4" name="rate" id="rate-4">
                <label for="rate-4" class="fas fa-star"></label>
                <input type="radio" value="3" name="rate" id="rate-3">
                <label for="rate-3" class="fas fa-star"></label>
                <input type="radio" value="2" name="rate" id="rate-2">
                <label for="rate-2" class="fas fa-star"></label>
                <input type="radio" value="1" name="rate" id="rate-1">
                <label for="rate-1" class="fas fa-star"></label>
                <form action="#">
                    <header></header>
                </form>
            </div>
        </div>`,
                confirmButtonText: 'Submit',
                focusConfirm: false,
                preConfirm: () => {
                    rating = $('input[name="rate"]:checked').val();
                    return { rating: rating };
                }
            }).then((result) => {
                if (result.value.rating != null && result.value.rating > 0) {
                    // SEND THE RATING POINT TO BACKEND
                    ajax("/AddRating","post",{recipe_id: recipeid, user_id: id, rating: result.value.rating }, function (data) {
                        response = JSON.parse(data);
                        if (response.status === "true") {
                            if (result.value.rating > 2) {
                                Swal.fire((`Thanks for ` + result.value.rating + ` star rating !`).trim())
                            } else {
                                Swal.fire((`Thanks for rating !`).trim()).then()
                            }
                        } else {
                            Swal.fire((response.status).trim())

                        }
                    });
                }
            })
        })

        if (sessionStorage.getItem("recipe_id") != null && sessionStorage.getItem("recipe_id").length != 0) {
            recipeid = sessionStorage.getItem("recipe_id");
            // GET THE RECIPE DETAILS 
            ajax("/Recipe","get",{ method: "recipeDetails", recipe_id: recipeid }, function (detail, result) {
                var response = JSON.parse(detail);
                console.log("Data saved \nResponse : " + result + "\nData" + detail)
                if (response.status == "true") {
                    loadData(response);
                } else {
                    alert("Data Not Available");
                }
            });

            // GET THE RECIPE COMMENTS 
            ajax("/Recipe","get",{ method: "getComments", recipe_id: recipeid }, function (data, result) {
                var response = JSON.parse(data);
                if (response.status == "true") {
                    loadCmd(response.comments);
                } else {
                    alert("Data Not Available");
                }
            })
        }

        // COMMENT BUTTON CLICK FUNCTION
        $("#cmdbtn").click(function () {
            cmd = $("#cmd").val();
            if (cmd.length != 0 && recipeid.length != 0 && id.length != 0) {
                ajax("/AddComments","post",{recipe_id: recipeid, user_id: id, user_name: sessionStorage.getItem("name"), comment: cmd }, function (data, result) {
                    var response = JSON.parse(data);
                    if (response.status == "true") {
                        location.reload();
                    } else {
                        alert(response.status);
                    }
                })
            }
        });
    } catch {
        console.log("Error on commands and ajax call")
    }

});

// APPEND THE RECIPE DETAILS INTO THE RECIPE PAGE 
function loadData(data) {
    try {
        $("#title").append('<h1>' + data.title + '</h1>');
        $("#bg").css({ "background-image": "url(" + data.img + ")" });
        $("#img").append(`<img src="` + data.img + `" alt="">`);
        if (data.user_id == sessionStorage.getItem("User_id")) {
            $(".delete").hide();
            $("#ratbtn").hide();
        }
        if (sessionStorage.getItem("role") == "admin") {
            $("#ratbtn").hide();
            $(".cmd").hide();
        }

        $("#type").append(` <td class="col-sm-3  col-lg-2"><b>Category : </b></td>
                            <td class="col-sm-3  col-lg-2">` + data.category + `</td> 
                            <td class="col-sm-3  col-lg-2"><b>Dish Type : </b></td>
                            <td class="col-sm-3  col-lg-2">` + data.dish + `</td> 
                            <td class="col-sm-3  col-lg-2"><b>Cuisine Type : </b></td>
                            <td class="col-sm-3  col-lg-2">` + data.cuisine + `</td>`);

        $("#time").append(` <td class="col-sm-3  col-lg-2"><b>Prepartion Time : </b></td>
                            <td class="col-sm-3  col-lg-2">` + data.prepare_time + ` Mins</td> 
                            <td class="col-sm-3  col-lg-2"><b>Cooking Time : </b></td>
                            <td class="col-sm-3  col-lg-2">` + data.cooking_time + ` Mins</td> 
                            <td class="col-sm-3  col-lg-2"><b>Total Time : </b></td>
                            <td class="col-sm-3  col-lg-2">` + data.total_time + ` Mins</td>`);

        $("#names").append(`<td class="col-sm-3  col-lg-2"><b>Yield : </b></td>
                            <td class="col-sm-3  col-lg-2">` + data.yield + `</td>
                            <td class="col-sm-3  col-lg-2"><b>Recipe Posted by : </b></td>
                            <td class="col-sm-3  col-lg-2">` + data.user_name + `</td>`);

        $("#about").append("<p>" + data.about + "</p>");
        var code = "";
        for (var j = 0; j < 5; j++) {
            if (j < data.rating) {
                code += `<i class="fa fa-star" aria-hidden="true"></i>`;
            } else {
                code += `<i class="fa fa-star-o" aria-hidden="true"></i>`;
            }
        }
        code += "<span title='Rating Count' style='color: black;'> ( " + data.rating_count + ` ) </span>`;
        $("#stars").append(code);
        var ingredients = JSON.parse(data.ingredients);
        var res = "";
        for (var i = 0; i < ingredients.length; i++) {
            res += '<b>- </b>' + ingredients[i] + "<br><br>";
        }
        $("#ingredients").append("<p>" + res + "</p>");
        var instructions = JSON.parse(data.instructions);
        res = "";
        for (var i = 0; i < instructions.length; i++) {
            res += '<b>Step ' + (i + 1) + ': </b>' + instructions[i] + "<br><br>";
        }
        $("#instructions").append("<p>" + res + "</p>");
    } catch {
        console.log("Error on load recipe data");
    }
}

// LOAD THE COMMENTS INTO THE COMMENTS DIV
function loadCmd(data) {
    try {
        for (var i = 0; i < data.length; i++) {
            $("#comments").append(`<div class="comment__card">
            <div class="pic center__display">
                `+ (data[i].user_name).charAt(0) + `
            </div>
            <div class="comment__info">
                <small class="nickname">
                    `+ data[i].user_name + `
                </small>
                <p class="comment">
                    `+ data[i].comments + `
                </p>
                <button class="delete" onclick="deletecomment(` + data[i].comment_id + `)"> <i class="fas fa-trash"></i> </button></div>
        </div>`)
            if (sessionStorage.getItem("role") == "user") {
                $(".delete").hide();
            }
        }
    } catch {
        console.log("Error on load commands")
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

// FUNCTION TO DELETE THE COMMENTS
function deletecomment(id) {
    confirmDelete(function () {
        ajax("/DelComments","post",{ comment_id: id }, function (data, result) {
            var response = JSON.parse(data);
            if (response.status == "true") {
                location.reload();
            } else {
                alert("Can't delete the comment");
            }
        })
    })
}