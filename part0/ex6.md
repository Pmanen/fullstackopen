```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Note right of browser: the browser immediately renders the new note appended to the list of notes.
    activate server
    server-->>browser: 201 Created
    deactivate server
    
    Note left of server: server creates a new note object and adds it to its array of notes.

```

