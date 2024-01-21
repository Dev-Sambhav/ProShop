# E Commerce Site built in MERN Stack

Welcome to Proshop, your go-to destination for premium products and seamless online shopping. Explore a curated collection of the latest gadgets, fashion, and lifestyle products. Enjoy a user-friendly interface, secure transactions, and reliable delivery. Elevate your shopping experience with Proshop.

## Key Features

* __Order Tracking__: Keep tabs on your purchases with real-time order tracking and delivery status updates.
* __Secure Transactions__: Shop confidently knowing that your transactions are secure, thanks to our robust payment systems.
* __User-Friendly Interface__: Intuitive design for a seamless user experience.
* __Product Reviews and Ratings__: Make informed decisions with user-generated product reviews and ratings from the Proshop community.

## Tech Stack

**Client:** React js, React-Bootstrap

**State Management**: Redux Toolkit

**Server:** Node js, Express js

## Environment Variables

To run this project, you need to set up the following environment variables in a `.env` file. Create a file named `.env` in the root of your project and add the following:

```plaintext
NODE_ENV = development
PORT = 5000
MONGO_URI = your_database_url
JWT_SECRET = your_jwt_secret
PAYPAL_CLIENT_ID = your_client_id
PAGINATION_LIMIT = 8
```

## Local Setup

Follow these steps to run the project locally on your machine.

### Prerequisites

- Node.js and npm installed on your machine. You can download them [here](https://nodejs.org/).

### Clone the Repository

```bash
git clone https://github.com/your-username/ProShop.git
cd your-project
```

### Install dependencies

```bash
  npm run frontend-install
  npm install
```
### Set Up Environment Variables
Create a .env file in the root of the project and add the necessary environment variables. Refer to the Environment Variables section in this README for details.

### Start the Application
 ```bash
    npm run dev <!-- This will start both client and server -->
```

### Note
Do not commit your .env file to version control systems. Make sure to add it to your .gitignore file to keep sensitive information secure.

### Repo Activity

![Activity](https://repobeats.axiom.co/api/embed/48ce1baaf8a7d9822ea00c9f7fbc1f189a70f14c.svg "Repobeats analytics image")
