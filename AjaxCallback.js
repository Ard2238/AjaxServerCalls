const { chdir } = require("process");
const { compileFunction } = require("vm");
const { XMLHttpRequest } = require("xmlhttprequest")

// reuire ---> akin to "import"
let XMLhttprequest =  require("xmlhttprequest").XMLHttpRequest

const getUrl =  "http://127.0.0.1:3000/employees/"

function showTime() {
    const date = new Date()
    return date.getHours() + " Hrs  " + date.getMinutes() + "Mins  " + date.getSeconds() + " Secs"
}

function getUserDetails(data){
    console.log("Get User Data at: " + showTime() + "  value: " + data)
}

// AJAX Call to delete an employee from database
const deleteUrl = "http://127.0.0.1:3000/employees/3"
function userDeleted(data){
    console.log("User Deleted: " + data)
}
makeAJAXCall("DELETE", deleteUrl, userDeleted, false)

// AJAX Call to add an employee to the database
const postUrl = "http://127.0.0.1:3000/employees/"
const empData = {"name": "Harry", "salary": "5000"}
function userAdded(data){
    console.log("User Added: " + data)
}
makeAJAXCall("POST", postUrl, userAdded, true, empData)


// AJAX call function
function makeAJAXCall(methodType, url, callback, async = true, data = null){
    let xhr = new XMLHttpRequest;

    xhr.onreadystatechange = function(resolve,reject) { 
        console.log(methodType + " State changed Called. Ready State:  " +  xhr.readyState + " Status: " + xhr.status)
        if(xhr.readyState === 4){
            if(xhr.status.toString().match('^[2][0-9]{2}$')){
                resolve(xhr.responseText)
            }else if (xhr.status.toString().match('^[4,5][0-9]{2}$')){
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                })
                console.log("XHR Failed")
            }
        }
    }

    // open -- methodType (GET/PUT/POST etc.. ), Url,   Callback Function
    xhr.open(methodType, url, async)
    if (data){
        console.log(JSON.stringify(data));
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.send(JSON.stringify(data));
    }
    else {
        xhr.send();
    }
    console.log(methodType + " request sent to server" + showTime())
}

// Driver Code
makeAJAXCall("GET", getUrl, getUserDetails, "true")
console.log("Made AJAX call to server at "  + showTime())