import axios from 'axios';
import endpoint from './endpoint';

export const fetchGroups = async () => {
    try {
        const url = `${endpoint.base_url}${endpoint.group_endpoints.fetchGroups}`;
        const response = await axios.get(url, {
            headers: {
                'accept': 'application/json'
            }
        });

        console.log("response of fetch groups", response.data);

        return response.data;
            
    } catch (error) {
        console.error("Error fetching groups:", error);
    }
};

export const createGroup = async (groupName, selectedRecipients) => {
    try {
        const response = await axios.post("https://hootmonk-backend.vercel.app/group", {
            Group_Name: groupName,
            People: selectedRecipients.map(recipient => ({
                Name: recipient.name,
                Email: recipient.email,
                Location: recipient.location || "",
                Title: recipient.title || ""
            }))
        });

        if (response){
            return response.data;
        }

    } catch (error) {
        console.error("Error creating group:", error);
    }
};

export const addToExistingGroup = async (groupName, selectedRecipients) => {
    try {
        const response = await axios.put("https://hootmonk-backend.vercel.app/groups/add-people", {
            Group_Name: groupName,
            People: selectedRecipients.map(recipient => ({
                Name: recipient.name,
                Email: recipient.email,
                Location: recipient.location || "",
                Title: recipient.title || ""
            }))
        });

        if (response){
            return response.data;
        }

    } catch (error) {
        console.error("Error adding people to group:", error);
    }
};

// Define the sendEmail API function
export const sendEmail = async (fromEmail, to, subject, body) => {
    try {
      // Assuming endpoint.email_endpoints.sendEmail is defined as '/send-mail'
      const url = `${endpoint.base_url}${endpoint.email_endpoints.sendEmail}`;
      const response = await axios.post(
        url,
        {
            From: fromEmail,
            To: to,
            Subject: subject,
            Body: body,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log("Response from send email:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  };

  export const fetchConfigurations = async () => {
    try {
      const url = `${endpoint.base_url}${endpoint.email_endpoints.fetchConfigurations}`;
      const response = await axios.get(url, {
        headers: {
          'Accept': 'application/json'
        }
      });
      console.log("Response from fetchConfigurations:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching configurations:", error);
      throw error;
    }
  };
  
  export const saveConfiguration = async (configData) => {
    try {
      const url = `${endpoint.base_url}${endpoint.email_endpoints.saveConfiguration}`;
      const response = await axios.post(url, configData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("Configuration saved:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error saving configuration:", error);
      throw error;
    }
  };

  export const configureEmail = async (emailType, payload) => {
    const url = emailType === "gmail" 
      ? `${endpoint.base_url}${endpoint.email_endpoints.setupGmail}`
      : `${endpoint.base_url}${endpoint.email_endpoints.setupCustom}`;
  
    try {
      const response = await axios.post(url, payload, {
        headers: { "Content-Type": "application/json" }
      });
      return response.data; // Return response data
    } catch (error) {
      console.error("Error configuring email:", error);
      throw error; // Throw error to be handled in UI
    }
  };