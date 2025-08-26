@echo off
echo 🚀 Running MongoDB Seeding Script
echo =================================

echo.
echo 📝 This script will create test data in your MongoDB database
echo 💡 Make sure MongoDB is running and accessible
echo.

REM Check if MongoDB is accessible
echo 🔍 Checking MongoDB connection...
mongosh --eval "db.runCommand('ping')" >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ MongoDB is not accessible. Please make sure:
    echo    1. MongoDB service is running
    echo    2. MongoDB is accessible on localhost:27017
    echo    3. mongosh command is available in PATH
    echo.
    pause
    exit /b 1
)

echo ✅ MongoDB connection successful
echo.

REM Run the seeding script
echo 🌱 Running seeding script...
mongosh erp_college --file create-test-data-mongo.js

if %errorlevel% equ 0 (
    echo.
    echo 🎉 Seeding completed successfully!
    echo.
    echo 🔑 Test Login Credentials:
    echo    Admin: admin@erp.com / admin123
    echo    Teacher: john.smith@erp.com / teacher123
    echo    Student: student1@erp.com / student123
    echo.
    echo 🌐 You can now test the application with these credentials
) else (
    echo.
    echo ❌ Seeding failed. Please check the error messages above.
)

echo.
pause
