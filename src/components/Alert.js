import React from 'react';

function Alert(props) {
    const capitalize = (word) => {
        if (word==="danger"){
           word="error";
           
        } 
        return word[0].toUpperCase() + word.slice(1);
    }

    return (
        <div style={{ height: '50px' }}>
            {props.alert && (
                <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                    <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
                </div>
            )}
        </div>
    );
}

export default Alert;
