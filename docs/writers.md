# Writers

`MessageWriter` appends messages without choosing an origin. `HookMessageWriter` takes a `ChatMessageOrigin` on every method, so hooks can tag inserted messages.

Use `MessageWriter` for ordinary chat writes and `HookMessageWriter` when the caller must set the origin. See [API Reference](api-reference.md#messagewriter) for the method signatures.

See also: [Messages and Roles](messages.md).
