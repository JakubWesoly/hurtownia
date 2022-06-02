export default () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (userInfo != null)
    return {
      id: userInfo[0],
      login: userInfo[1],
      role: userInfo[2],
      verified: userInfo[3],
    };
  else return { id: null, login: null, role: null };
};
