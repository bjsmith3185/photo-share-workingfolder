import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/API';
import "./Admin.css";
import AddNewUser from '../../components/AddNewUser';
import Navigation from '../../components/Navigation';
import UserIdBar from '../../components/UserIdBar';
import AdminNavbar from "../../components/AdminNavbar";
import AllUsers from "../../components/AllUsers";
import UpdateUser from "../../components/UpdateUser";
import OnlineUsers from "../../components/OnlineUsers";
import RemovePicture from '../../components/RemovePicture';
import * as ROUTES from '../../constants/routes';

import Alert from 'react-s-alert';







class Admin extends Component {

  state = {
    username: "",
    useremail: "",
    passwordOne: "",
    passwordTwo: "",
    error: "",
    userAdmin: "",
    resetPassword: false,


    loggedIn: false,
    authUser: false,
    admin: false,

    name: "",
    email: "",
    _id: "",

    showAddNewUser: false,
    showAllUsers: false,
    showRemovePicture: false,
    // showOnlineUsers: false,
    showModifyUsers: false,
    showDeleteUser: false,


    usersView: false,
    allUsers: [],
    allNames: [],


    showUpdatingUser: false,
    // viewUpdateUser: false,
    oldUsername: "",
    oldUseremail: "",
    oldAdmin: "",
    idToUpdate: "",

    value: "",
    confirmDelete: false,
    removeName: "",

    // state for delete pictures 
    removeMenu: true,
    removeAllPic: false,
    removeSelectedPic: false,
    confirmSelected: false,

    allPictures: [],

    onlineUsers: [],


  };


  componentDidMount() {
    this.checkIfUserExists();
  }

  // componentWillUnmount() {

  // }
  openAlert = (e) => {
    e.preventDefault();
    // const customerName = 'Click To Delete Picture';
    Alert.info('Click To Delete Picture', {
      position: 'top-left',
      onClose: function () {
        console.log('onClose Fired!');
    }
      // customFields: {
      //   message: "hello",
      // }
    });
  }


  onChange = event => {
    console.log("in the onchange()")
    this.setState({ [event.target.name]: event.target.value });
  };

  signOut = () => {
    console.log("signing out")
    let _id = sessionStorage.getItem("_id");

    API.signOutUser(_id)
      .then(res => {
        console.log("signed out")
      })
      .catch(error => {
        console.log(error)
      });
    sessionStorage.clear();
    this.props.history.push(ROUTES.LANDING);
  };

  checkIfUserExists = () => {
    let _id = sessionStorage.getItem("_id");

    API.getUser(_id)
      .then(res => {
        console.log("users info")
        console.log(res.data)

        if (res.data === null) {
          this.setState({
            loggedIn: false,
            authUser: false,
          })
        } else {
          sessionStorage.setItem("name", res.data.name);
          sessionStorage.setItem("email", res.data.email);
          this.setState({
            loggedIn: res.data.loggedIn,
            name: res.data.name,
            email: res.data.email,
            _id: res.data._id,
            authUser: true,
            admin: res.data.admin,
          })
        }
      })
      .catch(error => {
        console.log(error)
      });

  };


  addUser = (event) => {
    event.preventDefault();

    let newUser = {
      name: this.state.username,
      email: this.state.useremail,

    }

    API.addUser(newUser)
      .then((res) => {
        console.log("added new user to database")
        console.log(res.data)
        this.setState({
          name: "",
          email: "",
        })
        this.getAllUsers();
        this.viewAllUsers();
      })
      .catch(error => {
        console.log(error)
      });
  };

  getOnlineUsers = () => {
    API.getAllUsers()
      .then(res => {
        // console.log("all users info")
        // console.log(res.data)

        if (res.data === null) {
          console.log("no users")
        } else {
          this.setState({
            // usersView: true,
            allUsers: res.data
          })
        }

      })
      .catch(error => {
        console.log(error)
      });

    // API.getOnlineUsers()
    //   .then(res => {
    //     console.log("all online users info")
    //     console.log(res.data)

    //     if (res.data === null) {
    //       console.log("no online users")
    //     } else {
    //       this.setState({
    //         // usersView: true,
    //         onlineUsers: res.data
    //       })
    //     }

    //   })
    //   .catch(error => {
    //     console.log(error)
    //   });
  };

  getAllUsers = () => {



    API.getAllUsers()
      .then(res => {
        console.log("all users info")
        console.log(res.data)

        if (res.data === null) {
          console.log("no users")
        } else {
          this.setState({
            usersView: true,
            allUsers: res.data
          })
        }

      })
      .catch(error => {
        console.log(error)
      });
  };

  confirmSelectedPicDelete = () => {
    console.log("confrim to delete pic")
    // confirm("are you sure")
    this.setState({
      confirmSelected: true,
    })
  };

  selectPicDelete = (id) => {

    API.removeOnePicture(id)
      .then((res) => {
        console.log("removed a pictures")
        // console.log(res.data)
        this.setState({
          confirmSelected: false,
          value: "",

        })
        this.viewRemovePicture();
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  getAllPicturesToRemove = () => {
    API.getAllPictures()
      .then(res => {
        console.log("$$$$$$$$$$$$$ all pictures")
        console.log(res.data)
        this.setState({
          getAllPicturesToRemove: res.data
        })
      })
      .catch(err => console.log(err));
  };


  menuDeleteAll = () => {
    console.log("confirming delete all")
    this.setState({
      removeAllPic: true,
      removeSelectedPic: false,
      removeMenu: false,
    })
  };

  cancelDeletePic = () => {
    console.log("canceling delete")
    this.setState({
      removeAllPic: false,
      removeSelectedPic: false,
      removeMenu: true,
    })

  };

  removeAllPictures = () => {

    API.removeAllPictures()
      .then((res) => {
        console.log("removed all pictures")
        // console.log(res.data)
        this.viewAllUsers();
      })
      .catch(error => {
        this.setState({ error });
      });

  };


  menuRemoveSelectedPic = () => {
    console.log(" remove selected")
    this.setState({
      removeAllPic: false,
      removeSelectedPic: true,
      removeMenu: false,
    })
    // this.getAllPicturesToRemove();
  }


  viewAddNewUser = () => {
    this.setState({
      showAddNewUser: true,
      showAllUsers: false,
      showRemovePicture: false,
      // showOnlineUsers: false,
      showDeleteUser: false,
      showModifyUsers: false,
      username: "",
      useremail: "",
    })

  };

  viewAllUsers = () => {
    this.setState({
      showAddNewUser: false,
      showAllUsers: true,
      showRemovePicture: false,
      showDeleteUser: false,
      // showOnlineUsers: true,
      showModifyUsers: false,

      confirmDelete: false,
    })
    this.getOnlineUsers();
  };


  viewRemovePicture = () => {
    console.log("view remove pic")
    this.setState({
      showAddNewUser: false,
      showAllUsers: false,
      showRemovePicture: true,
      showDeleteUser: false,
      // showOnlineUsers: false,
      showModifyUsers: false,

      confirmDelete: false,

      removeMenu: true,
      removeAllPic: false,
      removeSelectedPic: false,
    })
    this.getAllPicturesToRemove();
    // this.getAllUsers();
  };

  viewModifyUser = () => {
    console.log("modify user clicked")
    this.setState({
      showAddNewUser: false,
      showAllUsers: false,
      showRemovePicture: false,
      showDeleteUser: false,
      // showOnlineUsers: false,
      showModifyUsers: true,
      showUpdatingUser: false,

      confirmDelete: false,
    })
    this.getAllUserNames();
  };

  viewDeleteUser = () => {
    console.log("delete user")
    this.setState({
      showAddNewUser: false,
      showAllUsers: false,
      showRemovePicture: false,
      showOnlineUsers: false,
      showDeleteUser: true,
      showModifyUsers: false,

      confirmDelete: false,
    })
    this.getAllUserNames();
  };

  getAllUserNames = () => {
    this.setState({
      value: '',
      allNames: [],
    })
    API.getAllUsers()
      .then(res => {
        console.log("all users info")
        console.log(res.data)

        let defaultId = res.data[0]._id;
        console.log(`default name is ${defaultId}`)

        this.setState({
          allNames: res.data,
          value: defaultId,
        })



      })
      .catch(error => {
        console.log(error)
      });
  };

  handleChange = (e) => {
    console.log("in handlechange()")
    this.setState({ value: e.target.value });
  };



  selectUser = (event) => {
    // console.log(this.state.value)
    event.preventDefault();
    console.log("selecting user: " + this.state.value)
    this.setState({
      showUpdatingUser: true,
    })
    this.updateUser(this.state.value)
  };

  updateUser = (id) => {
    // console.log("update")
    // console.log(id)
    API.getUser(id)
      .then((res) => {
        // console.log("user info")
        // console.log(res.data)
        this.setState({
          oldUsername: res.data.name,
          oldUseremail: res.data.email,
          oldAdmin: res.data.admin.toString(),
          username: res.data.name,
          useremail: res.data.email,
          idToUpdate: res.data._id,
          userAdmin: res.data.admin,
          // viewUpdateUser: true,

        })
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  submitUpdatedUser = (event) => {
    event.preventDefault();
    // console.log(id)
    // console.log(this.state.idToUpdate);
    let data = {};
    if (this.state.resetPassword) {
      data = {
        name: this.state.username,
        email: this.state.useremail,
        admin: this.state.userAdmin,
        password: "123456",
      }

    } else {
      data = {
        name: this.state.username,
        email: this.state.useremail,
        admin: this.state.userAdmin,
      }
    }

    // console.log(data)

    API.updateUser(this.state.oldUsername, data)
      .then((res) => {
        // console.log("updated user info")
        // console.log(res.data)
        this.setState({
          viewUpdateUser: false,
          username: "",
          useremail: "",
          userPassword: false,
          showAllUsers: true,
          showUpdatingUser: false,
          showModifyUsers: false,

        })
        this.getAllUsers();

      })
      .catch(error => {
        this.setState({ error });
      });


  };

  removeUser = (event) => {
    // console.log(this.state.value)
    event.preventDefault();
    console.log("removing user: " + this.state.value)

    for (var i = 0; i < this.state.allNames.length; i++) {
      if (this.state.value === this.state.allNames[i]._id) {
        console.log(this.state.allNames[i].name)
        this.setState({
          removeName: this.state.allNames[i].name,
          confirmDelete: true,
        })
      }
    }

  };

  cancelRemove = () => {
    this.setState({
      confirmDelete: false
    })
  };

  confirmRemoveUser = () => {
    this.setState({
      confirmDelete: false,
    })
    this.deleteUser()

  }

  deleteUser = () => {
    // console.log("delete")
    // console.log(id)

    API.deleteUser(this.state.value)
      .then((res) => {
        console.log("deleted user")
        // console.log(res.data)
        this.viewAllUsers();
      })
      .catch(error => {
        this.setState({ error });
      });
  };






  render = () => {

    // const {
    //   username,
    //   email,
    //   passwordOne,
    //   passwordTwo,
    //   error,
    // } = this.state;

    // const isInvalid =
    //   passwordOne !== passwordTwo ||
    //   passwordOne === '' ||
    //   email === '' ||
    //   username === '';



    return (

      <div>
        <Navigation
          authUser={this.state.authUser}
          admin={this.state.admin}
          signOut={this.signOut}
        />
        <UserIdBar name={this.state.name} />


        {this.state.admin && this.state.loggedIn ? (
          <div>
            <h1 className="adminpage-header text-center">Administration Page</h1>
            <AdminNavbar
              viewAddNewUser={this.viewAddNewUser}
              viewAllUsers={this.viewAllUsers}
              viewRemovePicture={this.viewRemovePicture}
              viewDeleteUser={this.viewDeleteUser}
              viewModifyUser={this.viewModifyUser}
            />


            {this.state.showAddNewUser ? (
              <AddNewUser
                addUser={this.addUser}
                onChange={this.onChange}
                username={this.state.username}
                useremail={this.state.useremail}
                passwordOne={this.state.passwordOne}
                passwordTwo={this.state.passwordTwo}
                error={this.state.error}

              />
            ) : (
                <div></div>
              )}

            {this.state.showAllUsers ? (

              <OnlineUsers
                allUsers={this.state.allUsers}
              />

            ) : (
                <div></div>
              )}

            {this.state.showModifyUsers ? (

              <div>
                {this.state.showUpdatingUser ? (
                  // Form to update selected user 
                  <div>
                    <UpdateUser
                      viewUpdateUser={this.state.viewUpdateUser}
                      oldUsername={this.state.oldUsername}
                      username={this.state.username}
                      onChange={this.onChange}
                      oldUseremail={this.state.oldUseremail}
                      useremail={this.state.useremail}
                      userPassword={this.state.userPassword}
                      oldAdmin={this.state.oldAdmin}
                      userAdmin={this.state.userAdmin}
                      submitUpdatedUser={this.submitUpdatedUser}
                    />
                  </div>
                ) : (
                    // Dropdown to select user to modify 
                    <div>

                      <form>
                        <label>
                          Pick User to modify:
                          <select value={this.state.value} onChange={this.handleChange}>

                            {this.state.allNames.map((name, i) => (
                              <option key={name._id} value={name._id}>{name.name}</option>
                            )
                            )}
                          </select>
                        </label>
                      </form>

                      <div>To make changes click Continue.
                        <button onClick={this.selectUser}>Continue</button>
                      </div>

                    </div>
                  )}
              </div>
            ) : (
                <div></div>
              )}




            {this.state.showDeleteUser ? (
              // Dropdown to select user to delete 
              <div>

                <form>
                  <label>
                    Pick User to remove from this app:
                  <select value={this.state.value} onChange={this.handleChange}>

                      {this.state.allNames.map((name, i) => (
                        <option key={name._id} value={name._id}>{name.name}</option>
                      )
                      )}
                    </select>
                  </label>
                </form>


                {this.state.confirmDelete ? (
                  <div>Confirm you would like to remove {this.state.removeName} from this application permantly. <button onClick={this.cancelRemove}>Cancel</button><button onClick={this.confirmRemoveUser}>Delete User</button>
                  </div>

                ) : (

                    <div>To remove user click Continue.
                    <button onClick={this.removeUser}>Continue</button>
                    </div>
                  )}

              </div>
            ) : (
                <div></div>
              )}



            {this.state.showRemovePicture ? (
              <RemovePicture
                removeAllPictures={this.removeAllPictures}
                removeMenu={this.state.removeMenu}
                menuDeleteAll={this.menuDeleteAll}
                menuRemoveSelectedPic={this.menuRemoveSelectedPic}
                removeAllPic={this.state.removeAllPic}
                cancelDeletePic={this.cancelDeletePic}
                removeSelectedPic={this.state.removeSelectedPic}


                pictures={this.state.getAllPicturesToRemove}
                confirmSelected={this.state.confirmSelected}
                selectPicDelete={this.selectPicDelete}
                
                confirmSelectedPicDelete={this.confirmSelectedPicDelete}

                openAlert={this.openAlert}

              />
            ) : (
                <div></div>
              )}

          </div>
        ) : (
            <div>You have been logged out, click the link below to sign in.
              <Link to={ROUTES.SIGNIN}>Sign In</Link> </div>
          )}

      </div>

    );
  };
};



export default Admin;