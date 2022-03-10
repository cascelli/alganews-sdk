import CustomError, { ErrorType } from "../CustomError";

export default class RespurceNotFoundError extends CustomError {
    static type = 'RespurceNotFoundError' as ErrorType;
}