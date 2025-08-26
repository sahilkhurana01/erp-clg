const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkCurrentUsers() {
  try {
    console.log('🔍 Checking current users in database...\n');

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true
      }
    });

    console.log(`📊 Found ${users.length} users:\n`);

    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name} (${user.email})`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Active: ${user.isActive}`);
      console.log('');
    });

    // Check specifically for teacher users
    console.log('🔍 Looking for teacher users...');
    const teacherUsers = users.filter(user => user.role === 'teacher');
    
    if (teacherUsers.length > 0) {
      console.log(`Found ${teacherUsers.length} teacher(s):`);
      teacherUsers.forEach(teacher => {
        console.log(`- ${teacher.name} (${teacher.email})`);
      });
    } else {
      console.log('❌ No teacher users found!');
    }

  } catch (error) {
    console.error('❌ Error checking users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkCurrentUsers();



