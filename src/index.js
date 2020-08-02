const express = require ('express');
const app= express();
const path =require('path')
const morgan =require('morgan');
const { use } = require('./routes/task.routes');
const {mongoose}=require('./database')


//settings
app.set('port', process.env.PORT || 5500)

//Middlewares
app.use(morgan('dev'))
app.use(express.json())


//routes
app.use('/api/tasks', require('./routes/task.routes'))

//static files
app.use(express.static(path.join(__dirname, 'public')))
//starting servre

app.listen(app.get('port'), ()=>{ 
    console.log(`Server on port ${app.get("port")}`)
});