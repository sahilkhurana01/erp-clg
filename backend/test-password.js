const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function testPassword() {
  try {
    console.log('🔍 Testing password for teacher123@erp.com...\n');

    // Get the user from database
    const user = await prisma.user.findUnique({
      where: { email: 'teacher123@erp.com' },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        role: true,
        isActive: true
      }
    });

    if (!user) {
      console.log('❌ User not found');
      return;
    }

    console.log('✅ User found:', {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive
    });

    console.log('\n🔍 Testing password verification...');
    
    // Test the password
    const testPassword = 'teacher123';
    const isPasswordValid = await bcrypt.compare(testPassword, user.password);
    
    console.log(`Password '${testPassword}' is valid: ${isPasswordValid}`);
    
    if (!isPasswordValid) {
      console.log('\n🔍 Let\'s try to hash the password and see what we get...');
      const hashedPassword = await bcrypt.hash(testPassword, 10);
      console.log('New hashed password:', hashedPassword);
      
      // Update the user's password
      console.log('\n🔄 Updating user password...');
      await prisma.user.update({
        where: { email: 'teacher123@erp.com' },
        data: { password: hashedPassword }
      });
      
      console.log('✅ Password updated successfully');
      
      // Test again
      const updatedUser = await prisma.user.findUnique({
        where: { email: 'teacher123@erp.com' },
        select: { password: true }
      });
      
      const isPasswordValidNow = await bcrypt.compare(testPassword, updatedUser.password);
      console.log(`Password '${testPassword}' is now valid: ${isPasswordValidNow}`);
    }

  } catch (error) {
    console.error('❌ Error testing password:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testPassword();
