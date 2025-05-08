# Happy Hearts

## About

Happy Hearts is a veterinary clinic website that allows users to register their pets for appointments, reschedule or cancel said appointments, and buy animal products such as medicine, food toys, and more! 

##
## User types

### Client
* Clients are pet owners.
* Use our app as general customers.
* Certain content editing powers are restricted.

### Vet
* Vets are the Clinic staff.
* Given powers to edit content of the website.
* Main responsibilities: creating/editing/deleting Posts, Services, Products; managing Appointments; managing Orders.
* Given powers to edit content of the website.
* Certain content editing powers that are either shared with Admins or exclusive to Vets.
* Some powers can overlap between Admin and Vet, but per our Project Policy, even with similar powers, roles should have different responsibilities they should stick to. (i.e. two employees from different departments but using the same software system).

### Admin
* Clinic administrators.
* Given powers not only to edit content but other users as well.
* Main responsibilities: editing user details; changing passwords; deleting users; registering new Vets.
* Certain content editing powers that are either shared with Vets or exclusive to Admins.
* Some powers can overlap between Admin and Vet, but per our Project Policy, even with similar powers, roles should have different responsibilities they should stick to. (i.e. two employees from different departments but using the same software system).

##
## Features

* Pet Registration: Include your pet information for ease of access for both you and the veterinarians you register an appointment with.

* Appointment Scheduling: Register your pet for an appointment to one of our many services provided, to whichever vet you want! After you select the service, vet, and time (and optionally add in notes you think the vet should know!), said vet receives an email notifying them of the registration. They can log in to confirm it, or reschedule it for a different time, in which case YOU get an email, politely asking you to visit our website to confirm your availability for then! Of course, both sides can reschedule or even cancel at any time.

* Online Shop: View our vast list of helpful items for your pets! Filter and search to your heart's content, and make a shopping cart to brighten up your beloved pet's life. (Actual monetary transactions not included (This isn't an actual clinic, we don't have the products we're advertising so we can't legally sell you anything)).

* Reviews: Liked our service? Please feel free to rate your time spent with the practice and leave a heartwarming review!

* Posts: Browse our News Page to scroll through various posts about our clinic news, latest product sales, blogs and pet care trivia. Indulge in the sea of wonderful content to brighten your day and get to know our practice better! 

##
## Technologies Used

### Frontend - Javascript
* React + Vite
* Tailwind CSS
* DaisyUI
* React Hook Form
* React Router
* Axios

### Backend - Java
* Spring Boot
* Maven
* Junit Jupiter
* Spring Boot email core
* Spring Boot oauth2 server
* Spring Boot starter security
* Auth standard - JWT Token
* Swagger

### Databases
* Mysql
* Amazon Webserver
* phpMyAdmin

### Software
* Visual Studio Code
* IntelliJ

##
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

#### Starting the Project using a local database

* Start the Docker Desktop software.
* Run the following commands inside the terminal:
```
# Step 1.

docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d -p 3306:3306 mysql:8.0

# Step 2.

docker run --name phpmyadmin -d --link some-mysql:db -p 8081:80 phpmyadmin

```
* Make sure the new Docker Desktop containers are running.
* Start your Integrated Development Environment software of choice (i.e., IntelliJ IDEA).

#### Starting the Project using a remote server (Amazon Web Service) for database

##### _NOTE: AWS Credentials Security Notice. We do not include the aws-credentials file in this repository for security reasons. If you are an interested employer, collaborator, or reviewer who would like to run or test the AWS-related features, please contact the project owners directly to request access credentials or guidance on how to set up your own environment._

* Start the Docker Desktop software.
* Run the following inside the terminal:
```
# Step 1. If a a project was run locally before run the command below. Otherwise go to Step 2:

docker rm phpmyadmin

# Step 2.

docker run --name phpmyadmin -d -e PMA_HOST=happy-hearths-db.cjcswiuquqvn.eu-north-1.rds.amazonaws.com -e PMA_PORT=3306 -e PMA_USER-admin -e PMA_PASSWORD=MySecretPass123! -p 8081:80 phpmyadmin

```
* Make sure the new Docker Desktop containers are running.
* Acquire the aws-credentials file from the main owners of the project.
* Insert the aws-credentials file inside the \100SpringProject\api folder.
* Start your Integrated Development Environment software of choice (i.e., IntelliJ IDEA).

##
## Usage [As a CLIENT user]

### Creating a Client Account [Pages in question - Log In Page and Register Page]:
* Register with your email, password, first name, last name and phone number (keep in mind your email can and receive mail!).

### Home Page [Pages in question - Home Page]:
* On successful registration or log in, you will be redirected to the Home Page.
* There you can familiarize with our clinic's general information.

### Navigation: Explore the Navigation Bar (NavBar) - the gateway to wonderful features our website has to offer [NavBar; Drop Down Menu]:
* Look through the pages on the NavBar as an initial familiarity with the website.
* Navigate towards the paw print logo on the far-right edge of the NavBar and click on the logo.
* An expanded menu - Dropdown Menu - appears.
* Pages listed are: Profile; Appointments History; Your Pets; Orders; Log Out .
* Appointments History Page is Client and Vet exclusive. Your Pets Page is Client exclusive.
* If a Client would like to log out of their account, it can be done through Log Out.

### View your profile [Pages in question - Profile Page]:
* Enter Profile Page on the expanded Drop Down Menu.
* There you can find your user details as a Client you used to register your account.

### Pet registration [Pages in question - Your Pets Page]:
* On the same Drop Down Menu, enter Your Pets Page.
* Click "Add Pet"
* Register your pet with name, species (e.g., cat; dog), breed (e.g., husky), birthdate and gender.
* A card with newly registered pet will appear on the screen. Pet has been registered as a patient of the clinic.
* You can edit the pet information as well if need arises.
* Pagination function for how much content is displayed per page is available as well.

### Scheduling, rescheduling and canceling appointments [Pages in question - Appointments History Page]:
* After registering a pet, you can sign up to any of our services with the app at any time!
* It can be done using the Service List Page by finding your specific service or the Appointments History Page on the Drop Down Menu.
* Both versions will provide a form to fill with date, your pet, veterinarian requested, service, and optional notes you think the Vet should know.
* At this point, the appointment Status has become Scheduled but will require verification from the Vet listed in the appointment.
* Afterward the Vet will confirm your visit when they can, please be patient.
* Notification emails are sent automatically. One is sent to the Vet as the appointment is made. Also, the Client and Vet are notified by email if the appointment has been rescheduled or cancelled.
* Both Client and Vet can reschedule and cancel appointments.
* A rescheduled appointment changes the Status to Waiting (indicating the confirmation is needed for Status to become Scheduled again).
* A rescheduled appointment has to be confirmed by Client on the Appointment History Page if Vet is the one that rescheduled it.
* A rescheduled appointment has to be confirmed by Vet on the Appointment History Page if Client is the one that rescheduled it.
* Cancelled appointment changes the Status to Cancelled.

### Reviews and comments [Pages in question - Reviews Page]:
* If you wish to leave a review you can find it on our Reviews Page. Accessible through the Reviews card on the Home Page.
* 5 Star Rating System and comments textbox are used to generate a review.
* Reviews from other Clients can be seen hovering to the side, as well as an option to read more reviews with a link just below.
* Page with all reviews allows to filter them (by 5 Star Rating System), depending what a Client would like to see. Makes it easier for a Client to find a review they are looking for.
* Pagination function for how much content is displayed per page is available as well.

### Browsing posts made by vets: View all our veterinarian-made posts! This includes news, sales and more! [Pages in question - News Page]:
* Posts can be browsed primarily on the News Page, but they appear on the Home Page and Service List Page as well.
* Posts are made by Vets and are separated into Post types: News, Sale!, Blog and PetCare. As such, Clients can filter posts (by Post type), or use a search bar to find the post they are looking for.
* News - Clinic latest news.
* Sales! - Product sales.
* Blog - Stories of our past visitor's successful recoveries.
* PetCare - useful trivia about pet health.
* Pagination function for how much content is displayed per page is available as well.

### Our clinic services: List of the medical procedures and consultations we offer. [Pages in question - Service List Page]:
* List of the services available as well as their price can be found on the Service List Page.
* An additional route to register for an appointment by pressing "Register" on the relevant service card.
* Page allows to filter services (alphabetically or by price), depending what a Client would like to see, or a search bar can be used. Makes it easier for a Client to find a service they are looking for.
* Pagination function for how much content is displayed per page is available as well.

### Browsing products: View all of our available products in the Products page! [Pages in question - Products Page]:
* Products are separated into categories Food, Toys and Medicine. As a result, Clients can filter products (by Category) or use a search bar to find the product they are looking for.
* Pagination function for how much content is displayed per page is available as well.

### Purchasing products (simulation). Start your own shopping cart and throw any of our products in there to enjoy! Manage your orders on your personal Orders Page. [Pages in question - Products Page; Orders Page]:
* Selected products will be transferred to a Shopping Cart - icon can be found on the top left corner of the page.
* Editing your shopping cart can be done either on the Shopping Cart card or on the separate Your Cart Page (entered by pressing "Proceed to Cart Page").
* "Place order" button is included to place an order.
* Transfer to Orders Page on the Drop Down Menu to view your order progress.
* Page allows to filter orders (by order Status), depending what a Client would like to see, or a search bar can be used. Makes it easier for a Client to find an order they are looking for.
* Pagination function for how much content is displayed per page is available as well.
* After placing an order, the order Status is Pending by default.
* For the order Status be changed to Confirmed and Pay Now button to appear, a vet or admin must first confirm the placed order from their side.
* Clients, Vets and Admins all have the power to Cancel the order. 
* Real life monetary transactions are not included. As this is not an actual clinic, we don't own the products we're advertising. As such, we can't sell these items to you legally.
* Pressing the Pay Now button does not lead to actual payment functionality. Only a pop up card appears saying "Neparduodam!" In Lithuanian, meaning "Not selling!".

##
## Usage [As an ADMIN user]. Recommended to view the [As a CLIENT user] section for better understanding as some features are shared between all user types.

### Creating an Admin Account [Pages in question - Log In Page and Register Page]:
* Admin account can not be created the same way as the Client account, using the website, but directly through our Data Base. This is done for security reasons.
* Register as a Client using the Register Page and steps mentioned previously.
* Enter the Data Base through http://localhost:8081 with username and password mentioned in Backend Setup. Data Base name should appear as vet_clinic .
* Pressing the vet_clinic Data Base should show the list of our Data Base tables.
* Check the accounts table to find the email you used to register your new Client account and take a note of the account id number.
* Next access the account-roles table and using the known id number (hovering on it should show the email as well), you can find the role your account has been attributed to.
* Account roles range from 1 to 3. 1 - ROLE_ADMIN ; 2 - ROLE_VET; 3 - ROLE_CLIENT . Your newly created Client account will have a number 3 role attributed to it.
* Using the Edit button on Data Base website, you can change the role from number 3 to number 1, resulting the previously created Client account turning into an Admin one.
* Accessing the website as an Admin through Log In page stays the same. Just use the email and password used in account registration.

### Home Page [Pages in question - Home Page]:
* No Admin exclusive features available.

### Navigation: Explore the Navigation Bar (NavBar) - the gateway to wonderful features our website has to offer [NavBar; Drop Down Menu]:
* Dropdown Menu includes: Profile; Admin Page; Orders; Log Out .
* Admin can not create/edit/delete appointments or register their pets.
* Admin Page is Client exclusive.
* If an Admin would like to log out of their account, it can be done through Log Out.

### View your profile [Pages in question - Profile Page]:
* Entering the Profile Page shows the Admin information and a red "Admin Page" button that is used to enter the Admin Page.

### Editing and deleting existing users. Registering new veterinarians. [Pages in question - Admin Page]:
* Admin Page can be entered using the link on the Drop Down Menu or by pressing the red "Admin Page" button on the Profile Page.
* Admin Page contains an Admin Panel, that is used for editing user details used on registration as well as deleting users.
* Page allows to register a new veterinarian - similar process as with the Register Page register form.
* There is no "Register an administrator" button as per our Project Policy, Admins can not create other Admins through a website or specifically through Frontend.
* Restriction on not being able to register a new Admin through the website is made for security reasons.
* Route to create a new Admin is limited to using the Data Base.

### Scheduling, rescheduling and canceling appointments [Pages in question - Appointments History Page]:
* Primarily a Vet responsibility.
* Appointments History Page not visible.
* Admins do not possess clearance to schedule, reschedule and cancel appointments.

### Reviews and comments [Pages in question - Reviews Page]:
* No Admin exclusive features available

### Browsing Posts made by vets. [Pages in question - News Page]:
* Primarily a Vet responsibility, unless an Admin can take over in case of unexpected circumstances (i.e. staff calling in sick).
* Admins can not create Posts but can edit and delete them. Relevant buttons appear visible if user is logged in as an Admin or a Vet.
* Page allows to filter posts (by Post type), depending what an Admin would like to see, or a search bar can be used. Makes it easier for an Admin to find a post they would like to edit or delete.
* Pagination function for how much content is displayed per page is available as well.
* Although, such powers are available to Admin, Posts managment is mainly a Vet responsibility. Some powers can overlap between Admin and Vet, but per our Project Policy, even with similar powers, roles should have different responsibilities they should stick to (i.e. two employees from different departments but using the same software system).

### Our clinic services: List of the medical procedures and consultations we offer. [Pages in question - Service List Page]:
* Primarily a Vet responsibility, unless an Admin can take over in case of unexpected circumstances (i.e. staff calling in sick).
* Admins can create/edit/delete Services as well as Vets. Relevant buttons appear visible if user is logged in as an Admin or a Vet.
* Page allows to filter services (alphabetically or by price), depending what an Admin would like to see, or a search bar can be used. Makes it easier for an Admin to find a service they would like to edit or delete.
* Pagination function for how much content is displayed per page is available as well.
* Although such powers are available to Admin, Service List management is mainly a Vet responsibility. Some powers can overlap between Admin and Vet, but per our Project Policy, even with similar powers, roles should have different responsibilities they should stick to. (i.e. two employees from different departments but using the same software system).

### Managing products on our online store (simulation). [Pages in question - Products Page]:
* Primarily a Vet responsibility, unless an Admin can take over in case of unexpected circumstances (i.e. staff calling in sick).
* Admins can create/edit/delete Products as well as Vets. Relevant buttons appear visible if user is logged in as an Admin or a Vet.
* Page allows to filter orders (by order Status), depending what an Admin would like to see, or a search bar can be used. Makes it easier for an Admin to find a service they would like to edit or delete.
* Pagination function for how much content is displayed per page is available as well.
* Although such powers are available to Admin, Service List management is mainly a Vet responsibility. Some powers can overlap between Admin and Vet, but per our Project Policy, even with similar powers, roles should have different responsibilities they should stick to. (i.e. two employees from different departments but using the same software system).

### Managing orders on our online store (simulation). [Pages in question - Orders Page]:
* Primarily a Vet responsibility, unless an Admin can take over in case of unexpected circumstances (i.e. staff calling in sick).
* Transfer to Orders Page on the Drop Down Menu to view orders made by Clients.
* List of orders is displayed in the form of cards with their Status shown as well. Pending, Confirmed or Cancelled.
* Page allows to filter orders (by order Status), depending what an Admin would like to see, or a search bar can be used. Makes it easier for an Admin to find a service they would like to edit or delete.
* Pagination function for how much content is displayed per page is available as well.
* In order for the Client order to proceed, Admin or Vet need to confirm the newly placed order. Identifiable by order Date and its Status - Pending.
* Once confirmed, order Status is changed to Confirmed and Pay Now button should appear on the Client side.
* Admins, Vets and Clients all have the power to Cancel the order.
* Although such powers are available to Admin, Orders management is mainly a Vet responsibility. Some powers can overlap between Admin and Vet, but per our Project Policy, even with similar powers, roles should have different responsibilities they should stick to. (i.e. two employees from different departments but using the same software system).
* Real life monetary transactions are not included. As this is not an actual clinic, we don't own the products we're advertising. As such, we can't sell these items to you legally.

##
## Usage [As a VET user]. Recommended to view the [As a CLIENT user] and [As a ADMIN user] section for better understanding as some features are shared between all user types.

### Creating a Vet Account [Pages in question - Log In Page and Register Page]:
* Vet account can not be created the same way as the Client account, but by an Admin using their Admin Page "Register a veterinarian" button. This is done for security reasons.
* New veterinarian registration involves a similar process as with the Register Page register form but through the Admin Page by an Admin.
* Email used for creating a new Vet should be chosen carefully, as it will be used to receive notifications.
* Accessing the website as a Vet through Log In page stays the same. Just use the email and password used in account registration.

### Home Page [Pages in question - Home Page]:
* No Vet exclusive features available.

### Navigation: Explore the Navigation Bar (NavBar) - the gateway to wonderful features our website has to offer [NavBar; Drop Down Menu]:
* Dropdown Menu includes: Profile; Appointments History; Orders; Log Out .
* Appointments History Page is Vet and Client exclusive.
* If a Vet would like to log out of their account, it can be done through Log Out.

### View your profile [Pages in question - Profile Page]:
* Entering the Profile Page shows the user details used to register your Vet account.

### Scheduling, rescheduling and canceling appointments [Pages in question - Appointments History Page]:
* Accessible by entering the Appointments History Page on the Drop Down Menu.
* Appointments History Page design mimics the design present on the Client side.
* A table of appointments, specific to the Vet in question, is displayed with their Status shown as well. Scheduled, Waiting or Cancelled.
* After a Client has made their appointment, a Vet listed in the appointment will receive an automatic notification to their email.
* Next stage would be the verification. The appointment Status, even if it displays Scheduled, will require verification from the Vet listed in the appointment.
* After the Vet has confirmed the visit, an appointment is considered truly scheduled.
* Both Vet and Client can reschedule and cancel appointments.
* Both Vet and Client are notified by email if the appointment has been rescheduled or cancelled.
* A rescheduled appointment changes the Status to Waiting (indicating the confirmation is needed for Status to become Scheduled again).
* A rescheduled appointment has to be confirmed by Client on the Appointment History Page if Vet is the one that rescheduled it.
* A rescheduled appointment has to be confirmed by Vet on the Appointment History Page if Client is the one that rescheduled it.
* Cancelled appointment changes the Status to Cancelled.

### Reviews and comments [Pages in question - Reviews Page]:
* No Vet exclusive features available

### Creating, editing and deleting Posts. [Pages in question - News Page]:
* Primarily a Vet responsibility, unless an Admin can take over in case of unexpected circumstances (i.e. staff calling in sick).
* Vets can create, edit and delete Posts. Relevant buttons appear visible if user is logged in as an Admin or a Vet.
* Posts are made by Vets and are separated into Post types: News, Sale!, Blog and PetCare.
* News - Clinic latest news.
* Sales! - Product sales.
* Blog - Stories of our past visitor's successful recoveries.
* PetCare - useful trivia about pet health.
* Upon creating a new post, the "Register new Post" card will require to name the post type.
* Page allows to filter posts (by Post type), depending what a Vet would like to see, or a search bar can be used. Makes it easier for a Vet to find a post they would like to edit or delete.
* Pagination function for how much content is displayed per page is available as well.
* Although similar powers are available to Admin, Posts managment is mainly a Vet responsibility. Some powers can overlap between Admin and Vet, but per our Project Policy, even with similar powers, roles should have different responsibilities they should stick to (i.e. two employees from different departments but using the same software system).

### Our clinic services: List of the medical procedures and consultations we offer. [Pages in question - Service List Page]:
* Primarily a Vet responsibility, unless an Admin can take over in case of unexpected circumstances (i.e. staff calling in sick).
* Vets can create/edit/delete Services as well as Admins. Relevant buttons appear visible if user is logged in as a Vet or an Admin.
* Page allows to filter services (alphabetically or by price), depending what a Vet would like to see, or a search bar can be used. Makes it easier for a Vet to find a service they would like to edit or delete.
* Pagination function for how much content is displayed per page is available as well.
* Although such powers are available to Admin as well, Service List management is mainly a Vet responsibility. Some powers can overlap between Admin and Vet, but per our Project Policy, even with similar powers, roles should have different responsibilities they should stick to. (i.e. two employees from different departments but using the same software system).

### Managing products on our online store (simulation). [Pages in question - Products Page]:
* Primarily a Vet responsibility, unless an Admin can take over in case of unexpected circumstances (i.e. staff calling in sick).
* Vets can create/edit/delete Products as well as Vets. Relevant buttons appear visible if user is logged in as an Vet or a Admin.
* Page allows to filter products (by Category), depending what a Vet would like to see, or a search bar can be used. Makes it easier for a Vet to find a product they would like to edit or delete.
* Pagination function for how much content is displayed per page is available as well.
* Although such powers are available to a Vet, Products management is mainly a Vet responsibility. Some powers can overlap between Vet and an Admin, but per our Project Policy, even with similar powers, roles should have different responsibilities they should stick to. (i.e. two employees from different departments but using the same software system).

### Managing orders on our online store (simulation). [Pages in question - Orders Page]:
* Primarily a Vet responsibility, unless an Admin can take over in case of unexpected circumstances (i.e. staff calling in sick).
* Transfer to Orders Page on the Drop Down Menu to view orders made by Clients.
* List of orders is displayed in the form of cards with their Status shown as well. Pending, Confirmed or Cancelled.
* Page allows to filter orders (by order Status), depending what a Vet would like to see, or a search bar can be used. Makes it easier for a Vet to find a service they would like to edit or delete.
* Pagination function for how much content is displayed per page is available as well.
* In order for the Client order to proceed, Vet or an Admin need to confirm the newly placed order. Identifiable by order Date and its Status - Pending.
* Once confirmed, order Status is changed to Confirmed and Pay Now button should appear on the Client side.
* Vets, Admins and Clients all have the power to Cancel the order.
* Although such powers are available to a Vet, Products management is mainly a Vet responsibility. Some powers can overlap between Vet and an Admin, but per our Project Policy, even with similar powers, roles should have different responsibilities they should stick to. (i.e. two employees from different departments but using the same software system).
* Real life monetary transactions are not included. As this is not an actual clinic, we don't own the products we're advertising. As such, we can't sell these items to you legally.
