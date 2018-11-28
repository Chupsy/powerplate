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
|- middlewares
    |- authenticate
        |- index.ts
        |- authenticate.spec.ts
```

Routes :

-   GET /users/:userId
    -   schema :
        -   userId (number, positive, required)
    -   middlewares :
        -   authenticate
    -   Errors :
        -   data_not_found (404) => user not found
        -   permission_denied (401) => asking user does not have permission to view this user
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
    -   middlewares :
        -   authenticate
    -   Errors :
        -   permission_denied (401) => asking user is not admin
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
    -   middlewares :
        -   authenticate
    -   Errors :
        -   data_not_found (404) => user not found
        -   permission_denied (401) => asking user does not have permission to update this user
        -   email_already_used (400)
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
    -   middlewares :
        -   authenticate
    -   Errors :
        -   data_not_found (404) => user not found
        -   permission_denied (401) => asking user does not have permission to delete this user
    -   Success :
        -   user_deleted (200)
-   POST /users
    -   schema :
        -   firstName (string, min 2, required, body)
        -   lastName (string, min 2, required, body)
        -   email (string, email, required, body)
        -   age (number, min 0, required, body)
    -   middlewares :
        -   authenticate
    -   Errors :
        -   permission_denied (401) => asking user does not have permission to create user
        -   email_already_used (400)
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

#### User

### Domain

_Domain services hold domain logic whereas application services don’t._

_Domain logic is everything that is related to business decisions. It holds the business decision where app only orchestrate those business decisions_

#### User

### Infra

#### User
