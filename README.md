Garuda Forum API
=========

This API serves as the backend for a forum application, allowing users to create threads, comment, reply to comments, and like comments. The API uses JWT authentication to secure certain endpoints.

Deployed API Endpoint
------------

The API is deployed and accessible at:
https://wise-dragons-teach-bravely.a276.dcdg.xyz/

Key Features
------------

-   **Threads**: Create and view thread details.
-   **Comments**: Add and delete comments on threads.
-   **Replies**: Reply to comments and delete replies.
-   **Likes**: Like and unlike comments.
-   **Authentication**: User registration, login, refresh token, and logout.

How to Access the API
---------------------

### 1\. **User Registration**

-   **Endpoint:** `POST /users`
-   **Description:** Registers a new user.
-   **Request Body:**

    ```
    {
      "username": "user123",
      "password": "password123",
      "fullname": "User Example"
    }

    ```

### 2\. **Authentication (Login, Refresh Token, Logout)**

-   **Login**
    -   **Endpoint:** `POST /authentications`
    -   **Request Body:**

        ```
        {
          "username": "user123",
          "password": "password123"
        }

        ```

-   **Refresh Token**
    -   **Endpoint:** `PUT /authentications`
    -   **Request Body:**

        ```
        {
          "refreshToken": "your_refresh_token"
        }

        ```

-   **Logout**
    -   **Endpoint:** `DELETE /authentications`
    -   **Request Body:**

        ```
        {
          "refreshToken": "your_refresh_token"
        }

        ```

### 3\. **Threads**

-   **Create a Thread** *(Requires JWT Authentication)*
    -   **Endpoint:** `POST /threads`
    -   **Request Body:**

        ```
        {
          "title": "Thread Title",
          "body": "Thread content."
        }

        ```

-   **View Thread Details**
    -   **Endpoint:** `GET /threads/{threadId}`

### 4\. **Comments**

-   **Add a Comment** *(Requires JWT Authentication)*
    -   **Endpoint:** `POST /threads/{threadId}/comments`
    -   **Request Body:**

        ```
        {
          "content": "My comment."
        }

        ```

-   **Delete a Comment** *(Requires JWT Authentication)*
    -   **Endpoint:** `DELETE /threads/{threadId}/comments/{commentId}`

### 5\. **Replies**

-   **Add a Reply** *(Requires JWT Authentication)*
    -   **Endpoint:** `POST /threads/{threadId}/comments/{commentId}/replies`
    -   **Request Body:**

        ```
        {
          "content": "My reply."
        }

        ```

-   **Delete a Reply** *(Requires JWT Authentication)*
    -   **Endpoint:** `DELETE /threads/{threadId}/comments/{commentId}/replies/{replyId}`

### 6\. **Likes**

-   **Like/Unlike a Comment** *(Requires JWT Authentication)*
    -   **Endpoint:** `PUT /threads/{threadId}/comments/{commentId}/likes`

Authentication
--------------

Some endpoints require JWT authentication. Make sure to include the token in the Authorization header:

```
Authorization: Bearer your_jwt_token

```

Technologies Used
-----------------

-   **Node.js** with **Hapi.js** as the framework
-   **JWT** for authentication
-   **PostgreSQL** as the database

* * * * *

This documentation may be updated as the project evolves. Make sure to use a valid token when accessing protected endpoints.
