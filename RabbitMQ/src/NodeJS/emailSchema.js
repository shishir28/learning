var emailPersonSchema = {
    "id": "/EmailPerson",
    "type": "object",
    "properties": {
        "firstName": { "type": "string" },
        "lastName": { "type": "string" },
        "address": { "type": "string", "required": true }
    }
}

var emailSchema = {
    "id": "/Email",
    "type": "object",
    "properties": {
        "subject": { "type": "string" },
        "body": { "type": "string" },
        "from": { "$ref": "/EmailPerson" },
        "toList": {
            "type": "array",
            "items": { "$ref": "/EmailPerson" },
            "required": true
        },
        "CCList": {
            "type": "array",
            "items": { "$ref": "/EmailPerson" }
        },
        "BCCList": {
            "type": "array",
            "items": { "$ref": "/EmailPerson" }
        },
    }
}

module.exports = {
    emailObject: emailSchema
}