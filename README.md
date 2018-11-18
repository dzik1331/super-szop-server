**http://localhost:8443**
********************************
[Logowanie](#logowanie)

[Role użytkownika](#role-użytkownika)

[Dodawanie użytkownika](#dodawanie-użytkownika)

[Lista tagów](#lista-tagów)

[Lista produktów](#lista-produktów)

[Dodawanie produktu](#dodawanie-produktu)

## **LOGOWANIE**

`/api/user/login [POST]`

Wysyłamy: 

    
Odpowiedź:

##### Status: 200
    {
        login: 'Login', 
        name: 'Imię', 
        lastName: 'Nazwisko', 
        role: 1
    }

##### Status 404

`NO_FOUND lub BAD_PASSWORD`
********************************

## **Role użytkownika**

`/api/user/roles [Get]`


Odpowiedź:

##### Status: 200
    [
        {"id":1,"name":"administrator"},
        {"id":2,"name":"użytkownik"},
        {"id":3,"name":"sprzedawca"}
    ]
##### Status: 404
********************************

## **DODAWANIE Użytkownika**

`/api/user/add [POST]`

Wysyłamy:
 
    {
        login: 'Janko13',
        name: 'Jan',
        lastName: 'Kowalski',
        password: 'AlaMakota123',
        role: 1
    }

Odpowiedź:

##### Status: 200
    Added
##### Status: 404
********************************

## **LISTA TAGÓW**

`/api/product/tags [GET]`

Odpowiedź:

    ['tag1', 'tag2', 'tag3',...]


********************************

## **LISTA PRODUKTÓW**

`/api/product/list [GET]`

Odpowiedź:
    
    [
        {
            "id":14,
            "name":"Nazwa",
            "price":12,
            "tags":"Elektronika",
            "img":"http://images.pl/1.png",
            "description":"Opis",
            "producer":'BikCompany'}
            ,...
    ]

********************************

## **DODAWANIE PRODUKTU**

`/api/product/add [POST]`

Wysyłamy:
 
    {
        producer: 'Nazwa producenta',
        description: 'Opis',
        img: 'Adres zdjęcia',
        tags: ['tag1,tag2,tag3'],
        price: 99.99,
        name: 'Nazwa produktu'
    }

Odpowiedź:

##### Status: 200
    Added
##### Status: 404
    NO_FOUND
********************************