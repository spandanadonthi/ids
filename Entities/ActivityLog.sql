{
  "name": "ActivityLog",
  "type": "object",
  "properties": {
    "action": {
      "type": "string",
      "description": "Action performed"
    },
    "user_email": {
      "type": "string",
      "description": "Email of user who performed the action"
    },
    "resource": {
      "type": "string",
      "description": "Resource affected by the action"
    },
    "details": {
      "type": "string",
      "description": "Additional details about the action"
    },
    "ip_address": {
      "type": "string",
      "description": "IP address of the user"
    },
    "user_agent": {
      "type": "string",
      "description": "User agent string"
    },
    "success": {
      "type": "boolean",
      "default": true,
      "description": "Whether the action was successful"
    },
    "session_id": {
      "type": "string",
      "description": "User session identifier"
    }
  },
  "required": [
    "action",
    "user_email"
  ]
}