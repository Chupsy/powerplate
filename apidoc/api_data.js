define({ "api": [  {    "type": "post",    "url": "/user",    "title": "Create user",    "name": "CreateUser",    "group": "User",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "email",            "description": "<p>User email.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "firstName",            "description": "<p>User firstName.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "lastName",            "description": "<p>User lastName.</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "age",            "description": "<p>User age.</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "code",            "description": "<p>request status code.</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "status",            "description": "<p>request status.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>request message.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "data",            "description": "<p>request data.</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "data.userId",            "description": "<p>User unique Id.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "data.firstName",            "description": "<p>User first name.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "data.lastName",            "description": "<p>User last name.</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "data.age",            "description": "<p>User age.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "data.email",            "description": "<p>User email.</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "  HTTP/2 200 OK\n{\n    \"code\": \"user_created\",\n    \"status\": 201,\n    \"message\": \"User was successfully created.\",\n    \"data\": {\n        \"userId\": 1,\n        \"firstName\": \"John\",\n        \"lastName\": \"Doe\",\n        \"age\": 20,\n        \"email\": \"john@doe.com\",\n    }\n}",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "invalid_parameters",            "description": "<p>Invalid parameters.</p>"          },          {            "group": "Error 4xx",            "optional": false,            "field": "email_already_used",            "description": "<p>Email already used.</p>"          }        ]      },      "examples": [        {          "title": "Error-Response:",          "content": "{\n    \"code\": \"invalid_parameters\",\n    \"status\": 400,\n    \"message\": \"\\\"userId\\\" must be a number\"\n}",          "type": "json"        },        {          "title": "Error-Response:",          "content": "{\n    \"code\": \"email_already_used\",\n    \"status\": 400,\n    \"message\": \"Email already in use.\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "src/interface/http/components/user/user.controller.ts",    "groupTitle": "User"  },  {    "type": "delete",    "url": "/user/:userId",    "title": "Delete user by id",    "name": "DeleteUser",    "group": "User",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "userId",            "description": "<p>Userid.</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "code",            "description": "<p>request status code.</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "status",            "description": "<p>request status.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>request message.</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "  HTTP/2 200 OK\n{\n    \"code\": \"user_deleted\",\n    \"status\": 200,\n    \"message\": \"User was successfully deleted.\"\n}",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "data_not_found",            "description": "<p>Data was not found.</p>"          },          {            "group": "Error 4xx",            "optional": false,            "field": "invalid_parameters",            "description": "<p>Invalid parameters.</p>"          }        ]      },      "examples": [        {          "title": "Error-Response:",          "content": "{\n    \"code\": \"data_not_found\",\n    \"status\": 404,\n    \"message\": \"Data was not found.\"\n}",          "type": "json"        },        {          "title": "Error-Response:",          "content": "{\n    \"code\": \"invalid_parameters\",\n    \"status\": 400,\n    \"message\": \"\\\"userId\\\" must be a number\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "src/interface/http/components/user/user.controller.ts",    "groupTitle": "User"  },  {    "type": "get",    "url": "/user/:userId",    "title": "Find user by id",    "name": "GetUser",    "group": "User",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "userId",            "description": "<p>User id.</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "code",            "description": "<p>request status code.</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "status",            "description": "<p>request status.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>request message.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "data",            "description": "<p>request data.</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "data.userId",            "description": "<p>User unique Id.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "data.firstName",            "description": "<p>User first name.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "data.lastName",            "description": "<p>User last name.</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "data.age",            "description": "<p>User age.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "data.email",            "description": "<p>User email.</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "  HTTP/2 200 OK\n{\n    \"code\": \"user_found\",\n    \"status\": 200,\n    \"message\": \"You have access to this user.\",\n    \"data\": {\n        \"userId\": 1,\n        \"firstName\": \"John\",\n        \"lastName\": \"Doe\",\n        \"age\": 20,\n        \"email\": \"john@doe.com\",\n    }\n}",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "data_not_found",            "description": "<p>Data was not found.</p>"          },          {            "group": "Error 4xx",            "optional": false,            "field": "invalid_parameters",            "description": "<p>Invalid parameters.</p>"          }        ]      },      "examples": [        {          "title": "Error-Response:",          "content": "{\n    \"code\": \"data_not_found\",\n    \"status\": 404,\n    \"message\": \"Data was not found.\"\n}",          "type": "json"        },        {          "title": "Error-Response:",          "content": "{\n    \"code\": \"invalid_parameters\",\n    \"status\": 400,\n    \"message\": \"\\\"userId\\\" must be a number\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "src/interface/http/components/user/user.controller.ts",    "groupTitle": "User"  },  {    "type": "get",    "url": "/user",    "title": "Find all users",    "name": "GetUsers",    "group": "User",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "code",            "description": "<p>request status code.</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "status",            "description": "<p>request status.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>request message.</p>"          },          {            "group": "Success 200",            "type": "Object[]",            "optional": false,            "field": "data",            "description": "<p>request data.</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "data.userId",            "description": "<p>User unique Id.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "data.firstName",            "description": "<p>User first name.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "data.lastName",            "description": "<p>User last name.</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "data.age",            "description": "<p>User age.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "data.email",            "description": "<p>User email.</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "  HTTP/2 200 OK\n{\n    \"code\": \"users_found\",\n    \"status\": 200,\n    \"message\": \"You have access to these users.\",\n    \"data\": [{\n        \"userId\": 1,\n        \"firstName\": \"John\",\n        \"lastName\": \"Doe\",\n        \"age\": 20,\n        \"email\": \"john@doe.com\",\n    }]\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "src/interface/http/components/user/user.controller.ts",    "groupTitle": "User"  },  {    "type": "put",    "url": "/user/:userId",    "title": "Update user",    "name": "UpdateUser",    "group": "User",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "number",            "optional": false,            "field": "userId",            "description": "<p>User Id.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": true,            "field": "email",            "description": "<p>User email.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": true,            "field": "firstName",            "description": "<p>User firstName.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": true,            "field": "lastName",            "description": "<p>User lastName.</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": true,            "field": "age",            "description": "<p>User age.</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "code",            "description": "<p>request status code.</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "status",            "description": "<p>request status.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>request message.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "data",            "description": "<p>request data.</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "data.userId",            "description": "<p>User unique Id.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "data.firstName",            "description": "<p>User first name.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "data.lastName",            "description": "<p>User last name.</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "data.age",            "description": "<p>User age.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "data.email",            "description": "<p>User email.</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "  HTTP/2 200 OK\n{\n    \"code\": \"user_updated\",\n    \"status\": 200,\n    \"message\": \"User was successfully updated.\",\n    \"data\": {\n        \"userId\": 1,\n        \"firstName\": \"John\",\n        \"lastName\": \"Doe\",\n        \"age\": 20,\n        \"email\": \"john@doe.com\",\n    }\n}",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "data_not_found",            "description": "<p>Data was not found.</p>"          },          {            "group": "Error 4xx",            "optional": false,            "field": "invalid_parameters",            "description": "<p>Invalid parameters.</p>"          },          {            "group": "Error 4xx",            "optional": false,            "field": "email_already_used",            "description": "<p>Email already used.</p>"          }        ]      },      "examples": [        {          "title": "Error-Response:",          "content": "{\n    \"code\": \"data_not_found\",\n    \"status\": 404,\n    \"message\": \"Data was not found.\"\n}",          "type": "json"        },        {          "title": "Error-Response:",          "content": "{\n    \"code\": \"invalid_parameters\",\n    \"status\": 400\n    \"message\": \"\\\"userId\\\" must be a number\"\n}",          "type": "json"        },        {          "title": "Error-Response:",          "content": "{\n    \"code\": \"email_already_used\",\n    \"status\": 400,\n    \"message\": \"Email already in use.\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "src/interface/http/components/user/user.controller.ts",    "groupTitle": "User"  }] });
