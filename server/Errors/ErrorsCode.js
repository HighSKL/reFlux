class ErrorsCode extends Error{
    constructor(status, message) {
        super()
        this.status = status
        this.message = message
    }

    static badRequest(){
        return new ErrorsCode(400, "Bad request")
    }
}

module.exports = ErrorsCode;