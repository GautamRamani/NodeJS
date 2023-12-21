# Debugging and Code Optimization Challenge - My Submission

Hello there! This is my submission for the Debugging and Code Optimization Challenge. In this exercise, I've put my debugging skills to the test and optimized the code in a real-world application. The repository utilizes Express.js and Mongoose to create a backend server and perform MongoDB operations. Before I started, I made sure to carefully read the instructions. Here's what I did:

## Instructions

1. I made sure not to use any external libraries for pagination. Instead, I implemented server-side pagination directly on the database.
2. I created a new `.env` file by copying the provided `.env.example` file using the following command:

    ```bash
    cp .env.example .env
    ```

3. To install the necessary dependencies, I ran the following commands:

    ```bash
    yarn
    ```

    or

    ```bash
    npm i
    ```

4. I then ran the test cases to ensure everything was working as expected. It was crucial to make sure all the test cases passed to consider the task complete. Here are the commands I used:

    ```bash
    npm run test
    ```

    or

    ```bash
    yarn test
    ```

5. To populate the database with data, I executed the following command:

    ```bash
    npm run seed
    ```

    or

    ```bash
    yarn seed
    ```

   This command created 100 users and added 1-5 posts per user. I used this seeder to populate the database with sample data.

6. My main focus was on the `src/controllers/user.controller.js` file, specifically the `getUsersWithPostCount` section marked as "TODO."

## Task

My primary task was to implement a `[GET] http://localhost:3000/users` endpoint that returns all the users with their post count. This API also had to include server-side pagination.

The response format for this API needed to match the example provided in the instructions. Here's what the response should look like:

```json
{
    "data": {
        "users": [
            {
                "_id": "624bccc95debe2a2672738a0",
                "name": "Jacklyn",
                "posts": 2
            },
            {
                "_id": "624bccc95debe2a2672738a1",
                "name": "Jefferey",
                "posts": 2
            },
            {
                "_id": "624bccc95debe2a2672738a2",
                "name": "Mateo",
                "posts": 2
            },
            {
                "_id": "624bccc95debe2a2672738a3",
                "name": "Lyric",
                "posts": 2
            },
            {
                "_id": "624bccc95debe2a2672738a4",
                "name": "Shannon",
                "posts": 2
            },
            {
                "_id": "624bccc95debe2a2672738a5",
                "name": "Evelyn",
                "posts": 2
            },
            {
                "_id": "624bccc95debe2a2672738a6",
                "name": "Brad",
                "posts": 2
            },
            {
                "_id": "624bccc95debe2a2672738a7",
                "name": "Leslie",
                "posts": 2
            },
            {
                "_id": "624bccc95debe2a2672738a8",
                "name": "Laron",
                "posts": 2
            },
            {
                "_id": "624bccc95debe2a2672738a9",
                "name": "Lizeth",
                "posts": 2
            }
        ],
        "pagination": {
            "totalDocs": 100,
            "limit": 10,
            "page": 1,
            "totalPages": 10,
            "pagingCounter": 1,
            "hasPrevPage": false,
            "hasNextPage": true,
            "prevPage": null,
            "nextPage": 2
        }
    }
}
