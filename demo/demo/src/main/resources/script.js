var test = document.getElementById("test");
var forms = document.getElementById("form");
let x = 0;
test.addEventListener('submit', (e) => {
    e.preventDefault();
    const TextField = document.querySelector("form input").value;
    let divis = document.getElementById("todos")
    let todo = document.createElement("p")
    todo.setAttribute("id","x"+x)
    todo.innerHTML = TextField;

    if (x == 0){
        divis.appendChild(todo);}
    else{
        divis.prepend(todo);
    }
    x++;
    todo.onclick = löschen;
    function löschen(){
        let buttonid = event.target.id;
        console.log(buttonid);
        let deleze = document.getElementById(buttonid)
        console.log(deleze);
        deleze.remove();
    }



    });


