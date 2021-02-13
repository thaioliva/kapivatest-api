# (t|r)est API

### Setup 
```sh
$ git clone https://github.com/thaioliva/kapivatest-api
$ npm install
$ cp .env.example .env
```

### Config
Arquivo .env 
- PIPEDRIVE_KEY=''
- BLING_KEY=''
- BLING_URL='https://bling.com.br/Api/v2'
- PORT=3030

- DB_NAME=''
- DB_PORT=
- DB_USER=''
- DB_PASSWORD=''

### Start server
Em modo dev:
```sh
$ npm run dev
```
Em modo prod:
```sh
$ npm start
```

API

**Show User**
----
  Retorna json

* **URL**

  / 

* **Method:**

  `GET`
  
* **Data Params**

  opcional: 
   - date : 'YYYY-MM-DD'

    DD: dia
    MM:mês
    YYYY: ano

* **CRON**

  Duas tasks disparadas na cron