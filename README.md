# Ikaros

This is an Nx project that contains an Angular 17 frontend `ikaros` and a NestJS backend `astraea`. Initially I wanted to make this run off of a single app using AnalogJS with tRPC but had too little documentation for me to continue. 

---
### Running Locally
1. Clone the repo
2. Install packages `pnpm install`
3. set up .env with SUPABASE_URL and SUPABASE_ANON_KEY values
4. Run both client/server simultaneously with `npm run start` or individually with `npx nx serve ikaros` and `npx nx serve astraea`

---
### Roadmap
- [ ] User Authentication
- [ ] Route Protection + Saving Auth in context
- [ ] File Uploads (User Avatar / Novel Collection)
- [ ] Reading UI + Customizations
- [ ] Saving Progress in DB
