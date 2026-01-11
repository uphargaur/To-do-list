# Deployment Guide

This guide covers deploying your spiritual counseling website to production.

## Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] Completed Supabase setup (see `SUPABASE_SETUP.md`)
- [ ] Completed Google Calendar API setup (see `GOOGLE_CALENDAR_SETUP.md`)
- [ ] Updated all environment variables
- [ ] Tested the website locally
- [ ] Changed default admin password
- [ ] Added your own images and QR code
- [ ] Customized services and pricing

## Recommended Hosting Platforms

### Option 1: Vercel (Recommended)

**Pros**:
- Free tier available
- Automatic deployments from GitHub
- Built-in SSL
- Excellent performance
- Easy environment variable management

#### Deploy to Vercel

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Configure project:
     - Framework Preset: **Vite**
     - Build Command: `npm run build`
     - Output Directory: `dist`

3. **Add Environment Variables**:
   - In Vercel project settings > Environment Variables
   - Add all variables from `.env`:
     ```
     VITE_SUPABASE_URL
     VITE_SUPABASE_ANON_KEY
     VITE_GOOGLE_CLIENT_ID
     VITE_GOOGLE_API_KEY
     VITE_GOOGLE_CALENDAR_ID
     VITE_ADMIN_PASSWORD
     ```

4. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live at `https://your-project.vercel.app`

5. **Add Custom Domain** (Optional):
   - Go to Settings > Domains
   - Add your custom domain
   - Update DNS records as instructed

### Option 2: Netlify

**Pros**:
- Free tier available
- Drag-and-drop deployment
- Built-in SSL
- Form handling

#### Deploy to Netlify

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy via Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify init
   netlify deploy --prod
   ```

3. **Or Deploy via UI**:
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder
   - Add environment variables in Site Settings
   - Deploy

### Option 3: GitHub Pages

**Pros**:
- Free
- Simple setup

**Cons**:
- No environment variables support (need to use GitHub Secrets + Actions)
- Static hosting only

Not recommended for this project due to backend requirements.

## Post-Deployment Steps

### 1. Update Google OAuth

1. Go to Google Cloud Console
2. Add your production domain to:
   - Authorized JavaScript origins: `https://yourdomain.com`
   - Authorized redirect URIs: `https://yourdomain.com`

### 2. Update Supabase CORS

If you face CORS issues:
1. Go to Supabase Dashboard > Settings > API
2. Add your domain to allowed origins

### 3. Test Everything

- [ ] Homepage loads correctly
- [ ] All navigation works
- [ ] Booking form submits successfully
- [ ] Payment QR code displays
- [ ] File upload works
- [ ] Admin panel login works
- [ ] Admin can view bookings
- [ ] Google Calendar integration works

### 4. Set Up Monitoring

#### Vercel Analytics (Free)

```bash
npm install @vercel/analytics
```

Add to `src/main.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>
);
```

#### Google Analytics

1. Create a Google Analytics account
2. Get your tracking ID
3. Add to `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## Custom Domain Setup

### Option A: Vercel Custom Domain

1. Go to Vercel project > Settings > Domains
2. Add your domain (e.g., `shirnjani.com`)
3. Update DNS records at your domain registrar:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### Option B: Netlify Custom Domain

1. Go to Netlify site > Domain Settings
2. Add custom domain
3. Update DNS records:
   ```
   Type: A
   Name: @
   Value: 75.2.60.5

   Type: CNAME
   Name: www
   Value: <your-site>.netlify.app
   ```

## SSL Certificate

Both Vercel and Netlify provide **automatic SSL certificates** for free via Let's Encrypt.

Your site will automatically be served over HTTPS.

## Performance Optimization

### 1. Image Optimization

Optimize images before deployment:
```bash
npm install -g sharp-cli
sharp -i src/assets/images/shirnjani.png -o src/assets/images/shirnjani.png -w 800 -h 800
```

### 2. Enable Caching

Add `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 3. Code Splitting

Already enabled by Vite - pages are automatically code-split.

## Continuous Deployment

### Auto-Deploy from GitHub (Vercel)

Once connected to Vercel:
1. Push to `main` branch
2. Vercel automatically builds and deploys
3. Preview deployments for pull requests

### Environment Variables per Branch

In Vercel, you can set different env variables for:
- Production
- Preview
- Development

## Backup Strategy

### Database Backups

Supabase automatically backs up your database daily on paid plans.

For manual backups:
```bash
# Export data using Supabase CLI
supabase db dump > backup.sql
```

### Code Backups

- Keep code in GitHub
- Tag releases: `git tag v1.0.0`
- Create backups of `.env` file securely

## Troubleshooting Deployment

### Build Fails

Check:
- All dependencies are in `package.json`
- No TypeScript errors: `npm run build` locally
- Environment variables are set correctly

### 404 Errors on Refresh

Add `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Or for Netlify, add `public/_redirects`:
```
/*    /index.html   200
```

### Environment Variables Not Working

- Ensure they start with `VITE_`
- Rebuild after adding new env variables
- Check they're set in the hosting platform

### Supabase Connection Issues

- Verify Supabase URL and key
- Check RLS policies allow public access
- Ensure domain is allowed in Supabase CORS settings

## Scaling Considerations

### Traffic Growth

Both Vercel and Netlify scale automatically:
- Vercel Free: 100GB bandwidth/month
- Netlify Free: 100GB bandwidth/month

### Database Scaling

Supabase Free tier:
- 500MB database
- 1GB file storage
- 2GB bandwidth

Upgrade to paid plan as you grow.

## Security Checklist

- [ ] HTTPS enabled (automatic with Vercel/Netlify)
- [ ] Admin password changed from default
- [ ] API keys in environment variables
- [ ] Supabase RLS policies enabled
- [ ] No sensitive data in code
- [ ] CORS configured properly
- [ ] Regular dependency updates

## Maintenance

### Regular Updates

```bash
# Update dependencies
npm update

# Check for outdated packages
npm outdated

# Update to latest versions
npm install package-name@latest
```

### Monitor Logs

- Vercel: View logs in dashboard
- Netlify: View function logs
- Supabase: Check database logs

### Performance Monitoring

- Use Vercel Analytics or Google Analytics
- Monitor page load times
- Check Core Web Vitals

## Cost Estimates

### Free Tier (Suitable for Starting)

- **Vercel**: Free (100GB bandwidth)
- **Netlify**: Free (100GB bandwidth)
- **Supabase**: Free (500MB DB, 1GB storage)
- **Google Calendar API**: Free (1M requests/day)

**Total**: $0/month

### Paid Tier (For Growth)

- **Vercel Pro**: $20/month
- **Supabase Pro**: $25/month
- **Custom Domain**: $10-15/year

**Total**: ~$45/month + domain

## Support

For deployment issues:
- Vercel: [vercel.com/support](https://vercel.com/support)
- Netlify: [netlify.com/support](https://netlify.com/support)
- Supabase: [supabase.com/support](https://supabase.com/support)

---

**Congratulations!** Your spiritual counseling website is now live! 🎉
