# Messages and Roles

A `ChatMessage` carries a role, content, timestamp, optional tool-call data and an origin. The exact type is in [API Reference](api-reference.md).

## Roles

| Role | Value | Description |
|---|---|---|
| `System` | `system` | System instructions |
| `Developer` | `developer` | Developer instructions |
| `User` | `user` | User input |
| `Assistant` | `assistant` | Model output |
| `Tool` | `tool` | Tool result |
| `Reasoning` | `reasoning` | Model reasoning |

## Origins

| Origin | Value | Description |
|---|---|---|
| `User` | `user` | Added by a user |
| `Model` | `model` | Produced by a model |
| `Hook` | `hook` | Inserted by a hook |
| `Tool` | `tool` | Produced by a tool |
| `System` | `system` | Added by system prompt handling |

## Tool Calls

`ToolCall` records a function call requested by a model. The `arguments` value is the raw serialized argument payload. The package does not parse or validate it.

## Chat Match

`ChatMatch` pairs a `ChatMessage` with the result of `RegExp.exec()`. A message-filtering callback receives this shape after a regular expression matches a message.

## Finish Reasons

`FinishReason` describes why a response ended: natural stop, tool calls, token limit, content filter or abort.

See also: [API Reference](api-reference.md).
