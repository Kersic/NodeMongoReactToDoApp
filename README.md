# ToDo App with Next.js Node.js and MongoDB

To do Web App for School project. Created with Node.js (Express), MongoDB and Next.js.

<hr/>

APP: https://flamboyant-nightingale-240bca.netlify.app/list
<br />
run locally: npm run dev

###### checklist for deploying express with mongoDB atlas on Heroku:
- follow :https://medium.com/@finn.woelm/how-to-deploy-nextjs-on-netlify-with-server-side-rendering-9e8c06a06e77
- to run app from subfolder add base = "directory_name" to netlify.toml (netlify.toml should be in root directory)
- push changes to repository
- create a new site on Netlify (Build command: npm run build, Publish directory: out_publish)

<hr/>

SERVER: https://hidden-fjord-68747.herokuapp.com/
<br />
run locally: node index.js

###### checklist for deploying express with mongoDB atlas on Heroku:
- add start command in package.json
- use process.env.MONGODB_URI for database connection (index.js)
- use process.env.PORT for starting server (index.js)
- whitelist 0.0.0.0/0 in mongo db atlas under Network Access
- add MONGODB_URI to Config Vars in heroku app settings (not PORT)
- deploy to heroku: https://devcenter.heroku.com/articles/deploying-nodejs
- debug with "heroku logs --tail"
