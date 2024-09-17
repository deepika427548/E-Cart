
export default (err,req,res,next)=>{

    let error={
        statusCode:err.statusCode || 500 ,
        message:err.message  || "internal server error"
    }

    res.status(error.statusCode).json({message:error.message,
        error:err,
        stack:err.stack
    })

}