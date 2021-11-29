//clases 

class Jugador {
    //atributos privados, anteriormente se usaba _variable para indicar que es privado
    //la implimentacion de #variable es una adicion moderna para implementar variables privadas
    #nombre
    #caraDado1
    #caraDado2

    constructor(nombre) {
        this.#nombre = nombre
        this.#caraDado1 = 0
        this.#caraDado2 = 0

    }

    setNombre(nombre) {
        this.#nombre = nombre
    }
    getNombre() {
        return this.#nombre
    }
    setcaraDado1(cara1) {
        this.#caraDado1 = cara1
    }
    getcaraDado1() {
        return this.#caraDado1
    }

    setcaraDado2(cara2) {
        this.#caraDado2 = cara2
    }
    getcaraDado2() {
        return this.#caraDado2
    }

}


class JuegoDados {

    numeroJuego
    jugador1
    jugador2
    //atributo publico que permite almacenar el ganador de la partida
    ganadorpartida = ""
    constructor(numerojuego, j1, j2) {
        this.numeroJuego = numerojuego
        this.jugador1 = j1
        this.jugador2 = j2

    }

    tirarDados() {

        this.jugador1.setcaraDado1(Math.round((Math.random() * 5) + 1))  
        this.jugador1.setcaraDado2(Math.round((Math.random() * 5) + 1)) 
        this.jugador2.setcaraDado1(Math.round((Math.random() * 5) + 1))  
        this.jugador2.setcaraDado2(Math.round((Math.random() * 5) + 1))  

    }
    determinaGanador() {

        if (((this.jugador1.getcaraDado1() + this.jugador1.getcaraDado2()) == 7)
            && ((this.jugador2.getcaraDado1() + this.jugador2.getcaraDado2()) != 7))
            return this.jugador1.getNombre()
        else if (((this.jugador2.getcaraDado1() + this.jugador2.getcaraDado2()) == 7)
            && ((this.jugador1.getcaraDado1() + this.jugador2.getcaraDado2()) != 7))
            return this.jugador2.getNombre()
        else return null;


    }

}

class TorneoDados {

    jugadas = new Array() 
    #juegosGanadosJugador1
    #juegosGanadosJugador2

    setJuegosGanadosJugador1(jg1) {
        this.#juegosGanadosJugador1 = jg1
    }
    getJuegosGanadosJugador1() {
        return this.#juegosGanadosJugador1
    }
    setJuegosGanadosJugador2(jg2) {
        this.#juegosGanadosJugador2 = jg2
    }
    getJuegosGanadosJugador2() {
        return this.#juegosGanadosJugador2
    }



    crear(j1, j2) {
        console.log("Se ha iniciado el torneo! Participantes: " + j1.getNombre() + " y " + j2.getNombre())

        this.#juegosGanadosJugador1 = 0
        this.#juegosGanadosJugador2 = 0

    }
    jugar() {
        //se juega el torneo 
        let minimoVictorias = 3
        let i = 1;
        let victoria = false
       
        
        let mensajeGanador =""

        do {

            let partida = new JuegoDados(i, j1, j2)
            partida.tirarDados()
            let ganador = partida.determinaGanador()
            
            //verificamos quien gano en la partida

            if(ganador === j1.getNombre()){

                this.#juegosGanadosJugador1++
                mensajeGanador = j1.getNombre()
            }
            if(ganador === j2.getNombre()){

                this.#juegosGanadosJugador2++
                mensajeGanador = j2.getNombre()
            }
            if(ganador === null){

                mensajeGanador="Empate"
            }
            //almacenamos quien gano en el arreglo
            partida.ganadorpartida = mensajeGanador


            //la partida se acabo y se manda al arreglo
            this.jugadas.push(partida)

            //verificamos si alguien ya gano 3 partidas
            if(this.#juegosGanadosJugador1 ===minimoVictorias || this.#juegosGanadosJugador2===minimoVictorias){
                victoria = true
            }

            i++




        } while (victoria === false)



    }


    resultado() {
        //si el jugador uno gano 3 partidas se retorna su nombre, caso contrario, el del jugador 2
        if(this.#juegosGanadosJugador1===3){

            return j1.getNombre()
        }else{

            return j2.getNombre()

        }


    }




}

//jugadores

let j1 = new Jugador("Jorge Borga")
let j2 = new Jugador("Jugador 2")
//creamos el torneo
let torneo1 = new TorneoDados()
//inicializamos el torneo
torneo1.crear(j1, j2)
//jugamos el torneo
torneo1.jugar()
//obtenemos el arreglo del torneo y lo almacenamos en uno nuevo para su manipulacion
let array = torneo1.jugadas

//recorremos el arreglo para mostrar el numero de partida y su ganador
for(let i =0; i<array.length; i++ ){

    console.log("Ganador partida: " + (i+1) + " fue: " + array[i].ganadorpartida)
}


//imprimimos el ganador del torneo 
console.log("El ganador del torneo fue: " + torneo1.resultado() + " felicidades!!!")
