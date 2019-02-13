import React from "react";
import "./MyAlert.css";


import Alert from 'react-s-alert';
// import MyCustomContentTemplate from '../MyCustomTemplate/MyCustomTemplate';


const MyCustomContentTemplate = ({
  id,
  classNames,
  styles,
  message,
  customFields,
  handleClose,
}) => {
  const handleConfirm = () => {

      Alert.close(id);
  }
  return (
      <div className={classNames} id={id} style={styles}>
          <div className='s-alert-box-inner'>
              {message}
          </div>
          <h3 className="customer">{customFields.customerName}</h3>
          <button className="customButton" onClick={handleConfirm.bind(this)}>Delete</button>
          <span className='s-alert-close' onClick={handleClose}></span>
      </div>
  );
}
























const MyAlert = (props) => {
  



  // const handleHtml = (e) => {
  //   e.preventDefault();
  //   Alert.info('<h4>Test message with HTML!</h4><ul><li>List item 1!</li><li>List item 2!</li></ul>', {
  //     position: 'top-right',
  //     effect: 'slide',
  //     html: true
  //   });
  // }
 
//  openAlert = (e) => {
//     e.preventDefault();
//     // const customerName = 'Click To Delete Picture';
//     Alert.info('Click To Delete Picture', {
//       position: 'top-left',
//       // customFields: {
//       //   message: "hello",
//       // }
//     });
//   }

  return (
    <div>
      <div className="myalert-delete-btn" onClick={props.openAlert}>Delete Picture</div>

      <Alert stack={false} timeout={3000} contentTemplate={MyCustomContentTemplate} />
    </div>
  );
};

export default MyAlert;
