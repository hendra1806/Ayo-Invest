const express = require('express')
const Controller = require('./controllers/controllers')
const app = express()
const port = 3000

app.set('view engine','ejs')

app.use(express.urlencoded({extended:false}))

app.get('/',Controller.home)
// app.get('/masters',Controller.masterList)
// app.get('/students',Controller.studentList)
// app.get('/students/add',Controller.addStudent)
// app.post('/students/add',Controller.addStudentPost)
// app.get('/masters/:masterId',Controller.masterStudent)
// app.get('/students/:studentId/train',Controller.train)
// app.get('/students/:studentId/graduate',Controller.graduate)

app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})