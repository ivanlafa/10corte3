const express = require('express');
const jwt = require('jsonwebtoken');


const app = express();

app.use(express.static('public'));


//http://localhost:3000/api
//ruta principal
app.get('/api',(req,res)=>{
    res.json({
        mensaje:"node js en json web token"
    })
})

//http://localhost:3000/api/login
//ruta del loginpa tener el token
app.post('/api/login',(req,res)=>{
const user = {
    id: 1,
    nombre : "IVAN",
    email: "ivan@gmail.com"
}

jwt.sign({ user}, 'secretkey', {expiresIn: '15min'},(err, token) => {
res.json({
   token
})
})

})

//http://localhost:3000/api/posts
//me muestra los datos
app.post('/api/posts' ,verifyToken, (req,res)=>{
    jwt.verify(req.token, 'secretkey', (error,authData) => {
    if (error) {
        res.sendStatus(403)
    }else{
        res.json({
            mensaje: "post fue creado",
            authData
        })
    }
    })
})


//funcion para verificar el token
function verifyToken(req,res,next) {
   const bearerHeader = req.headers['authorization']

   if (typeof bearerHeader !== 'undefined') {
    const bearerToken =  bearerHeader.split(" ")[1];
    req.token = bearerToken;
    next();
   }else{
    res.sendStatus(403)//ruta o acceso prohibido
   }
}




app.listen(3000, function(){
    console.log('Servicio iniciado en el puerto...',3000)
})
