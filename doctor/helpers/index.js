const request = require("request");



const helper = {
    get_symptoms_ids: function(symptoms, url, callback) {
        request(url, (err, res, body) => {
            if (err) console.log(err);
            const result = JSON.parse(body);
            let ids = [];
            result.forEach((element) => {
                for (var i = 0; i < symptoms.length; i++)
                    if (element.Name.toLowerCase() == symptoms[i].toLowerCase())
                        ids.push(element.ID);
                });
            callback(ids)
        });
    },
    
    generate_id_string: function (ids) {
        let id_string = '';
            ids.forEach((id, index) => {
              id_string += `\"${id}\"`;
              if (index != ids.length - 1)
                id_string += ', ';
            })
        return id_string;
    },
    
    get_issue_id: function (issue, url, callback) {
        request(url, (err, res, body) => {
            if (err) console.log(err);
            let id = null;
            const result = JSON.parse(body);
            result.forEach((element) => {
                if (element.Name.toLowerCase() == issue.toLowerCase()) {
                    id = element.ID;
                }
            });
            callback(id);
        });
    },
    
    get_treatment_info: function (id, url, callback) {
        request(url, (err, res, body) => {
            if (err) console.log(err);
            const result = JSON.parse(body);
            callback(result.TreatmentDescription);
        })
    },
    
    get_description: function (id, url, callback) {
        request(url, (err, res, body) => {
            if (err) console.log(err);
            const result = JSON.parse(body);
            let message = `${result.Description} \n\nPossible symptoms that accompany this illness are:\n`;
            
            result.PossibleSymptoms.split(',').forEach((symptom, index) => {
                message += `${index+1}. ${symptom}\n`;
            })
            
            callback(message);
        })
    },
    
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImRhbWlhbi5yZWl0ZXJAZ21haWwuY29tIiwicm9sZSI6IlVzZXIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIyNzQ4IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy92ZXJzaW9uIjoiMjAwIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9saW1pdCI6Ijk5OTk5OTk5OSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcCI6IlByZW1pdW0iLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL2xhbmd1YWdlIjoiZW4tZ2IiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2V4cGlyYXRpb24iOiIyMDk5LTEyLTMxIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9tZW1iZXJzaGlwc3RhcnQiOiIyMDE4LTAxLTI3IiwiaXNzIjoiaHR0cHM6Ly9zYW5kYm94LWF1dGhzZXJ2aWNlLnByaWFpZC5jaCIsImF1ZCI6Imh0dHBzOi8vaGVhbHRoc2VydmljZS5wcmlhaWQuY2giLCJleHAiOjE1MTcxNTc4MTIsIm5iZiI6MTUxNzE1MDYxMn0.0BzylkfFHCb1pExPhXnYA4JwjgKYxRx7E-9zIZS8n_A',
    
}

module.exports = helper;