import sgMail from '@sendgrid/mail';
import axios from 'axios';
import { Buffer } from 'buffer';

sgMail.setApiKey(import.meta.env.VITE_SENDGRID_API_KEY);

export const sendEmailWithSelfie = async (email, imageUrl) => {
  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageBase64 = Buffer.from(response.data).toString('base64');
    const attachment = {
      content: imageBase64,
      filename: 'selfie.webp',
      type: 'image/webp',
      disposition: 'attachment',
    };

    const msg = {
      to: email,
      from: 'psgforever83@hotmail.com',
      subject: 'Votre selfie',
      text: 'Voici votre selfie en pièce jointe.',
      html: '<strong>Voici votre selfie en pièce jointe.</strong>',
      attachments: [attachment],
    };
    await sgMail.send(msg);
    console.log('E-mail envoyé avec selfie');
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'e-mail avec selfie:', error);
  }
};
