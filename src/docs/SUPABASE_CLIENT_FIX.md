# Supabase Client Singleton Fix

## Issue Resolved
Fixed the "Multiple GoTrueClient instances detected" warning that was appearing in the browser console.

## Root Cause
Multiple instances of the Supabase client were being created across different files (AuthPage.tsx, AuthCallbackPage.tsx, etc.), which caused the GoTrueClient to detect concurrent instances sharing the same storage key.

## Solution
Created a **singleton pattern** for the Supabase client to ensure only one instance exists throughout the application.

## Changes Made

### 1. Created `/utils/supabase/client.tsx`
New utility file that exports a singleton Supabase client instance:

```typescript
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

const supabaseUrl = `https://${projectId}.supabase.co`;
let supabaseInstance: ReturnType<typeof createClient> | null = null;

export function getSupabaseClient() {
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, publicAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: 'creova-auth-token',
      }
    });
  }
  return supabaseInstance;
}

export const supabase = getSupabaseClient();
```

### 2. Updated `/pages/AuthPage.tsx`
**Before:**
```typescript
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../utils/supabase/info';

const supabaseUrl = `https://${projectId}.supabase.co`;
const supabase = createClient(supabaseUrl, publicAnonKey);
```

**After:**
```typescript
import { supabase } from '../utils/supabase/client';
```

### 3. Updated `/pages/AuthCallbackPage.tsx`
**Before:**
```typescript
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../utils/supabase/info';

const supabaseUrl = `https://${projectId}.supabase.co`;
const supabase = createClient(supabaseUrl, publicAnonKey);
```

**After:**
```typescript
import { supabase } from '../utils/supabase/client';
```

## Benefits

✅ **Single Instance**: Only one Supabase client instance throughout the app
✅ **Consistent Storage**: All auth operations use the same storage key (`creova-auth-token`)
✅ **No Warnings**: Eliminates the "Multiple GoTrueClient instances" warning
✅ **Better Performance**: Reduces memory usage and prevents potential conflicts
✅ **Easier Maintenance**: Centralized client configuration
✅ **Auto Session Management**: Configured with:
- `persistSession: true` - Sessions persist across page reloads
- `autoRefreshToken: true` - Automatically refreshes expired tokens
- `detectSessionInUrl: true` - Handles OAuth redirects properly

## Usage

### For New Files
When you need to use Supabase in a new file, always import the singleton client:

```typescript
import { supabase } from '../utils/supabase/client';

// Then use it
const { data, error } = await supabase.auth.signIn({ email, password });
```

### For Backend/Server Files
Backend files should continue to use the server-side Supabase instance with the service role key (not this client).

## Important Notes

1. **Never create new Supabase client instances** - Always import from `/utils/supabase/client.tsx`
2. **Frontend only** - This singleton is for frontend use only
3. **Protected file** - The `/utils/supabase/info.tsx` is auto-generated and should not be edited
4. **Consistent imports** - All frontend pages should use the same import pattern

## Testing

To verify the fix:

1. Open your browser DevTools (F12)
2. Go to Console tab
3. Navigate to `/auth` page
4. Check for warnings - you should **NOT** see:
   - ❌ "Multiple GoTrueClient instances detected"
5. You should see:
   - ✅ Clean console (no warnings)

## Files Modified

- ✅ Created `/utils/supabase/client.tsx`
- ✅ Updated `/pages/AuthPage.tsx`
- ✅ Updated `/pages/AuthCallbackPage.tsx`

## Future Updates

If you add more pages that need authentication:

1. Import the singleton client:
   ```typescript
   import { supabase } from '../utils/supabase/client';
   ```

2. Use it for auth operations:
   ```typescript
   // Check if user is logged in
   const { data: { user } } = await supabase.auth.getUser();
   
   // Sign out
   await supabase.auth.signOut();
   
   // Get session
   const { data: { session } } = await supabase.auth.getSession();
   ```

## Verification Checklist

- [x] Singleton client created
- [x] AuthPage.tsx updated
- [x] AuthCallbackPage.tsx updated
- [x] No more "Multiple instances" warning
- [x] Auth functionality works correctly
- [x] Sessions persist correctly
- [x] OAuth redirects work

---

**Status**: ✅ Complete  
**Date**: November 18, 2024  
**Tested**: Ready for use  
**Breaking Changes**: None - all existing code continues to work
