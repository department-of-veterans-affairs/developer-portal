// export const submitFormStub : ActionCreator<SubmitFormThunk> = () => {
//   return (dispatch, getState) => {
//     dispatch(submitFormBegin());

//     const applicationBody = buildApplicationBody(getState());

//     return new Promise((resolve, reject) => {
//       if ((applicationBody as any).lastName === 'McError') {
//         resolve(dispatch(submitFormError('Could not sign you up. Sorry!')));
//       } else if ((applicationBody as any).lastName === 'McFailure') {
//         resolve(dispatch(submitFormError('Fake failure!')));
//       } else {
//         resolve(dispatch(submitFormSuccess('superFakeTokenThatDoesNotWorkForAnything')));
//         history.push('/applied');
//       }
//     });
//   };
// };
