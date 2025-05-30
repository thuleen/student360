import { createSignal, onMount } from 'solid-js';

const [sessionId, setSessionId] = createSignal<string>();

onMount(async () => {
  const existing = sessionStorage.getItem('dataplay-s360-session-id');
  if (existing) {
    setSessionId(existing);
  } else {
    const res = await fetch('/api/session', { method: 'POST' });
    console.log(res);
    const { sessionId } = await res.json();
    sessionStorage.setItem('dataplay-s360-session-id', sessionId);
    setSessionId(sessionId);
  }
});

export { sessionId };
