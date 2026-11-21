# Writers

The package defines two structural writer interfaces. It does not implement
them.

## MessageWriter

```typescript
interface MessageWriter {
    user(content: string): Promise<void>;
    assistant(content: string, tool_calls?: ToolCall[]): Promise<void>;
    tool(content: string, tool_call_id: string): Promise<void>;
    reasoning(content: string): Promise<void>;
}
```

Use this interface when the caller does not need to choose a message origin.

## HookMessageWriter

```typescript
interface HookMessageWriter {
    user(content: string, origin: ChatMessageOrigin): Promise<void>;
    assistant(
        content: string,
        tool_calls: ToolCall[] | undefined,
        origin: ChatMessageOrigin,
    ): Promise<void>;
    tool(content: string, tool_call_id: string, origin: ChatMessageOrigin): Promise<void>;
    reasoning(content: string, origin: ChatMessageOrigin): Promise<void>;
}
```

Use this interface when inserted messages must carry an explicit origin, for
example `ChatMessageOrigin.Hook`.

## Implementation

```typescript
import {
    ChatRole,
    ChatMessageOrigin,
    type ChatMessage,
    type MessageWriter,
} from '@johannes.latzel/llm-chat-message';

class ArrayWriter implements MessageWriter {
    readonly messages: ChatMessage[] = [];

    async user(content: string): Promise<void> {
        this.add(ChatRole.User, content);
    }

    async assistant(content: string): Promise<void> {
        this.add(ChatRole.Assistant, content);
    }

    async tool(content: string): Promise<void> {
        this.add(ChatRole.Tool, content);
    }

    async reasoning(content: string): Promise<void> {
        this.add(ChatRole.Reasoning, content);
    }

    private add(role: ChatRole, content: string): void {
        this.messages.push({
            role,
            content,
            createdAt: new Date(),
            origin: role === ChatRole.User ? ChatMessageOrigin.User : ChatMessageOrigin.Model,
        });
    }
}
```

The interface is structural, so an engine or adapter can satisfy it without
inheriting from a base class.
