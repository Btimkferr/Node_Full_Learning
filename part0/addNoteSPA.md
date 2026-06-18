New note SPA diagram

```mermaid
sequenceDiagram
    
    Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate Server
    Note Right of Browser: Appends the version of notes on the page, then sends a notes object to append to the server
    Server-->>Browser: Returns status 201
    deactivate Server
    
    
```
