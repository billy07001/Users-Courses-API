import type { NextApiRequest, NextApiResponse } from 'next'
import { Users } from '../../../data.js'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const httpMethod = req.method;
    const { id , name , email } = req.body;
    const usersCount = Users.length;
    const re = new RegExp('/^\S@\S$/');
    var result = Users;

    switch (httpMethod) {
        case 'GET' :
            if (name != null){
                result = Users.filter((user) => user.name === name);
            }
            else if (email != null && re.test(email) == true){
                result = Users.filter((user) => user.email === email);            }
            else {
                result = [];
            }
            if (result.length > 0)
              res.status(200).json(result);
            else 
              res.status(400).json({message: 'Bad Request: User not found', status:400});
            break;
        case 'POST' : 
            if (re.test(email) == true){
                Users[usersCount] = {
                    "id" : usersCount+1,
                    "name" : name,
                    "email" : email
                };
                res.status(200).json({
                    id : id,
                    name : name,
                    email : email
                });
            }
            else {
                res.status(400).json({
                    message : "Bad Request: Email pattern not match",
                    status : 400
                });
            }
            break;
        default :
            res.setHeader('Allow', ['GET' , 'POST']);
            res.status(405).end('Method '+httpMethod+' Not Allowed');
    }
}