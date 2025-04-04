import React, { useState } from "react";
import { configureEmail, saveConfiguration } from "../../../config/ApiConfig"; // Import API call


const ConfigureEmail = () => {
  const [emailType, setEmailType] = useState("gmail");
  const [email, setEmail] = useState("");
  const [appPassword, setAppPassword] = useState("");
  const [smtpHost, setSmtpHost] = useState("");
  const [smtpPort, setSmtpPort] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSetup = async () => {
    let payload = emailType === "gmail"
      ? { email, app_password: appPassword.replace(/\s/g, "") } // Remove spaces from app password
      : { email, smtp_host: smtpHost, smtp_port: smtpPort, username, password };

      try {
        // First, attempt to configure the email (test the SMTP connection)
        const configResponse = await configureEmail(emailType, payload);
        console.log("Configuration response:", configResponse); // Log the response for debugging
        
        // Check if the configuration API returned success
        if (configResponse.status === "success") {
            // For Gmail, add static values to payload before saving configuration
            if (emailType === "gmail") {
                payload = {
                email: email,
                password: appPassword.replace(/\s/g, ""),
                username: "gmail",
                smtp_host: "smtp.gmail.com",
                smtp_port: 587
                };
            }
          // Only then save the configuration
          const saveResponse = await saveConfiguration(payload);
          alert(`Success: ${configResponse.message}\n${saveResponse.message || "Configuration saved successfully!"}`);
        } else {
          // If not successful, show an error alert with the message from the API
          alert(`Error: ${configResponse.message}`);
        }
      } catch (error) {
        alert("Error: Failed to configure email. Please try again.");
      }
    };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-bold mb-4">Configure Email</h1>
      <div className="mb-4">
        <label className="block text-gray-700">Select Email Type:</label>
        <div className="mt-2">
          <label className="mr-4">
            <input
              type="radio"
              name="emailType"
              value="gmail"
              checked={emailType === "gmail"}
              onChange={() => setEmailType("gmail")}
            />
            Gmail
          </label>
          <label>
            <input
              type="radio"
              name="emailType"
              value="custom"
              checked={emailType === "custom"}
              onChange={() => setEmailType("custom")}
            />
            Custom Domain
          </label>
        </div>
      </div>
      
      {emailType === "gmail" ? (
        <div>
          <p className="mb-2 text-gray-600">Steps to generate an App Password for Gmail:</p>
          <ol className="list-decimal pl-5 mb-4 text-gray-600">
            <li>Go to <a href="https://myaccount.google.com/security" target="_blank" className="text-blue-500">Google Account Security</a>.</li>
            <li>Enable 2-Step Verification if not enabled.</li>
            <li>Generate an App Password under "App Passwords" section.</li>
            <li>Use the generated password below.</li>
          </ol>
          <input type="email" className="w-full p-2 border mb-2" placeholder="Gmail Address" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" className="w-full p-2 border mb-4" placeholder="App Password" value={appPassword} onChange={(e) => setAppPassword(e.target.value)} />
        </div>
      ) : (
        <div>
          <p className="mb-2 text-gray-600">Enter your SMTP configuration details:</p>
          <input type="email" className="w-full p-2 border mb-2" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="text" className="w-full p-2 border mb-2" placeholder="SMTP Host" value={smtpHost} onChange={(e) => setSmtpHost(e.target.value)} />
          <input type="number" className="w-full p-2 border mb-2" placeholder="SMTP Port" value={smtpPort} onChange={(e) => setSmtpPort(e.target.value)} />
          <input type="text" className="w-full p-2 border mb-2" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" className="w-full p-2 border mb-4" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
      )}
      
      <button onClick={handleSetup} className="w-full bg-blue-500 text-white py-2 rounded-lg">Setup Email</button>
    </div>
  );
};

export default ConfigureEmail;