


//A palavra-chave extends é usada em uma declaração de classe, 
//ou em uma expressão de classe para criar uma classe como filha de uma outra classe.

class ForbiddenError extends Error{

    constructor(
        public message: string,
        public error? : any, 
    )
    {
        super(message);

    }

}

export default ForbiddenError


// Um construtor pode usar a palavra-chave super para chamar o construtor de uma classe pai.