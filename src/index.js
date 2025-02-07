import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { TaskProvider } from './components/TaskContext';
import HomePage from './pages/HomePage';
import CompletedTasks from './pages/CompletedTasks';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <HomePage />,
  },
  {
    path: "/completed",
    element: <CompletedTasks />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TaskProvider>
      <RouterProvider router={router} />
    </TaskProvider>
  </React.StrictMode>
);
