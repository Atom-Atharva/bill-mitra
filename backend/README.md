# Bill Mitra: Billing Software

It is billing software made with `SPRING BOOT` for the retailers to generate bills for their customers. It contains the
following functionalities:

1. Register a store.
2. Register managers under the store.
3. Register employees under the store.

This product does not aim for a single organization, rather it aims for a group of organizations/stores to use it
without interfering with other store's products.

## Who is Manager?

A `MANAGER` is a type of user with `ROLE_MANAGER` who is created by store and is responsible for:

- Billing.
- Managing Employees.
- Managing Categories.
- Managing Items.

## Who is Employee?

An `EMPLOYEE` is a type of user with `ROLE_EMPLOYEE` who is created by store or manager and is responsible for:

- Billing.

## What is Category?

A `CATEGORY` is group of common items having similar properties. A category can have multiple items which make it easy
to accessible and operate.

## What is Item?

An `ITEM` is an object which is billed for the customer. It contains price and is linked to a specific category.

## Flow of Application

- A store `/register` onto the application with email and password.
- User with ROLE **OWNER** will be created under store (First User).
- Then owner can `/create` its managers and employees.
- Managers or Employees can `/login` to the application for that store.
- Managers can `/create` more Employees.
- Managers can also CRUD on `/categories`, `/items`.
- Everyone can see sales on the home page of their store.
- Manager, Employee can generate bills and enter sales on their Ids.
- After usage, they can safely `/logout` from their systems.

## Database Overview (Rough)

![SQL Structure](src/main/resources/static/img/SQL%20Structure%20-%20Bill%20Mitra.png)

Diagram is designed using [drawSQL](https://drawsql.app).

## Let's get Technical

This application is made using `SPRINGBOOT` with integration of `SPRING SECURITY`, `AWS S3 BUCKET` and more. Database
used in this application is `MYSQL` because of its free usability.

### How did I make it?

To my future version, here is the well-documented application which you have built earlier. Yes! You have built it from
scratch and by yourself. I am proud of you! `O7 ATOM`

Now let's get started.

#### Configure Application

- Configure DB and related properties.
- Also, set Context Path for the APIs.
- Environment variables using `.env` file (for future references) but use it to configure run/debug configurations.

#### Create Entity Classes

- Created Entity Classes as per the Database Overview.
- Create Relationship (PK - FK) between different tables.

#### Authentication

- Used Jason-web-token to authenticate using cookies
- Authentication creates cookies that are passed to the frontend.
- Configure SecurityConfig with `@EnableWebSecurity`.
- Custom CORS Policy, FilterChain, etc.
- `CustomUserDetails` Class to fetch Custom User for `SecurityContextHolder` - Created for fetching storeId.

#### Managing Categories

- Controller for handling category APIs.
- For `ADDING CATEGORY` file and JSON as string is passed in request which can be parsed into CategoryRequest.
- `S3 BUCKET` is used to store files and access the imgUrl.
- Updated: CategoryEntity for making category unique within the store, not the whole DB.

Using

```java
@Table(
        name = "ref_category",
        uniqueConstraints = @UniqueConstraint(columnNames = {"name", "store_id"})
)
```

and

```java
Optional<CategoryEntity> findByStore_idAndName(Long storeId, String name);
```

#### Configuration of S3 Bucket

- Refer `AWSConfig, FileUploadService and FileUploadServiceImpl` classes.

```.env
# AWS Properties
aws.access.key=${AWS_ACCESS_KEY}
aws.secret.key=${AWS_SECRET_KEY}
aws.region=${AWS_REGION}
aws.bucket.name=${AWS_BUCKET_NAME}
```

#### Managing Items

- Controller for handling item APIs.
- For `ADDING ITEMS` file and JSON as string is passed in request which can be parsed into ItemRequest.
- `S3 BUCKET` is used to store files and access the imgUrl.
- ItemEntity for making Item unique within the category, not the whole DB.

Using

```java
@Table(
        name = "ref_item",
        uniqueConstraints = @UniqueConstraint(columnNames = {"name", "category_id"})
)
```

and

```java
Optional<ItemEntity> findByCategory_idAndName(Long categoryId, String name);
```

#### Let's place an Order

- Controller for handling Order request
- Flow for placing the order:
  - Frontend places an order
  - Order is stored with the 'PENDING' state inside the order table.
  - If the payment mode is 'CASH' success it immediately.
  - Else return and redirected to Payment Gateway with generated razorpay_order_id.
  - After payment verify it and rewrite inside the Order Table for updating the status.
  - With the order table also write the order items inside the order item list table.
- Check `ref_order` and `ref_order_item` tables inside `OrderEntity` and `OrderItemEntity`.