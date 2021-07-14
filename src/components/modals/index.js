import Remove from './remove.jsx';
import AddRename from './add-rename.jsx';

const modals = {
  add: AddRename,
  remove: Remove,
  rename: AddRename,
};

export default (modalName) => modals[modalName];
