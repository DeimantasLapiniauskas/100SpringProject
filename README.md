# Happy Hearts

## About

Happy Hearts is a veterinary clinic website that allows users to register their pets for appointments, reschedule or cancel said appointments, and buy animal products such as medicine, food toys, and more!

## Features

* Pet Registration: Include your pet information for ease of access for both you and the veterinarians you register an appointment to.

* Appointment Scheduling: Register your pet to an appointment to one of our many provided services, to whichever vet you want! After you select the service, vet, and time (and optionally add in notes you think the vet should know!), said vet receives an email notifying them of the registration. They can log in to confirm it whenever, or reschedule it for a different time, in which case YOU get an email, politely asking you to visit our website to confirm your availability for then! Of course, both sides can reschedule or even cancel at any time.

* Online Shop: Peruse our vast list of helpful items for your pets! Filter and search to your hearts content, and make a shopping cart to brighten up your beloved pets life. (Actual monetary transactions not included (This isn't an actual clinic, we don't have the products we're advertizing so we can't legally sell you anything))

## Technologies Used

### Frontend - Javascript
* React + Vite
* TailwindCss
* React Hook Forms
* React Routes
* Axios

### Backend - Java
* Spring Boot
* Maven
* Junit Jupiter
* Spring Boot email core
* Spring Boot oauth2 server
* Spring Boot starter security
* Swagger

### Databases
* Mysql
* Amazon Webserver
* Phpmyadmin

## Installation

### Frontend Setup
```
# Clone the repository
git clone https://github.com/DeimantasLapiniauskas/100SpringProject.git
# Navigate to the project frontend directory
cd 100Spring/vet-spring
# Install dependencies
npm install
# Start the server
npm run dev
```
### Backend Setup

## Starting the Project using a local database

* Start the Docker Desktop software.
* Run the following commands inside the terminal:
```
# Step 1.
docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d -p 3306:3306 mysql:8.0

# Step 2.
docker run --name phpmyadmin -d --link some-mysql:db -p 8081:80 phpmyadmin

```
* Database should be available on http://localhost:8081 .
  ```
 username: root

 password: my-secret-pw

```
* Start your Integrated Development Environment software of choice (i.e., IntelliJ IDEA).

## Starting the Project using a remote server (Amazon Web Service) for database

* Start the Docker Desktop software.
* Run the following inside the terminal:
```
# Step 1. If a a project was run locally before run the command below. Otherwise go to Step 2:
docker rm phpmyadmin

# Step 2.
docker run --name phpmyadmin -d -e PMA_HOST=happy-hearths-db.cjcswiuquqvn.eu-north-1.rds.amazonaws.com -e PMA_PORT=3306 -e PMA_USER-admin -e PMA_PASSWORD=MySecretPass123! -p 8081:80 phpmyadmin

```
* Database should be available on http://localhost:8081
```
 username: admin

 password: MySecretPass123!

```
* Aquire the aws-credentials file from the main owners of the project.
* Insert the aws-credentials file iside the \100SpringProject\api folder.
* Start your Integrated Development Environment software of choice (i.e., IntelliJ IDEA).

## Usage

1. Creating a Client Account: Register with your email, password, firstname, lastname and phone number (keep in mind your email can and receive mail!)
2. Browsing services: View all of our provided services in the Services page! Click it on the navbar!
3. Browsing posts made my vets: View all of our veterinarian-made posts! This includes news, sales and more!
4. Browsing products: View all of our available products in the Products page!
5. Purchasing products (sorta): Start your own shopping cart and throw any of our products in there to enjoy (sorta)!
6. Scheduling appointments: After registering a pet, you can sign up to any of our services at any time! The vet will confirm your visit when they can, please be patient.
7. Rescheduling and cancelling appointments: After making an appointment, you can reschedule or cancel at any time! Reschedulings will need to be confirmed.
8. Reviews and comments: (In progress)
