console.clear()
console.log('Eksempel på OOP')

class Dyr {
  constructor (alder, vægt, køn, navn) {
    // Vi opretter 5 attributter på objektet.
    // Husk at this referer til det objekt, som vi er
    // ved at oprette.
    this.alder = alder
    this.vægt = vægt
    this.køn = køn
    this.navn = navn
    this.liv = 1
  }

  // Et eksempel på en metode
  lavLyd () {
    console.log(this.navn + ' laver en lyd')
  }
}

// Et eksempel på nedarvning.
// Kat (under-klassen) nedarver attributter og metoder fra Dyr (super-klassen).
class Kat extends Dyr {
  constructor (alder, vægt, køn, navn) {
    super(alder, vægt, køn, navn)
    this.liv = 9
    this.trofast = false
  }

  // Eksempel på polymorfi.
  // Metoden lavLyd i Dyr-klassen overskrives.
  lavLyd () {
    console.log(this.navn, ': Miaw!')
  }
}

// En anden under-klasse der nedarver fra Dyr-klassen.
class Hund extends Dyr {
  constructor (alder, vægt, køn, navn) {
    super(alder, vægt, køn, navn)
    this.trofast = true
  }

  lavLyd () {
    console.log(this.navn, ': Vov vov!!')
  }
}

// Eksempler på anvendelser
const slange = new Dyr(8, 75, 'hun', 'Python')
const elefant = new Dyr(30, 6000, 'han', 'Elefant')

slange.lavLyd()
elefant.lavLyd()

const kat = new Kat(8, 4, 'hun', 'Tom')
const hund = new Hund(12, 30, 'han', 'Lassie')

kat.lavLyd()
hund.lavLyd()
