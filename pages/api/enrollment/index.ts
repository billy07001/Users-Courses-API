import type { NextApiRequest, NextApiResponse } from 'next'
import { Enrollment } from '../../../data.js'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const httpMethod = req.method;
    const { userid , courseid , role } = req.body;
    const { enrUserid , enrCourseid , enrRole} = req.query;
    const EnrollmentCount = Enrollment.length;
    var result = Enrollment;

    switch (httpMethod) {
        case 'GET' :
            if (enrUserid != undefined){
                result = result.filter((enrollment) => enrollment.userId === Number(enrUserid));
            }
            if (enrCourseid != undefined){
                result = result.filter((enrollment) => enrollment.courseId === Number(enrCourseid));
            }
            if (enrRole != undefined){
                result = result.filter((enrollment) => enrollment.role === enrRole);
            }
            if (result.length > 0)
              res.status(200).json(result);
            else 
              res.status(400).json({message: 'Bad Request: Enrollment not found', status:400});
            break;
        case 'POST' : 
            if ( userid != null && courseid != null && role != null ){
                Enrollment[EnrollmentCount] = {
                    "id" : EnrollmentCount+1,
                    "userId" : userid,
                    "courseId" : courseid,
                    "role" : role
                };
                res.status(200).json(Enrollment[EnrollmentCount]);
            }
            else {
                res.status(400).json({
                    message : "Bad Request: the user or the course or the role doesn't exist",
                    status : 400
                });
            }
            break;
        default :
            res.setHeader('Allow', ['GET' , 'POST']);
            res.status(405).end('Method '+httpMethod+' Not Allowed');
    }
}