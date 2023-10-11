import { newUser } from '../../firebase/firebase-auth.js';
import { userData } from '../../firebase/firebase-store.js';

export default () => {
  const container = document.createElement('div');
  container.classList.add('container');

  container.innerHTML = `
  <article class='register-page'>
    <section class='about-register'>
      <p id='about-regiser'> Cadastre-se, compartilhe a sua rotina e inspire-se com os hábitos saudáveis de outras pessoas </p>
    </section>
    <section class='page-register'>
      <h2>Register</h2>
    </section>
    <form class='input-register' id='input-register'>
      <div class='forms'>
        <span class='highlight'></span>
        <span class='bar'></span>
        <input type='text' id='name' class='full-name' required></input>
        <label for='name' class='input-group__label'>Full name</label>
      </div>
      <div class='forms'>
        <span class='highlight'></span>
        <span class="bar"></span>
        <input type='text' id='nickname' class='nickname' required></input>
        <label for='nickname' class='input-group__label'>Best name</label>
      </div>
      <div class='forms'>
        <span class='highlight'></span>
        <span class='bar'></span> 
        <input type='email' id='email' class='input-register' required></input>
        <label for='email' class='input-group__label'>E-mail</label>
      </div>
      <div class='forms'>
        <span class='highlight'></span>
        <span class='bar'></span>   
        <input type='password' id='password' class='password' required></input>
        <label for='password' class='input-group__label'>Password</label>
      </div>
      <button type='submit' id='sign-up-button' class='sign-up-button'>Sign Up</button>
    </form>
    <section class='login-input'>
      <p>Já tem uma conta?</p>
      <button class='sign-in-button' id='login'>Login</button>
    </section>;
  </article>
  `;

  const register = container.querySelector('#sign-up-button');
  register.addEventListener('click', () => {
    const name = container.querySelector('.full-name').value;
    const nickname = container.querySelector('.nickname').value;
    const email = container.querySelector('.email').value;
    const password = container.querySelector('.password').value;

    if (name.value === '' || nickname.value === '' || email.value === '' || password.value === '') {
      alert('Please fill in all fields');
    } else {
      newUser(email.value, password.value, name.value, nickname.value)
        .then(() => userData(name.value, nickname.value, email.value))
        .then(() => {
          window.location.hash = '#login';
        })
        .catch((error) => {
          console.error(error.message);
          if (error.message === 'Firebase: Error (auth/invalid-email).') {
            alert('Invalid email!');
          } else if (error.message === ' Firebase: Error (auth/internal-error).') {
            alert('Invalid password');
          }
          alert('Error when registering, checking fields');
        });
    }

    window.location.hash = '#login';
  });

  const returnLogin = container.querySelector('#login');
  returnLogin.addEventListener('click', () => {
    window.location.hash = '#login';
  });
  return container;
};
