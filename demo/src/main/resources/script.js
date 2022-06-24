var test = document.getElementById("test");
var forms = document.getElementById("form");
fetching().then(_ => {
   let tesst = document.getElementById("0")
    tesst.style.visibility = "hidden";
    var list = document.querySelector("#todos p").id;

    test.addEventListener('submit', (e) => {
        e.preventDefault();
        const TextField = document.querySelector("form input").value;
        console.log(TextField.value);

        let data = {
            "messages": TextField,
            "ID": list
        }
        let data2 = JSON.stringify(data);
        console.log(data2);
        postScore(data2);
    });
    /*fetch("http://localhost:8084/todos")
        .then(response => response.json())
        .then(data => console.log(data));
    */
    function postScore(data) {
        fetch('http://localhost:8084/todos', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: data
        }).then(res => res.json())
            .then(res => console.log(res));
        window.location.reload();
    }

});
async function fetching(){
    return new Promise(async (resolve, reject) => {
        const response = await fetch('./info.json')
        const jsarray = await response.json();
        let divis = document.getElementById("todos")
        for (let x=0;x < jsarray['todos'].length;x++){
            let todo = document.createElement("p")
            todo.setAttribute("id",x)
            todo.innerHTML = jsarray['todos'][x]['message'];
            divis.prepend(todo);
            todo.onclick = löschen;
        }
        resolve()
    })
}

function löschen() {
    let buttonid = event.target.id;
    console.log(buttonid);

    let data = {
        "ID": buttonid
    }
    let data2 = JSON.stringify(data);
    console.log(data2);
    postScore(data2);
}
function postScore(data) {
    fetch('http://localhost:8084/delete', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: data
    }).then(res => res.json())
        .then(res => console.log(res));
    window.location.reload();
}





