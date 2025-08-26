Write-Host "🚀 Running MongoDB Seeding Script" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green

Write-Host ""
Write-Host "📝 This script will create test data in your MongoDB database" -ForegroundColor Yellow
Write-Host "💡 Make sure MongoDB is running and accessible" -ForegroundColor Yellow
Write-Host ""

# Check if MongoDB is accessible
Write-Host "🔍 Checking MongoDB connection..." -ForegroundColor Cyan
try {
    $result = mongosh --eval "db.runCommand('ping')" 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ MongoDB connection successful" -ForegroundColor Green
    } else {
        throw "MongoDB connection failed"
    }
} catch {
    Write-Host "❌ MongoDB is not accessible. Please make sure:" -ForegroundColor Red
    Write-Host "   1. MongoDB service is running" -ForegroundColor Red
    Write-Host "   2. MongoDB is accessible on localhost:27017" -ForegroundColor Red
    Write-Host "   3. mongosh command is available in PATH" -ForegroundColor Red
    Write-Host ""
    Read-Host "Press Enter to continue..."
    exit 1
}

Write-Host ""

# Run the seeding script
Write-Host "🌱 Running seeding script..." -ForegroundColor Cyan
try {
    $result = mongosh erp_college --file create-test-data-mongo.js
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "🎉 Seeding completed successfully!" -ForegroundColor Green
        Write-Host ""
        Write-Host "🔑 Test Login Credentials:" -ForegroundColor Yellow
        Write-Host "   Admin: admin@erp.com / admin123" -ForegroundColor White
        Write-Host "   Teacher: john.smith@erp.com / teacher123" -ForegroundColor White
        Write-Host "   Student: student1@erp.com / student123" -ForegroundColor White
        Write-Host ""
        Write-Host "🌐 You can now test the application with these credentials" -ForegroundColor Green
    } else {
        throw "Seeding failed"
    }
} catch {
    Write-Host ""
    Write-Host "❌ Seeding failed. Please check the error messages above." -ForegroundColor Red
}

Write-Host ""
Read-Host "Press Enter to continue..."
