export const EMPLOYEE_EMAIL =
  import.meta.env.VITE_EMPLOYEE_EMAIL || "disposablefad@gmail.com";

function addLine(lines, label, value) {
  if (value) {
    lines.push(label + ": " + value);
  }
}

function buildMessage(request) {
  const lines = [];

  addLine(lines, "Request type", request.type);
  addLine(lines, "Pet name", request.petName);
  addLine(lines, "Pet type", request.petType);
  addLine(lines, "Pet breed", request.petBreed);
  addLine(lines, "Pet age", request.petAge);
  addLine(lines, "Applicant name", request.applicantName);
  addLine(lines, "Applicant email", request.email);
  addLine(lines, "Applicant phone", request.phone);
  addLine(lines, "Home address", request.address);
  addLine(lines, "Type of home", request.housing);
  addLine(lines, "Other pets at home", request.hasPets);
  addLine(lines, "Reason", request.reason);
  addLine(lines, "Health and temperament", request.health);
  addLine(lines, "Understands interview required", request.agreedToInterview);

  if (request.notes && !request.reason) {
    lines.push("");
    lines.push(request.notes);
  }

  return lines.join("\n");
}

export async function sendEmployeeNotification(request) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const message = buildMessage(request);

  if (!serviceId || !templateId || !publicKey) {
    return {
      sent: false,
      message: "Check environment variables.",
    };
  }

  try {
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          title: request.type + " request for " + request.petName,
          to_email: EMPLOYEE_EMAIL,
          employee_email: EMPLOYEE_EMAIL,
          recipient_email: EMPLOYEE_EMAIL,
          cc_email: request.email,
          customer_email: request.email,
          user_email: request.email,
          to_name: "Pet Heaven staff",
          name: request.applicantName,
          email: request.email,
          reply_to: request.email,
          time: new Date().toLocaleString(),
          message: message,
        },
      }),
    });

    if (response.ok) {
      return {
        sent: true,
        message: "A confirmation email has been sent.",
      };
    }

    const errorText = await response.text();

    return {
      sent: false,
      message:
        "Email notification failed. EmailJS said: " +
        response.status +
        " " +
        errorText,
    };
  } catch {
    return {
      sent: false,
      message:
        "Email notification failed. Check console or restart server.",
    };
  }
}
