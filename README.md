# Yocotest

A library to fulfill the yoco specifications.

## Run tests

`npm run test`

## How to use

*Please note, obviously this is not a published package.

```js


const lib = require('yocotest');

let result = lib.determineWinner([
        "8D",
        "JS"
      ],
      [
        "5D",
        "QS",
        "3H"
      ]);

if (result.err)
{
    //Do something
}
else 
{
    if (result.result = lib.constants.OUTCOMES.A_WINS)
    {
        //Do something
    }
    else 
    {
        //Do something
    }
}
```

Any other additional documentation necessary can be generated via `npm run generateDocumentation`
