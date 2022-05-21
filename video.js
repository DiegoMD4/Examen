const express = require("express");
const mongoose = require("mongoose");
var router = express.Router();

const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

mongoose.connect("mongodb+srv://diegomd44:gaurplain@cluster0.r4icu.mongodb.net/VideoDB?retryWrites=true&w=majority")
.catch((error)=> handleError(error))


const videoSchema = new mongoose.Schema({
titulo: String,
descripcion: String,
duracion: String,
autor: String,
enlace: String,
fecha: Date.now(),
},
{
    collection: "Video",
})


const Videox = new mongoose.model("Videox", videoSchema);

//Metodo POST para agregar
router.post("/", (req, res)=>{
    req.fecha = Date.now();
    const nvideo = new Videox({
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        duracion: req.body.duracion,
        autor: req.body.autor,
        enlace: req.body.enlace,
        fecha:  req.body.fecha,
    });
    
    nvideo.save((err, nvideo)=>{
        if(err){
            res.status(500).send("error en la DB");
        }else{
            res.status(200).json(nvideo);
        }
    });
});





//Metodo GET todos los videos 
router.get("/", (req, res)=>{
    Videox.find((err, video)=>{
        if(err) res.status(500).send("Error en la DB");
        else{
            res.status(200).json(video);
        }
    });
});

//Metodo GET por id
router.get("/:id", (req, res)=>{
    Videox.findById(req.params.id, (err,video)=>{
        if(err){
            res.status(500).send("Error en la DB");
        }else{
            if(video != null){
                res.status(200).json(video);
            }else res.status(404).send("No se encontro");
        }
    });
});

//Metodo GET por autor

router.get("/pautor", (res, req) =>{
    Videox.find({autor: req.query.autor}, (err, video)=>{
        if(err){
            res.status(500).send("Error en la BD");
        }else{
            res.status(200).json(video);
        }
    });
});

//Metodo GET por fechas

router.get("/fecha", (res, req)=>{
    Videox.find({fecha: {$gte: req.query.fecha1, $lte: req.query.fecha2}}, (err,video)=>{
        if(err){
            res.status(500).send("Error en la bd");
        }else{
            res.status(200).json(video);
        }
    });
});

//Metodo DELETE por id

router.delete('/:id', (res, req)=>{
    Videox.findById(req.params.id , (err, video)=>{
        if(err) res.status(500).send("Error en la BD");
        else{
            if(video != null){
                video.remove((er, result)=>{
                    if(er){
                        res.status(500).send("Error en la BD");
                    }else{
                        res.status(200).send("Eliminado");
                    }
                });
            }
        }res.status(404).send("No se encontro");
    });
});

module.exports = router;