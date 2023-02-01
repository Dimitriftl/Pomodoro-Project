import React from "react";
import { useState, useContext, useRef } from "react";
import { Await } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import "../SignInModal/SignInModal.css"

const SignInModal = () => {

  const { modalState, toggleModals, signIn } = useContext(UserContext);

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

    try {

      const cred = await signIn(
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

      setValidation('Woops, email or password incorrect')

    }
  };

  const closeModal = ( ) => { 
    setValidation('')
    toggleModals('close')
  }


    return (
        <>
    {modalState.signInModal && (
        <div className="SignUpBody">
          <div
            className="SignUpOverlay"
            onClick={closeModal}
          ></div>
          <div className="SignUpContent">
            <div className="SignUpContentHeader">
              <h3>Sign In</h3>
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
                  <label htmlFor="signInEmail" className="form-label">
                    Email adress
                  </label>
                  <input
                    ref={addInputs}
                    name="email"
                    required
                    type="email"
                    className="form-control"
                    id="signInEmail"
                  />
                </div>
                <div className="inputBody">
                  <label htmlFor="signInPwd" className="form-label">
                    Password
                  </label>
                  <input
                    ref={addInputs}
                    name="pwd"
                    required
                    type="password"
                    className="form-control"
                    id="signInPassword"
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

export default SignInModal;