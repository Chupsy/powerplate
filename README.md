# Powerplate

## Architecture

### Interface

#### HTTP

Config required :

-   port : express port to run

Technologies :

-   [Joi](https://github.com/hapijs/joi)
-   [Celebrate](https://github.com/arb/celebrate)
-   [Express](https://github.com/expressjs/express)
-   [Inversify](https://github.com/inversify/InversifyJS)
-   [inversify-express-utils](https://github.com/inversify/inversify-express-utils)
-   [apidoc](https://github.com/apidoc/apidoc)

Requires :

-   User.app.ts (app layer)

Structure

```
|- index.ts
|- constants
    |- response.json
|- components
    |- user
        |- schemas
            |- create.schema.ts
            |- create.schema.spec.ts
            |- read.schema.ts
            |- read.schema.spec.ts
            |- update.schema.ts
            |- update.schema.spec.ts
            |- delete.schema.ts
            |- delete.schema.spec.ts
        |- user.controller.ts
        |- user.controller.spec.ts
|- helpers
    |- response_normalizer
        |- response_normalizer.ts
```

Routes :

-   GET /users/:userId
    -   schema :
        -   userId (number, positive, required)
    -   Errors :
        -   data_not_found (404) => user not found
        -   invalid_parameters (400)
    -   Success :
        -   user_found (200)
        ```
        {
            userId: number,
            firstName: string,
            lastName: string,
            email: string,
            age: number
        }
        ```
-   GET /users
    -   schema :none
    -   Errors : none
    -   Success :
        -   users_found (200)
        ```
        [
            {
                userId: number,
                firstName: string,
                lastName: string,
                email: string,
                age: number
            },
            ...
        ]
        ```
-   PUT /users/:userId
    -   schema :
        -   userId (number, positive, required)
        -   at least one of :
            -   firstName (string, min 2, optional, body)
            -   lastName (string, min 2, optional, body)
            -   email (string, email, optional, body)
            -   age (number, min 0, optional, body)
    -   Errors :
        -   data_not_found (404) => user not found
        -   email_already_used (400)
        -   invalid_parameters (400)
    -   Success :
        -   user_updated (200)
        ```
        {
            userId: number,
            firstName: string,
            lastName: string,
            email: string,
            age: number
        }
        ```
-   DELETE /users/:userId
    -   schema :
        -   userId (number, positive, required)
    -   Errors :
        -   data_not_found (404) => user not found
        -   invalid_parameters (400)
    -   Success :
        -   user_deleted (200)
-   POST /users
    -   schema :
        -   firstName (string, min 2, required, body)
        -   lastName (string, min 2, required, body)
        -   email (string, email, required, body)
        -   age (number, min 0, required, body)
    -   Errors :
        -   email_already_used (400)
        -   invalid_parameters (400)
    -   Success :
        -   user_created (201)
        ```
        {
            userId: number,
            firstName: string,
            lastName: string,
            email: string,
            age: number
        }
        ```

Default reply format :

```
{
    code: 'user_found',
    status: 200,
    message: 'You have access to this user',
    data: {
        userId: 20,
        firstName: 'John',
        lastName: 'Doe,
        email: 'john@doe.com',
        age: 39
    }
}
```

### App

Contains the logic of the service. It is connected to an infra provided directly at launch time and will use it as data provider.

Technologies :

-   [Inversify](https://github.com/inversify/InversifyJS)

Requires :

-   User.resource.ts (infra layer)

Structure :

```
|- index.ts
|- identifiers.ts
|- user
    |- user.app.ts
```

Methods :

-   findAllUsers
    -   arguments : none
    -   return users as array of object
-   findUserById
    -   arguments : userId (number)
    -   return user as object
    -   Errors :
        -   data_not_found
-   createUser
    -   arguments : object({
        firstName: string,
        lastName: string,
        email: string,
        age: number
        })
    -   return user as object
    -   errors :
        -   email_already_used
        -   invalid_age
-   updateUser
    -   arguments : userId (number), object({
        firstName?: string,
        lastName?: string,
        email?: string,
        age?: number
        })
    -   return user as object
    -   errors :
        -   email_already_used
        -   data_not_found
        -   invalid_age
-   deleteUserById
    -   arguments : userId number
    -   void
    -   errors :
        -   data_not_found
-   verifyEmail
    -   arguments : email (string), userId? (number)
    -   void
    -   errors :
        -   email_already_used

### Infra

#### Resources

Contains all the abstract classes used by the app. If a new infra is added, it should always extend this abstract class.

#### MongoDb

Config required :

-   uri : MongoDB uri

Technologies :

-   [Inversify](https://github.com/inversify/InversifyJS)
-   [Mongoose](https://mongoosejs.com/)

Structure :

```
|- index.ts
|- user
    |- user.infra.ts
```

Methods :

-   findAllUsers
    -   arguments : none
    -   return users as array of object
-   findUserById
    -   arguments : userId (number)
    -   return user as object
-   createUser
    -   arguments : object({
        firstName: string,
        lastName: string,
        email: string,
        age: number
        })
    -   return user as object
-   updateUser
    -   arguments : userId (number), object({
        firstName?: string,
        lastName?: string,
        email?: string,
        age?: number
        })
    -   return user as object
-   deleteUserById
    -   arguments : userId number
    -   void
-   findUserByEmail
    -   arguments : email (string)
    -   return user as object


# A INVESTIGUER
traefik
sudo docker run --name=mongodb -d -P mongo
sudo docker run -ti -P --name app --link mongodb:mongodb chupsy/powerplate
sudo docker rm app
sudo docker build -t chupsy/powerplate .
Docker compose
