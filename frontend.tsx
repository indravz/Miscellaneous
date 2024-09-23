<div>
    <span className="flex items-center">
        {/* Heading */}
        <Heading typography="heading06" color="secondary" className="mr-2">
            Rep code
        </Heading>

        {/* Conditional Rendering */}
        {serviceTask?.repCode ? (
            // Show selected repCode and cross (x) button to unselect
            <>
                <span>{serviceTask.repCode}</span>
                <button 
                    onClick={async () => {
                        setSubmitting(true);
                        await saveServiceTaskOnServer({
                            ...serviceTask,
                            repCode: null, // Unset repCode
                        });
                        setSubmitting(false);
                    }} 
                    className="ml-2"
                    disabled={submitting}
                    style={{ marginLeft: '8px', cursor: 'pointer' }}
                >
                    ✕
                </button>
            </>
        ) : (
            // Show Select dropdown when no repCode is selected
            <Select
                name="repCode"
                className="w-52"
                options={repCodeOptions} // Array of repCode options
                status={submitting ? "loading" : "none"}
                onSelect={async (evt) => {
                    if (evt.selectedValue) {
                        setSubmitting(true);
                        await saveServiceTaskOnServer({
                            ...serviceTask,
                            repCode: evt.selectedValue, // Set selected repCode
                        });
                        setSubmitting(false);
                    }
                }}
                value={serviceTask?.repCode || ""} // Show selected value
                disabled={submitting} // Disable while submitting
            />
        )}
    </span>
</div>


///////////////////



<div>
    <span className="flex items-center">
        {/* Heading */}
        <Heading typography="heading06" color="secondary" className="mr-2">
            Rep code
        </Heading>

        {/* Conditional Rendering */}
        {serviceTask?.repCode ? (
            // Show "Unselect" button when a repCode is selected
            <>
                <span>{serviceTask.repCode}</span>
                <button 
                    onClick={async () => {
                        setSubmitting(true);
                        await saveServiceTaskOnServer({
                            ...serviceTask,
                            repCode: null, // Unset repCode
                        });
                        setSubmitting(false);
                    }} 
                    className="ml-2"
                    disabled={submitting}
                >
                    Unselect
                </button>
            </>
        ) : (
            // Show Select dropdown when no repCode is selected
            <Select
                name="repCode"
                className="w-52"
                options={repCodeOptions} // repCodeOptions array should be provided
                status={submitting ? "loading" : "none"}
                onSelect={async (evt) => {
                    if (evt.selectedValue) {
                        setSubmitting(true);
                        await saveServiceTaskOnServer({
                            ...serviceTask,
                            repCode: evt.selectedValue, // Set selected repCode
                        });
                        setSubmitting(false);
                    }
                }}
                selectedValue={serviceTask?.repCode} // Set the value for controlled component
                disabled={submitting} // Disable while submitting
            />
        )}
    </span>
</div>



next.config.js
module.exports = {
  // Your existing configuration settings here

  async redirects() {
    return [
      {
        source: '/home',
        destination: 'https://www.google.com/home',
        permanent: true,
      },
      {
        source: '/app',
        destination: 'https://www.google.com/app',
        permanent: true,
      },
      {
        source: '/about',
        destination: 'https://www.google.com/about',
        permanent: true,
      },
      // Add a catch-all route to redirect all other routes
      {
        source: '/:slug*', // Match any route that hasn't been matched earlier
        destination: 'https://www.google.com/default', // Your default destination URL
        permanent: true, // Set to true for a permanent (301) redirect
      },
    ];
  },
};






import { useRouter } from 'next/router';

const RedirectPage = () => {
  const router = useRouter();

  // This code won't execute on the client side due to server-side rendering.
  return null;
};

RedirectPage.getInitialProps = async (ctx) => {
  const { res, req } = ctx;
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

