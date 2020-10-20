
const sub = ()=>{

}
const somar = (inicioValor,array,tmn)=>{
    if(tmn<0) return;
    inicioValor = inicioValor + array[tmn]
    console.log(inicioValor,tmn)
    somar(inicioValor,array,(tmn-1))
}

module.exports = {somar,sub}