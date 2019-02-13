import React from 'react';
import Alert from 'react-s-alert';

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

export default MyCustomContentTemplate;
