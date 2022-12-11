import { withSwagger } from 'next-swagger-doc';
const config = require('config');

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
            url: (process.env[config.get('server.host')] || '').concat(":").concat(process.env[config.get('server.port')] || ''),
            description: 'development mode url'
        },
    ],
    components: {
        responses: {
            BadRequest: {
                description: '400 Client side errors',
                content: {
                    'application/json': {
                        schema: {
                            '$ref': '#/components/schemas/SimpleMessage'
                        }
                    }
                }
            },
            FailedAuth: {
                description: '401 Authentication information is missing or invalid',
                content: {
                    'application/json': {
                        schema: {
                            '$ref': '#/components/schemas/SimpleMessage'
                        }
                    }
                }
            },
            InvalidPWD: {
                description: '403 Invalid Password',
                content: {
                    'application/json': {
                        schema: {
                            '$ref': '#/components/schemas/SimpleMessage'
                        }
                    }
                }
            },
            NotFound: {
                description: '404 The user name or email not found or invalid',
                content: {
                    'application/json': {
                        schema: {
                            '$ref': '#/components/schemas/SimpleMessage'
                        }
                    }
                }
            },
            ConflictId: {
                description: '409 Already used user name or email',
                content: {
                    'application/json': {
                        schema: {
                            '$ref': '#/components/schemas/SimpleMessage'
                        }
                    }
                }
            },
            ServerMistake: {
                description: '500 Server Inner Mistake',
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
                name: 'token'
            },
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            },
            github_oauth: {
                type: 'oauth2',
                description: 'github oauth',
                flows: {
                    authorizationCode: {    
                        authorizationUrl: 'https://github.com/login/oauth/authorize',
                        tokenUrl: 'https://github.com/login/oauth/access_token',
                        scope: {
                            read: 'Grants read access to public information',
                            write: 'Grants write access to public information',
                            admin: 'Grants read and write access to administrative information'
                        }
                    }
                }
            }
        }
    },
    
  },
  apiFolder: 'src/pages/api',
});

export default swaggerHandler();