# Memoria - Secure Shared Photo Album

Memoria is a modern, privacy-focused photo sharing application featuring a beautiful dark-mode UI, shared albums, and granular access control.

## 🚀 Features

*   **Modern UI:** Glassmorphism design, fully responsive, and optimized for dark mode.
*   **Album Management:** Create private or public albums, manage descriptions, and covers.
*   **Member Management:** Invite users via email, manage roles (Owner, Editor, Viewer), and handle invitation statuses (Pending/Active).
*   **Photo Organization:** Sort, filter, and view photos in Grid or List modes.
*   **Multi-Cloud Storage:** Intelligent routing between IDrive e2 (for large files) and Cloudinary (for optimization).
*   **Admin Panel:** Resource monitoring and user management.

---

## 🛠 Tech Stack

*   **Frontend Framework:** React 18+ (Create React App / Vite structure)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS + Custom CSS Variables
*   **Icons:** Google Material Symbols Outlined
*   **Fonts:** Inter (Google Fonts)

---

## 📦 Installation & Local Development

### Prerequisites
*   Node.js (v18 or higher recommended)
*   npm or yarn

### Steps

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/memoria.git
    cd memoria
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Start Development Server**
    ```bash
    npm start
    # or
    yarn dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

4.  **Build for Production**
    ```bash
    npm run build
    ```
    The build artifacts will be stored in the `build/` (or `dist/`) directory.

---

## 🗄️ Backend & Database Architecture

This section details the recommended SQL schema and logic for the production backend.

### 1. Storage Strategy (Multi-Cloud Load Balancing)

The application uses a hybrid storage approach to optimize costs and performance:

*   **IDrive e2 (S3 Compatible):** Used for large assets.
    *   Images > 10MB
    *   Videos > 100MB
*   **Cloudinary:** Used for standard assets (optimized delivery).
    *   Images <= 10MB
    *   Videos <= 100MB

**Account Rotation Logic:**
The backend must implement a "Round-Robin with Capacity Check" allocator.
1.  Check file size to determine the *Target Provider* (IDrive vs Cloudinary).
2.  Query `storage_accounts` table for active accounts of the *Target Provider*.
3.  Select an account where `usage_bytes < limit_bytes`.
4.  If multiple accounts are available, pick the one with the lowest usage or round-robin.
5.  If current account is full, automatically flag it as full and switch to the next available account.

### 2. SQL Schema (PostgreSQL)

```sql
-- 1. Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(100),
    avatar_url TEXT,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'User', -- 'Admin' or 'User'
    storage_used BIGINT DEFAULT 0, -- in bytes
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Storage Accounts (Multi-Account Management)
CREATE TYPE storage_provider AS ENUM ('cloudinary', 'idrive');

CREATE TABLE storage_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    provider storage_provider NOT NULL,
    account_name VARCHAR(100) NOT NULL, -- e.g., "idrive_acc_1"
    credentials_json JSONB NOT NULL, -- encrypted API keys/secrets
    bucket_name VARCHAR(255),
    region VARCHAR(50),
    usage_bytes BIGINT DEFAULT 0,
    limit_bytes BIGINT NOT NULL, -- e.g., 10GB for free tier
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Albums Table
CREATE TABLE albums (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    cover_url TEXT,
    is_private BOOLEAN DEFAULT TRUE,
    is_shared BOOLEAN DEFAULT FALSE,
    public_link_token VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Album Members
CREATE TYPE member_role AS ENUM ('Owner', 'Editor', 'Viewer');
CREATE TYPE invite_status AS ENUM ('Pending', 'Active', 'Declined');

CREATE TABLE album_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    album_id UUID REFERENCES albums(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    email VARCHAR(255),
    role member_role DEFAULT 'Viewer',
    status invite_status DEFAULT 'Pending',
    invited_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(album_id, user_id),
    UNIQUE(album_id, email)
);

-- 5. Photos Table (With Storage Tracking)
CREATE TABLE photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    album_id UUID REFERENCES albums(id) ON DELETE CASCADE,
    uploader_id UUID REFERENCES users(id) ON DELETE SET NULL,
    
    -- File Info
    url TEXT NOT NULL,
    filename VARCHAR(255),
    mime_type VARCHAR(50),
    size_bytes BIGINT,
    width INT,
    height INT,
    
    -- Cloud Storage Tracking
    storage_account_id UUID REFERENCES storage_accounts(id),
    provider_file_id VARCHAR(255), -- ID on Cloudinary or Key on S3
    
    -- Metadata (EXIF)
    camera_model VARCHAR(100),
    iso INT,
    aperture VARCHAR(20),
    shutter_speed VARCHAR(20),
    taken_at TIMESTAMP WITH TIME ZONE,
    
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Environment Variables (.env)

```env
PORT=5000
DATABASE_URL=postgres://user:password@localhost:5432/memoria_db
JWT_SECRET=your_super_secret_jwt_key

# Admin Configuration
ADMIN_EMAIL=admin@gmail.com

# Initial Storage Accounts can be seeded or managed via Admin Panel
```

### Deployment

**Frontend (Vercel/Netlify):**
1.  Connect your Git repository.
2.  Set Build Command: `npm run build`.
3.  Set Output Directory: `build` (or `dist`).
4.  Deploy.

**Backend (Heroku/Render/AWS):**
1.  Set up a PostgreSQL database.
2.  Run the SQL Schema scripts above.
3.  Implement the File Upload Controller using the logic defined in "Storage Strategy".
4.  Configure Environment Variables.

---

## 🎨 Design System

*   **Primary Color:** `#3780f6` (Blue)
*   **Dark Background:** `#101723` (Deep Navy)
*   **Surface Color:** `#1e293b` (Slate)

License: MIT
