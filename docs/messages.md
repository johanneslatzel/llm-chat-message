# Messages and roles

## ChatMessage

A `ChatMessage` is the unit exchanged by a chat engine and its consumers:

```typescript
type ChatMessage = {
    role: ChatRole;
    content: string;
    createdAt: Date;
    tool_call_id?: string;
    tool_calls?: ToolCall[];
    origin: ChatMessageOrigin;
};
```

- `role` identifies the speaker.
- `content` is the message text.
- `createdAt` records creation time.
- `tool_call_id` links a tool result to the call it answers.
- `tool_calls` carries calls requested by an assistant message.
- `origin` records who or what added the message.

## Roles

| Role | Value | Typical use |
|---|---|---|
| `System` | `system` | System instructions |
| `Developer` | `developer` | Developer instructions |
| `User` | `user` | User input |
| `Assistant` | `assistant` | Model output |
| `Tool` | `tool` | Tool result |
| `Reasoning` | `reasoning` | Reasoning output |

## Origins

| Origin | Value | Meaning |
|---|---|---|
| `User` | `user` | Added by a user |
| `Model` | `model` | Produced by a model |
| `Hook` | `hook` | Inserted by a hook |
| `Tool` | `tool` | Produced by a tool |
| `System` | `system` | Added by system prompt handling |

## Tool calls

```typescript
type ToolCall = {
    id: string;
    type: 'function';
    function: {
        name: string;
        arguments: string;
    };
};
```

The `arguments` value is the raw serialized argument payload. The message
package does not parse or validate it.

## ChatMatch

```typescript
type ChatMatch = {
    message: ChatMessage;
    matches: RegExpExecArray;
};
```

A message-filtering callback receives a `ChatMatch` after a regular expression
matches a message. `matches` is the result of `RegExp.exec()`.

## FinishReason

`FinishReason` is separate from a message. It answers why a response ended:
natural stop, tool calls, token limit, content filter or abort.
