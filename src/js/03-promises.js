import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs = {
  formEl: document.querySelector('.form'),
  btnEl: document.querySelector('button'),
};
const { delay, amount, step } = refs.formEl.elements;
// console.dir(refs.formEl);

refs.formEl.addEventListener('submit', onBtnHandler);
function onBtnHandler(e) {
  e.preventDefault();
  // console.dir(e);
  let firstDelay = Number(delay.value);
  const delayStep = Number(step.value);
  const amountOfNewPromises = Number(amount.value);
  // console.log(firstDelay);
  // console.log(delayStep);
  // console.log(amountOfNewPromises);
   
  for (let i = 0; i < amountOfNewPromises; i += 1, firstDelay += delayStep) {
    createPromise(i, firstDelay)
    .then(({ position, delay }) => {
      Notify.failure(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
  }
}

function createPromise(position, delay) {
      return new Promise((resolve, reject) => {
        // console.log(`Creating promise for ${position} and ${delay}`);
    
        setTimeout(() => {
          const shouldResolve = Math.random() > 0.3;
          if (shouldResolve) {
            resolve({ position, delay });
          } else {
            reject({ position, delay });
          }
        }, delay);
      });
    };

//   promise
//     .then(value => {
//       console.log(value);
//     })
//     .catch(error => {
//       console.log(error);
//     })
//     .finally(() => {
//       console.log('Final task');
//     });
// }


// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(5);
//   }, 2000);
// });

// promise
//   .then(value => {
//     console.log(value); // 5
//     return value * 2;
//   })
//   .then(value => {
//     console.log(value); // 10
//     return value * 3;
//   })
//   .then(value => {
//     console.log(value); // 30
//   })
//   .catch(error => {
//     console.log(error);
//   })
//   .finally(() => {
//     console.log("Final task");
//   });

// const fetchUserFromServer = username => {
//   return new Promise((resolve, reject) => {
//     console.log(`Fetching data for ${username}`);

//     setTimeout(() => {
//       // Change value of isSuccess variable to simulate request status
//       const isSuccess = true;

//       if (isSuccess) {
//         resolve('success value');
//       } else {
//         reject('error');
//       }
//     }, 2000);
//   });
// };
// fetchUserFromServer('Mango')
//   .then(user => console.log(user))
//   .catch(error => console.error(error));

// const makeGreeting = guestName => {
//   if (guestName === "" || guestName === undefined) {
//     return Promise.reject("Guest name must not be empty");
//   }

//   return Promise.resolve(`Welcome ${guestName}`);
// };

// makeGreeting("Mango")
//   .then(greeting => console.log(greeting))
//   .catch(error => console.error(error));


// resolve(Notify.failure(`✅ Fulfilled promise ${position} in ${delay}ms`));

//   reject(alert(`❌ Rejected promise ${position} in ${delay}ms`));