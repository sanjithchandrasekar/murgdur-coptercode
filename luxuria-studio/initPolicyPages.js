/**
 * initPolicyPages.js
 * Creates all common policy / info page documents in Sanity so they can be
 * edited directly from the Studio under "Products & Catalog → Policy & Info Pages".
 *
 * Usage:
 *   node initPolicyPages.js
 * (Token is read from E:\Projects\murugdur1\client\.env → VITE_SANITY_TOKEN)
 */

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { resolve } from 'path'

// Read token from client .env
const envPath = resolve(process.cwd(), '../client/.env')
let TOKEN = process.env.SANITY_API_TOKEN || ''
try {
  const envContent = readFileSync(envPath, 'utf-8')
  const match = envContent.match(/VITE_SANITY_TOKEN=(.+)/)
  if (match) TOKEN = match[1].trim()
} catch {}

if (!TOKEN) { console.error('No token found.'); process.exit(1) }

const client = createClient({
  projectId: 'qbaw2yts',
  dataset: 'production',
  useCdn: false,
  token: TOKEN,
  apiVersion: '2024-01-22',
})

// Helper: turn a string into a Sanity portable-text block
const block = (text) => ({
  _type: 'block',
  _key: Math.random().toString(36).slice(2),
  style: 'normal',
  markDefs: [],
  children: [{ _type: 'span', _key: Math.random().toString(36).slice(2), text, marks: [] }]
})
const h2 = (text) => ({ ...block(text), style: 'h2' })
const infobox = (title, text) => ({ _type: 'infobox', _key: Math.random().toString(36).slice(2), title, text })

const policyPages = [
  {
    _id: 'policy-privacy-notice',
    _type: 'policyPage',
    title: 'Privacy Notice',
    slug: { _type: 'slug', current: 'privacy-notice' },
    content: [
      block('Your privacy is of the utmost importance to Murgdur. We are committed to protecting the information you share with us.'),
      h2('1. Information We Collect'),
      block('We collect personal information when you create an account, make a purchase, or sign up for our newsletter — including your name, email address, shipping address, and payment information.'),
      h2('2. How We Use Your Information'),
      block('We use your information to process and fulfill your orders, communicate about your account, optimize your website experience, and send exclusive offers if you opt in.'),
      h2('3. Information Sharing'),
      block('We do not sell your personal information to third parties. We may share it only with trusted partners who help us operate our business under strict confidentiality agreements.'),
      h2('4. Data Security'),
      block('We implement industry-standard security measures. Your information is stored behind secured networks accessible only to authorized personnel.'),
      h2('5. Your Rights'),
      block('You have the right to access, correct, or delete your personal information at any time. Contact our Royal Concierge at support@murgdur.com.'),
      h2('6. Policy Updates'),
      block('We may update this privacy notice periodically to reflect changes in our practices or applicable laws. Last updated: February 2026.'),
    ]
  },
  {
    _id: 'policy-conditions-of-use',
    _type: 'policyPage',
    title: 'Conditions of Use',
    slug: { _type: 'slug', current: 'conditions-of-use' },
    content: [
      block('By accessing or using the Murgdur website, you agree to be bound by these Conditions of Use.'),
      h2('1. Acceptance of Terms'),
      block('If you do not agree to these terms, you may not access our services. We expect our patrons to respect these guidelines as a guest would adhere to court protocol.'),
      h2('2. Privacy & Personal Data'),
      block('Please review our Privacy Notice, which also governs your visit to Murgdur, to understand our practices.'),
      h2('3. Intellectual Property'),
      block('All content on this site — text, graphics, logos, images, audio clips, and software — is the property of Murgdur Private Limited and is protected by international copyright laws.'),
      h2('4. Your Account'),
      block('You are responsible for maintaining the confidentiality of your account and password. Murgdur reserves the right to refuse service, terminate accounts, or cancel orders at its sole discretion.'),
      h2('5. Product Descriptions'),
      block('Murgdur attempts to be as accurate as possible in product descriptions. If a product is not as described, your sole remedy is to return it in unused condition.'),
      h2('6. Governing Law'),
      block('These Conditions shall be governed by the laws of India. The courts of Bengaluru shall have exclusive jurisdiction. Last updated: February 2026.'),
    ]
  },
  {
    _id: 'policy-cancellation',
    _type: 'policyPage',
    title: 'Cancellation & Returns',
    slug: { _type: 'slug', current: 'cancellation' },
    content: [
      block('At Murgdur, we take pride in the quality of our craftsmanship. If you are not satisfied, we offer a transparent return process.'),
      infobox('Return Policy', 'Items can be returned within 15 days of delivery.\nThe product must be unused, unwashed, and with all original tags intact.\nPersonalized or made-to-order items are non-returnable unless there is a manufacturing defect.'),
      infobox('Refund Process', 'Once your return is received and inspected, we will notify you. Refunds are processed to your original payment method within 5-7 business days.'),
      infobox('Cancellations', 'Orders can be cancelled within 24 hours of placement. Contact us immediately at support@murgdur.com.'),
    ]
  },
  {
    _id: 'policy-shipping',
    _type: 'policyPage',
    title: 'Shipping Policy',
    slug: { _type: 'slug', current: 'shipping' },
    content: [
      block('Experience the joy of receiving your Murgdur treasure with our premium delivery service.'),
      infobox('Dispatch & Delivery', 'We strive to dispatch all orders within 24-48 hours. Standard domestic delivery takes 3-5 business days. Expedited options are available at checkout.'),
      infobox('Tracking', 'Once shipped, you will receive a tracking link via email and SMS. You can also track your order from your account dashboard.'),
      infobox('International Shipping', 'We ship globally to over 100 countries. Customs duties, if applicable, are borne by the customer.'),
    ]
  },
  {
    _id: 'policy-payments',
    _type: 'policyPage',
    title: 'Payment Methods',
    slug: { _type: 'slug', current: 'payments' },
    content: [
      block('We offer a secure and seamless checkout experience with diverse payment options.'),
      h2('Accepted Methods'),
      block('Credit and Debit Cards (Visa, MasterCard, Rupay, Amex), Net Banking (all major Indian banks), UPI (GPay, PhonePe, Paytm, BHIM), and Cash on Delivery for select pin codes up to ₹20,000.'),
      h2('Security'),
      block('All transactions are processed through secure gateways encrypted with 256-bit SSL technology. We do not store your card or banking information.'),
    ]
  },
  {
    _id: 'policy-faq',
    _type: 'policyPage',
    title: 'Frequently Asked Questions',
    slug: { _type: 'slug', current: 'faq' },
    content: [
      h2('How do I determine the right size?'),
      block('We provide detailed size guides on every product page. Our stylists are also available via chat or email.'),
      h2('Can I modify my order after placing it?'),
      block('Contact us within 2 hours of placing your order at support@murgdur.com and we may be able to make changes.'),
      h2('Do you offer gift packaging?'),
      block('Yes, every Murgdur order comes in our signature luxury packaging. You can also add a personalized note at checkout.'),
      h2('Are your products made from genuine leather?'),
      block('Yes, we use only the finest ethically sourced full-grain leathers. Each piece comes with a certificate of authenticity.'),
    ]
  },
  {
    _id: 'policy-security',
    _type: 'policyPage',
    title: 'Security',
    slug: { _type: 'slug', current: 'security' },
    content: [
      block('Your security is paramount to the Murgdur experience. We employ state-of-the-art measures to ensure your data remains protected.'),
      infobox('Secure Transactions', 'All transactions are processed through secure gateways encrypted with 256-bit SSL technology. We do not store your credit card information.'),
      infobox('Data Protection', 'We maintain rigorous physical, electronic, and procedural safeguards against unauthorized access or disclosure of your personal information.'),
    ]
  },
  {
    _id: 'policy-grievance',
    _type: 'policyPage',
    title: 'Grievance Redressal',
    slug: { _type: 'slug', current: 'grievance' },
    content: [
      block('In accordance with the Information Technology Act, 2000, the details of our Grievance Officer are provided below:'),
      infobox('Grievance Officer', 'Name: Mr. Arjun Rathore\nDesignation: Grievance Officer\nAddress: Murgdur Private Limited, Embassy Tech Village, Bengaluru, Karnataka-560103\nPhone: +91-80-1234-5678 (Mon–Fri, 9:30 AM–6:30 PM)\nEmail: grievance@murgdur.com'),
      block('We are committed to resolving your concerns within 30 days of receipt.'),
    ]
  },
  {
    _id: 'policy-epr',
    _type: 'policyPage',
    title: 'EPR Compliance',
    slug: { _type: 'slug', current: 'epr' },
    content: [
      block('As a responsible luxury brand, Murgdur is dedicated to environmental sustainability and compliance with E-Waste (Management) Rules.'),
      h2('Our Commitment'),
      block('We ensure electronic waste is channelized to authorized recyclers. We encourage customers to return end-of-life products to our designated collection centers.'),
      h2('Packaging'),
      block('Our packaging is minimal and recyclable. We are actively working to eliminate single-use plastics from our supply chain by 2026.'),
    ]
  },
  {
    _id: 'policy-report',
    _type: 'policyPage',
    title: 'Report Infringement',
    slug: { _type: 'slug', current: 'report' },
    content: [
      block('Murgdur respects the intellectual property rights of others and expects the same from users.'),
      h2('How to Report'),
      block('If your intellectual property rights have been violated, please send the following to legal@murgdur.com: (1) Description of the copyrighted work, (2) URL of infringing material, (3) Your contact information, (4) A statement of good faith belief that use is unauthorized.'),
    ]
  },
]

async function initPolicyPages() {
  console.log('Creating / updating policy page documents in Sanity...\n')
  let created = 0, existing = 0, failed = 0

  for (const page of policyPages) {
    try {
      await client.createIfNotExists(page)
      console.log(`✔ Created: ${page.title} (/${page.slug.current})`)
      created++
    } catch (err) {
      if (err.statusCode === 409) {
        console.log(`○ Exists:  ${page.title}`)
        existing++
      } else {
        console.error(`✖ Failed:  ${page.title} — ${err.message}`)
        failed++
      }
    }
  }

  console.log(`\n✔ Done: ${created} created, ${existing} already existed, ${failed} failed`)
  console.log('\nAll policy pages are ready. Go to Sanity Studio → Policy & Info Pages to edit.')
}

initPolicyPages().catch(console.error)
