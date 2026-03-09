            IN TERMINAL

create database -> (create database travel_explorer;)
Then run : SOURCE schema.sql
then run : SOURCE seed.sql


            IN WORKBENCH    
file->open SQL Script -> select backend/database/schema.sql  -> click RUN
file->open SQL Script -> select backend/database/seed.sql  -> click RUN

********************************************************************
1️⃣ If a Teammate Creates a New Table

Example: Community backend member creates a table:

CREATE TABLE community_posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

They create it in their local database.

But other members will not get it automatically.

So they must update the shared schema.

2️⃣ Correct Procedure (Simple College Project Way)
Step 1 — Teammate Creates Table

They create the table in MySQL.

Example:

CREATE TABLE community_posts (...);
Step 2 — Update schema.sql

They open:

backend/database/schema.sql

and add the new table query at the bottom.

Example:

CREATE TABLE community_posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
Step 3 — Push to GitHub
git add backend/database/schema.sql
git commit -m "Added community_posts table"
git push
Step 4 — Others Pull the Changes

Other backend members run:

git pull

Now they get the updated schema.sql.

Step 5 — Run the New Query

They copy the new table query and run it in their database.

Now they also have the new table.

3️⃣ Why They Should NOT Run Whole schema.sql Again

Because it already contains existing tables.

If they run again they may get:

ERROR: Table already exists

So they only run the new table query.

4️⃣ Slightly Better Method (Cleaner)

Instead of editing the old file, create a new file.

Example:

backend/database/
│
├── schema.sql
├── seed.sql
└── community_table.sql

Then push that file.

Other teammates run that script.



