export const postSchema = {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      title: { type: 'string' },
      body: { type: 'string' },
      userId: { type: 'integer' },
    },
    required: ['id', 'title', 'body', 'userId'],
    additionalProperties: false,
};