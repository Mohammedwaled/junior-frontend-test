# Task Manager App

A responsive Task Management application built with React and Redux Toolkit, focusing on clean UI structure, state management, and a smooth user experience across different screen sizes.

##  Design

The application UI was designed using Figma.

Figma Design:
[View Figma File](YOUR_FIGMA_LINK)


## 📸 Screenshots

### Desktop View

![Desktop Screenshot](YOUR_IMAGE_LINK)


### Mobile Responsive View

![Mobile Screenshot](YOUR_IMAGE_LINK)



## ✨ Features

- Create and manage tasks
- Mark tasks as completed
- Filter tasks by status
- Track task counts
- Store tasks using LocalStorage
- Persistent data after refreshing the page
- Responsive sidebar navigation
- Mobile-friendly menu interaction
- Clean and reusable React components
- Global state management using Redux Toolkit


## 🛠️ Technologies Used

- React
- Redux Toolkit
- JavaScript (ES6+)
- CSS3
- Vite
- LocalStorage
- Git & GitHub



## 📂 Project Structure

```
src
│
├── components
│   ├── Sidebar
│   ├── Dashboard
│   └── Task Components
│
├── redux
│   ├── store.js
│   └── tasksSlice.js
│
├── App.jsx
├── main.jsx
└── index.css
```



## 🚀 Getting Started

### Clone the repository

```bash
git clone YOUR_REPOSITORY_LINK
```

### Navigate to the project folder

```bash
cd task-manager
```

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```



## 🧠 Challenges Faced

While building this project, I faced several practical challenges that helped me improve my React development skills:


### 1. State Management

Managing tasks across multiple components became challenging as the application grew.

To solve this, I used Redux Toolkit to create a centralized and predictable state management structure, making task updates easier to handle and maintain.


### 2. Data Persistence

Initially, tasks were stored only in the application state, which caused data loss after refreshing the browser.

I implemented LocalStorage synchronization to save tasks automatically and restore them when the application loads, providing a better user experience.


### 3. Responsive Sidebar & User Experience

One of the main challenges was creating a navigation experience that works properly across different devices.

Instead of simply shrinking the desktop sidebar on smaller screens, I changed the interaction pattern for mobile devices by converting it into a collapsible sidebar.

The goal was not only to make the layout responsive, but to provide a better UX by:

- Saving screen space on mobile
- Allowing users to open and close navigation when needed
- Maintaining comfortable spacing and positioning
- Creating smooth transitions between layouts


### 4. Component Organization

As features increased, keeping the code clean and maintainable became important.

I separated the application into reusable components with clear responsibilities to make future updates easier.



### 5. Debugging Layout Issues

During development, I faced several UI challenges related to spacing, responsive behavior, and component positioning.

I used browser developer tools and continuous testing on different screen sizes to identify and solve these issues.



## 🔮 Future Improvements

Possible improvements for future versions:

- Connect the application with a backend API instead of LocalStorage
- Add user authentication
- Add task deadlines and reminders
- Add calendar integration
- Implement drag and drop task ordering
- Add task categories and labels
- Add dark/light mode
- Improve accessibility support
- Add automated testing
- Optimize performance for larger task lists



## 👩‍💻 Author

**Nourhan Waleed**

Frontend Developer

GitHub:
YOUR_GITHUB_LINK

LinkedIn:
YOUR_LINKEDIN_LINK