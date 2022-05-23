import userScrapper from './userScrapper';
import perm from './permissions.json';

const permissionScrapper = (returnGridStyle = false) => {
  let { role } = userScrapper();
  let permissions = [...perm];
  let counter = 1;
  permissions = permissions.filter((permission) => {
    return permission['availableFor' + role] === true && counter++;
  });
  counter--;
  let gridStyle = '';
  for (let i = 0; i < counter; i++) gridStyle += '1fr ';
  if (returnGridStyle) return gridStyle;
  return permissions;
};

export default permissionScrapper;
