```sh
npm i
```
```sh
npm run dev
```
#### Web server listening on
```sh
http://internship.stg.aws.hiqo-solutions.com:3000/
```

In requests it is necessary to transfer the token received after registration / authorization
```json
header {
    "authorization": '<authToken>'
}
```

### SignUp request.

POST /auth/signup

body :
``` json
{
    "email": "email" //required
    "password": "password" //required
    "name": "name"
}
```
Response example:
``` json
{
    "success": true,
    "data": {
        "user": {
            "_id": "userId",
            "name": "name",
            "email": "email"
        },
        "token": "<token>"
    }
}
```
---
### SignIn request

POST /auth/signin

body :
``` json
{
    "email": "email" //required
	"password": "password" //required
}
```
Response example:
``` json
{
    "success": true,
    "data": {
        "user": {
            "_id": "<userId>",
            "name": "<name>",
            "email": "<email>",
           "createdAt": "XXXX-XX-XXTXX:XX:XX.XXXZ",
            "updatedAt": "XXXX-XX-XXTXX:XX:XX.XXXZ"
        },
        "token": "<token>"
    }
}
```
---
### Auth user requsets
GET /users/current/**token**

Response example:
``` json
{
    "success": true,
    "data": {
        "user": {
            "_id": "<userId>",
            "name": "<name>",
            "email": "<email>",
           "createdAt": "XXXX-XX-XXTXX:XX:XX.XXXZ",
            "updatedAt": "XXXX-XX-XXTXX:XX:XX.XXXZ"
        },
        "token": "<token>"
    }
}
```

---

### Board requsets
1) createBoard

POST /boards

body :
``` json
{
    "title": "Board title"
}
```
Response example:
``` json
{
    "success": true,
    "data": {
        "board": {
            "_id": "<boardID>",
            "title": "Board title",
            "users": [],
            "columns": [],
            "createdAt": "XXXX-XX-XXTXX:XX:XX.XXXZ",
            "updatedAt": "XXXX-XX-XXTXX:XX:XX.XXXZ"
        }
    }
}
```
2) getBoards

GET /boards

Response example:
``` json
{
    "success": true,
    "data": {
        "boards": [
            {
                "users": [...],
                "columns": [...],
                "_id": "boardId",
                "title": "Title board",
                "createdAt": "XXXX-XX-XXTXX:XX:XX.XXXZ",
                "updatedAt": "XXXX-XX-XXTXX:XX:XX.XXXZ",
            }
        ]
    }
}
```
3) Search by board id

GET /boards/**boardId**

Response example:
``` json
{
    "success": true,
    "data": {
        "_id": "boardId",
        "title": "Title board",
        "users": [...],
        "columns": [...],
        "createdAt": "XXXX-XX-XXTXX:XX:XX.XXXZ",
        "updatedAt": "XXXX-XX-XXTXX:XX:XX.XXXZ"
    }
}
```

4) Update board

PUT /boards/**boardId**

body :
``` json
{
    "title": "New title"
}
```
Response example:
``` json
{
    "success": true,
    "data": {
        "_id": "<boardId>",
        "title": "New title",
        "users": [...],
        "columns": [...],
        "createdAt": "XXXX-XX-XXTXX:XX:XX.XXXZ",
        "updatedAt": "XXXX-XX-XXTXX:XX:XX.XXXZ"
    }
}
```

5) detele board

DELETE /boards/**boardId**

Response example:
``` json
{
    "success": true,
    "data": {
        "status": true,
        "_id": "<boardId>"
    }
}
```
6) Add or delte user on boadr

PATCH /boards/**boardId**

body :
``` json
{
    "userId": "<userId>"
}
```
Response example:
``` json
{
    "success": true,
    "data": {
        "_id": "<boardId>",
        "title": "<Board title>",
        "users": [ add <user> or delete],
        "columns": [...],
        "createdAt": "XXXX-XX-XXTXX:XX:XX.XXXZ",
        "updatedAt": "XXXX-XX-XXTXX:XX:XX.XXXZ"
    }
}

```
---
### Column requests

1) Create column

POST /columns/**boardId**

body :
``` json
{
    "title": "Column title"
}
```
Response example:
``` json
{
    "success": true,
    "data": {
        "_id": "<columnId>",
        "title": "Column title",
        "tasks": [...],
        "createdAt": "XXXX-XX-XXTXX:XX:XX.XXXZ",
        "updatedAt": "XXXX-XX-XXTXX:XX:XX.XXXZ"
    }
}
```
2) Update column

PUT /columns/**columnId**

body :
``` json
{
    "title": "New title"
}
```
Response example:
``` json
{
    "success": true,
    "data": {
        "_id": "<columnId>",
        "title": "New title",
        "tasks": [...],
        "createdAt": "XXXX-XX-XXTXX:XX:XX.XXXZ",
        "updatedAt": "XXXX-XX-XXTXX:XX:XX.XXXZ"
    }
}
```
3) Delete column

DELETE /columns/**columnId**

Response example:
``` json
{
    "success": true,
    "data": {
        "status": true,
        "_id": <columnId>
    }
}
```
---
### Task requests
1) Create task

POST /tasks/**columnId**

body :
``` json
{
    "task": "Task"
}
```
Response example:
``` json
{
    "success": true,
    "data": {
        "_id": "...",
        "task": "Task",
        "users": [...],
         "createdAt": "XXXX-XX-XXTXX:XX:XX.XXXZ",
        "updatedAt": "XXXX-XX-XXTXX:XX:XX.XXXZ"
    }
}
```
2) Update task

PUT /boards

body :
``` json
{
    "task": "New name task"
}
```
Response example:
``` json
{
    "success": true,
    "data": {
        "_id": "<taskId>",
        "task": "New name task",
        "users": [...],
        "createdAt": "XXXX-XX-XXTXX:XX:XX.XXXZ",
        "updatedAt": "XXXX-XX-XXTXX:XX:XX.XXXZ"
    }
}
```
3) Delete task

DELETE /tasks/**taskId**

Response example:
``` json
{
    "success": true,
    "data": {
        "status": true,
        "id": "<taskId>"
    }
}

```
4) Add or delete user on task

PATCH /tasks/**taskId**

body :
``` json
{
	"userId": "<userId>"
}
```
Response example:
``` json
{
    "success": true,
    "data": {
        "_id": "<taskId>",
        "task": "...",
        "users": [ add <user> or delete ],
        "createdAt": "XXXX-XX-XXTXX:XX:XX.XXXZ",
        "updatedAt": "XXXX-XX-XXTXX:XX:XX.XXXZ"
    }
}
```
---
### Comment requests
1) Create comment

POST /comments/**taskId**

body :
``` json
{
	"comment": "comment text",  //required
	"email": "<user email>",  //required
	"name": "<user name>"  //required
}
```
Response example:
``` json
{
    "success": true,
    "data": {
        "comment": {
            "_id": "<commentId>",
            "email": "<user email>",
            "name": "<user name>",
            "comment": "<comment text>",
            "createdAt": "XXXX-XX-XXTXX:XX:XX.XXXZ",
            "updatedAt": "XXXX-XX-XXTXX:XX:XX.XXXZ"
        }
    }
}
```

2) Delete comment

DELETE /comments/**commentId**

body :
``` json
{
    "taskId": "<taskId>"
}
```
Response example:
``` json
{
    "success": true,
    "data": {
        "status": true,
        "id": "<commentId>"
    }
}

```