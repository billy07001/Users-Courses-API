import type { NextApiRequest, NextApiResponse } from 'next'
import { Enrollment } from '../../../../data.js'
import { Users } from '../../../../data.js'

export default function userHandler(req: NextApiRequest, res: NextApiResponse) {
    const httpMethod = req.method;
    const courseid = req.query.courseid;
    var result = Enrollment.filter((enrollment) => enrollment.courseId === Number(courseid));
    var userArr = new Array();

    for (var i = 0 ; i < result.length ; i++){
        userArr[i] = Users.filter((user) => user.id === result[i].userId);
    }

    switch (httpMethod) {
      case 'GET':
        //Get one user by the user's id
        if (result.length > 0)
          res.status(200).json(userArr);
        else 
          res.status(400).json({message: 'Bad Request: Course not found', status:400});
        break;

      default:
        res.setHeader('Allow', ['GET', 'PUT' , 'DELETE']);
        res.status(405).end('Method '+ httpMethod +' Not Allowed');
    }
  }