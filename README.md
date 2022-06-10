This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

以下按照題號，有對應的答案URL
1. (POST) http://localhost:3000/api/user  request body = { name , email }
2. (GET) http://localhost:3000/api/user/id/[id]
3. (GET) http://localhost:3000/api/user request body = { name , email }
4. (PUT) http://localhost:3000/api/user/id/[id] request body = { name , email }
5. (DELETE) http://localhost:3000/api/user/id/[id]
6. (GET) http://localhost:3000/api/enrollment/courseid/[courseid]
7. (POST) http://localhost:3000/api/enrollment request body = { userid , courseid , role }
8. (DELETE) http://localhost:3000/api/enrollment/enrollmentid/[enrollmentid]
9. (GET) http://localhost:3000/api/enrollment/enrollmentid/[enrollmentid]
10. (GET) http://localhost:3000/api/enrollment Params = { enrUserid , enrCourseid , enrRole }
11. (GET) http://localhost:3000/api/course/id/[courseid]
12. (GET) http://localhost:3000/api/enrollment/userid/[userid]
