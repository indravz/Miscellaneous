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
