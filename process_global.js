console.log(`${process.cwd()}`);
console.log(process.argv)

process.on('exit',()=>{
    console.log('finalizando o script node');
})