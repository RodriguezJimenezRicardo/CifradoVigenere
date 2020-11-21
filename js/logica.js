class CifrarVigenere{
    constructor(TextoClaro, TextoClave){
        this.TextoClaro = TextoClaro;
        this.TextoClave = TextoClave;
    }
    tablaCesar =['A', 'B', 'C', 'D', 'E', 'F',
                'G', 'H', 'I', 'J', 'K', 'L', 'M',
                'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T',
                'U', 'V', 'W', 'X', 'Y', 'Z'];
    
    getTextoCifrado(){
        let indiceX = 0;
        let indiceY = 0;
        for(let i=0;  i<this.tablaCesar.length; i++){
            if(this.TextoClaro == this.tablaCesar[i]){
                indiceX  = i;
                break;
            }
        }

        for(let j=0; j<this.tablaCesar.length; j++){
            if(this.TextoClave == this.tablaCesar[j]){
                indiceY = j;
                break;
            }
        }
        
        return this.tablaCesar[(indiceX+indiceY)%27];
    }
}

class DescifrarVigenere{
    constructor(TextoCifrado, TextoClave){
        this.TextoCifrado=TextoCifrado;
        this.TextoClave=TextoClave;
    }
    tablaCesar =['A', 'B', 'C', 'D', 'E', 'F',
                'G', 'H', 'I', 'J', 'K', 'L', 'M',
                'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T',
                'U', 'V', 'W', 'X', 'Y', 'Z'];
    getTextoDescifrado(){
        let indiceCifrado=0;
        let indiceClave = 0;
        for(let i=0;  i<this.tablaCesar.length; i++){
            if(this.TextoCifrado == this.tablaCesar[i]){
                indiceCifrado  = i;
                break;
            }
        }

        for(let j=0; j<this.tablaCesar.length; j++){
            if(this.TextoClave == this.tablaCesar[j]){
                indiceClave = j;
                break;
            }
        }
        if(indiceCifrado>=indiceClave){
            return this.tablaCesar[(indiceCifrado-indiceClave)%27];
        }else{
            return this.tablaCesar[27-(indiceClave-indiceCifrado)];
        }
    }
}

class VigeOperacion{
    constructor(){
       
    }
    mensaje=[];
    clave=[];
    resultado=[];
    matriz=[[], []];
    


    VigeOperacion(msj, clave){
        this.mensaje=msj.split('');
        let claveTemp = clave.split('');
        this.clave = new Array(this.mensaje.length);

        let cont =0;

        //recorrer el tamaño de la clave 
        for(let i=0; i<this.mensaje.length; i++){
            this.clave[i] = claveTemp[cont];
            //Tenemmos que recorrer el mensaje y colocar tantas veces como sea necesaria el mensaje
            cont++;
            if(cont==claveTemp.length){
                cont=0;
            }
        }
        this.matriz=this.generarMatrizABC();
        this.Cifrar();

    }

    generarMatrizABC(){
        let contador;
        let abcTemp= this.generarAbecedario();
        let abc = new Array(abcTemp.length*2);

        for(let i=0; i<26; i++){
            abc[i]=abcTemp[i];
            abc[i+26] =abcTemp[i];            
        }
        //Utilizar la matriz
        let matriz = new Array(26);
        for(let i = 0; i<27; i++){
            matriz[i]= new Array(26);
        }
        
        for(let i=0; i<26; i++){
            contador=0;
            for(let j=0; j<26; j++){
                matriz[i][j]=abc[contador+1];
                contador++;
            }
        }

        return matriz;
    }

    Cifrar(){
        //variables
        let cifrado = new Array(this.mensaje.length);
        
        let i, j;
        
        //Neccesitamos idntificar los caracteres sison letras
        for(let cont=0; cont < this.mensaje.length; cont++){
            //identifique a traves del codigo ascii
            i = this.mensaje[cont]-97;
            j = this.clave[cont]-97;

            cifrado[cont] = this.matriz[i][j];
        }
        this.resultado=cifrado;
        //Recorrer los elementos 
        for(let k=0; k<26; k++){
            console.log(this.matriz[k]);
            console.log(this.mensaje);
            console.log(this.clave);
            console.log(cifrado);
        }
    }

    getMensajeCifrado(){
        let resultado = "";
        for(let i=0; i< resultado.length(); i++){
            resultado += this.resultado[i];
        }
        return resultado;
    }

    generarAbecedario(){
        let abc = new Array(26);
        
        for(let i=97; i<=122; i++){
            abc[i-97]=String.fromCharCode(i);
        }
        return abc;
    }
}



//Metodo de encriptado yei

function encriptarTextoClaro() {    
    let textoCifrado="";

    //Obtener del html
    let claro=document.getElementById("cad").value;
    claro = claro.toUpperCase();
    console.log(claro);
    let clave=document.getElementById("clv").value;
    clave = clave.toUpperCase();

    let claveCompleta="";
    let indice=0;

    //Rellenar n veces la clave respecto del mensaje
    for(let i = 0; i<claro.length; i++){
        for(let j=0; j<clave.length; j++){
            //Comparar el tamaño del mensaje vs la clave
            if(claveCompleta.length < claro.length){
                if(claro.charAt(indice) != ' '){
                    claveCompleta += clave.charAt(j)+"";
                }else{
                    claveCompleta += " ";
                    j--;
                }
                indice++;
            }                
        }
    }
    console.log(claveCompleta);
    for(i=0; i<claro.length; i++){
        let textoClaro = claro.charAt(i);
        let textoClave = claveCompleta.charAt(i);
         //Objetos
        let objcifra = new CifrarVigenere(textoClaro, textoClave);

        if(textoClaro != ' '){
            textoCifrado += objcifra.getTextoCifrado()+"";
        }else{
            textoCifrado+=" ";
        }        
    }
    //Regresar resultado al html
    document.getElementById("resultado").innerHTML=textoCifrado;
    console.log(textoCifrado);

}

function desencriptarTextoClaro(){
    let textoClaro="";
    //Obtener del html
    let cifrado=document.getElementById("cad").value;
    cifrado = cifrado.toUpperCase();
    let clave=document.getElementById("clv").value;
    clave =  clave.toUpperCase();

    let claveCompleta="";
    let indice=0;

    //Rellenar n veces la clave respecto del mensaje
    for(let i = 0; i<cifrado.length; i++){
        for(let j=0; j<clave.length; j++){
            //Comparar el tamaño del mensaje vs la clave
            if(claveCompleta.length < cifrado.length){
                if(cifrado.charAt(indice) != ' '){
                    claveCompleta += clave.charAt(j)+"";
                }else{
                    claveCompleta += " ";
                    j--;
                }
                indice++;
            }                
        }
    }

    for(i=0; i<cifrado.length; i++){
        let textoCifrado = cifrado.charAt(i);
        let textoClave = claveCompleta.charAt(i);
         //Objetos
        let objdescifra = new DescifrarVigenere(textoCifrado, textoClave);

        if(textoCifrado != ' '){
            textoClaro += objdescifra.getTextoDescifrado()+"";
        }else{
            textoClaro+=" ";
        }
    }
    //Regresar resultado al html
    document.getElementById("resultado").innerHTML=textoClaro;
    console.log(textoClaro);
}

