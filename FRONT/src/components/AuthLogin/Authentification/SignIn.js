import { UseSignInStore } from "../signInStore";
import { Navigate } from "react-router-dom";
import google from "../../../assets/google.svg";
import apple from "../../../assets/apple.svg";
import facebook from "../../../assets/facebook.svg";

const SignIn = () => {
  const { data, handleChange, postSignIn, isLoggedIn } = UseSignInStore();
  if(isLoggedIn) {
    return <Navigate to='/'/>
  }
  return (
    <section className="auth__bloc">
      <div className="auth__title__container">
        <h2 className="auth__title">
          Se <span className="auth__title__color">connecter</span>
        </h2>
      </div>

      <form action="POST">
        <label className="auth__label" htmlFor="email">
          Adresse mail*
        </label>
        <input
          className="auth__input"
          type="email"
          name="email"
          id="emailLog"
          onChange={handleChange}
          value={data.mail}
        />

        <label className="auth__label" htmlFor="password">
          Mot de passe*
        </label>
        <input
          className="auth__input"
          type="password"
          name="password"
          id="passwordLog"
          onChange={handleChange}
          value={data.password} 
        />
      </form>
      <div className="button__container">
        <input
          className="button__conexion"
          type="submit"   onClick={ postSignIn }
          value="Se connecter"
        />
      </div>
      <p className="auth__text">Se connecter avec</p>

      <nav className="logoLink">
        <a href="#">
          <img src={google} className="logoLink__img" alt="google" />
        </a>
        <a href="#">
          <img src={apple} className="logoLink__img" alt="apple" />
        </a>
        <a href="#">
          <img src={facebook} className="logoLink__img" alt="Twitter" />
        </a>
      </nav>

      
    </section>
  );
};
export default SignIn;
