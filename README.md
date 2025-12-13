# The-Wild-Oasis - course project from Jonas Schmedtmann's React course.

"The Wild Oasis" is a small boutique hotel with 8 luxurious wooden cabins. The-Wild-Oasis is a Single Page Application (SPA) that helps manage related to the hotel: bookings, cabins and guests. 
This is the internal application intended only for hotel employees.

🔍 See live demo [here](https://the-wild-oasis-luiza.netlify.app)

<img width="1904" height="1025" alt="image" src="https://github.com/user-attachments/assets/fb63ec80-acf3-4e8f-b673-45fd5393d7fb" />


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

### Technologies

- <img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/react.png" width="20" align="center" /> **React** - for building the user interface
- <img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/javascript.png" width="20" align="center" /> **JavaScript** - for dynamic interactions
- <img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/styled-components.png" width="20" align="center" />  **Styled components** - for components styling
- <img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/react_query.png" width="20" align="center" /> **React Query** - for remote state management (caching, automatic re-fetching, pre-fetching, data mutations)
- <img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/supabase.png" width="20" align="center" /> **Supabase** - to create a back-end with a Postgres database
- 🔗 **REST API** - for communication with the back-end (Supabase)
- 

### Core React Concepts

- **Routing**: React Router is used to create a smooth and dynamic application experience, through nested routes, parameterized routes, and the useNavigate hook.
- **Component State**: useState hook for managing state within components.
- **React Hooks**: Various custom hooks are used to manage components behavior and state.
- **Context API**: Used to share state across components without passing props. It is used to implement the dark mode.
- **React Router Guards**: Used to to guarantee that only logged in users have access to the application.

### Core Features

- **CRUD Operations**:
  - Booking - read, update and delete
  - Cabins - full support
  - Users - create and partly update(current user can update their avatar, name and password)

- **Data Validation**: Used React Hook Form library for client-side validation and error handling.
- **Error Handling**: Used Error Boundary to handle render errors, React Query will execute the onError callback function if the data mutation fails, and the user will be immediately notified.  
- **Stay Logged In**: Users remain logged in after a page reload via useUser custom hook which check out for user in cache.
