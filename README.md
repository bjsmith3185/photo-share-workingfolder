# Smith Family Foto Share
This repo contains updates and changes to the original version of photo-share

To view this app deployed: 



DETAILS OF APP

This app allows users to upload and share photos.

2 types of accounts: User or Administrator

User:
    * view all photos
    * save photos to their favorites
    * comment on any photo
    * update their user data
    * change their password

Administrator:
    * do all the above features plus
    * add new users
        (enter a new users name and email, the app will send the new user an email with their username and password)
    * view current online users
    * update any users data
    * remove pictures
    * delete a user


This app currently uses auth that was created from scratch using mongodb.
    - the default password is 123456 when a user is created
    - each user is encouraged to change this password asap
    - the password and email are checked against those stored in the database 
        - if incorrectly entered the user will be prompted to try again

This app also used mongodb for storage
    - a collection stores picture data
    - a collection stores user data
    - a colleciton stores comments for photos
    - a collection stores a 'template' used to display each picture
        ( this template allows individual users to see which pictures are their own favorites)


future plans:
    - store all picture data on AWS S3
    - I need to add some style and responsiveness to the UI!!!!!!
    - fix the rotate image button...

BJS