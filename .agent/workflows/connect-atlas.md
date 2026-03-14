---
description: How to connect the application to a MongoDB Atlas Cluster
---

Follow these steps to migrate from the local database to your MongoDB Atlas cloud cluster:

### 1. Whitelist your IP Address (Crucial)
Atlas blocks all connections by default.
1. Log in to [MongoDB Atlas](https://cloud.mongodb.com/).
2. In the left sidebar, go to **Security** > **Network Access**.
3. Click **Add IP Address**.
4. Click **Allow Access from Anywhere** (0.0.0.0/0) for development, or **Add Current IP Address** for security.
5. Click **Confirm**.

### 2. Create a Database User
1. Go to **Security** > **Database Access**.
2. Click **Add New Database User**.
3. Choose **Password** authentication.
4. Enter a username and password (e.g., `muthu_0708`).
5. Set the user privilege to **Read and write to any database**.
6. Click **Add User**.

### 3. Get your Connection String
1. Go to **Deployment** > **Database**.
2. Click **Connect** on your cluster.
3. Choose **Drivers**.
4. Copy the connection string (it looks like `mongodb+srv://...`).

### 4. Update the Platform
1. Open your `backend/.env` file.
2. Replace the `MONGO_URI` value with your new string.
   > [!IMPORTANT]
   > Replace `<password>` with the password you created in Step 2.
   > Ensure the database name (e.g., `/event-management`) is included before the `?`.

3. Save the file. The server will automatically attempt to reconnect using the new robust logic I've implemented.

### 5. Re-seed (Optional)
If you want to move your premium vendor data to the cloud, run:
```powershell
cd backend
node seeder.js
```
