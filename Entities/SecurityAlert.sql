{
  "name": "SecurityAlert",
  "type": "object",
  "properties": {
    "title": {
      "type": "string",
      "description": "Alert title"
    },
    "description": {
      "type": "string",
      "description": "Detailed alert description"
    },
    "severity": {
      "type": "string",
      "enum": [
        "Low",
        "Medium",
        "High",
        "Critical"
      ],
      "default": "Medium",
      "description": "Alert severity level"
    },
    "category": {
      "type": "string",
      "enum": [
        "Intrusion",
        "Malware",
        "Suspicious Activity",
        "System",
        "Policy Violation"
      ],
      "description": "Alert category"
    },
    "source_ip": {
      "type": "string",
      "description": "Source IP address if applicable"
    },
    "target_ip": {
      "type": "string",
      "description": "Target IP address if applicable"
    },
    "status": {
      "type": "string",
      "enum": [
        "Open",
        "In Progress",
        "Resolved",
        "False Positive"
      ],
      "default": "Open",
      "description": "Current alert status"
    },
    "assigned_to": {
      "type": "string",
      "description": "Email of user assigned to handle this alert"
    },
    "resolved_at": {
      "type": "string",
      "format": "date-time",
      "description": "When the alert was resolved"
    },
    "resolution_notes": {
      "type": "string",
      "description": "Notes about how the alert was resolved"
    },
    "related_scan_id": {
      "type": "string",
      "description": "ID of related scan result if applicable"
    }
  },
  "required": [
    "title",
    "description",
    "severity"
  ]
}