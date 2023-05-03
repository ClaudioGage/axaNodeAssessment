# Claudio Gage's AXA NODE ASSESSMENT

## Description

Nest.js/TypeScript server project done in order to complete the Axa Node.js Assessment.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test API Endpoints

### Instructions:

1. Download/git clone this repo into your local machine.
2. Follow the installation and run commands above to run the server.
3. Press the Postman button at the bottom to get access to the collection and call the Nest.js server.

## Requests

#### AUTH:

All requests have an auth configuration on the request headers where the clientId is used authenticate the User and to obtain the role and protect the requests based
on role permisions of Admin or User.

![Screen Shot 2023-05-02 at 20 46 42](https://user-images.githubusercontent.com/46685366/235824013-9fa2ec61-0f09-40b3-b6d8-72a806922fae.png)


* If the role permissions is incorrect a 403 response will be received:

![Screen Shot 2023-05-02 at 20 52 13](https://user-images.githubusercontent.com/46685366/235824467-472a8b87-bfb8-4d3e-a129-4c68ae784dd2.png)



  #### 1. getClient:
  
    User and Admin Role protected
    a GET REQUEST with two query params: id & name. Brings back the client related to the query params.
    
    
```bash
URL Examples:

  localhost:3000/client?name=Ophelia
  localhost:3000/client?id=55601290-8619-4f54-b831-9c6c26c52b44
```

* Successful response example:

![Screen Shot 2023-05-02 at 21 03 40](https://user-images.githubusercontent.com/46685366/235825561-8053060e-a5b2-4472-a0eb-d632b6982ab8.png)


 #### 2. getPolicy:
  
    Admin Role Protected
    a GET REQUEST with a path param /:name. Brings back a list of policies associated to the client based on the name.
    
    
```bash
URL Example:

  localhost:3000/policies/:name
  localhost:3000/policies/Ophelia
```

* Successful response example:

![Screen Shot 2023-05-02 at 21 06 13](https://user-images.githubusercontent.com/46685366/235825777-58a07b34-dc03-4aa4-bd39-c9566aa55562.png)


#### 3. LinkPolicy:
    Admin Role Protected.
    a PUT REQUEST that needs the following JSON Body:
    {
      "clientId":"a0ece5db-cd14-4f21-812f-966633e7be86",
      "policyId":"64cceef9-3a01-49ae-a23b-3761b604800b"
    }
    
```bash
URL Example:

  localhost:3000/linkPolicy
```
* Successful response example:

![Screen Shot 2023-05-02 at 21 06 53](https://user-images.githubusercontent.com/46685366/235825904-321bc40d-74c1-4777-8a2f-657ad3abaadc.png)

## TESTING EXAMPLES:

* We are using two different users:
```bash
1. name: Ophelia, id: 55601290-8619-4f54-b831-9c6c26c52b44, role: user
2. name: Britney, id: a0ece5db-cd14-4f21-812f-966633e7be86, role: admin
```

### Testing *AUTH*
* We can interchange between the two users ids on the request headers to test the authorization and authentification with the permission roles for the different requests.

### Testing *getClient* request:
* Be eitheir using the name or id of the users we can test the first request *getClient*

### Testing *getPolicy* request:
* By using the Ophelia name the *getPolicy* will return that it does not have any policies linked to the user.
* By using the Britney name the *getPolicy* will return a list of policies.

### Testing *linkPolicy* request:
* We can link a policy to Ophelia by using her id and the policy id: *64cceef9-3a01-49ae-a23b-3761b604800b* in the body of the request
* And then use the testing example for *getPolicy* to see that she was a linked policy now.


## POSTMAN BUTTON TO ACCESS COLLECTION

[![Run in Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/7242940-4a68ca9c-1967-42e3-858f-69c39a220342?action=collection%2Ffork&collection-url=entityId%3D7242940-4a68ca9c-1967-42e3-858f-69c39a220342%26entityType%3Dcollection%26workspaceId%3D6a2fb4f0-ea54-4d86-b8ab-ef5fb74de914)

## UNIT, E2E, COVERAGE TESTING

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
