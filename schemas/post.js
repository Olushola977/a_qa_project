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

export const postsSchema = {
    type: "array",
    items: {
      type: "object",
      properties: {
        userId: { type: "integer" },
        id: { type: "integer" },
        title: { type: "string" },
        body: { type: "string" }
      },
      required: ["userId", "id", "title", "body"],
      additionalProperties: false
    }
  };