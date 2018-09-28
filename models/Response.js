
class Response{
    constructor(code,success,msg,data){

        // Number thar indicates a response code other than http status
        this.code = code

        // Bool used for simple Client validations
        this.success = success

        // Custom message for client response
        this.message = msg

        // Data for success and bad request
        this.data = data
    }
}

// SuccessResponse creates a success http response 
exports.SuccessResponse = function(data, msg, code=200){
    return new Response(code,true,msg,data);
};

// BadRequest creates a BadRequest http response 
exports.BadRequest = function(data, msg, code=400){
    return new Response(code,false,msg,data);
};

// InternalError creates a Internal Server Error http response 
exports.InternalError = function(code){
    return new Response(code,false,"Internal server error",null);
};