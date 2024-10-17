# backend-test-graphql
### Teste GraphQL

Obs: Dentro do Projeto Java tem uma Collection REST
Para o funcionamento do BFF é necessário subir o Java

usei esta biblioteca https://typegraphql.com/

Para executar o projeto

instalando as dependencias

`yearn install`

subindo o GraphQl

`yarn dev `

URL para acesso

http://localhost:4000/graphql
https://studio.apollographql.com/sandbox/explorer

Mutation

para cadastrar entrada do veículo no estacionamento

```
# Operation
mutation NewRegisterEntry($data: ParkingInput!) {
    newRegisterEntry(data: $data) {
        id
        vehicle
        plate
        establishment
        estacionado
        payment
        entryTime
        exitTime
    }
}

# Variable
{
  "data": {
    "vehicle": "carro",
    "plate": "XXX-12348",
    "establishment": "anonimo"
  }
}
```
Para encerrar o ticket
```
# Operation
mutation RegisterExit($data: ParkingInput!) {
    registerExit(data: $data) {
        id
        vehicle
        plate
        establishment
        estacionado
        payment
        entryTime
        exitTime
    }
}
# Variables
{
  "data": {
    "plate": "XXX-12345",
    "payment": "123.00"
  }
}
```