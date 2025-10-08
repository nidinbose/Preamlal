# 🚀 Vercel Deployment Guide

## Quick Deploy Steps

### 1. Prepare Your Repository

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit - UNSTUCK Masterclass landing page"

# Create GitHub repository and push
git remote add origin https://github.com/yourusername/unstuck-masterclass.git
git branch -M main
git push -u origin main
```

### 2. Deploy to Vercel

#### Option A: One-Click Deploy
1. Click the "Deploy with Vercel" button in README
2. Connect your GitHub account
3. Select your repository
4. Add environment variables (see below)
5. Click Deploy

#### Option B: Manual Deploy
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your repository
5. Configure settings and deploy

### 3. Environment Variables

**IMPORTANT:** Set up environment variables in Vercel Dashboard, NOT in vercel.json

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add these three variables:

| Name | Value | Environment |
|------|-------|-------------|
| `RAZORPAY_KEY_ID` | `rzp_test_your_key_here` | Production, Preview, Development |
| `RAZORPAY_KEY_SECRET` | `your_secret_here` | Production, Preview, Development |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | `rzp_test_your_key_here` | Production, Preview, Development |

**Note:** Make sure to enable the variables for all environments (Production, Preview, Development)

### 4. Razorpay Configuration

1. **Test Mode Setup:**
   - Use test keys from Razorpay dashboard
   - Test payments won't charge real money

2. **Live Mode Setup:**
   - Replace test keys with live keys
   - Update webhook URLs if needed

### 5. Custom Domain (Optional)

1. Go to Vercel Dashboard → Project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. SSL certificate will be automatically provisioned

## Post-Deployment Checklist

- [ ] Environment variables configured
- [ ] Razorpay keys working (test payment)
- [ ] Custom domain configured (if needed)
- [ ] Analytics enabled (optional)
- [ ] SSL certificate active
- [ ] Performance monitoring set up

## Troubleshooting

### Build Fails
- Check environment variables are set
- Verify Node.js version compatibility
- Review build logs in Vercel dashboard

### Payment Not Working
- Verify Razorpay keys are correct
- Check browser console for errors
- Ensure keys match environment (test/live)

### Domain Issues
- Check DNS propagation
- Verify domain configuration
- Contact domain provider if needed

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Razorpay Integration Guide](https://razorpay.com/docs/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

**Your UNSTUCK Masterclass landing page is now live! 🎉**
