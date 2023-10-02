import { Router } from "express";
import { Response, Request } from "express";

const api = Router(); 

interface User {
  username: string, 
  password: string
}

// this is merely for learning purposes
const users: User[] = [
  {
    username: 'adrian',
    password: 'helloworld'
  },
  {
    username: 'james', 
    password: 'giberish'
  }
]

function findInArry (arr: Array<User>, val: string) {
  let status = false;

  for (const username in users) {
    if (users.hasOwnProperty(username)) {           // this is redundant  
      let value: User = users[username]
      if (value.username === val) {
        status = !status
      }
    }
  }

  return status

}

function verifyPassword(password: string, users: Array<User>) {
  
  let status = false;
  
  for (const pass in users) {
    let value: User = users[pass]
    if (value.password === password) {
      status = !status 
      break
      }
    }

  return status 

}

api.post('/api/create-user', (req: Request, res: Response) => {

  const {username, password} = req.body
  console.log(req.body)
  
  let checkIfUserExists = findInArry(users, username);

  console.log(checkIfUserExists)

  if (checkIfUserExists === true) {
    return res.json({success: false}); 
  } else {
    users.push({ username, password })
    return res.status(300).json({success: true})
  };

});

api.post('/api/login', (req: Request, res: Response) => {
  const {username, password} = req.body; 

  if (verifyPassword(password, users) && findInArry(users, username) === true) {
    return res.json({success: true, redirectUrl: '/loggedin'});
  } else {
    return res.json({success: false, redirectUrl: '/login'});
  }

})

export default api