// import { extractDataFromModelInstances } from 'utils/models';
import { encryptPassword } from 'utils/auth';
import User from './model';

class UserService {
  static getUserInstanceByEmail = async (email) => {
    const user = await User.findOne({ email }, '+password');

    return user;
  };

  static getUserInstanceById = async(id) => {
    const user = await User.findOne({ _id: id });

    if (!user) {
      console.error('Id doesn\'t exist');
    }
    return user;
  };

  static createUser = async(email, password, name) => {
    const encryptedPassword = await encryptPassword(password);
    const newUserData = {
      email,
      password: encryptedPassword,
      name: name || email.split('@')[0]
    };

    const newUser = await new User(newUserData);
    newUser.save();

    return newUser.getData();
  }
}

export default UserService;
