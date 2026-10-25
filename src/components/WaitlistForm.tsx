import { useState, type FormEvent } from "react";

export function WaitlistForm() {
  const [message, setMessage] = useState(
    "Hideya updates are not open yet. You can explore the browser demo now.",
  );
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(
      "The Hideya mailing list is not connected yet. Your email has not been sent or stored.",
    );
  }
  return (
    <form className="wait" data-waitlist="" onSubmit={submit}>
      <label className="wait-label" htmlFor="wait-email">
        <strong>iPhone’s on the way.</strong> Get an email when it lands.
      </label>
      <div className="wait-row">
        <input
          className="wait-input"
          id="wait-email"
          type="email"
          name="email"
          placeholder="Your email"
          autoComplete="email"
          required
        />
        <button className="btn btn-lg btn-ink" type="submit">
          Notify me
        </button>
      </div>
      <input
        className="wait-trap"
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <input type="hidden" name="source" value="hideya-web" />
      <p className="wait-note" role="status">
        {message} <a href="#privacy">Privacy</a>
      </p>
    </form>
  );
}
