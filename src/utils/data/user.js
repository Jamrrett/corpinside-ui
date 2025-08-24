import users from '@/data/users.json';

export const getUserById = (id) => {
  return users.find(user => user.id === id);
}

export const postLogin = ({account, password}) => {
  return new Promise((resolve, reject) => {
    const user = users.find(user => user.username === account && user.password === password);
    if (user) {
      resolve({
        code: 200,
        data: {
          accessToken: 'ACCESS_TOKEN',
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            introduction: user.introduction,
            resume: user.resume,
          }
        }
      });
    } else {
      reject({
        code: 400,
        message: '账号或密码错误！',
      });
    }
  });
}
