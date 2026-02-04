{
  "name": "ScanResult",
  "type": "object",
  "properties": {
    "file_name": {
      "type": "string",
      "description": "Original filename of scanned file"
    },
    "file_size": {
      "type": "number",
      "description": "File size in bytes"
    },
    "file_type": {
      "type": "string",
      "description": "File extension/type"
    },
    "file_url": {
      "type": "string",
      "description": "URL to the uploaded file"
    },
    "classification": {
      "type": "string",
      "enum": [
        "Normal",
        "Attack"
      ],
      "description": "IDS classification result"
    },
    "attack_type": {
      "type": "string",
      "enum": [
        "DoS",
        "Probe",
        "R2L",
        "U2R",
        "Injection",
        "XSS",
        "CSRF",
        "Malware",
        "Other"
      ],
      "description": "Type of attack if classified as malicious"
    },
    "confidence_score": {
      "type": "number",
      "minimum": 0,
      "maximum": 1,
      "description": "Confidence level of the classification"
    },
    "evidence": {
      "type": "string",
      "description": "Evidence or patterns that triggered the classification"
    },
    "recommendation": {
      "type": "string",
      "description": "Recommended action based on scan results"
    },
    "scan_duration": {
      "type": "number",
      "description": "Time taken for scan in seconds"
    },
    "scanned_by": {
      "type": "string",
      "description": "Email of user who initiated the scan"
    }
  },
  "required": [
    "file_name",
    "classification"
  ]
}