import React, { useContext } from "react";
import PT from "../svg/PT";
import "./Navbar.css";
// import { UserContext } from "../../context/UserContext";
// import { signOut } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import { auth } from "../../firebase-config";

const Navbar = () => {
  // const { modalState, toggleModals } = useContext(UserContext);

  // const navigate = useNavigate();

  // const logOut = async () => {
  //   try {
  //     await signOut(auth);
  //     navigate("/");
  //   } catch {
  //     alert("for some reasons we can't log out, please retry");
  //   }
  // };

  // const { currentUser } = useContext(UserContext);

  return (
    <div className="Navbar">
      <div className="navbarContent">
        <div className="navBarleftSide">
          <h1 className="first-title"> <PT /> </h1>
          {/* {currentUser ? "Tu es bien connecté" : "tu n'est pas connecté"} */}
        </div>
        <div className="navBarRightSide">
          {/* <button className="btn-sign" onClick={() => toggleModals("signIn")}>
            Sign In
          </button>
          <button className="btn-sign" onClick={() => toggleModals("signUp")}>
            Sign Up
          </button>
          {currentUser ? (
            <button className="log-out" onClick={logOut}>
              Disconnect
            </button>
          ) : (
            ""
          )} */}

          {/* Pour afficher les boutons suivant si on est connecté il faut utilisé UserContext en opérateur ternaire */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
