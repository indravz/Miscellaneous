async componentDidMount() {
    // Redirect to the desired URL (e.g., google.com)
    window.location.replace('https://www.google.com');
  }

if (typeof window !== 'undefined') {
  const url = 'https://www.google.com'; // Replace with your desired URL
  window.location.replace(url);
}


componentDidMount() {
    const { pathname } = window.location;
    let redirectUrl = 'https://www.google.com/default';

    if (pathname === '/home') {
      redirectUrl = 'https://www.google.com/home';
    } else if (pathname === '/app') {
      redirectUrl = 'https://www.google.com/app';
    }

    // Redirect to the calculated URL
    window.location.replace(redirectUrl);
  }

#####################################################################


import * as React from 'react';
import NextApp from 'next/app';
import { Provider } from 'urql';

import ErrorPage from '@components/error-page';
import client from '@utils/graphql-client';

import 'normalize.css';
import '@/styles/global.scss';
import '@/styles/fonts.scss';

interface AppProps {
  err?: Error;
}

class App extends NextApp<AppProps> {
  // Your existing code for componentDidMount, getInitialProps, and render

  // ...
}

export default App;

// Immediately perform the redirect
if (typeof window !== 'undefined') {
  const urlMap = {
    '/home': 'https://www.google.com/home',
    '/app': 'https://www.google.com/app',
    '/contact': 'https://www.example.com/contact',
    // Add more paths and their corresponding redirect URLs as needed
    default: 'https://www.google.com/default',
  };

  const currentPath = window.location.pathname;
  const redirectUrl = urlMap[currentPath] || urlMap.default;

  window.location.replace(redirectUrl);
}

