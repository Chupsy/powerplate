# Powerplate

## Architecture

### Interface

#### HTTP

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

Default format reply :

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

#### RMQ

Not implemented yet

### App

Technologies :

-   [Inversify](https://github.com/inversify/InversifyJS)

Requires :

-   User.domain.ts (domain layer)

Structure :

```
|- index.ts
|- user
    |- user.app.ts
```

Methods :

-   findAll
    -   arguments : none
    -   return users as array of object
-   findOne
    -   arguments : userId (number)
    -   return user as object
    -   Errors :
        -   data_not_found
-   create
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
-   update
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
-   delete
    -   arguments : userId number
    -   void
    -   errors :
        -   data_not_found

### Domain

_Domain services hold domain logic whereas application services don’t._

_Domain logic is everything that is related to business decisions. It holds the business decision where app only orchestrate those business decisions_

Technologies :

-   [Inversify](https://github.com/inversify/InversifyJS)

Requires :

-   User.infra.ts (domain layer)

Structure :

```
|- index.ts
|- user
    |- user.domain.ts
    |- user.ts
```

userDomain methods :

-   findOne
    -   arguments : userId (number)
    -   return User.toJSON
    -   errors :
        -   data_not_found
-   findAll
    -   arguments : none
    -   return array of User.toJSON
    -   errors : none
-   update
    -   arguments : userId (number), object({
        firstName?: string,
        lastName?: string,
        email?: string,
        age?: number
        })
    -   return User.toJSON
    -   errors :
        -   data_not_found
        -   email_alread_used
        -   invalid_age
-   create
    -   arguments : object({
        firstName?: string,
        lastName?: string,
        email?: string,
        age?: number
        })
    -   return User.toJSON
    -   errors :
        -   email_already_used
        -   invalid_age
-   delete
    -   arguments : userId(number)
    -   void
    -   errors :
        -   data_not_found

### Infra

### Errors
