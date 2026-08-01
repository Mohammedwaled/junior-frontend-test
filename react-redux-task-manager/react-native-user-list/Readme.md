# 📋 Task Manager App

A simple and responsive task management app built with **React Native**, **Expo**, **Redux Toolkit**, and **AsyncStorage**.

## Features

- Create, edit, and delete tasks
- Mark tasks as completed
- Task priority support (High / Medium / Low)
- Search and filter tasks
- Responsive UI for mobile and tablet
- Offline data persistence with AsyncStorage

## Tech Stack

- React Native
- Expo
- Redux Toolkit
- React Redux
- AsyncStorage

## Project Structure

```
src/
├── components/
├── screens/
├── redux/
├── services/
├── hooks/
├── utils/
└── assets/
```

## Setup

```bash
git clone <repository-url>

cd task-manager

npm install

npx expo start
```

## Challenges

### AsyncStorage Persistence

**Issue**
- Tasks were lost after app reload.

**Solution**
- Load tasks from AsyncStorage first.
- Fetch initial data only when storage is empty.
- Save changes only after initialization.

---

### Sidebar Close Button

**Issue**
- Duplicate close (×) buttons appeared.

**Solution**
- Removed the extra close button and kept a single closing action.

---

### Expo Network Connection

**Issue**
- Device occasionally couldn't connect to the development server.

**Solution**
- Connect both devices to the same Wi-Fi.
- Use **Expo Tunnel** if LAN fails.
- Clear Metro cache when needed:

```bash
npx expo start -c
```

Figma_link

https://www.figma.com/files/team/1565366752862419669/resources/community/file/1631224166657141601?q_id=a9c6a1cb-0bc0-46a2-b3d8-1796bc00e06b&fuid=1565366750616295709