import axios from "axios";


export default {

  // =========== route /populate/....

  populateUsers: function () {
    return axios.post("/populate/users");
  },

 
  // =========== route /system/....

  getdisplayPicturesAll: function (id) {
    console.log("client side api" + id)
     return axios.get("/api/system/displaypictures/all/" + id)
  },

  getdisplayPicturesFav: function (id) {
    return axios.get("/api/system/displaypictures/fav/" + id)
  },

  getSecretQuestions: function () {
    return axios.get('/system/questions')
 },

 emailSinglePassword: function (data) {
  // console.log(data)
  return axios.put("/system/password", data);
},


  // =========== route /api/user/....

  getAllUsers: function () {
    return axios.get("/api/users");
  },

  getUser: function (_id) {
    return axios.get("/api/users/" + _id)
  },

  addUser: function (data) {
    return axios.post("/api/users/new", data);
  },

  updateUserById: function (id, data) {
    return axios.put("/api/users/id/" + id, data)
  },

  signOutUser: function (id) {
    return axios.put("/api/users/signout/" + id)
  },

  login: function (email, data) {
    return axios.put("/api/users/login/" + email, data)
  }, 

  updateUser: function (name, data) {
    return axios.put("/api/users/" + name, data)
  },

  addToFavorites: function (id, data) {
    return axios.put("/api/users/favorites/" + id, data);
  },

  deleteUser: function (id) {
    return axios.delete("/api/users/" + id);
  },

  //------- is this necessary----
  updateUserByEmail: function (email, data) {
    return axios.put("/api/users/email/" + email, data)
  },
  //------------------------------------


  // ========= route /api/pictures

  removeOnePicture: function (id, data) {
    return axios.put('/api/pictures/deleteone/' + id , data)
  },

  getAllPictures: function () {
    return axios.get("/api/pictures");
  },

  removeAllPictures: function (id) {
    console.log("remove all")
    return axios.delete('/api/pictures/deleteall/' + id)
  },
  
  addPicture: function (id, data) {
    return axios.post('/api/pictures/'+ id, data)
  },


  // =========== route /api/comments

  addPictureNote: function (data) {
    return axios.post('/api/comments', data);
  },


  // ========== route /api/aws

  presignedURL: function (id, data) {
    return axios.post("/api/aws/presignedurl/" + id, data);
  },

  uploadToAWS: function (url, file, type) {
    return axios.put(url, file, {
      headers: {
        'Content-Type': type
      }
    })
  },


  // ========== route /api/display

  updateDisplayPicture: function (id, data) {
    return axios.put("/api/display/" + id, data)
 },








//======== Extras! ================

// getUserByEmail: function (email) {
//   return axios.get("/api/users/email/" + email)
// },

//  updatePicture: function (id, data) {
//   return axios.put("/api/pictures/" + id, data)
// },

//  getOnlineUsers: function () {
//   return axios.get("/api/users/online");
// },











  // addToDisplayPictures: function (data) {
  //   // console.log("api")
  //   // console.log(data)
  //   return axios.post("/api/display", data)
  // },

  // getAllDisplayPictures: function () {
  //   return axios.get("/api/display")
  // },


  // getSpecificUserDisplayPictures: function (userId) {
  //   return axios.get("/api/display/" + userId)
  // },

  // emptySpecificDisplayPictures: function (userId) {
  //   return axios.delete("/api/display/" + userId);
  // },

  

//   addRemoveFavorite: function (id, data) {
//     return axios.put("/api/display/favorite/" + id, data)
//  },

  // createManyDisplayPictures: function (data) {
  //   return axios.post("/api/display/many", data)
  // },




};

