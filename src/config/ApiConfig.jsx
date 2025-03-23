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
        const response = await axios.post("http://127.0.0.1:8000/group", {
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
        const response = await axios.put("http://127.0.0.1:8000/groups/add-people", {
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
export const sendEmail = async (to, subject, body) => {
    try {
      // Assuming endpoint.email_endpoints.sendEmail is defined as '/send-mail'
      const url = `${endpoint.base_url}${endpoint.email_endpoints.sendEmail}`;
      const response = await axios.post(
        url,
        {
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