import type { NextApiRequest, NextApiResponse } from 'next'
import { Users } from '../../../../data.js'

export default function userHandler(req: NextApiRequest, res: NextApiResponse) {
    const httpMethod = req.method;
    const userid = req.query.userid;
    const { id , name , email } = req.body;
    var result = Users.filter((user) => user.id === Number(userid));
    var resultindex = Users.indexOf(result[0]);
    const re = new RegExp('/^\S@\S$/');
  
    switch (httpMethod) {
      case 'GET':
        //Get one user by the user's id
        if (result.length > 0)
          res.status(200).json(result[0]);
        else 
          res.status(400).json({message: 'Bad Request: User not found', status:400});
        break;
      case 'PUT':
          // Update the user's profile
          if (re.test(email) == false)
            res.status(400).json({message: 'Bad Request: Email pattern not match', status:400});
          else {
            Users[Number(userid)-1] = {
              "id" : Number(userid),
              "name" : name,
              "email" : email
            };
          }

          if (result.length > 0)
            res.status(200).json(Users[Number(userid)-1]);
          else
            res.status(400).json({message: 'Bad Request: User not found', status:400});
          break;
      case 'DELETE':
        // Delete the user
          Users.splice(resultindex,1);
          if (result.length > 0)
            res.status(200).json({
              message : "The user had been delete",
              status : 200
            });
          else
            res.status(400).json({message: 'Bad Request: User not found', status:400});
        break;
      default:
        res.setHeader('Allow', ['GET', 'PUT' , 'DELETE']);
        res.status(405).end('Method '+ httpMethod +' Not Allowed');
    }
  }