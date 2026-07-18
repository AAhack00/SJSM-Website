import express from "express";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";

let etherealAccount: any = null;

async function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && port && user && pass) {
    return nodemailer.createTransport({
      host,
      port: parseInt(port, 10),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user,
        pass,
      },
    });
  }

  if (!etherealAccount) {
    console.log("Creating dynamic Ethereal SMTP test account...");
    etherealAccount = await nodemailer.createTestAccount();
  }

  return nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: etherealAccount.user,
      pass: etherealAccount.pass,
    },
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for wholesale enquiry and contacts
  app.post("/api/enquiry", async (req, res) => {
    try {
      const { 
        name, 
        phone, 
        email, 
        businessName, 
        city, 
        state, 
        product, 
        quantity, 
        formattedMessage, 
        source 
      } = req.body;

      if (!name || !phone || !email) {
        return res.status(400).json({ error: "Name, Mobile Number, and Email are required fields." });
      }

      const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });

      const location = `${city}, ${state || 'Rajasthan'}`;
      const finalMessage = formattedMessage || `Dear Shri Jain,

I hope you are doing well.

My name is ${name}, and I am contacting you from ${location}. I represent ${businessName || 'N/A'}, and I am interested in purchasing your products for wholesale/business purposes.

Please find our enquiry details below.

━━━━━━━━━━━━━━━━━━━━━━
CUSTOMER INFORMATION
━━━━━━━━━━━━━━━━━━━━━━

Customer Name:
${name}

Business Name:
${businessName || 'N/A'}

Location:
${location}

Mobile Number:
${phone}

Email Address:
${email}

━━━━━━━━━━━━━━━━━━━━━━
PRODUCT REQUIREMENT
━━━━━━━━━━━━━━━━━━━━━━

Product Description:
${product}

Quantity Required:
${quantity}

━━━━━━━━━━━━━━━━━━━━━━

Kindly provide:

• Your best wholesale quotation

• Product catalogue (if available)

• Available models, sizes, or variants

• Product specifications

• MOQ (Minimum Order Quantity)

• Packaging details

• Delivery timeline

• Transport/Shipping options

• Payment terms

• GST details

• Bulk order discounts

• Warranty information (if applicable)

If you require any additional information to prepare an accurate quotation, please let me know.

We look forward to your response and hope to establish a long-term business relationship.

Thank you for your valuable time.

Kind Regards,

${name}
${businessName || 'N/A'}

📍 ${location}
📞 ${phone}
✉️ ${email}`;

      console.log("============================================================");
      console.log("NEW ENQUIRY RECEIVED - SHRI JAIN STATIONERY MART (EST. 1980)");
      console.log("============================================================");
      console.log(`Timestamp: ${timestamp} IST`);
      console.log(`Source: ${source || 'Quick Quote'}`);
      console.log("\nENQUIRY CONTENT:\n");
      console.log(finalMessage);
      console.log("============================================================");

      let email1Sent = false;
      let email2Sent = false;
      let previewUrl1 = "";
      let previewUrl2 = "";

      try {
        const transporter = await getTransporter();

        // Email 1: Business Enquiry Email
        const email1Content = `Dear Shri Jain,

I hope you are doing well.

You have received a new wholesale enquiry through your website.

Customer Details

Customer Name:
${name}

Business Name:
${businessName}

Location:
${location}

Mobile Number:
${phone}

Email Address:
${email}

------------------------------------------------

Product Requirement

Product Description:
${product}

Required Quantity:
${quantity}

------------------------------------------------

The customer has requested information regarding pricing, availability and wholesale purchase.

Please contact the customer using the details provided above.

Regards,

Website Enquiry System`;

        const info1 = await transporter.sendMail({
          from: `"Shri Jain Wholesale Portal" <shrijains@gmail.com>`,
          to: "shrijains@gmail.com",
          subject: `New Wholesale Product Enquiry from ${businessName}`,
          text: email1Content,
          replyTo: email,
        });

        console.log("Email 1 (Business Enquiry) successfully dispatched via Nodemailer. Message ID: %s", info1.messageId);
        email1Sent = true;

        if (!process.env.SMTP_HOST) {
          previewUrl1 = nodemailer.getTestMessageUrl(info1) || "";
          console.log("Ethereal Email 1 Preview URL: %s", previewUrl1);
        }

        // Email 2: Automatic Customer Acknowledgement Email
        const email2Content = `Dear ${name},

Greetings from Shri Jain!

Thank you for contacting us and for your interest in our products.

We are pleased to inform you that your enquiry has been successfully received.

Our team is currently reviewing your requirements and will get back to you as soon as possible with the best quotation, product details, availability, and delivery information.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

YOUR SUBMITTED ENQUIRY

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Customer Name:
${name}

Business Name:
${businessName}

Location:
${location}

Mobile Number:
${phone}

Email Address:
${email}

Product Description:
${product}

Required Quantity:
${quantity}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

If you have any additional requirements or would like to discuss your enquiry further, our team is always happy to assist you.

You can contact us directly using the details below:

📞 Phone:
+91 9414231059

📧 Email:
shrijains@gmail.com

Business Hours:
Monday – Saturday
11:00 AM – 8:00 PM

We sincerely appreciate your interest in Shri Jain and look forward to serving you.

Thank you once again for choosing us.

Warm Regards,

Shri Jain

`;

        const info2 = await transporter.sendMail({
          from: `"Shri Jain" <shrijains@gmail.com>`,
          to: email,
          subject: `Thank You for Contacting Shri Jain – Your Enquiry Has Been Received`,
          text: email2Content,
        });

        console.log("Email 2 (Customer Acknowledgement) successfully dispatched via Nodemailer. Message ID: %s", info2.messageId);
        email2Sent = true;

        if (!process.env.SMTP_HOST) {
          previewUrl2 = nodemailer.getTestMessageUrl(info2) || "";
          console.log("Ethereal Email 2 Preview URL: %s", previewUrl2);
        }

      } catch (nodemailerErr: any) {
        console.error("Nodemailer transmission failed:", nodemailerErr);
      }

      // Return successful transmission response
      return res.json({ 
        success: true, 
        message: "Enquiry successfully processed and notifications sent.",
        timestamp,
        email1Sent,
        email2Sent,
        previewUrl1,
        previewUrl2,
        data: { name, phone, email, businessName, city, state, product, quantity }
      });
    } catch (err: any) {
      console.error("Enquiry processing failed:", err);
      return res.status(500).json({ error: "Internal server error during enquiry dispatch." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
