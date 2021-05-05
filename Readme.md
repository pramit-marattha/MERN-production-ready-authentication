## MERN stack authentication

Login and register authenticaton and authorization using MERN stack.It includes hashing password and stroing them in secure place. and generating JWT token and storing it in the frontend and it also includes password reset feature by sending emails using nodemailer and sendgrid.

## Login

![image](https://user-images.githubusercontent.com/37651620/117123962-6cbedc00-adb7-11eb-83ab-bff853d35037.png)

## Register

![image](https://user-images.githubusercontent.com/37651620/117124131-a68fe280-adb7-11eb-9ed8-083e328f2d0e.png)

## Forgot password

![image](https://user-images.githubusercontent.com/37651620/117124212-c7f0ce80-adb7-11eb-8a8d-fecb612e482f.png)

## Reset password

![image](https://user-images.githubusercontent.com/37651620/117165050-e28d6c80-ade4-11eb-9fee-3625d9934709.png)
![image](https://user-images.githubusercontent.com/37651620/117124489-1e5e0d00-adb8-11eb-8885-f7eec05722db.png)

## Authenticated

![image](https://user-images.githubusercontent.com/37651620/117123424-b65af700-adb6-11eb-91fa-82962b6e8bde.png)

### configuration.env sample

```

EMAIL_FROM=**** your send grid email from
EMAIL_PASSWORD= **** sendgrid email pass
EMAIL_SERVICE_PROVIDER=SendGrid
EMAIL_USERNAME=apikey
JWT_EXPIRES_IN=10min
JWT_TOKEN_SECRET=**** your generated jwt token (got to your cmd type node and type '''crypto.randomBytes(30).toString("hex")''' copy it and paste it here)
MONGO_DB_URI=mongodb+srv://------------------------------------------------------------------------
PORT=4000
RESET_URL_LINK=*** your domain

```
