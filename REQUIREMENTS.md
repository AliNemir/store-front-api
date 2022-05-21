# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index '/products'[GET]
- Show '/products:id'[GET]
- Create '/products'[token required] [POST]
- Update /products/:id [PUT] [token required]
- Delete /products/:id [DELETE] [token required]

#### Users
- Index '/users'[GET] [token required]
- Show '/users/:id' [GET] [token required]
- Create '/users' [POST] [token required]
- Login '/login' [POST]
- Delete '/users/:id' [DELETE] [token required]
- Update '/users/:id' [PATCH] [token required]
- Get Token '/users/:id/get_token' [GET] [token required]

#### Orders
- Index '/users/:user_id/orders' [GET] [token required]
- Create '/users/:user_id/orders' [POST] [token required]
- Read '/users/:user_id/orders/:order_id' [GET] [token required]
- Update '/users/:user_id/orders/:order_id' [PATCH] [token required]
- Delete '/users/:user_id/orders/:order_id' [DELETE] [token required]
- Add Product '/users/:user_id/orders/:order_id/products' [POST] [token required]


## Data Shapes
#### Product
- id "SERIAL PRIMARY KEY"
- name "VARCHAR"
- price "INTEGER"
- category "VARCHAR"

#### User
- id "SERIAL PRIMARY KEY"
- firstName "VARCHAR"
- lastName "VARCHAR"
- password "VARCHAR"

#### Orders
- id "SERIAL PRIMARY KEY"
- user_id "bigint references users(id)"
- status "VARCHAR"

#### ORDER-PRODUCTS
- id "SERIAL PRIMARY KEY"
- quantity "INTEGER"
- order_id "bigint references orders(id)"
- product_id "product_id bigint references products(id)"