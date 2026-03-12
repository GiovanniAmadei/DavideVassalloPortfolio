export default function Home() {
  if (typeof window !== 'undefined') {
    window.location.href = '/index.html';
  }
  
  return (
    <>
      <meta httpEquiv="refresh" content="0;url=/index.html" />
      <script dangerouslySetInnerHTML={{ __html: `window.location.href='/index.html'` }} />
    </>
  );
}
