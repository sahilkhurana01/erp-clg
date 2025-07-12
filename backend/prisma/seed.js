const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create default admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@erp.com' },
    update: {},
    create: {
      name: 'System Administrator',
      email: 'admin@erp.com',
      password: hashedPassword,
      role: 'admin',
      isActive: true
    }
  });

  console.log('✅ Default admin user created:', adminUser.email);

  // Create sample teachers
  const teachers = [
    {
      name: 'John Smith',
      email: 'john.smith@school.com',
      employeeId: 'T001',
      subject: 'Mathematics',
      phone: '+1234567890',
      address: '123 Teacher St, City'
    },
    {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@school.com',
      employeeId: 'T002',
      subject: 'English',
      phone: '+1234567891',
      address: '456 Teacher Ave, City'
    },
    {
      name: 'Michael Brown',
      email: 'michael.brown@school.com',
      employeeId: 'T003',
      subject: 'Science',
      phone: '+1234567892',
      address: '789 Teacher Blvd, City'
    }
  ];

  for (const teacher of teachers) {
    await prisma.teacher.upsert({
      where: { email: teacher.email },
      update: {},
      create: teacher
    });
  }

  console.log('✅ Sample teachers created');

  // Create sample students
  const students = [
    {
      name: 'Alice Wilson',
      email: 'alice.wilson@student.com',
      rollNo: 'S001',
      class: '10',
      section: 'A',
      phone: '+1234567893',
      address: '123 Student St, City'
    },
    {
      name: 'Bob Davis',
      email: 'bob.davis@student.com',
      rollNo: 'S002',
      class: '10',
      section: 'A',
      phone: '+1234567894',
      address: '456 Student Ave, City'
    },
    {
      name: 'Carol Miller',
      email: 'carol.miller@student.com',
      rollNo: 'S003',
      class: '11',
      section: 'B',
      phone: '+1234567895',
      address: '789 Student Blvd, City'
    }
  ];

  for (const student of students) {
    await prisma.student.upsert({
      where: { email: student.email },
      update: {},
      create: student
    });
  }

  console.log('✅ Sample students created');

  // Create sample classes
  const classes = [
    { name: '10', section: 'A', capacity: 30 },
    { name: '10', section: 'B', capacity: 30 },
    { name: '11', section: 'A', capacity: 25 },
    { name: '11', section: 'B', capacity: 25 },
    { name: '12', section: 'A', capacity: 20 },
    { name: '12', section: 'B', capacity: 20 }
  ];

  for (const classData of classes) {
    await prisma.class.upsert({
      where: { 
        name_section: {
          name: classData.name,
          section: classData.section
        }
      },
      update: {},
      create: classData
    });
  }

  console.log('✅ Sample classes created');

  // Create sample subjects
  const subjects = [
    { name: 'Mathematics', code: 'MATH101', teacherId: 'T001' },
    { name: 'English Literature', code: 'ENG101', teacherId: 'T002' },
    { name: 'Physics', code: 'PHY101', teacherId: 'T003' },
    { name: 'Chemistry', code: 'CHEM101', teacherId: 'T003' },
    { name: 'Biology', code: 'BIO101', teacherId: 'T003' }
  ];

  for (const subject of subjects) {
    await prisma.subject.upsert({
      where: { code: subject.code },
      update: {},
      create: subject
    });
  }

  console.log('✅ Sample subjects created');

  // Create sample announcements
  const announcements = [
    {
      title: 'Welcome to New Academic Year',
      content: 'Welcome all students and teachers to the new academic year 2024-25. We wish you all the best for a successful year ahead.',
      authorId: adminUser.id,
      isActive: true
    },
    {
      title: 'Parent-Teacher Meeting',
      content: 'Parent-teacher meeting will be held on 15th of this month. All parents are requested to attend.',
      authorId: adminUser.id,
      isActive: true
    },
    {
      title: 'Annual Sports Day',
      content: 'Annual sports day will be celebrated on 25th of this month. All students are encouraged to participate.',
      authorId: adminUser.id,
      isActive: true
    }
  ];

  for (const announcement of announcements) {
    await prisma.announcement.create({
      data: announcement
    });
  }

  console.log('✅ Sample announcements created');

  console.log('🎉 Database seeding completed successfully!');
  console.log('\n📋 Default Login Credentials:');
  console.log('👤 Admin: admin@erp.com / admin123');
  console.log('\n📚 Sample Data Created:');
  console.log('- 3 Teachers');
  console.log('- 3 Students');
  console.log('- 6 Classes');
  console.log('- 5 Subjects');
  console.log('- 3 Announcements');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 