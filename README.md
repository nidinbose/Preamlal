# UNSTUCK Masterclass - Landing Page

A beautiful landing page for the UNSTUCK 2-Hour Masterclass with integrated Razorpay payment system.

## Features

- **Beautiful Landing Page**: High-converting landing page with compelling copy for the UNSTUCK Masterclass
- **Payment Integration**: Razorpay integration for seamless payment processing
- **Overlay Payment Button**: Fixed floating button (₹2) that opens payment modal
- **Success Page**: Automatic redirect to homepage after 5 seconds
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **No Authentication Required**: Simplified user flow without login/signup

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here

# For client-side Razorpay integration
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id_here
```

### 2. Razorpay Setup

1. Create a Razorpay account at [razorpay.com](https://razorpay.com)
2. Get your API keys from the Razorpay dashboard
3. Add the keys to your `.env.local` file

### 3. Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Payment Flow

1. **Homepage**: User sees the UNSTUCK Masterclass landing page
2. **Payment Button**: Fixed floating button shows "₹2 Join Masterclass"
3. **Payment Modal**: Clicking opens a modal confirming ₹3 payment
4. **Razorpay Checkout**: Redirects to Razorpay payment page
5. **Success Page**: After successful payment, shows success page
6. **Auto Redirect**: Automatically redirects to homepage after 5 seconds

## Key Components

- `app/page.js` - Main landing page with UNSTUCK content
- `app/success/page.js` - Payment success page with countdown
- `app/api/payment/create-order/route.jsx` - Creates Razorpay order
- `app/api/payment/verify/route.jsx` - Verifies payment signature

## Customization

### Changing Payment Amount
- The floating button shows ₹2 (for marketing appeal)
- Actual payment amount is ₹3 (300 paise)
- Modify the `amount: 300` in the payment API call to change the actual payment amount

### Updating Content
- Edit the landing page content in `app/page.js`
- Modify the instructor name and details
- Update class timing and details as needed

### Styling
- Uses Tailwind CSS for styling
- Gradient backgrounds and modern UI elements
- Fully responsive design

## Production Deployment

1. Set up environment variables on your hosting platform
2. Ensure Razorpay webhook URLs are configured if needed
3. Deploy to Vercel, Netlify, or your preferred platform

## Support

For any issues or questions, please check the Razorpay documentation or contact support.