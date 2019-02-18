import React, { Component } from 'react';

import API from '../../utils/API';
import "./SignIn.css";
import * as ROUTES from '../../constants/routes';
import Navigation from '../../components/Navigation';
import ForgotPassword from '../../components/ForgotPassword'
import AnswerSecretQuestion from '../../components/AnswerSecretQuestion';
// import AllUsers from "../../components/AllUsers";


class SignIn extends Component {


  state = {
    adminTrue: false,
    name: "",
    email: "",
    password: "",
    unsuccessful: false,

    showLogInForm: true,
    showForgotPasswordLink: true,
    showForgotPassword: false,
    showSecretQuestionForm: false,
    showEmailPasswordForm: false,
    showAnswerSecretQuestion: false,


    forgotEmail: "",
    secretQuestion: "",
    secretAnswer: "",
    usersAnswer: "",
    count: 0,

    value: "",
    questions: [
      "What is your favorite pet?",
      "In what city were you born?",
      
  ],

  };

  componentDidMount() {
    sessionStorage.clear();
  }

  demo = () => {
    this.setState({
      email: "",
      password: "",
      name: ""

    })
    this.setState({
      email: "brian@mail.com",
      password: "123456"
    })
  }

  login = (event) => {
    console.log("logging in to app")
    sessionStorage.clear();
    event.preventDefault();

    // tostring
    let data = {
      password: this.state.password.toString()
    }

    console.log(this.state.email.toLowerCase())
    console.log(data)
    // lowercase
    API.login(this.state.email.toLowerCase(), data)
      .then(res => {

        console.log(res.data)

        this.setState({
          // email: "",
          password: "",
        })

        if (res.data === null) {
          this.setState({
            unsuccessful: true
          })
        } else {
          // console.log(res.data._id)
          sessionStorage.setItem("_id", res.data._id);
          if (res.data.secretQuestionCompleted === false) {
            this.setState({
              unsuccessful: false,
              showAnswerSecretQuestion: true,

            })

            // function to get the secret questions array
            API.getSecretQuestions()
            .then(res => {

              console.log("return from getting all security questions");
              console.log(res.data)
      
             
      
            })
            .catch(err => console.log(err));

          } else {
            this.pageRedirect();
          }


        }
      })
      .catch(err => console.log(err));
  };

  // login = (event) => {
  //   console.log("logging in to app")
  //   sessionStorage.clear();
  //   event.preventDefault();

  //   // tostring
  //   let data = {
  //     password: this.state.password.toString()
  //   }

  //   console.log(this.state.email.toLowerCase())
  //   console.log(data)
  //   // lowercase
  //   API.login(this.state.email.toLowerCase(), data)
  //     .then(res => {

  //       this.setState({
  //         email: "",
  //         password: "",
  //       })

  //       if (res.data === null) {
  //         this.setState({
  //           unsuccessful: true
  //         })
  //       } else {
  //         // console.log(res.data._id)
  //         sessionStorage.setItem("_id", res.data._id);
  //         this.setState({
  //           unsuccessful: false
  //         })

  //         this.pageRedirect();
  //       }
  //     })
  //     .catch(err => console.log(err));
  // };

  pageRedirect = () => {
    this.props.history.push(ROUTES.HOME);
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  viewForgotPassword = () => {
    this.setState({
      showForgotPassword: true,
      showForgotPasswordLink: false,
      showLogInForm: false,
    })
  }

  viewSignInForm = () => {
    this.setState({
      showForgotPassword: false,
      showForgotPasswordLink: true,
      showLogInForm: true,
    })
  };

  submitEmail = (event) => {
    event.preventDefault();
    console.log("clicked submit email")

    API.getUserByEmail(this.state.forgotEmail)
      .then(res => {

        console.log("return from checking if email exists");

        if (res.data === null) {
          console.log("does not match")
        } else {
          console.log(res.data)
          this.setState({
            showSecretQuestionForm: true,
            secretAnswer: res.data.secretAnswer,
            secretQuestion: res.data.secretQuestion,

          })
        }

      })
      .catch(err => console.log(err));
  };

  submitAnswer = (event) => {
    event.preventDefault();
    console.log("clicked submit answer")
    console.log(this.state.usersAnswer)

    if (this.state.usersAnswer === this.state.secretAnswer) {
      console.log("correct answer")
      // log user into app......
    } else {

      console.log("wrong answer")
      console.log(this.state.count)

      if (this.state.count < 1) {

        this.setState({
          usersAnswer: "",
          count: this.state.count + 1
        })

      } else {
        console.log("too many tries")
        this.setState({
          usersAnswer: "",
          showEmailPasswordForm: true,

        })

      }


    }


  };

  welcomePage = () => {
    this.props.history.push(ROUTES.LANDING);
  };

  handleChange = (e) => {
    // console.log("in handlechange()")
    this.setState({ value: e.target.value });
  };

  submitQuestionAndAnswer = (event) => {
    console.log(this.state.value)
    event.preventDefault();
    let data = {
      secretQuestion: this.state.value,
      secretAnswer: this.state.userAnswer,
    }
    console.log("users Q and A: ")
    console.log(data)
    // this.setState({
    //   showUpdatingUser: true,
    // })
    // this.updateUser(this.state.value)
  };


  render = () => {

    return (

      <div>

        <Navigation />


        <div className="signin-secretQuestion text-center">

          {this.state.showAnswerSecretQuestion ? (
            <div>

              <AnswerSecretQuestion
                value={this.state.value}
                questions={this.state.questions}
                submitQuestionAndAnswer={this.submitQuestionAndAnswer}
                handleChange={this.handleChange}
                usersAnswer={this.state.usersAnswer}
                onChange={this.onChange}


              />

            </div>
          ) : (
              <div>

                {this.state.showLogInForm ? (

                  <div>

                    <div className="signin-title-area text-center">
                      <span className="signin-title text-center">Sign In</span> <span className="signin-help-btn" onClick={this.demo}>Demo Login</span></div>

                    {this.state.unsuccessful ? (
                      <div className="login-incorrect text-center">Incorrect Login Attempt, Try Again</div>
                    ) : (

                        <div className="login-text text-center">Enter you information Below</div>
                      )}


                    <form className="login-form text-center">
                      <input className="login-form-input"
                        value={this.state.email}
                        name="email"
                        onChange={this.onChange}
                        type="text"
                        placeholder="email"
                      />
                      <br />
                      <input className="login-form-input2"
                        value={this.state.password}
                        name="password"
                        onChange={this.onChange}
                        type="password"
                        placeholder="password"
                      />
                      <br />
                      <button className="form-btn btn btn-info" onClick={this.login}>LogIn</button>

                    </form>


                  </div>

                ) : (
                    <div></div>
                  )}

                <ForgotPassword
                  viewForgotPassword={this.viewForgotPassword}
                  showForgotPasswordLink={this.state.showForgotPasswordLink}
                  forgotEmail={this.state.forgotEmail}
                  onChange={this.onChange}
                  viewSignInForm={this.viewSignInForm}
                  submitEmail={this.submitEmail}
                  secretQuestion={this.state.secretQuestion}
                  submitAnswer={this.submitAnswer}
                  secretAnswer={this.state.secretAnswer}
                  usersAnswer={this.state.usersAnswer}
                  showSecretQuestionForm={this.state.showSecretQuestionForm}
                  showEmailPasswordForm={this.state.showEmailPasswordForm}
                  welcomePage={this.welcomePage}
                />


              </div>
            )}





        </div>
      </div>
    )
  };
};









export default SignIn;