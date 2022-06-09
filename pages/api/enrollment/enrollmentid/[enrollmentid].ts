import type { NextApiRequest, NextApiResponse } from 'next'
import { Enrollment } from '../../../../data.js'

export default function userHandler(req: NextApiRequest, res: NextApiResponse) {
    const httpMethod = req.method;
    const { userid , courseid , role } = req.body;
    const enrollmentid = req.query.enrollmentid;
    const EnrollmentCount = Enrollment.length;
    var result = Enrollment.filter((enrollment) => enrollment.id === Number(enrollmentid));
    var resultindex = Enrollment.indexOf(result[0]);

    switch (httpMethod) {
      case 'GET':
        //Get one user by the user's id
        if (result.length > 0)
          res.status(200).json(result[0]);
        else 
          res.status(400).json({message: 'Bad Request: Enrollment not found', status:400});
        break;

      case 'DELETE':
        // Delete the user
          Enrollment.splice(resultindex,1);
          if (result.length > 0)
            res.status(200).json({
              message : "The user had been withdraw",
              status : 200
            });
          else
            res.status(400).json({message: 'Bad Request: Enrollment not found', status:400});
        break;
      default:
        res.setHeader('Allow', ['GET' , 'DELETE']);
        res.status(405).end('Method '+ httpMethod +' Not Allowed');
    }
  }