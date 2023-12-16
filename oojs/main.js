//Researching OOJS and typescript 

class Cell {
    static category = "biology"
    name = 'an unnamed cell'
    constructor(name) {
        if (name)
        this.name = name
    }
    display() {
        console.log(`Hello, this is ${this.name}. I'm classified as ${Cell.category}`)
    }
}

class Virus extends Cell {
    display() {
        console.log("Virus greeting. Overriding")
        super.display()
    }
}

let virus = new Virus()
virus.display()
