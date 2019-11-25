
success = {"statusCode":'000',"message":'Success'};
create = {"statusCode":'001',"message":'Creado con exito'}
login_invalid = {"statusCode":"002","message":"Email o Password invalido"}
extension_invalid = {"statusCode":'005','message':'Extension invalida'}
no_register = {"statusCode":'006','message':'No existe registro'}
no_token = {'statusCode':'007','message':'Token no enviado'}
no_permission = {'statusCode':401,'message':'No tienes permiso para realizar esta accion'}
error = {"statusCode":500,"message":'Error interno'}
error_exec = {"statusCode":501,"message":"Error en ejecucion"}

module.exports = { 
    success, create, error, error_exec, no_permission, 
    login_invalid, extension_invalid, no_register, no_token
}