import React from "react";
import "./AnswerSecretQuestion.css";


const AnswerSecretQuestion = (props) => (

  <div className="selectquestion-area text-center">
    <div className="selectquestion-title text-center">Update User Info Below.</div>


                  
                      <form className="modifyuser-form text-center">
                        <label className="modifyuser-label">
                          Pick Secret Question:
                          <select className="modifyuser-select" value={props.value} onChange={this.handleChange}>

                            {props.questions.map((question, i) => (
                              <option key={question._id} value={question._id}>{question.name}</option>
                            )
                            )}
                          </select>
                        </label>
                        
                      </form>

                      <button className="modifyuser-btn" onClick={this.selectUser}>Continue</button>

 

    {/* <form>
      

        <label className="updateuser-label">Updated Name:</label>
        <input
          className="updateuser-input"
          id="username"
          name="username"
          value={props.username}
          onChange={props.onChange}
          type="text"
        />


      <button className="updateuser-submit-btn" onClick={props.submitUpdatedUser}>
        Update
        </button>

    </form> */}
  </div>
);

export default AnswerSecretQuestion;

