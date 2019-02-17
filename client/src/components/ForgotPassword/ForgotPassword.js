import React from "react";
import "./ForgotPassword.css";


const ForgotPassword = (props) => (

  <div className="forgotpassword-container">

    {props.showEmailPasswordForm ? (

      <div>
        <div className="emailpassword-title text-center">
          An Email has been sent to<span className="emailpassword-email">{props.forgotEmail}</span> with your password.
      </div>
        <button className="emailpassword-ok-btn" onClick={props.welcomePage}>Welcome Page</button>

      </div>

    ) : (
        // <div>
        <div>
          {props.showForgotPasswordLink ? (
            <div onClick={props.viewForgotPassword} className="forgotpassword-title-btn text-center">Forgot Password</div>
          ) : (


              <div className="forgotpassword-area text-center">

                <div>

                  <div className="forgotpassword-back" onClick={props.viewSignInForm}>Back to Sign In Form</div>
                  <br />
                  <br />

                  <div className="forgotpassword-form-title">Forgot Password Form.</div>

                  {props.showSecretQuestionForm ? (
                    <div>
                      <div className="secretquestion-title text-center">Please answer your secret question</div>

                      <form>

                        <label className="secretquestion-label">{props.secretQuestion}</label>
                        <input
                          className="secretquestion-input"
                          id="secret-answer"
                          name="usersAnswer"
                          value={props.usersAnswer}
                          onChange={props.onChange}
                          type="text"
                        />

                        <button className="secretquestion-submit-btn" onClick={props.submitAnswer}>Submit</button>


                      </form>


                    </div>
                  ) : (
                      <div>
                        <form>

                          <label className="forgotpassword-email-label">Enter your email.</label>
                          <input
                            className="forgotpassword-email-input"
                            id="input-email"
                            name="forgotEmail"
                            value={props.forgotEmail}
                            onChange={props.onChange}
                            type="text"
                          />

                          <button className="forgotpassword-submit-email" onClick={props.submitEmail}>Submit</button>


                        </form>

                      </div>
                    )}




                </div>



              </div>


            )}





        </div>



        // </div>
      )}






  </div>
);

export default ForgotPassword;

