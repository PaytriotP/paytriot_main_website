import { Button, Input, Loading, Textarea } from '@nextui-org/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
// import { SendIcon } from './SendIcon';

const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${process.env.Bearer_Token}`);

  const data1 = {
    "personalizations": [
      {
        "to": [
          {
            "email": "info@paytriot.co.uk",
            "name": "Admin"
          }
        ],
        "subject": "New Enquiry for Paytriot Payments"
      }
    ],
    "content": [
      {
        "type": "text/plain",
        "value": `New Customer enquiry from ${register.name}`
      }
    ],
    "from": {
      "email": "info@paytriot.co.uk",
      "name": "Paytriot"
    }
  };


  const onSubmit = async (data: any) => {
    setLoading(true);
    //console.log(data.name);
    //console.log(data1.content[0].value);
    

    let  string = `New customer enquiry from ${data.name}, Please find the contact details

     Name: ${data.name} ,

     Email: ${data.email},

     Phone: ${data.phone},

     Website: ${data.website.toString()},

     Subject: ${data.subject},

     Message: ${data.message} .
     
     `

    data1.content[0].value = string;
    //console.log(data1.content[0].value);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        setSuccess(true);
        reset();
        const hasTracked = sessionStorage.getItem('hasTrackedContactConversion');
        if (!hasTracked && typeof window !== 'undefined' && typeof window.gtag === 'function') {
          // Fire conversion event
          window.gtag('event', 'conversion', {
            send_to: 'AW-16819203227/7Vb7CIuqvMAaEJvZgtQ-',
            value: 1.0,
            currency: 'GBP'
          });
          
          // Enhanced Conversions (optional but recommended)
          window.gtag('set', 'user_data', {
            email: data.email.trim().toLowerCase(),
            phone_number: data.phone.replace(/\D/g, '')
          });
          
          // Mark session as tracked
          sessionStorage.setItem('hasTrackedContactConversion', 'true');
        }
      } else {
        setError('Oops! Something went wrong.');
      }
    } catch (err) {
      setError('Oops! Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" contact-wrap-custom col-lg-8 d-flex justify-content-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          rounded
          className="my-2"
          size="lg"
          type="text"
          label="Name"
          {...register('name', { required: true })}
          status={errors.name ? 'error' : undefined}
          fullWidth
        />

        <Input
          rounded
          className="my-2"
          size="lg"
          type="text"
          label="Email"
          {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i })}
          status={errors.email ? 'error' : undefined}
          fullWidth
        />

        <Input
          rounded
          className="my-2"
          size="lg"
          type="phone"
          label="Phone"
          {...register('phone', { required: true, pattern: /^\+\d{1,5}\d{10}$/ })}
          status={errors.phone ? 'error' : undefined}
          fullWidth
        />

        <Input
          rounded
          className="my-2"
          size="lg"
          type="text"
          label="Website"
          {...register('website', { required: true })}
          status={errors.website ? 'error' : undefined}
          fullWidth
        />

         <Input
          rounded
          className="my-2"
          size="lg"
          type="text"
          label="Subject"
          {...register('subject', { required: true })}
          status={errors.subject ? 'error' : undefined}
          fullWidth
        />

        <Textarea
          rows={6}
          size="lg"
          className="my-2"
          label="Message"
          placeholder="Enter your message here..."
          fullWidth
          {...register('message', { required: true })}
          status={errors?.message ? 'error' : undefined}
        />
        <div className="py-4">
          <Button
            rounded
            size="xl"
            color="warning"
            type="submit"
            // iconRight={<SendIcon set="bold" />}
            disabled={loading}
          >
            {!loading ? 'Submit' : <Loading color="currentColor" size="md" />}
          </Button>

          {success && (
            <p style={{ color: 'green' }}>Your message has been sent!</p>
          )}

          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
