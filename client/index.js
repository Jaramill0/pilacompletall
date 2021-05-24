import './stylesheets/style.css';
import './stylesheets/mystylesheet.css';

// eslint-disable-next-line no-console
console.log('Web Pack Trabajando !! ');
// Default parameters estan disponible ES6/2015
const show = (m = 'Hot Module Replacement Working') => {
  // eslint-disable-next-line no-alert
  alert(m);
};
show();

function resolveAfter2Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}
async function asyncCall() {
  // eslint-disable-next-line no-console
  console.log('Calling an async function');
  const result = await resolveAfter2Seconds();
  // eslint-disable-next-line no-console
  console.log(result);
}
asyncCall();
