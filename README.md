# Web Scraping Sefaz Status 

This project use Cheerio to Web Scraping the situation of Sefaz

## Prerequisites
For development, you will only need Node.js and a node global package, or also Yarn, installed in your environment.

To install the packages you need to run one of the commands below:

### NPM installation
    $ npm install

#### Yarn installation  
      $ yarn install

## Running 

The default port inside the project is 3333. 

After run `node index.js` you can access your browser localhost with the port and will be returned:
```
  {
    "error": false,
    "message": "",
    "status": [
      {
        "UF": "AM",
        "Autorizacao": "on",
        "Retorno": "on",
        "Inutilizacao": "on",
        "ConsultaProt": "on",
        "Status": "on",
        "Tempo": "-",
        "ConsultaCad": "",
        "Recepcao": "on"
      }
    ]
  }
  ```

## License

This project is licensed under the MIT License
