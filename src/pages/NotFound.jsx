import Button from "../components/Button.jsx";

// ---------------------------------------------------------------------------
// NotFound — shown for any URL that does not match a real page (the "*" route
// in App.jsx). It keeps visitors from hitting a dead end.
// ---------------------------------------------------------------------------
export default function NotFound() {
  return (
    <div className="container section narrow center-block">
      <p className="big-emoji" aria-hidden="true">
        🐾
      </p>
      <h1>Page not found</h1>
      <p className="prose">
        Oops! The page you were looking for has wandered off. Let's get you back
        on track.
      </p>
      <div className="btn-row center">
        <Button to="/">Back to home</Button>
        <Button to="/adopt" variant="secondary">
          Browse pets
        </Button>
      </div>
    </div>
  );
}
