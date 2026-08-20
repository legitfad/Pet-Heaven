export const EMPLOYEE_EMAIL =
  import.meta.env.VITE_EMPLOYEE_EMAIL || "disposablefad@gmail.com";

export async function sendEmployeeNotification(request) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const message =
    "Request type: " + request.type + "\n" +
    "Pet name: " + request.petName + "\n" +
    "Pet type: " + request.petType + "\n" +
    "Applicant phone: " + request.phone + "\n\n" +
    request.notes;

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
          name: request.applicantName,
          email: request.email,
          time: new Date().toLocaleString(),
          message: message,
        },
      }),
    });

    if (response.ok) {
      return {
        sent: true,
        message: "Email notification was sent to " + EMPLOYEE_EMAIL + ".",
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
