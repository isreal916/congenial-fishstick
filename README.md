to create databasec

```
CREATE TABLE nominations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Personal Details
  fullname TEXT NOT NULL,
  membership TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  
  -- Academic & Professional
  qualifications TEXT NOT NULL,
  serviceInstitute TEXT NOT NULL,
  serviceOther TEXT NOT NULL,
  awards TEXT NOT NULL,
  hobbies TEXT NOT NULL,
  otherInfo TEXT NOT NULL,
  
  -- Sponsors
  sponsor1 TEXT NOT NULL,
  sponsor1no TEXT NOT NULL,
  sponsor2 TEXT NOT NULL,
  sponsor2no TEXT NOT NULL,
  
  -- District Society
  chairman TEXT NOT NULL,
  district TEXT NOT NULL,
  
  -- Tax Clearance
  taxfile TEXT NOT NULL,
  
  -- Metadata
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```



.env file:
```
VITE_SUPABASE_URL=supabase_url of your database in dsupabase dashboard after database creation
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=ssame her   click connect on supabase dashboard after creating database u will be able to copu neccesary key for env
```

