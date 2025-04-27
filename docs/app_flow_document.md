# **Voizzy App Flow (MVP)**

## **1\. Landing Page**

* Hero section \+ value proposition

* Call to action to sign up

## **2\. Sign Up / Login**

* Email/password (Supabase Auth)
* Google SSO Integration.

## **3\. Dashboard (User)**

* See list of testimonials (approved/pending)

* Approve/delete

* Access personal form URL

* Embed code for Wall of Love

## **4\. Testimonial Form Page**

* Voizzy-branded

* Form includes:

  * Name (required)

  * Title/Role (optional)

  * Text testimonial (required)

  * Confirmation step before submission

## **5\. Confirmation Page**

* Thank you message after submitting

## **6\. Admin Panel (Light)**

* View list of users

* View testimonial stats

* Basic filtering/search

## **7\. Wall of Love Embed (iframe)**

* Pulls approved testimonials

* Displays in card layout

* Embed code from dashboard

### **User Roles**

* **User**: Can create form, share link, approve testimonials, embed wall

* **Admin**: Monitor users/testimonials only

### **User Flow**

1. Sign up / Log in

2. Get 1 default form → Share the link

3. Client visits link, submits testimonial

4. Approves in-app

5. Testimonial appears on Wall of Love

6. Embed iframe to his website

### **Pages**

* `/signup` – Email/password onboarding

* `/dashboard` – Logo, color, and form settings

* `/form/[id]` – Client-facing testimonial submission page

* `/confirm` – Thank-you page

* `/wall` – Public Wall of Love (embeddable via iframe)

* `/admin` – Admin-only view of all users \+ testimonials

* `/notifications` – In-app list of testimonial events

