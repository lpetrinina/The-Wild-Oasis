# The-Wild-Oasis - course project from Jonas Schmedtmann's React course.

"The Wild Oasis" is a small boutique hotel with 8 luxurious wooden cabins. The-Wild-Oasis is a Single Page Application (SPA) that helps manage related to the hotel: bookings, cabins and guests. 
This is the internal application intended only for hotel employees.

## Installation 

⚠️ Clone down this repository. You will need  `npm` installed globally on your machine.  

 Installation:  👉  `npm install`

 To start client: 👉  `npm run dev`

 ## Usage

💡 Only hotel employees have access to all the functionality of the application.

- You can log in with the following already registered user:

    email: `test@gmail.com` password: `pass1234`

  
## Features and Functionality

 ✅ **Authentication** - users of the app are hotel employees and they need to be logged into the application to perform tasks
   * New users can only be signed up inside the applications (to guarantee that only actual hotel employees can get accounts)
   * Users are able to upload an avatar, and change their name and password

 ✅ **Dashboard** - displays important information for the last 7, 30, or 90 days:
  * A list of guests checking in and out on the current day. Users can check in/check out a booking from here as well.
  * Statistics on recent bookings, sales, check ins, and occupancy rate.
  * A chart showing all daily hotel sales, showing both “total” sales and “extras” sales (breakfast).
  * A chart showing statistics on stay durations.
  
 ✅ **Bookings** - a table view with all bookings, showing arrival and departure dates, status, and paid amount, as well as cabin and guest data
       
 ✅ **Cabins** - a table view with all cabins, showing the cabin photo, name, capacity, price, and current discount. Users can create new cabins, duplicate, update or delete a cabin. 
  
 ✅ **Check in and out** - users can delete, check in, or check out a booking as the guest arrives.
   * Bookings may not have been paid yet on guest arrival. Therefore, on check in, users need to accept payment (outside the app), and then confirm that payment has been received (inside the app)
   * On check in, the guest can add breakfast for the entire stay, if they hadn’t already
       
 ✅ **App settings** - users can define a few booking settings: breakfast price, min and max nights/booking, max guests/booking
  

## Technologies and Concepts

### Core Technologies

- <img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/react.png" width="20" align="center" /> **React** for building the user interface
- <img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/javascript.png" width="20" align="center" /> **JavaScript** for dynamic interactions
- <img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/styled-components.png" width="20" align="center" />  **Styled components** for styling
-  <img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/react_query.png" width="20" align="center" /> **React Query** remote state management
- 🔗 **REST API** for communication with the back-end (Supabase)

