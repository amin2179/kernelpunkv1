# **App Name**: TerminalAI

## Core Features:

- Themed Terminal UI: Modern terminal UI with a customizable theme and settings.
- Session Saving: Saves chat sessions in local storage, for continuity across browsing sessions.
- LM Studio Integration: Interface with LM Studio's local inference server using its API, in order to leverage local models.
- Vision Tool: Generate text from images, using the Gemini Pro Vision API (if an API Key is provided by the user). The Gemini tool uses the current system prompt for the active session.
- System Prompting: Sets a system prompt that the assistant will use throughout the chat session. Persists the system prompt using local storage.
- Styled responses: Display markdown and syntax highlighting (particularly code blocks) from bot responses, in an attractive format.

## Style Guidelines:

- Primary color: Electric blue (#7DF9FF) to evoke a futuristic, cyberpunk aesthetic.
- Background color: Dark gray (#293133) to provide contrast and readability.
- Accent color: Neon green (#39FF14) for interactive elements and highlights.
- Font: 'Space Mono' (monospace) for the user interface and all textual elements.
- Use minimalist, geometric icons to match the terminal aesthetic.
- Subtle glow animations on active elements for visual feedback.