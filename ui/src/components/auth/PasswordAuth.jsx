import React from 'react';
import { Button, Intent } from '@blueprintjs/core';
import { showWarningToast } from 'app/toast';

const messages = {
  not_same: {
    id: 'pass.auth.not_same',
    defaultMessage: 'Your passwords are not the same!',
  },
};
/* eslint-disable */

const PasswordAuth = ({
  onSubmit, buttonClassName, showEmail, showName, showPassword, showConfirmPass, buttonText, children, intl, isActivation, className,
}) => {
  let emailElement; let passwordElement; let confirmElement; let
    nameElement;

  const submit = (event) => {
    event.preventDefault();

    const arePasswordsTheSame = isActivation ? passwordElement.value === confirmElement.value : true;

    if (arePasswordsTheSame) {
      onSubmit({
        email: showEmail && emailElement.value,
        password: showPassword && passwordElement.value,
        name: showName && nameElement.value,
      });
    } else {
      showWarningToast(intl.formatMessage(messages.not_same));
    }
  };

  return (
    <form onSubmit={submit} className={className}>
      {showEmail && (
      <label className="bp3-label">
        Email Address
        <input
          className="bp3-input bp3-fill"
          type="email"
          name="email"
          required
          autoFocus
          ref={el => emailElement = el}
        />
      </label>
      )}
      {showName
        && (
        <label className="bp3-label">
          Your Name
          <input
            className="bp3-input bp3-fill"
            type="text"
            name="name"
            required
            ref={el => nameElement = el}
          />
        </label>
        )}
      {showPassword
        && (
        <label className="bp3-label">
          Password
          <input
            id="pass"
            className="bp3-input bp3-fill"
            type="password"
            name="password"
            required
            ref={el => passwordElement = el}
          />
        </label>
        )}
      {showConfirmPass
      && (
      <label className="bp3-label">
          Confirm Password
        <input
          id="confirm-pass"
          className="bp3-input bp3-fill"
          type="password"
          name="confirm"
          required
          ref={el => confirmElement = el}
        />
      </label>
      )}

      <div className="flex-row">
        <span>
          <Button className={`bp3-large ${buttonClassName}`} intent={Intent.PRIMARY} type="submit">
            {buttonText}
          </Button>
        </span>
        <span>
          {children}
        </span>
      </div>
    </form>
  );
};

export const PasswordAuthLogin = ({ onSubmit, buttonClassName }) => (
  <PasswordAuth
    onSubmit={onSubmit}
    showEmail
    showPassword
    buttonClassName={buttonClassName}
    buttonText="Sign In"
  >
    {' '}
  </PasswordAuth>
);

export const PasswordAuthSignup = ({ onSubmit, buttonClassName }) => (
  <PasswordAuth
    onSubmit={onSubmit}
    showEmail
    buttonClassName={buttonClassName}
    buttonText="Sign Up"
  >
    {' '}
  </PasswordAuth>
);

export const PasswordAuthActivate = ({ onSubmit, intl, className }) => (
  <PasswordAuth
    onSubmit={onSubmit}
    showPassword
    showName
    isActivation
    className={className}
    intl={intl}
    showConfirmPass
    buttonText="Activate"
  />
);




// import React, { Component } from 'react';
// import {
//   Callout, Intent, Dialog, MenuDivider, Button
// } from '@blueprintjs/core';
// import { showErrorToast } from 'app/toast';


// const messages = {
//   not_same: {
//     id: 'pass.auth.not_same',
//     defaultMessage: 'Your passwords are not the same!'
//   }
// }


// class PassworthAuth = ({
//   onSubmit
// }) => {
//   let emailElement;
// }


// // class PasswordAuth = ({
// //   onSubmit, buttonClassName, showEmail, showName, showPassword, showConfirmPass, buttonText, children, isActivation, className
// // }) => {
// //   let emailElement;
// //   let passwordElement;
// //   let confirmElement;
// //   let nameElement;

// //   const submit = (event) => {
// //     event.preventDefault();
// //     const arePasswordsTheSame = isActivation ? passwordElement.value === confirmElement.value : true;

// //     if (arePasswordsTheSame) {
// //       onSubmit({
// //         email: showEmail && emailElement.value,
// //         password: showPassword && passwordElement.value,
// //         name: showName && nameElement.value
// //       });
// //     } else {
// //       showErrorToast(messages.not_same)
// //     }
// //   };

// //   return (
// //     <form onSubmit={submit} className={className}>
      
// //       {showEmail && (
// //       <label className="bp3-label">
// //         Email Address
// //         <input
// //           className="bp3-input bp3-fill"
// //           type="email"
// //           name="email"
// //           required
// //           autoFocus
// //           ref={el => emailElement = el}
// //         />
// //       </label>
// //       )}
// //     {
// //       showName 
// //       && (
// //         <label className="bp3-label">
// //           Your Name
// //           <input
// //             className="bp3-input bp3-fill"
// //             type="email"
// //             name="email"
// //             required
// //             autoFocus
// //             ref={el => emailElement = el}
// //           />
// //         </label>
// //       )}
// //     {showConfirmPass 
// //       && (
// //         <label className="bp3-label">
// //           Confirm password
// //           <input
// //             id="confirm-pass"
// //             className="bp3-input bp3-fill"
// //             type="password"
// //             name="confirm"
// //             required
// //             ref={el => confirmElement = el}
// //           />
// //         </label>
// //       )}
      
// //       <div className="flex-row">
// //         <span>
// //           <Button className={`bp3-large ${buttonClassName}`} intent = {Intent.PRIMARY} type = "submit">
// //             {buttonText}
// //           </Button>
// //         </span>
// //         <span>
// //           {children}
// //         </span>
// //       </div>
// //     </form>
// //   )
// // }

// export const PasswordAuthLogin = ({ opnSubmit, buttonClassName }) => {
//   <PasswordAuth 
//     onSubmit={onSubmit}
//     showEmail
//     buttonClassName={buttonClassName}
//     buttonText={"Sign up"}
//   >
//     {''}
//   </PasswordAuth>
// };

// export const PasswordAuthSignup = ({ onSubmit, buttonClassName }) => (
//   <PasswordAuth 
//     onSubmit={onSubmit}
//     showEmail
//     buttonClassName={buttonClassName}
//     buttonText ="Sign up"
//   >
//     {' '}
//   </PasswordAuth>
// )

// export const PasswordAuthActivate = ({ onSubmit, classname }) => {
//   <PasswordAuth
//     onSubumit={onSubmit}
//     showPassword
//     showName
//     isActivation
//     className={className}
//     showConfirmPass
//     buttonText="Activate"
//   />
// };






// // export const PasswordAuthActivate = ({ onSubmit, className }) => (

// // );



