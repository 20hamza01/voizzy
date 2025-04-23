# **Voizzy Implementation Plan (MVP)**

## **Stack**

* **Frontend**: Next.js \+ TailwindCSS

* **Backend/Auth**: Supabase

* **Database**: Supabase (PostgreSQL)

## **Phases**

### **Phase 1: Core Functionality**

* Email/password sign-up/login

* User dashboard: view, approve, delete testimonials

* Submit testimonial via Voizzy-branded form (text-only)

* Unique shareable form URL per user

* Embed testimonial wall (iframe)

* Email and in-app notification when testimonial is submitted  
* Lightweight user dashboard to view submitted testimonials, where he can approve/delete testimonials.

* 3-tiered plan logic enforcement

* Lightweight admin dashboard (view users, activity)

### **Phase 2: Premium Features**

* Customizable form (logo \+ colors)

* AI-powered testimonial summarization (OpenAI API)

* Multi-form support

## **Limitations**

* Only one form per user

* No customization for Free or Basic plans

