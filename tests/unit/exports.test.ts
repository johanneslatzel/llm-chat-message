import { describe, expect, it } from 'vitest';
import { ChatMessageOrigin, ChatRole, FinishReason } from '../../src/index.js';
import type { ChatMessage, ToolCall } from '../../src/index.js';

describe('message package', () => {
    it('exports every chat role', () => {
        expect(ChatRole.System).toBe('system');
        expect(ChatRole.Developer).toBe('developer');
        expect(ChatRole.User).toBe('user');
        expect(ChatRole.Assistant).toBe('assistant');
        expect(ChatRole.Tool).toBe('tool');
        expect(ChatRole.Reasoning).toBe('reasoning');
    });

    it('exports every message origin', () => {
        expect(ChatMessageOrigin.User).toBe('user');
        expect(ChatMessageOrigin.Model).toBe('model');
        expect(ChatMessageOrigin.Hook).toBe('hook');
        expect(ChatMessageOrigin.Tool).toBe('tool');
        expect(ChatMessageOrigin.System).toBe('system');
    });

    it('exports every finish reason', () => {
        expect(FinishReason.Stop).toBe('stop');
        expect(FinishReason.ToolCalls).toBe('tool_calls');
        expect(FinishReason.Length).toBe('length');
        expect(FinishReason.ContentFilter).toBe('content_filter');
        expect(FinishReason.Aborted).toBe('aborted');
    });

    it('supports a complete chat message shape', () => {
        const call: ToolCall = {
            id: 'call_1',
            type: 'function',
            function: { name: 'greet', arguments: '{"name":"Ada"}' },
        };
        const message: ChatMessage = {
            role: ChatRole.Assistant,
            content: 'Hello, Ada!',
            createdAt: new Date(0),
            tool_calls: [call],
            origin: ChatMessageOrigin.Model,
        };

        expect(message.role).toBe(ChatRole.Assistant);
        expect(message.tool_calls?.[0]?.function.name).toBe('greet');
        expect(message.origin).toBe(ChatMessageOrigin.Model);
    });
});
