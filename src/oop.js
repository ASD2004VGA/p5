console.clear()

/*
Nedenfor følger et simpel eksempel på
objekt-orienteret programmering (OOP).
*/

// Vi kan tænke på en klasse som en skabelon.
// Nedenfor ses en klasse ved navn Dyr.
// Denne klasse indkapsler al kode, der
// vedrører/beskriver et dyr.

class Dyr {
  // Metoden 'constructor' anvendes til
  // at instantiere klassen (dvs. at oprette
  // et objekt af denne klasse).
  constructor (alder, vægt, køn, navn) {
    // Vi gemmer 4 attributter/egenskaber på objektet.
    // Med 'this' refererer vi til det objekt, som vi er
    // ved at oprette.
    this.alder = alder
    this.vægt = vægt
    this.køn = køn
    this.navn = navn
  }

  // Et eksempel på en metode i klassen
  lavLyd () {
    console.log(this.navn + ' laver en lyd')
  }
}

// Et eksempel på nedarvning.
// Kat (under-klassen) nedarver attributter og metoder fra Dyr (super-klassen).
class Kat extends Dyr {
  constructor (alder, vægt, køn, navn) {
    super(alder, vægt, køn, navn)
    this.liv = 9 // En ny attribut tilføjes.
    this.trofast = false // En ny attribut tilføjes.
  }

  // Et eksempel på polymorfi.
  // Metoden 'lavLyd' fra Dyr-klassen overskrives.
  lavLyd () {
    console.log(this.navn, ': Miaw!')
  }
}

// Et eksempel på en anden under-klasse,
// der nedarver fra Dyr-klassen.
class Hund extends Dyr {
  constructor (alder, vægt, køn, navn) {
    super(alder, vægt, køn, navn)
    this.trofast = true
  }

  // Et eksempel på polymorfi.
  // Metoden 'lavLyd' fra Dyr-klassen overskrives.
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
