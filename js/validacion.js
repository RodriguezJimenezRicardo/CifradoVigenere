function letras(e){
    var teclado = (document.all)?e.keyCode:e.which;
    if(teclado==8)return true;
    var exp =/[a-z ]/;
    var tec = String.fromCharCode(teclado);
    return exp.test(tec);
}