async componentDidMount() {
    // Redirect to the desired URL (e.g., google.com)
    window.location.replace('https://www.google.com');
  }

if (typeof window !== 'undefined') {
  const url = 'https://www.google.com'; // Replace with your desired URL
  window.location.replace(url);
}
