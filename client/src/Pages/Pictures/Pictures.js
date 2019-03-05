import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import API from '../../utils/API';
import "./Pictures.css";

import Navigation from '../../components/Navigation';
import PictureList from '../../components/PictureList';
import PictureNavbar from '../../components/PictureNavbar';
import PictureUpload from '../../components/PictureUpload';
import PictureLightbox from '../../components/PictureLightbox';
import UserIdBar from '../../components/UserIdBar';
import ViewSlideshowNav from '../../components/ViewSlideshowNav';


class Pictures extends Component {

  state = {
    loggedIn: false,
    authUser: false,
    admin: false,

    displayPictures: [],

    noPics: true,
    isOpen: false,
    photoIndex: 0,

    name: "",
    email: "",
    _id: "",

    showAllPictures: false,
    viewUpload: false,
    showAllFavorites: false,

    files: "",
    showUploadAlert: false,

    rotation: 0,

    note: "",
    showNoteInput: false,


  };

  componentDidMount() {
    this.getUserInfo();
    this.checkIfUserExists();
    this.displayAllPictures();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  signOut = () => {
    // console.log("signing out")
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

  getUserInfo = () => {
    let email = sessionStorage.getItem("email")
    let name = sessionStorage.getItem("name");
    let _id = sessionStorage.getItem("_id");
    // console.log(`setting user info: ${name}, ${email}, ${_id}`)
    this.setState({
      name: name,
      email: email,
      _id: _id,
    })
  };

  displayAllPictures = () => {

    API.getdisplayPicturesAll(sessionStorage.getItem("_id"))
      .then(res => {
        this.setState({
          displayPictures: res.data,
          showAllPictures: true,
        })
      })
      .catch(err => console.log(err));

  };

  displayFavPictures = () => {

    API.getdisplayPicturesFav(sessionStorage.getItem("_id"))
      .then(res => {
        this.setState({
          displayPictures: res.data,
          showAllFavorites: true
        })

      })
  };

  viewAllPictures = () => {

    this.displayAllPictures();
    this.setState({
      viewUpload: false,
      showAllFavorites: false,
      showAllPictures: true,
      showUploadAlert: false
    })
  };

  viewMyFavorites = () => {
    this.displayFavPictures();
    this.setState({
      viewUpload: false,
      showAllFavorites: true,
      showAllPictures: false,
      showUploadAlert: false
    })
  };

  viewUpload = () => {
    this.setState({
      viewUpload: true,
      showAllFavorites: false,
      showAllPictures: false,
      showUploadAlert: false
    })
  };

  viewSlideshow = () => {

    if (this.state.isOpen === true) {
      this.setState({
        isOpen: false,
        showAllPictures: true,
        viewUpload: false,
        showAllFavorites: false,
        showUploadAlert: false
      })
    } else {
      this.setState({
        isOpen: true,
        showAllPictures: false,
        viewUpload: false,
        showAllFavorites: false,
        showUploadAlert: false
      })
    }

  };

  next = () => {
    // console.log("hello")
    // console.log(this.state.displayPictures.length)
    let newIndex = this.state.photoIndex + 1;
    if (newIndex > (this.state.displayPictures.length - 1)) {
      newIndex = 0;
    }
    // console.log(newIndex)
    this.setState({
      photoIndex: newIndex
    })

  };

  back = () => {
    // console.log("hello")
    // console.log(this.state.displayPictures.length)
    let newIndex = this.state.photoIndex - 1;
    if (newIndex === -1) {
      newIndex = (this.state.displayPictures.length - 1)
    }

    // console.log(newIndex)
    this.setState({
      photoIndex: newIndex
    })

  };

  rotate = () => {
    let newRotation = this.state.rotation + 90;
    if (newRotation >= 360) {
      newRotation = - 360;
    }
    this.setState({
      rotation: newRotation,
    })
  };

  addToFavorites = (picture_id) => {

    let userId = sessionStorage.getItem("_id");

    let data = {
      _id: picture_id,
      fav: this.state.showAllFavorites,
      all: this.state.showAllPictures,
    }

    API.addToFavorites(userId, data)
      .then(res => {
        this.setState({
          displayPictures: res.data,
        })
      })
      .catch(err => console.log(err));
  };


  viewPic = (id) => {
    // console.log(id)
  };

  onSelect = (event) => {
    // console.log(event.target.files);

    this.setState({
      files: event.target.files,
      showUploadAlert: true,
    })
  };


  uploadFiles = (event) => {
    event.preventDefault();
    // console.log(this.state.files[0].type)
    let type = {
      type: this.state.files[0].type
    }
    API.presignedURL(this.state._id, type)
      .then(res => {
        // console.log("return with presigned url")
        // console.log(res.data)
        // console.log(res.data.key)
        let key = res.data.key;

        API.uploadToAWS(res.data.url, this.state.files[0], this.state.files[0].type)
          .then(res => {
            // console.log("uploaded to aws, now adding pictures document")

            let data = {
              name: this.state.files[0].name,
              imageUrl: 'https://s3.amazonaws.com/photoshare-practice/' + key,
              awsKey: key,
            }

            API.addPicture(this.state._id, data)
              .then(res => {
                // console.log("added a new picture collection")
                // console.log(res.data)
                this.viewAllPictures();
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  seeNoteInput = (id, status) => {
    let userId = sessionStorage.getItem("_id");
    let newData = {
      openTextBox: status,
      userId: userId,
    }

    API.updateDisplayPicture(id, newData)
      .then(res => {
        console.log("return from updating display pics")
        console.log(res.data)

        this.setState({
          displayPictures: res.data,
        })
      })
      .catch(err => console.log(err));
  };

  addNote = (picture_id, display_id) => {
    let userId = sessionStorage.getItem("_id");

    let data = {
      user_id: userId,
      text: this.state.note,
      picture_id: picture_id,
      favView: this.state.showAllFavorites,
    }

    API.addPictureNote(data)
      .then(res => {

        this.setState({
          displayPictures: res.data,
          note: "",
        })
      })
      .catch(err => console.log(err));
  };
 

  render = () => {

    // const { photoIndex, isOpen, allPictures } = this.state;

    return (

      <div>

        {this.state.loggedIn ? (
          <div>
            <Navigation
              authUser={this.state.authUser}
              admin={this.state.admin}
              signOut={this.signOut}
            
            />

            <UserIdBar name={this.state.name} />
            <div className="picture-page-header text-center">
              Picture Page
          </div>
            {/* <br /> */}
            <PictureNavbar
              allPictures={this.viewAllPictures}
              myFavorites={this.viewMyFavorites}
              viewUpload={this.viewUpload}

            />

            {
              this.state.viewUpload ? (
                <PictureUpload
                  onSelect={this.onSelect}
                  uploadFiles={this.uploadFiles}
                  files={this.state.files}
                  showUploadAlert={this.state.showUploadAlert}
                />

              ) : (<div></div>)
            }

            {
              this.state.showAllPictures ? (
                <div className="showAllPictures-area">
                  <ViewSlideshowNav
                    viewSlideshow={this.viewSlideshow}
                  />
                  <PictureList
                    pictures={this.state.displayPictures}
                    viewPic={this.viewPic}
                    addToFavorites={this.addToFavorites}

                    rotation={this.state.rotation}
                    rotate={this.rotate}

                    note={this.state.note}
                    onChange={this.onChange}
                    addNote={this.addNote}
                    seeNoteInput={this.seeNoteInput}
                    showNoteInput={this.state.showNoteInput}

                    viewSlideshow={this.viewSlideshow}

                  />
                </div>

              ) : (<div></div>)
            }

            {
              this.state.showAllFavorites ? (
                <div>
                  <ViewSlideshowNav
                    viewSlideshow={this.viewSlideshow}
                  />
                  <PictureList
                    pictures={this.state.displayPictures}
                    viewPic={this.viewPic}
                    addToFavorites={this.addToFavorites}

                    rotation={this.state.rotation}
                    rotate={this.rotate}

                    note={this.state.note}
                    onChange={this.onChange}
                    addNote={this.addNote}
                    seeNoteInput={this.seeNoteInput}
                    showNoteInput={this.state.showNoteInput}

                    viewSlideshow={this.viewSlideshow}
                  />
                </div>

              ) : (<div></div>)
            }

            {
              this.state.isOpen ? (

                <PictureLightbox
                  _id={this.state.displayPictures[this.state.photoIndex].picture._id}
                  image={this.state.displayPictures[this.state.photoIndex].picture.image}
                  name={this.state.displayPictures[this.state.photoIndex].picture.name}
                  next={this.next}
                  back={this.back}
                  viewSlideshow={this.viewSlideshow}

                />

              ) : (<div></div>)
            }

          </div>

        ) : (
            <div className="picture-signin-link-area text-center">
              <div className="picture-signin-link"> <Link to={ROUTES.SIGNIN}>Sign In</Link> </div >
            </div >
          )
        }

      </div >

    );
  };
};



export default Pictures;


