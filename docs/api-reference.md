# API Reference

## ChatRole

```typescript
enum ChatRole {
    System = 'system',
    Developer = 'developer',
    User = 'user',
    Assistant = 'assistant',
    Tool = 'tool',
    Reasoning = 'reasoning',
}
```

## ChatMessageOrigin

```typescript
enum ChatMessageOrigin {
    User = 'user',
    Model = 'model',
    Hook = 'hook',
    Tool = 'tool',
    System = 'system',
}
```

## FinishReason

```typescript
enum FinishReason {
    Stop = 'stop',
    ToolCalls = 'tool_calls',
    Length = 'length',
    ContentFilter = 'content_filter',
    Aborted = 'aborted',
}
```

## ToolCall

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

## ChatMessage

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

## ChatMatch

```typescript
type ChatMatch = {
    message: ChatMessage;
    matches: RegExpExecArray;
};
```

## MessageWriter

```typescript
interface MessageWriter {
    user(content: string): Promise<void>;
    assistant(content: string, tool_calls?: ToolCall[]): Promise<void>;
    tool(content: string, tool_call_id: string): Promise<void>;
    reasoning(content: string): Promise<void>;
}
```

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
