import { withSwagger } from 'next-swagger-doc';

const swaggerHandler = withSwagger({
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'NextJS API',
      description: 'api of fullstack next.js app',
      version: '0.1.0',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'development mode url'
        },
    ],
    components: {
        responses: {
            BadRequest: {
                description: 'Client side errors',
                content: {
                    'application/json': {
                        schema: {
                            '$ref': '#/components/schemas/SimpleMessage'
                        }
                    }
                }
            },
            FailedAuth: {
                description: 'Authentication information is missing or invalid',
                content: {
                    'application/json': {
                        schema: {
                            '$ref': '#/components/schemas/SimpleMessage'
                        }
                    }
                }
            },
            NotFound: {
                description: 'The user name or email not found or invalid',
                content: {
                    'application/json': {
                        schema: {
                            '$ref': '#/components/schemas/SimpleMessage'
                        }
                    }
                }
            },
            ConflictId: {
                description: 'Already used user name or email',
                content: {
                    'application/json': {
                        schema: {
                            '$ref': '#/components/schemas/SimpleMessage'
                        }
                    }
                }
            },
            ServerMistake: {
                description: 'Server Inner Mistake',
                content: {
                    'application/json': {
                        schema: {
                            '$ref': '#/components/schemas/SimpleMessage'
                        }
                    }
                }
            }
        },
        schemas: {
            SimpleMessage: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string'
                    }
                }
            },
            User: {
                type: 'object',
                properties: {
                    id: {
                        type: 'integer',
                        description: 'user id'
                    },
                    name: {
                        type: 'string',
                        description: 'user name'
                    },
                    email: {
                        type: 'string',
                        description: 'user email'
                    },
                    photo: {
                        type: 'string',
                        description: 'user profile photo url'
                    }
                }
            },
            Encrypted: {
                type: 'object',
                properties: {
                    secret: {
                        type: 'string',
                    },
                    sign: {
                        type: 'string',
                        description: 'signature by client side'
                    },
                    data: {
                        type: 'string',
                        description: 'encrypted data by client side'
                    }
                }
            }
        },
        securitySchemes: {
            HttpOnlyCookie: {
                type: 'apiKey',
                in: 'cookie',
                name: 'sessionId'
            }
        }
    },
    
  },
  apiFolder: 'src/pages/api',
});

export default swaggerHandler();