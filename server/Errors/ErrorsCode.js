class ErrorsCode extends Error{
    constructor(status, message) {
        super()
        this.status = status
        this.message = message
    }

    static badRequest(){
        return new ErrorsCode(400, "Bad request")
    }

    static unexpectedError(message = "Непредвиденная ошибка"){
        return new ErrorsCode(500, message)
    }
    static userNotFound(){
        return new ErrorsCode(404, "Пользователь не найден")
    }
    static tokenExpired(){
        return new ErrorsCode(498, "Токен просрочен")
    }
}

module.exports = ErrorsCode;