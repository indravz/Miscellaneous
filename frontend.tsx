import { useRouter } from 'next/router';

const RedirectPage = () => {
  const router = useRouter();

  // This code won't execute on the client side due to server-side rendering.
  return null;
};

RedirectPage.getInitialProps = async ({ res, req }) => {
  const { pathname } = req.url;
  let targetUrl = 'https://www.google.com/default';

  // Define specific redirections based on the route
  if (pathname === '/home') {
    targetUrl = 'https://www.google.com/home';
  } else if (pathname === '/app') {
    targetUrl = 'https://www.google.com/app';
  }

  if (res) {
    // Redirect to the target URL based on the route
    res.writeHead(302, {
      Location: targetUrl,
    });
    res.end();
  }

  // This code won't execute on the client side due to server-side rendering.
  return {};
};

export default RedirectPage;




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

