# 🗄️ CREOVA Supabase Database Access Guide

## 📍 Quick Access Information

### **Your Supabase Project Details:**
- **Project URL:** Available in your environment variables (`SUPABASE_URL`)
- **Dashboard:** https://supabase.com/dashboard/project/YOUR_PROJECT_ID

---

## 🚀 Step-by-Step: Access Your Supabase Dashboard

### **Step 1: Login to Supabase**

1. Go to: **https://supabase.com**
2. Click **"Sign In"** (top right)
3. Login with your account credentials
4. You'll see your CREOVA project in the dashboard

---

### **Step 2: Navigate to Your Database**

Once logged in:

1. **Select Your Project**
   - Click on your CREOVA project card
   - You'll see the Project Overview

2. **Go to Table Editor**
   - Look at the left sidebar
   - Click **"Table Editor"** icon (looks like a table/grid)
   - You'll see all your database tables

3. **Open Your Data Table**
   - Find table: **`kv_store_feacf0d8`**
   - Click on it to open
   - You'll see all your data!

---

## 📊 Understanding Your Data Structure

### **Table: `kv_store_feacf0d8`**

#### **Columns:**
- **`key`** (text) - Unique identifier for each record
- **`value`** (jsonb) - All the data stored as JSON
- **`created_at`** (timestamp) - When record was created
- **`updated_at`** (timestamp) - When record was last modified

#### **Example Row:**
```
key: contact_1234567890_abc123
value: {
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-0123",
  "service": "Photography",
  "message": "I need a family photoshoot",
  "budget": "$500-$1000",
  "timeline": "Next Month",
  "status": "new",
  "type": "contact",
  "created_at": "2024-11-16T10:30:00.000Z"
}
```

---

## 🔍 How to View Specific Data

### **Method 1: Using Table Editor (Easy Way)**

1. **Go to Table Editor**
2. **Click on `kv_store_feacf0d8` table**
3. **Use the Filter/Search:**
   - Click the filter icon
   - Filter by `key` column
   - Use conditions like "contains", "starts with", etc.

**Examples:**
- Filter `key` **contains** `contact_` → Shows all contact forms
- Filter `key` **contains** `order_` → Shows all shop orders
- Filter `key` **contains** `membership_` → Shows all memberships

---

### **Method 2: Using SQL Editor (Advanced Way)**

1. **Go to SQL Editor**
   - Click **"SQL Editor"** in left sidebar
   - Click **"New query"**

2. **Run Custom Queries:**

#### **📧 Get All Contact Submissions:**
```sql
SELECT 
  key,
  value->>'name' as name,
  value->>'email' as email,
  value->>'service' as service,
  value->>'status' as status,
  value->>'created_at' as submitted_at
FROM kv_store_feacf0d8 
WHERE key LIKE 'contact_%' 
ORDER BY created_at DESC;
```

#### **🤝 Get All Collaboration Requests:**
```sql
SELECT 
  key,
  value->>'name' as name,
  value->>'email' as email,
  value->>'organization' as organization,
  value->>'collaborationType' as type,
  value->>'status' as status,
  value->>'created_at' as submitted_at
FROM kv_store_feacf0d8 
WHERE key LIKE 'collaboration_%' 
ORDER BY created_at DESC;
```

#### **🎫 Get All Event Tickets:**
```sql
SELECT 
  key,
  value->>'ticket_code' as ticket_code,
  value->'customer_info'->>'name' as customer_name,
  value->'customer_info'->>'email' as customer_email,
  value->>'quantity' as quantity,
  value->>'total_amount' as amount,
  value->>'status' as status,
  value->>'created_at' as purchased_at
FROM kv_store_feacf0d8 
WHERE key LIKE 'ticket_%' 
ORDER BY created_at DESC;
```

#### **🛍️ Get All Shop Orders:**
```sql
SELECT 
  key,
  value->>'payment_intent_id' as payment_id,
  value->'customer_info'->>'name' as customer_name,
  value->'customer_info'->>'email' as customer_email,
  value->>'amount' as amount,
  value->>'currency' as currency,
  value->>'status' as status,
  value->>'created_at' as order_date
FROM kv_store_feacf0d8 
WHERE key LIKE 'order_%' 
ORDER BY created_at DESC;
```

#### **👥 Get All Memberships:**
```sql
SELECT 
  key,
  value->>'member_number' as member_number,
  value->>'membership_type' as membership_type,
  value->'customer_info'->>'name' as member_name,
  value->'customer_info'->>'email' as member_email,
  value->>'status' as status,
  value->>'created_at' as joined_date,
  value->>'expires_at' as expires_date
FROM kv_store_feacf0d8 
WHERE key LIKE 'membership_%' 
ORDER BY created_at DESC;
```

#### **📦 Get All Equipment Rentals:**
```sql
SELECT 
  key,
  value->'equipment'->>'name' as equipment,
  value->'customer_info'->>'name' as customer_name,
  value->'customer_info'->>'email' as customer_email,
  value->'rental_details'->>'start_date' as start_date,
  value->'rental_details'->>'end_date' as end_date,
  value->>'amount' as amount,
  value->>'status' as status
FROM kv_store_feacf0d8 
WHERE key LIKE 'rental_%' 
ORDER BY created_at DESC;
```

#### **📧 Get Email Notification Signups:**
```sql
SELECT 
  key,
  value->>'email' as email,
  value->>'type' as notification_type,
  value->>'item_id' as item_id,
  value->>'created_at' as signup_date
FROM kv_store_feacf0d8 
WHERE key LIKE 'notification_%' 
ORDER BY created_at DESC;
```

#### **📊 Get Summary Statistics:**
```sql
-- Count by type
SELECT 
  CASE 
    WHEN key LIKE 'contact_%' THEN 'Contact Forms'
    WHEN key LIKE 'collaboration_%' THEN 'Collaboration Requests'
    WHEN key LIKE 'order_%' THEN 'Shop Orders'
    WHEN key LIKE 'ticket_%' THEN 'Event Tickets'
    WHEN key LIKE 'membership_%' THEN 'Memberships'
    WHEN key LIKE 'rental_%' THEN 'Equipment Rentals'
    WHEN key LIKE 'notification_%' THEN 'Email Signups'
    WHEN key LIKE 'digital_%' THEN 'Digital Products'
    ELSE 'Other'
  END as data_type,
  COUNT(*) as total_count
FROM kv_store_feacf0d8
GROUP BY data_type
ORDER BY total_count DESC;
```

#### **💰 Get Revenue Summary:**
```sql
SELECT 
  CASE 
    WHEN key LIKE 'order_%' THEN 'Shop Orders'
    WHEN key LIKE 'ticket_%' THEN 'Event Tickets'
    WHEN key LIKE 'booking_%' THEN 'Service Bookings'
    WHEN key LIKE 'rental_%' THEN 'Equipment Rentals'
    WHEN key LIKE 'digital_%' THEN 'Digital Products'
  END as revenue_source,
  COUNT(*) as total_transactions,
  SUM(CAST(value->>'amount' AS DECIMAL)) as total_revenue
FROM kv_store_feacf0d8
WHERE key LIKE 'order_%' 
   OR key LIKE 'ticket_%' 
   OR key LIKE 'booking_%'
   OR key LIKE 'rental_%'
   OR key LIKE 'digital_%'
GROUP BY revenue_source
ORDER BY total_revenue DESC;
```

---

## 📥 How to Export Your Data

### **Method 1: Export Entire Table (CSV)**

1. Go to **Table Editor**
2. Open `kv_store_feacf0d8` table
3. Click the **"..."** menu (top right)
4. Click **"Download as CSV"**
5. Opens in Excel/Google Sheets!

---

### **Method 2: Export Query Results**

1. Run any SQL query (see examples above)
2. Click **"Download results"** button
3. Choose format: CSV, JSON, or Clipboard
4. Use the data anywhere!

---

## 🔧 Useful Database Operations

### **1. Search for Specific Customer**

```sql
-- Search by email
SELECT * FROM kv_store_feacf0d8
WHERE value::text LIKE '%john@example.com%';

-- Search by name
SELECT * FROM kv_store_feacf0d8
WHERE value::text LIKE '%John Doe%';

-- Search by phone
SELECT * FROM kv_store_feacf0d8
WHERE value::text LIKE '%555-0123%';
```

---

### **2. Filter by Date Range**

```sql
-- Get all submissions from last 7 days
SELECT * FROM kv_store_feacf0d8
WHERE created_at >= NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;

-- Get all submissions from specific month
SELECT * FROM kv_store_feacf0d8
WHERE created_at >= '2024-11-01' 
  AND created_at < '2024-12-01'
ORDER BY created_at DESC;

-- Get today's submissions
SELECT * FROM kv_store_feacf0d8
WHERE created_at::date = CURRENT_DATE
ORDER BY created_at DESC;
```

---

### **3. Update Record Status**

```sql
-- Update contact status
UPDATE kv_store_feacf0d8
SET value = jsonb_set(value, '{status}', '"in-progress"')
WHERE key = 'contact_1234567890_abc123';

-- Mark collaboration as completed
UPDATE kv_store_feacf0d8
SET value = jsonb_set(value, '{status}', '"completed"')
WHERE key = 'collaboration_1234567890_abc123';
```

---

### **4. Delete Old/Test Records**

```sql
-- ⚠️ BE CAREFUL - This deletes permanently!

-- Delete specific record
DELETE FROM kv_store_feacf0d8
WHERE key = 'contact_1234567890_abc123';

-- Delete records older than 1 year
DELETE FROM kv_store_feacf0d8
WHERE created_at < NOW() - INTERVAL '1 year';
```

---

## 🔐 Getting Your Connection Details

### **Method 1: From Supabase Dashboard**

1. Go to **Project Settings** (gear icon in sidebar)
2. Click **"API"** tab
3. You'll see:
   - **Project URL** - Your Supabase URL
   - **API Keys:**
     - `anon` / `public` - For frontend (safe to expose)
     - `service_role` - For backend (KEEP SECRET!)

---

### **Method 2: From Your App**

Your connection details are stored in:
- File: `/utils/supabase/info.tsx`

```typescript
export const projectId = 'your-project-id';
export const publicAnonKey = 'your-anon-key';
```

---

## 📱 Mobile App Access

### **Supabase Mobile App** (Optional)
1. Download "Supabase" app from App Store / Google Play
2. Login with your credentials
3. Access your data on the go!

---

## 🎯 Quick Reference: Data Types by Key Prefix

| Key Prefix | Data Type | Description |
|------------|-----------|-------------|
| `contact_` | Contact Forms | General inquiry forms |
| `collaboration_` | Collaboration Requests | Partnership inquiries |
| `booking_` | Service Bookings | Photography/videography bookings |
| `order_` | Shop Orders | E-commerce purchases |
| `ticket_` | Event Tickets | Event registrations |
| `membership_` | Memberships | Creator/Legacy subscriptions |
| `rental_` | Equipment Rentals | Camera/equipment rentals |
| `digital_` | Digital Products | Digital download purchases |
| `notification_` | Email Signups | Pre-order/launch notifications |
| `preorder_` | Pre-orders | Product pre-orders |

---

## 💡 Pro Tips

### **1. Create Saved Queries**
- In SQL Editor, click "Save Query"
- Name it (e.g., "All Contact Forms")
- Access instantly anytime!

### **2. Set Up Email Notifications**
- Go to Database → Webhooks
- Get notified when new data arrives
- Set up for `contact_` or `collaboration_` records

### **3. Create Views for Easy Access**
```sql
-- Create a view for easy contact form access
CREATE VIEW contact_forms AS
SELECT 
  key,
  value->>'name' as name,
  value->>'email' as email,
  value->>'service' as service,
  value->>'status' as status,
  created_at
FROM kv_store_feacf0d8 
WHERE key LIKE 'contact_%';

-- Now you can simply query:
SELECT * FROM contact_forms WHERE status = 'new';
```

### **4. Backup Your Data Regularly**
1. Export full table as CSV
2. Save to Google Drive / Dropbox
3. Schedule weekly backups
4. Keep offline copies!

---

## 🆘 Troubleshooting

### **"Can't see the table"**
✅ Make sure you're logged into the correct Supabase account  
✅ Check that you selected the right project  
✅ Table is named `kv_store_feacf0d8` (with underscore, not hyphen)

### **"Query returns no results"**
✅ Check your WHERE clause syntax  
✅ Key names are case-sensitive  
✅ Use `LIKE` for partial matches  
✅ Try `SELECT * FROM kv_store_feacf0d8 LIMIT 10` to see all data

### **"Permission denied"**
✅ Make sure you're the project owner  
✅ Check you're using service_role key for admin operations  
✅ Contact Supabase support if issues persist

---

## 🔗 Helpful Links

- **Supabase Dashboard:** https://supabase.com/dashboard
- **Documentation:** https://supabase.com/docs
- **SQL Reference:** https://supabase.com/docs/guides/database/overview
- **API Reference:** https://supabase.com/docs/reference/javascript/introduction

---

## 📞 Need Help?

### **Supabase Support:**
- **Community:** https://github.com/supabase/supabase/discussions
- **Discord:** https://discord.supabase.com
- **Email:** support@supabase.io

---

## 🎉 You're All Set!

You now have complete access to:
- ✅ View all customer submissions
- ✅ Track orders and payments
- ✅ Monitor memberships
- ✅ Export data for reports
- ✅ Run custom analytics queries
- ✅ Backup your data
- ✅ Manage your entire database

**Happy data managing!** 🚀

---

**Last Updated:** November 16, 2024  
**Version:** 1.0
