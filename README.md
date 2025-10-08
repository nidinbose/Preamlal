# UNSTUCK Masterclass - Landing Page

A beautiful, production-ready landing page for the UNSTUCK 2-Hour Masterclass with integrated Razorpay payment system, optimized for Vercel deployment.

## 🚀 Features

- **Beautiful Landing Page**: High-converting landing page with compelling copy for the UNSTUCK Masterclass
- **Payment Integration**: Razorpay integration for seamless payment processing
- **Overlay Payment Button**: Fixed floating button (₹2) that opens payment modal
- **Success Page**: Automatic redirect to homepage after 5 seconds
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **No Authentication Required**: Simplified user flow without login/signup
- **Vercel Optimized**: Configured for optimal Vercel deployment
- **Production Ready**: Error handling, loading states, and security headers

## 🛠️ Quick Setup

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd unstuck-masterclass
npm install
```

### 2. Environment Variables

Copy `env.example` to `.env.local` and add your Razorpay keys:

```bash
cp env.example .env.local
```

Edit `.env.local`:
```env
# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_your_key_here
RAZORPAY_KEY_SECRET=your_secret_here
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_here
```

### 3. Razorpay Setup

1. Create account at [razorpay.com](https://razorpay.com)
2. Go to Dashboard → Settings → API Keys
3. Copy Test/Live keys to your `.env.local` file

### 4. Run Locally

```bash
npm run dev
```

Visit `http://localhost:3000` to see your landing page.

## 🌐 Vercel Deployment

### Method 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/unstuck-masterclass)

### Method 2: Manual Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Go to Project Settings → Environment Variables
   - Add these variables for all environments (Production, Preview, Development):
     - `RAZORPAY_KEY_ID` = `rzp_test_your_key_here`
     - `RAZORPAY_KEY_SECRET` = `your_secret_here`
     - `NEXT_PUBLIC_RAZORPAY_KEY_ID` = `rzp_test_your_key_here`

3. **Deploy**
   - Vercel will automatically deploy on every push
   - Your site will be available at `https://your-project.vercel.app`

## 💳 Payment Flow

1. **Homepage**: User sees UNSTUCK Masterclass landing page
2. **Payment Button**: Fixed floating "₹2 Join Masterclass" button
3. **Payment Modal**: Clicking opens confirmation modal for ₹3 payment
4. **Razorpay Checkout**: Redirects to Razorpay payment gateway
5. **Success Page**: Shows success message with payment ID
6. **Auto Redirect**: Automatically redirects to homepage after 5 seconds

## 📁 Project Structure

```
unstuck-masterclass/
├── app/
│   ├── api/
│   │   └── payment/
│   │       ├── create-order/route.jsx    # Creates Razorpay order
│   │       └── verify/route.jsx          # Verifies payment
│   ├── success/page.js                   # Success page
│   ├── page.js                           # Main landing page
│   └── layout.js                         # Root layout
├── public/                               # Static assets
├── vercel.json                           # Vercel configuration
├── next.config.mjs                       # Next.js configuration
├── package.json                          # Dependencies
└── env.example                           # Environment variables template
```

## ⚙️ Configuration

### Payment Amount
- **Display**: ₹2 (marketing appeal)
- **Actual**: ₹3 (300 paise)
- **Change**: Modify `amount: 300` in `app/page.js`

### Razorpay Settings
- **Test Mode**: Use `rzp_test_...` keys
- **Live Mode**: Use `rzp_live_...` keys
- **Webhook**: Optional for additional verification

### Customization
- **Content**: Edit `app/page.js` for landing page content
- **Styling**: Modify Tailwind classes for design changes
- **Redirects**: Update `next.config.mjs` for custom redirects

## 🔒 Security Features

- **Environment Variables**: Sensitive keys protected
- **CORS Headers**: Proper cross-origin configuration
- **Security Headers**: X-Frame-Options, X-Content-Type-Options
- **Input Validation**: Razorpay signature verification
- **Error Handling**: Graceful error messages

## 📊 Monitoring

### Vercel Analytics
- Built-in performance monitoring
- Real user metrics
- Core Web Vitals tracking

### Razorpay Dashboard
- Payment analytics
- Transaction history
- Refund management

## 🐛 Troubleshooting

### Common Issues

1. **Payment Not Working**
   - Check Razorpay keys in environment variables
   - Verify keys are for correct environment (test/live)
   - Check browser console for errors

2. **Build Errors**
   - Ensure all dependencies are installed
   - Check Node.js version (>=18.0.0)
   - Verify environment variables are set

3. **Deployment Issues**
   - Check Vercel environment variables
   - Verify build logs in Vercel dashboard
   - Ensure repository is properly connected

### Support

- **Razorpay**: [Support Documentation](https://razorpay.com/docs/)
- **Next.js**: [Documentation](https://nextjs.org/docs)
- **Vercel**: [Deployment Guide](https://vercel.com/docs)

## 📝 License

MIT License - feel free to use for your own projects!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

**Ready to transform your productivity? Deploy your UNSTUCK Masterclass landing page today!** 🚀