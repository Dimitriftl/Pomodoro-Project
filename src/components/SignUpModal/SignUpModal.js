import React from "react";
import { useState, useContext, useRef } from "react";
import { Await } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import "./SignUpModal.css";

const SignUpModal = () => {
  const { modalState, toggleModals, signUp } = useContext(UserContext);

  const inputs = useRef([]);

  const navigate =useNavigate()

  const [validation, setValidation] = useState("");

  // cette fonction sert a push un element dans le tableau input si celui si n'y est pas encore
  const addInputs = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };

  const formRef = useRef()

  const handleForm = async  (e) => {
    e.preventDefault();

    if (
      (inputs.current[1].value.length || inputs.current[2].value.length) < 6
    ) {
      setValidation("6 characters min");
      return;
    } else if (inputs.current[1].value !== inputs.current[2].value) {
      setValidation("passwords do not match");
      return;
    }

    try {

      const cred = await signUp(
        inputs.current[0].value,
        inputs.current[1].value
      )
      // reset sert a vider les input une fois que l'on a inscrit quelqu'un
      formRef.current.reset()
      // setValidation("") sert également a enlever le message d'erreur si il y'en a 1 
      setValidation('')
      // console.log(cred);
      navigate("/private/private-home")
      toggleModals('close')

    } catch (err) {

      if(err.code === "auth/invalid-email"){ 
        setValidation('Email format invalid')
      }

      if(err.code === "auth/email-already-in-use") { 
        setValidation('Email already used')
      }

    }
  };

  const closeModal = ( ) => { 
    setValidation('')
    toggleModals('close')
  }

  return (
    <>
      {modalState.signUpModal && (
        <div className="SignUpBody">
          <div
            className="SignUpOverlay"
            onClick={closeModal}
          ></div>
          <div className="SignUpContent">
            <div className="SignUpContentHeader">
              <h3>Sign Up</h3>
              <button
                className="CloseModalBtn"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
            <div className="SignUpContentBody">
              <form 
              onSubmit={handleForm}
              ref={formRef}
              >
                <div className="inputBody">
                  <label htmlFor="signUpEmail" className="form-label">
                    Email adress
                  </label>
                  <input
                    ref={addInputs}
                    name="email"
                    required
                    type="email"
                    className="form-control"
                    id="signUpEmail"
                  />
                </div>
                <div className="inputBody">
                  <label htmlFor="signUpPwd" className="form-label">
                    Password
                  </label>
                  <input
                    ref={addInputs}
                    name="pwd"
                    required
                    type="password"
                    className="form-control"
                    id="signUpPassword"
                  />
                </div>

                <div className="inputBody">
                  <label htmlFor="repeatPwd" className="form-label">
                    Repeat Password
                  </label>
                  <input
                    ref={addInputs}
                    name="pwd"
                    required
                    type="password"
                    className="form-control"
                    id="repeatPassword"
                  />
                </div>
                <div className="errorText">{validation}</div>

                <div className="submitBtnContainer">
                  <button className="submitBtn">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUpModal;
