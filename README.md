# Service testing code practice

Proyecto para practicar y aprender conceptos
de Test en servicios de Angular.

Conocimientos nuevos adquiridos

## Framework de Test y Runner

En Angular se tiene configurado los tests con Jasmine y Karma
Jasmine al igual que otros frameworks tienen
prácticamente la misma sintaxis para hacer los suites y para hacer las pruebas de los suits

## Comandos de pruebas

### Apagar el modo Watcher

Para apagar el modo Watcher del runner de test (que no reaccione a los cambios de código), usamos en consola el sgt comando

```
  ng test --no-watch
```

### Configuración de Coverage

Para visualizar el Coverage cubierto de los tests, se activa el runner de pruebas usando la terminal con el comando sgt:

```
  ng test --code-coverage
```

> Recuerda que puedes combinar los comandos en una sola línea

### Configuración de un visualizador más elegante de Tests

Tenemos como opcion utilizar `karma-mocha-reporter`. Lo que hará esta librería es permitirnos visualizar los reportes listados por suite y por prueba, como lo hace jest o vite.

- Instalar librería

```
 npm i karma-mocha-reporter
```

- Configurar el archivo de karma.conf.js

```
// En la sección superior de plugiins, agregamos
// el plugin nuevo de karma-mocha-reporter
config.set({
 ...
 plugins: [
   ....
   require("karma-mocha-reporter"),
 ]
})
```

- Luego configuramos el visualizador de reporte de pruebas.En el mismo archivo de karma.conf.js

```
// en la parte inferior de config.set
config.set({
  ...
  // aquí agregamos cómo queremos visualizar los reportes
  reporters: ["mocha"],
  browsers: ["Chrome"],
  restartOnFileChange: true,
})
```
