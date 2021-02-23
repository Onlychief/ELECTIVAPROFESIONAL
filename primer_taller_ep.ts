import {Client} from 'https://deno.land/x/mysql/mod.ts';

const LONGITUD_MINIMA = 3
const LONGITUD_MINIMA_CELULAR=10

let preguntas = ["INGRESE SU NOMBRE","INGRESE SU APELLIDO","INGRESE SU NÚMERO DE CELULAR","INGRESE SU CORREO ELECTRONICO","DIGITE SU CLAVE","USTED SE HA REGISTRADO"]
let datos=["nombre","apellido","celular","correo","clave"]


function evaluarNombre(texto?:string){
    if (!texto){
        alert("El nombre es obligatorio")
        return (0)
    }else if(texto.length>LONGITUD_MINIMA){
        datos[0]=texto
        return(1)
    }else{
        alert("El nombre debe tener mas de 3 letras")
        return(0)
    }
}   
function evaluarApellido(textoA:string){
    if (!textoA){
        alert("El apellido es obligatorio")
        return (1)
    }else if(textoA.length>LONGITUD_MINIMA){
        datos[1]=textoA
        return(2)
    }else{
        alert("El apellido debe tener mas de 3 letras")
        return(1)
    }
}
function evaluarCelular(textoC:string){
    if (!textoC){
        datos[2]="No tiene"
        return (3)
    }else if(textoC.length==10){
        datos[2]=textoC
        return(3)
    }else{
        alert("El celular debe tener 10 digitos")
        return(2)
    }
}
function evaluarCorreo(textoCo:string){
    if(!textoCo){
        alert("El correo es obligatorio")
        return(3)
    }else if(/^\w+([\.-]?\w+)*@(?:|hotmail|outlook|yahoo|live|gmail)\.(?:|com|es)+$/.test(textoCo)){
        datos[3]=textoCo
        return(4)
    }else{
        alert("Debe ingresar un correo válido (Hotmail, Outlook, Yahoo, Live, Gmail") 
        return (3)    
    }
}

function evaluarClave(textoCl:string){
    if (!textoCl){
        alert("La clave es obligatoria")
        return (4)
    }else if(textoCl.length>8 && /^.*[A-ZÁÉÍÓÚÜÑ].*[!,%,&,@,#,$,^,*,?,_,~]/.test(textoCl)){
        datos[4]=textoCl
        return(5)
        
    }else if(textoCl.length<8){
        alert("La clave debe tener mas de 8 caracteres")
        return(4)
    }else{
        alert("La clave debe tener una mayuscula y un caracter especial")
        return(4)
    }
}


console.log("BIENVENIDO A HOLAMUNDO")
console.log("1. LISTAR ")
console.log("2. CREAR USUARIO ")
console.log("3. ACTUALIZAR USUARIO ")
console.log("4. ELIMINAR USUARIO ")
let opcionSeleccionada = parseInt(prompt("INGRESE UNA OPCION") as string)

if(opcionSeleccionada==1){
    
const client = await new Client().connect({
  hostname: 'localhost',
  username: 'root',
  db: 'ejercicio1',
  password: '',
  port: 3306,
})

const personas = await client.execute('select * from personas')
console.log(personas.rows)

}else if (opcionSeleccionada==2){
          
for(let numero = 0; numero < 1;){
    let nombrePersona =prompt(""+preguntas[numero]) as string 
    numero=evaluarNombre(nombrePersona)
}
for(let numeroA = 1; numeroA < 2;){
    let apellidoPersona =prompt(""+preguntas[numeroA]) as string 
    numeroA=evaluarApellido(apellidoPersona)
}
for(let numeroC = 2; numeroC < 3;){
    let celularPersona =prompt(""+preguntas[numeroC]) as string 
    numeroC=evaluarCelular(celularPersona)
}
for(let numeroCo = 3; numeroCo < 4;){
    let correoPersona =prompt(""+preguntas[numeroCo]) as string 
    numeroCo=evaluarCorreo(correoPersona)
}

for(let numeroCl = 4; numeroCl < 5;){
    let clavePersona =prompt(""+preguntas[numeroCl]) as string 
    numeroCl=evaluarClave(clavePersona)       
}

const client = await new Client().connect({
    hostname: 'localhost',
    username: 'root',
    db: 'ejercicio1',
    password: '',
    port: 3306,
  })

    let result = await client.execute(`INSERT INTO personas(nombre, apellido,celular,correo,clave) values(?, ?, ?, ?, ?)`, [
    datos[0], datos[1],datos[2],datos[3],datos[4]])
    console.log(result)
    const personas = await client.execute('select * from personas')
    console.log(personas.rows)
    console.log("EL REGISTRO SE HA REALIZADO CON EXITO") 
    
} else if(opcionSeleccionada ==3){

    const client = await new Client().connect({
        hostname: 'localhost',
        username: 'root',
        db: 'ejercicio1',
        password: '',
        port: 3306,
      })
    
      const personas = await client.execute('select * from personas')
      console.log(personas.rows)
      let personaSeleccionada=parseInt(prompt("Ingrese el codigo de la persona para actualizar sus datos")as string)

    for(let numero = 0; numero < 1;){
        let nombrePersona =prompt(""+preguntas[numero]) as string 
        numero=evaluarNombre(nombrePersona)
    }
    for(let numeroA = 1; numeroA < 2;){
        let apellidoPersona =prompt(""+preguntas[numeroA]) as string 
        numeroA=evaluarApellido(apellidoPersona)
    }
    for(let numeroC = 2; numeroC < 3;){
        let celularPersona =prompt(""+preguntas[numeroC]) as string 
        numeroC=evaluarCelular(celularPersona)
    }
    for(let numeroCo = 3; numeroCo < 4;){
        let correoPersona =prompt(""+preguntas[numeroCo]) as string 
        numeroCo=evaluarCorreo(correoPersona)
    }
    
    for(let numeroCl = 4; numeroCl < 5;){
        let clavePersona =prompt(""+preguntas[numeroCl]) as string 
        numeroCl=evaluarClave(clavePersona)       
        }

        let result = await client.execute(`update personas set nombre = ?, apellido = ?, celular = ?, correo = ?, clave = ? WHERE id = ? `, [datos[0],datos[1],datos[2],datos[3],datos[4],personaSeleccionada]);
        console.log(result);
        const personasAct = await client.execute('select * from personas')
        console.log(personasAct.rows)
        console.log("EL UPDATE SE HA REALIZADO CON EXITO")

}else if(opcionSeleccionada==4){

    const client = await new Client().connect({
        hostname: 'localhost',
        username: 'root',
        db: 'ejercicio1',
        password: '',
        port: 3306,
      })
    
      const personas = await client.execute('select * from personas')
      console.log(personas.rows)

      let personaSeleccionada=parseInt(prompt("Ingrese el codigo de la persona para eliminar sus datos")as string)
      let result = await client.execute(`delete from personas where ?? = ?`, ["id", personaSeleccionada])

        const personasEliminadas = await client.execute('select * from personas')
        console.log(personasEliminadas.rows)
        console.log("EL REGISTRO SE ELIMINÓ CORRECTAMENTE")
}