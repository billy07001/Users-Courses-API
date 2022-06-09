import type { NextApiRequest, NextApiResponse } from 'next'
import { Enrollment } from '../../../../data.js'
import { Courses } from '../../../../data.js'

export default function userHandler(req: NextApiRequest, res: NextApiResponse) {
    const httpMethod = req.method;
    const userid = req.query.userid;
    var result = Enrollment.filter((enrollment) => enrollment.userId === Number(userid));
    var courseArr = new Array();

    for (var i = 0 ; i < result.length ; i++){
        courseArr[i] = Courses.filter((course) => course.id === result[i].courseId);
    }

    switch (httpMethod) {
      case 'GET':
        //Get one user by the user's id
        if (result.length > 0)
          res.status(200).json(courseArr);
        else 
          res.status(400).json({message: 'Bad Request: User not found', status:400});
        break;

      default:
        res.setHeader('Allow', ['GET', 'PUT' , 'DELETE']);
        res.status(405).end('Method '+ httpMethod +' Not Allowed');
    }
  }