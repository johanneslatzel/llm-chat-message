# Quick Start

## Install

```bash
npm install @johannes.latzel/llm-chat-message
```

## Basic Usage

Create a message:

```typescript
import {
    ChatMessageOrigin,
    ChatRole,
    type ChatMessage,
    type ToolCall,
} from '@johannes.latzel/llm-chat-message';

const call: ToolCall = {
    id: 'call_1',
    type: 'function',
    function: { name: 'greet', arguments: '{"name":"Ada"}' },
};

const message: ChatMessage = {
    role: ChatRole.Assistant,
    content: 'Hello, Ada!',
    createdAt: new Date(),
    origin: ChatMessageOrigin.Model,
    tool_calls: [call],
};
```

Implement a writer:

```typescript
import {
    ChatMessageOrigin,
    ChatRole,
    type ChatMessage,
    type MessageWriter,
} from '@johannes.latzel/llm-chat-message';

class InMemoryWriter implements MessageWriter {
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

const writer = new InMemoryWriter();
await writer.user('Hello');
console.log(writer.messages.length); // 1
```

## Full API

See [API Reference](api-reference.md).
