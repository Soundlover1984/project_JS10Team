
import '../side-bar/supportCreateList';



const listBtn = document.querySelectorAll('.sh-list__pagination');
const page = document.querySelectorAll('.nullInList');
console.log(page)





localStorage.setItem("ui-theme", '{"name":"Mango","age":3,"isHappy":true}');
const local = localStorage.getItem("ui-theme")
console.log(local)

function controllInLocalStorage(){
    const savedSettings = JSON.parse(localStorage.getItem("ui-theme"));
    console.log(savedSettings)
    if(!savedSettings){
        createDefaultPage()
    }
}
controllInLocalStorage()


function createDefaultPage() {

    page.insertAdjacentHTML("beforeend", "<p>Ilona</p>")
}