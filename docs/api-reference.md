# API Reference

## ChatRole

| Value | Description |
|---|---|
| `System` | System instructions |
| `Developer` | Developer instructions |
| `User` | User input |
| `Assistant` | Model output |
| `Tool` | Tool result |
| `Reasoning` | Model reasoning |

## ChatMessageOrigin

| Value | Description |
|---|---|
| `User` | Added by a user |
| `Model` | Produced by a model |
| `Hook` | Inserted by a hook |
| `Tool` | Produced by a tool |
| `System` | Added by system prompt handling |

## FinishReason

| Value | Description |
|---|---|
| `Stop` | Natural completion |
| `ToolCalls` | The model requested tools |
| `Length` | A token limit was reached |
| `ContentFilter` | Content was filtered |
| `Aborted` | The caller aborted the request |

## ToolCall

| Field | Type | Default | Description |
|---|---|---|---|
| `id` | `string` |  | Call identifier |
| `type` | `'function'` |  | Call type |
| `function` | `{ name: string; arguments: string }` |  | Function name and serialized arguments |

## ChatMessage

| Field | Type | Default | Description |
|---|---|---|---|
| `role` | `ChatRole` |  | Message role |
| `content` | `string` |  | Message text |
| `createdAt` | `Date` |  | Creation time |
| `tool_call_id` | `string` | `undefined` | Tool result correlation id |
| `tool_calls` | `ToolCall[]` | `undefined` | Tool calls requested by the message |
| `origin` | `ChatMessageOrigin` |  | Message origin |

## ChatMatch

| Field | Type | Default | Description |
|---|---|---|---|
| `message` | `ChatMessage` |  | Matched message |
| `matches` | `RegExpExecArray` |  | Result of `RegExp.exec()` |

## MessageWriter

### `user(content)`

Append a user message.

| Param | Type | Default | Description |
|---|---|---|---|
| `content` | `string` |  | Message text |

Returns `Promise<void>`.

### `assistant(content, tool_calls?)`

Append an assistant message.

| Param | Type | Default | Description |
|---|---|---|---|
| `content` | `string` |  | Message text |
| `tool_calls` | `ToolCall[]` | `undefined` | Tool calls requested by the message |

Returns `Promise<void>`.

### `tool(content, tool_call_id)`

Append a tool result message.

| Param | Type | Default | Description |
|---|---|---|---|
| `content` | `string` |  | Result text |
| `tool_call_id` | `string` |  | Call identifier |

Returns `Promise<void>`.

### `reasoning(content)`

Append a reasoning message.

| Param | Type | Default | Description |
|---|---|---|---|
| `content` | `string` |  | Reasoning text |

Returns `Promise<void>`.

## HookMessageWriter

### `user(content, origin)`

Append a user message with an explicit origin.

| Param | Type | Default | Description |
|---|---|---|---|
| `content` | `string` |  | Message text |
| `origin` | `ChatMessageOrigin` |  | Message origin |

Returns `Promise<void>`.

### `assistant(content, tool_calls, origin)`

Append an assistant message with tool calls and an origin.

| Param | Type | Default | Description |
|---|---|---|---|
| `content` | `string` |  | Message text |
| `tool_calls` | `ToolCall[] | undefined` |  | Tool calls or `undefined` |
| `origin` | `ChatMessageOrigin` |  | Message origin |

Returns `Promise<void>`.

### `tool(content, tool_call_id, origin)`

Append a tool result with an explicit origin.

| Param | Type | Default | Description |
|---|---|---|---|
| `content` | `string` |  | Result text |
| `tool_call_id` | `string` |  | Call identifier |
| `origin` | `ChatMessageOrigin` |  | Message origin |

Returns `Promise<void>`.

### `reasoning(content, origin)`

Append a reasoning message with an explicit origin.

| Param | Type | Default | Description |
|---|---|---|---|
| `content` | `string` |  | Reasoning text |
| `origin` | `ChatMessageOrigin` |  | Message origin |

Returns `Promise<void>`.
