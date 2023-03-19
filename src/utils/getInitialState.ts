export const getInitialState = () => {
  const state = localStorage.getItem('state');

  if (state) {
    const parsedState = JSON.parse(state);
    return parsedState;
  } else {
    return { deskList: [], taskList: [], commentList: [], userName: '' };
  }
};
