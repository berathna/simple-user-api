### API Endpoints for Users

- **`GET /users`**  
  Returns users with index from **1 to 1000**.

- **`GET /users?offset=<number>&limit=<number>`**  
  Example: `/users?offset=3&limit=10`  
  Returns a limited number of users starting from a specific offset.

- **`GET /users/id/<number>`**  
  Example: `/users/id/50`  
  Returns user(s) with the specified ID.  
  Supports `limit` and `offset` query parameters.

---

### Searchable Fields

You can search users by the following fields:

- `first_name`
- `last_name`
- `email`
- `favorite_color`
- `favorite_city`
- `ip_address`
- `favorite_plant`
- `employer`
