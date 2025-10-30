
import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init('AnyGKIBS05v_ugsa4');

export const emailConfig = {
  serviceId: 'service_o5z56fm',
  templateId: 'template_rak8f58',
  publicKey: 'AnyGKIBS05v_ugsa4'
};

export const sendEmail = async (formData: { firstName: string; lastName: string; email: string; contactNumber: string; country: string }) => {
  try {
    const result = await emailjs.send(
      emailConfig.serviceId,
      emailConfig.templateId,
      {
        first_name: formData.firstName,
        last_name: formData.lastName,
        from_email: formData.email,
        contact_number: formData.contactNumber,
        country: formData.country,
        to_name: 'Money Scalper'
      },
      emailConfig.publicKey
    );
    return { success: true, result };
  } catch (error) {
    return { success: false, error };
  }
};
