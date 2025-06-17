// import { Button, Input, Loading, Textarea } from '@nextui-org/react';
// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// // import { SendIcon } from './SendIcon';

// const ContactForm: React.FC = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset
//   } = useForm();
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState('');

//   var myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");
//   myHeaders.append("Authorization", `Bearer ${process.env.Bearer_Token}`);

//   const data1 = {
//     "personalizations": [
//       {
//         "to": [
//           {
//             "email": "info@paytriot.co.uk",
//             "name": "Admin"
//           }
//         ],
//         "subject": "New Enquiry for Paytriot Payments"
//       }
//     ],
//     "content": [
//       {
//         "type": "text/plain",
//         "value": `New Customer enquiry from ${register.name}`
//       }
//     ],
//     "from": {
//       "email": "info@paytriot.co.uk",
//       "name": "Paytriot"
//     }
//   };


//   const onSubmit = async (data: any) => {
//     setLoading(true);
//     //console.log(data.name);
//     //console.log(data1.content[0].value);
    

//     let  string = `New customer enquiry from ${data.name}, Please find the contact details

//      Name: ${data.name} ,

//      Email: ${data.email},

//      Phone: ${data.phone},

//      Website: ${data.website.toString()},

//      Subject: ${data.subject},

//      Message: ${data.message} .
     
//      `

//     data1.content[0].value = string;
//     //console.log(data1.content[0].value);

//     try {
//       const res = await fetch('/api/contact', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//       });

//       if (res.ok) {
//         setSuccess(true);
//         reset();
//         const hasTracked = sessionStorage.getItem('hasTrackedContactConversion');
//         if (!hasTracked && typeof window !== 'undefined' && typeof window.gtag === 'function') {
//           // Fire conversion event
//           window.gtag('event', 'conversion', {
//             send_to: 'AW-16819203227/7Vb7CIuqvMAaEJvZgtQ-',
//             value: 1.50,
//             currency: 'GBP'
//           });
          
//           // Enhanced Conversions (optional but recommended)
//           window.gtag('set', 'user_data', {
//             email: data.email.trim().toLowerCase(),
//             phone_number: data.phone.replace(/\D/g, '')
//           });
          
//           // Mark session as tracked
//           sessionStorage.setItem('hasTrackedContactConversion', 'true');
//         }
//       } else {
//         setError('Oops! Something went wrong.');
//       }
//     } catch (err) {
//       setError('Oops! Something went wrong.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className=" contact-wrap-custom col-lg-8 d-flex justify-content-center">
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Input
//           rounded
//           className="my-2"
//           size="lg"
//           type="text"
//           label="Name"
//           {...register('name', { required: true })}
//           status={errors.name ? 'error' : undefined}
//           fullWidth
//         />

//         <Input
//           rounded
//           className="my-2"
//           size="lg"
//           type="text"
//           label="Email"
//           {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i })}
//           status={errors.email ? 'error' : undefined}
//           fullWidth
//         />

//         <Input
//           rounded
//           className="my-2"
//           size="lg"
//           type="phone"
//           label="Phone"
//           {...register('phone', { required: true, pattern: /^\+\d{1,5}\d{10}$/ })}
//           status={errors.phone ? 'error' : undefined}
//           fullWidth
//         />

//         <Input
//           rounded
//           className="my-2"
//           size="lg"
//           type="text"
//           label="Website"
//           {...register('website', { required: true })}
//           status={errors.website ? 'error' : undefined}
//           fullWidth
//         />

//          <Input
//           rounded
//           className="my-2"
//           size="lg"
//           type="text"
//           label="Subject"
//           {...register('subject', { required: true })}
//           status={errors.subject ? 'error' : undefined}
//           fullWidth
//         />

//         <Textarea
//           rows={6}
//           size="lg"
//           className="my-2"
//           label="Message"
//           placeholder="Enter your message here..."
//           fullWidth
//           {...register('message', { required: true })}
//           status={errors?.message ? 'error' : undefined}
//         />
//         <div className="py-4">
//           <Button
//             rounded
//             size="xl"
//             color="warning"
//             type="submit"
//             // iconRight={<SendIcon set="bold" />}
//             disabled={loading}
//           >
//             {!loading ? 'Submit' : <Loading color="currentColor" size="md" />}
//           </Button>

//           {success && (
//             <p style={{ color: 'green' }}>Your message has been sent!</p>
//           )}

//           {error && <p style={{ color: 'red' }}>{error}</p>}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ContactForm;

'use client';

import type React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from '../../styles/contact-form.module.css';

interface FormData {
  // Quote fields
  firstName: string;
  email: string;
  phone: string;
  website: string;
  ecommercePlatform: string[];
  otherPlatformValue: string;
  additionalInfo: string;
  // Support fields
  supportName: string;
  supportEmail: string;
  issueType: string;
  priority: string;
  message: string;
}

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag: (
      command: string,
      eventName: string,
      params: Record<string, any>
    ) => void;
  }
}

const initialFormData: FormData = {
  firstName: '',
  email: '',
  phone: '',
  website: '',
  ecommercePlatform: [],
  otherPlatformValue: '',
  additionalInfo: '',
  supportName: '',
  supportEmail: '',
  issueType: '',
  priority: '',
  message: ''
};

const ContactForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'quote' | 'support'>('quote');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: initialFormData
  });

  const handleInputChange = (
    field: keyof FormData,
    value: string | string[]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setValue(field, value as any, { shouldValidate: true });
  };

  const handleCheckboxChange = (platform: string, checked: boolean) => {
    setFormData(prev => {
      const updated = checked
        ? [...prev.ecommercePlatform, platform]
        : prev.ecommercePlatform.filter(p => p !== platform);

      setValue('ecommercePlatform', updated as any, { shouldValidate: true });

      if (platform === 'Other' && !checked) {
        setValue('otherPlatformValue', '');
        return { ...prev, ecommercePlatform: updated, otherPlatformValue: '' };
      }

      return { ...prev, ecommercePlatform: updated };
    });
  };

  const switchTab = (tab: 'quote' | 'support') => {
    setActiveTab(tab);
    setFormData(initialFormData);
    reset(initialFormData);
    setSuccess('');
    setError('');
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setSuccess('');
    setError('');

    try {
      let payload: any = {};
      let emailSubject = '';
      let emailBody = '';
      const endpoint = '/api/contact'; // This endpoint will handle sending the email

      if (activeTab === 'quote') {
        emailSubject = 'New Enquiry for Paytriot Payments - Setup Call';
        emailBody = `
          New customer enquiry for a setup call:
          
          Name: ${data.firstName}
          Email: ${data.email}
          Phone: ${data.phone}
          Website: ${data.website || 'N/A'}
          E-commerce Platform: ${
            data.ecommercePlatform.length > 0
              ? data.ecommercePlatform.join(', ')
              : 'N/A'
          }
          ${
            data.ecommercePlatform.includes('Other') && data.otherPlatformValue
              ? `Other Platform Specified: ${data.otherPlatformValue}`
              : ''
          }
          Additional Information: ${data.additionalInfo || 'N/A'}
        `;

        payload = {
          type: 'quote',
          emailSubject: emailSubject,
          emailBody: emailBody,
          ...data
        };
      } else {
        emailSubject = `New Support Request from ${data.supportName} - ${data.issueType}`;
        emailBody = `
          New support request:

          Name: ${data.supportName}
          Email: ${data.supportEmail}
          Issue Type: ${data.issueType}
          Priority: ${data.priority}
          Message: ${data.message}
        `;

        payload = {
          type: 'support',
          emailSubject: emailSubject,
          emailBody: emailBody,
          ...data
        };
      }

      // Send form data to your API endpoint
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setSuccess(
          'Thank you for your message! It has been sent successfully. Our team will reach out to you soon.'
        );
        setFormData(initialFormData);
        reset(initialFormData);

        // Google Ads Conversion Tracking
        const hasTracked = sessionStorage.getItem('hasTrackedContactConversion');
        if (
          !hasTracked &&
          typeof window !== 'undefined' &&
          typeof window.gtag === 'function'
        ) {
          window.gtag('event', 'conversion', {
            send_to: 'AW-16819203227/7Vb7CIuqvMAaEJvZgtQ-',
            value: 1.5,
            currency: 'GBP'
          });

          // Enhanced Conversions (optional but recommended)
          window.gtag('set', 'user_data', {
            email: data.email.trim().toLowerCase(), // Use quote email if available
            phone_number: data.phone.replace(/\D/g, '') // Use quote phone if available
          });

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
    <div className={styles['contact-form-wrap']}>
      {/* Tab Navigation */}
      <div className={styles['tab-navigation']}>
        <button
          type="button"
          className={`${styles['tab-button']} ${
            activeTab === 'quote' ? styles.active : ''
          }`}
          onClick={() => switchTab('quote')}
        >
          Set Up Payments
        </button>
        <button
          type="button"
          className={`${styles['tab-button']} ${
            activeTab === 'support' ? styles.active : ''
          }`}
          onClick={() => switchTab('support')}
        >
          Support & Issues
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {activeTab === 'quote' ? (
          <>
            <div>
              <div className={styles['form-row']}>
                <div className={styles['form-column']}>
                  <div className={styles['form-group']}>
                    <label htmlFor="firstName">Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      {...register('firstName', { required: true })}
                      value={formData.firstName}
                      onChange={e =>
                        handleInputChange('firstName', e.target.value)
                      }
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <span className={styles['error-message']}>
                        This field is required
                      </span>
                    )}
                  </div>
                </div>

                <div className={styles['form-column']}>
                  <div className={styles['form-group']}>
                 <label htmlFor="phone">Phone *</label>
                    <input
                      type="tel"
                      id="phone"
                      {...register('phone', {
                        required: true,
                        // Basic pattern for phone with country code (e.g., +1234567890, 001234567890)
                        pattern: /^\+?[0-9\s-()]{7,25}$/
                      })}
                      value={formData.phone}
                      onChange={e => handleInputChange('phone', e.target.value)}
                      placeholder="+44 (0)20 1234 5678"
                    />
                    {errors.phone && (
                      <span className={styles['error-message']}>
                        Please enter a valid phone number, including country code (e.g., +44...).
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className={styles['form-row']}>
                <div className={styles['form-column']}>
                  <div className={styles['form-group']}>
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      {...register('email', { required: true })}
                      value={formData.email}
                      onChange={e => handleInputChange('email', e.target.value)}
                      placeholder="john.doe@example.com"
                    />
                    {errors.email && (
                      <span className={styles['error-message']}>
                        This field is required
                      </span>
                    )}
                  </div>
                </div>

                <div className={styles['form-column']}>
                  <div className={styles['form-group']}>
                    <label htmlFor="website">Website</label>
                    <input
                      type="text"
                      id="website"
                      {...register('website')}
                      value={formData.website}
                      onChange={e =>
                        handleInputChange('website', e.target.value)
                      }
                      placeholder="Enter your website URL"
                    />
                  </div>
                </div>
              </div>

              <div className={styles['form-group']}>
                <label htmlFor="ecommercePlatform">
                  Which platform do you use?{' '}
                  <span className={styles['optional-text']}>(Optional)</span>
                </label>
                <div className={styles['checkbox-group']}>
                  {[
                    'WooCommerce',
                    'Shopify',
                    'Magento',
                    'PrestaShop',
                    'EKM',
                    'None',
                    'Other'
                  ].map(platform => (
                    <label
                      key={platform}
                      className={`${styles['checkbox-label']} ${
                        formData.ecommercePlatform.includes(platform)
                          ? styles['checked-platform']
                          : ''
                      }`}
                    >
                      <input
                        type="checkbox"
                        value={platform}
                        checked={formData.ecommercePlatform.includes(platform)}
                        onChange={e =>
                          handleCheckboxChange(platform, e.target.checked)
                        }
                      />
                      <div>{platform}</div>
                    </label>
                  ))}
                </div>

                {formData.ecommercePlatform.includes('Other') && (
                  <input
                    type="text"
                    placeholder="Please specify other platform"
                    className={styles['other-platform-input']}
                    {...register('otherPlatformValue')}
                    value={formData.otherPlatformValue}
                    onChange={e =>
                      handleInputChange('otherPlatformValue', e.target.value)
                    }
                  />
                )}
              </div>

              <div className={styles['section-spacer']}></div>

              <div className={styles['form-group']}>
                <label
                  htmlFor="additionalInfo">
                  Additional Information {' '}
                  <span className={styles['optional-text']}>(Optional)</span>
                </label>
                <textarea
                  id="additionalInfo"
                  rows={4}
                  {...register('additionalInfo')}
                  value={formData.additionalInfo}
                  onChange={e =>
                    handleInputChange('additionalInfo', e.target.value)
                  }
                  placeholder="Tell us more about your business and payment needs"
                ></textarea>
              </div>

              <div className={styles['button-group']}>
                <button
                  type="submit"
                  className={styles['submit-button']}
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Finish & Request My Setup Call'}
                </button>
              </div>
            </div>

            <div className={styles['confidentiality-text']}>
              <span className={styles['lock-icon']}>🔒</span> Your information
              is 100% confidential and used only to support your setup.
            </div>
          </>
        ) : (
          <>
            <div
              className={`${styles['form-row']} ${styles['support-fields-row']}`}
            >
              <div className={styles['form-column']}>
                <div className={styles['form-group']}>
                  <label htmlFor="supportName">Your Name *</label>
                  <input
                    type="text"
                    id="supportName"
                    {...register('supportName', { required: true })}
                    value={formData.supportName}
                    onChange={e =>
                      handleInputChange('supportName', e.target.value)
                    }
                    placeholder="Jane Doe"
                  />
                  {errors.supportName && (
                    <span className={styles['error-message']}>
                      This field is required
                    </span>
                  )}
                </div>
              </div>

              <div className={styles['form-column']}>
                <div
                  className={`${styles['form-group']} ${styles['support-fields-row']}`}
                >
                  <label htmlFor="supportEmail">Your Email *</label>
                  <input
                    type="email"
                    id="supportEmail"
                    {...register('supportEmail', { required: true })}
                    value={formData.supportEmail}
                    onChange={e =>
                      handleInputChange('supportEmail', e.target.value)
                    }
                    placeholder="jane.doe@example.com"
                  />
                  {errors.supportEmail && (
                    <span className={styles['error-message']}>
                      This field is required
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className={styles['form-group']}>
              <label htmlFor="issueType">Select an issue type *</label>
              <select
                id="issueType"
                {...register('issueType', { required: true })}
                value={formData.issueType}
                onChange={e => handleInputChange('issueType', e.target.value)}
              >
                <option value="">Select an issue type</option>
                <option value="onboarding">Onboarding Support</option>
                <option value="technical">Technical Support</option>
                <option value="billing">Billing Inquiry</option>
                <option value="other">Other</option>
              </select>
              {errors.issueType && (
                <span className={styles['error-message']}>
                  This field is required
                </span>
              )}
            </div>

            <div className={styles['form-group']}>
              <label htmlFor="priority">Priority *</label>
              <select
                id="priority"
                {...register('priority', { required: true })}
                value={formData.priority}
                onChange={e => handleInputChange('priority', e.target.value)}
              >
                <option value="">Select priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              {errors.priority && (
                <span className={styles['error-message']}>
                  This field is required
                </span>
              )}
            </div>

            <div className={styles['form-group']}>
              <label htmlFor="message">Your Message *</label>
              <textarea
                id="message"
                rows={6}
                {...register('message', { required: true })}
                value={formData.message}
                onChange={e => handleInputChange('message', e.target.value)}
                placeholder="Describe your issue or question here..."
              ></textarea>
              {errors.message && (
                <span className={styles['error-message']}>
                  This field is required
                </span>
              )}
            </div>

            <div className={styles['button-group']}>
              <button
                type="submit"
                className={`${styles['submit-button']} ${styles.fullWidth}`}
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </>
        )}

        {loading && (
          <div className={styles['loading-overlay']}>
            <div className={styles['loading-spinner']}></div>
          </div>
        )}

        {success && (
          <div
            className={`${styles['alert-message']} ${styles['alert-success']}`}
              style={{ marginTop: '20px' }} 
          >
            {success}
          </div>
        )}

        {error && (
          <div
            className={`${styles['alert-message']} ${styles['alert-error']}`}
            style={{ marginTop: '20px' }} // <--- THIS IS THE CORRECTED LINE
          >
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
