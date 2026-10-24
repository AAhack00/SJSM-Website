```typescript
import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");

    return res.status(405).json({
      success: false,
      error: "Method not allowed. Use POST.",
    });
  }

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
      source,
    } = req.body ?? {};

    // Validate required fields
    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof phone !== "string" ||
      !phone.trim() ||
      typeof email !== "string" ||
      !email.trim()
    ) {
      return res.status(400).json({
        success: false,
        error: "Name, Mobile Number, and Email are required fields.",
      });
    }

    // Prevent excessively large email content
    const fields = [
      name,
      phone,
      email,
      businessName,
      city,
      state,
      product,
      quantity,
      formattedMessage,
      source,
    ];

    if (
      fields.some(
        (value) =>
          value !== undefined &&
          value !== null &&
          (typeof value !== "string" || value.length > 10000)
      )
    ) {
      return res.status(400).json({
        success: false,
        error: "Invalid enquiry data.",
      });
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const secure = process.env.SMTP_SECURE === "true";

    if (!host || !port || !user || !pass) {
      throw new Error("SMTP environment variables are missing.");
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
      requireTLS: port === 587,
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 20000,
    });

    const timestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });

    const customerName = name.trim();
    const customerPhone = phone.trim();
    const customerEmail = email.trim();
    const business = businessName?.trim() || "N/A";
    const location =
      [city?.trim(), state?.trim() || "Rajasthan"]
        .filter(Boolean)
        .join(", ") || "Not provided";

    const productDescription = product?.trim() || "Not specified";
    const requiredQuantity = quantity?.trim() || "Not specified";

    // =========================================================
    // EMAIL 1: PROFESSIONAL WHOLESALE ENQUIRY TO THE BUSINESS
    // =========================================================

    const enquiryMessage =
      typeof formattedMessage === "string" && formattedMessage.trim()
        ? formattedMessage.trim()
        : `Dear Shri Jain,

I hope you are doing well.

My name is ${customerName}, and I am contacting you from ${location}. I represent ${business}, and I am interested in purchasing your products for wholesale/business purposes.

Please find our enquiry details below.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CUSTOMER INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Customer Name:
${customerName}

Business Name:
${business}

Location:
${location}

Mobile Number:
${customerPhone}

Email Address:
${customerEmail}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRODUCT REQUIREMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Product Description:
${productDescription}

Quantity Required:
${requiredQuantity}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHOLESALE INFORMATION REQUESTED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Kindly provide the following details:

1. Your best wholesale quotation
2. Product catalogue, if available
3. Available models, sizes, colours, or variants
4. Detailed product specifications
5. MOQ (Minimum Order Quantity)
6. Packaging details
7. Estimated delivery timeline
8. Transport and shipping options
9. Payment terms and conditions
10. GST and billing details
11. Bulk order discounts
12. Warranty information, if applicable

If you require any additional information to prepare an accurate quotation, please let me know.

We look forward to your response and hope to establish a long-term business relationship.

Thank you for your valuable time and consideration.

Kind Regards,

${customerName}
${business}

Location: ${location}
Mobile: ${customerPhone}
Email: ${customerEmail}`;

    console.log("==============================================");
    console.log("NEW WHOLESALE ENQUIRY - SHRI JAIN STATIONERY MART");
    console.log("==============================================");
    console.log(`Received: ${timestamp} IST`);
    console.log(`Source: ${source || "Website Enquiry"}`);
    console.log(enquiryMessage);
    console.log("==============================================");

    const businessResult = await transporter.sendMail({
      from: `"Shri Jain Stationery Mart" <${user}>`,
      to: "shrijains@gmail.com",
      replyTo: customerEmail,
      subject: `New Wholesale Product Enquiry from ${business}`,
      text: enquiryMessage,
    });

    console.log(
      "Business enquiry email accepted:",
      businessResult.messageId
    );

    // =========================================================
    // EMAIL 2: AUTOMATIC ACKNOWLEDGEMENT TO THE CUSTOMER
    // =========================================================

    let customerEmailSent = false;
    let customerEmailError: string | undefined;

    const acknowledgementMessage = `Dear ${customerName},

Greetings from Shri Jain Stationery Mart!

Thank you for contacting us and for your interest in our products.

We are pleased to inform you that your enquiry has been successfully received.

Our team is reviewing your requirements and will get back to you as soon as possible with the relevant quotation, product details, availability, and delivery information.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
YOUR SUBMITTED ENQUIRY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Customer Name:
${customerName}

Business Name:
${business}

Location:
${location}

Mobile Number:
${customerPhone}

Email Address:
${customerEmail}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRODUCT REQUIREMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Product Description:
${productDescription}

Required Quantity:
${requiredQuantity}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHAT HAPPENS NEXT?

Our team will review your requirements and work on providing the relevant information regarding:

• Wholesale pricing and quotations
• Product availability and specifications
• Available models, sizes, and variants
• Minimum order quantities
• Bulk order discounts
• Packaging and shipping options
• Delivery timelines and payment terms

If you have any additional requirements or would like to discuss your enquiry further, please feel free to contact us.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTACT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Business:
Shri Jain Stationery Mart

Phone:
+91 9414231059

Email:
shrijains@gmail.com

Business Hours:
Monday – Saturday
11:00 AM – 8:00 PM

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

We sincerely appreciate your interest in Shri Jain Stationery Mart and look forward to serving you.

Thank you once again for contacting us.

Warm Regards,

Shri Jain Stationery Mart

Email: shrijains@gmail.com
Phone: +91 9414231059`;

    try {
      const customerResult = await transporter.sendMail({
        from: `"Shri Jain Stationery Mart" <${user}>`,
        to: customerEmail,
        replyTo: "shrijains@gmail.com",
        subject:
          "Thank You for Contacting Shri Jain – Your Enquiry Has Been Received",
        text: acknowledgementMessage,
      });

      customerEmailSent = true;

      console.log(
        "Customer acknowledgement accepted:",
        customerResult.messageId
      );
    } catch (error) {
      customerEmailError =
        error instanceof Error ? error.message : "Unknown email error";

      console.error(
        "Customer acknowledgement failed:",
        customerEmailError
      );
    }

    // =========================================================
    // API RESPONSE
    // =========================================================

    return res.status(200).json({
      success: true,
      message: customerEmailSent
        ? "Your enquiry has been processed. Both emails were accepted by the email server."
        : "Your enquiry notification was sent, but the customer acknowledgement could not be sent.",
      timestamp,
      email1Sent: true,
      email2Sent: customerEmailSent,
      ...(customerEmailError &&
        process.env.NODE_ENV !== "production" && {
          customerEmailError,
        }),
    });
  } catch (error) {
    console.error("Wholesale enquiry email processing failed:", error);

    return res.status(500).json({
      success: false,
      error:
        "Unable to process your enquiry at this time. Please try again later.",
    });
  }
}
```
