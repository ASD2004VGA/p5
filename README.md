# Formål

Dette projekt har til formål at få p5.js til at fungere sammen med bl.a. es-lint.

# Opsætning

- Installér Visual Studio Code [https://code.visualstudio.com/](https://code.visualstudio.com/).
- I Visual Studio Code skal du installere Microsofts eslint-plugin. Det kan gøres på en af følgende måder:
  1. Fra plugin-menuen søg på `ESlint`. Vælg det første plugin, der kommer frem (Microsoft har publiceret det). 
  2. Fra quick-open-menuen i Visual Studio Code (Win: Ctrl+P, Mac: Cmd+P) køres kommandoen:
     ```
     ext install dbaeumer.vscode-eslint
     ```
- Installér node.js [https://nodejs.org/en/](https://nodejs.org/en/).
- Åbn Visual Studio Code.
- Åbn kommando-paletten (Win: Ctrl+Shift+P, Mac: Cmd+Shift+P).
- Klon projektet. Det kan gøres på en af følgende måder:

  1. Fra kommando-paletten i Visual Studio Code vælges `Git: Clone`.
  2. Fra en terminal køres kommandoen: 
     ```
     git clone git@github.com:PeterSterner/p5.git
     ```
- Installér projektets afhængigheder (enten fra kommando-paletten med `Run task` eller fra en terminal):
  ```
  npm install
  ```
- Start en terminal (fra kommando-paletten søges på `Terminal: Create new terminal`)
- Kør nu følgende script fra terminalen for at starte en webserver, der viser en p5-sketchen `explosion.js`, der ligger i mappen `src`
  ```
  npm run sketch
  ```  
  (En hurtig genvej til at køre `ńpm run sketch` er  Win: Ctrl+Shift+B, Mac: Cmd+Shift+B).
  
# Kod din egen sketch

- Opret en ny javascript-fil i mappen `src`. Kald den f.eks. `min-sketch.js`.
- I `min-sketch.js` skriver du nu ordet `sketch` og trykker på Tab-knappen. Nu tilføjes automatisk en sketch med bl.a. funktionerne `setup` og `draw`. 
- Tilføj din egen kode.
- Når du skal afprøve din nye sketch, skal du åbne filen `sketch.js`og tilføje linjen
  ```
  import { preload, setup, draw, mousePressed, keyPressed } from './min-sketch.js'
  ```
  Husk at udkommentere andre importerede sketches. Dit browser-vindue, der viste sketchen fra `explosion.js`opdateres automatisk.


God fornøjelse med at programmere :-).

