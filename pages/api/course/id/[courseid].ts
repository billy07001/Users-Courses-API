import type { NextApiRequest, NextApiResponse } from 'next'
import { Courses } from '../../../../data.js'

export default function userHandler(req: NextApiRequest, res: NextApiResponse) {
    const httpMethod = req.method;
    const courseid = req.query.courseid;
    var result = Courses.filter((course) => course.id === Number(courseid));
  
    switch (httpMethod) {
      case 'GET':
        //Get one user by the user's id
        if (result.length > 0)
          res.status(200).json(result[0]);
        else 
          res.status(400).json({message: 'Bad Request: User not found', status:400});
        break;

      default:
        res.setHeader('Allow', ['GET', 'PUT' , 'DELETE']);
        res.status(405).end('Method '+ httpMethod +' Not Allowed');
    }
  }