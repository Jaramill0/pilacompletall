import './stylesheets/style.css'
import './stylesheets/mystylesheet.css'

console.log("Web Pack Trabajando !! ");
// Default parameters estan disponible ES6/2015
let show = (m = "Hot Module Replacement Working") => {
    alert(m)
};
show();

function resolveAfter2Seconds() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved')
        }, 2000);
    });
}
async function asyncCall(){
    console.log("Calling an async function");
    const result = await resolveAfter2Seconds();
    console.log(result);
}
asyncCall();