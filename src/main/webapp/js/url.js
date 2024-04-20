var url = "http://localhost:8080/Era-Of-Food";

document.onreadystatechange = function () {
    if (document.readyState !== "complete") {
        document.querySelector("body").style.visibility = "hidden";
        document.querySelector("#loader").style.visibility = "visible";
    } else {
        document.querySelector("#loader").style.display = "none";
        document.querySelector("body").style.visibility = "visible";
    }
};

function confirmDelete(callback) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            callback();
        }
    })
}


// COMMON AJAX CALL FUNCTION
function ajax(path,method, datas, callback) {
    try {
        $.ajax({
            type: method,
            data: datas,
            url: url + path,
            success: function (data, result) {
                console.log("Data saved \nResponse : " + result + "\nData" + data);
                callback(data, result);
            },
            error: function (result) {
                console.log("Data not saved \nError : " + result);
            },
        });
    } catch {
        console.log("Error on common ajax call function")
    }
}