const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  try {
    // Check if data already exists
    const existingUsers = await prisma.user.count();
    if (existingUsers > 0) {
      console.log('✅ Database already contains data, skipping seeding');
      return;
    }

    console.log('📝 Creating initial data...');

    // Create admin user
    console.log('👑 Creating admin user...');
    const adminPassword = await bcrypt.hash('admin123', 10);
    const adminUser = await prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@erp.com',
        password: adminPassword,
        role: 'admin',
        isActive: true
      }
    });
    console.log('✅ Admin user created:', adminUser.email);

    // Create teacher users
    console.log('👨‍🏫 Creating teacher users...');
    const teacherPassword = await bcrypt.hash('teacher123', 10);
    
    const teacher1 = await prisma.user.create({
      data: {
        name: 'John Smith',
        email: 'john.smith@erp.com',
        password: teacherPassword,
        role: 'teacher',
        isActive: true
      }
    });

    const teacher2 = await prisma.user.create({
      data: {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@erp.com',
        password: teacherPassword,
        role: 'teacher',
        isActive: true
      }
    });

    const teacher3 = await prisma.user.create({
      data: {
        name: 'Michael Brown',
        email: 'michael.brown@erp.com',
        password: teacherPassword,
        role: 'teacher',
        isActive: true
      }
    });

    console.log('✅ Teacher users created');

    // Create teacher profiles
    const teacher1Profile = await prisma.teacher.create({
      data: {
        userId: teacher1.id,
        name: 'John Smith',
        email: 'john.smith@erp.com',
        employeeId: 'T001',
        subject: 'Mathematics',
        phone: '+1234567890',
        address: '123 Teacher St, City',
        qualification: 'MSc Mathematics',
        experience: 5,
        salary: 50000
      }
    });

    const teacher2Profile = await prisma.teacher.create({
      data: {
        userId: teacher2.id,
        name: 'Sarah Johnson',
        email: 'sarah.johnson@erp.com',
        employeeId: 'T002',
        subject: 'English',
        phone: '+1234567891',
        address: '456 Teacher Ave, City',
        qualification: 'MA English Literature',
        experience: 3,
        salary: 48000
      }
    });

    const teacher3Profile = await prisma.teacher.create({
      data: {
        userId: teacher3.id,
        name: 'Michael Brown',
        email: 'michael.brown@erp.com',
        employeeId: 'T003',
        subject: 'Science',
        phone: '+1234567892',
        address: '789 Teacher Blvd, City',
        qualification: 'MSc Physics',
        experience: 7,
        salary: 52000
      }
    });

    console.log('✅ Teacher profiles created');

    // Create classes
    console.log('🏫 Creating classes...');
    const class1 = await prisma.class.create({
      data: {
        name: 'Class 10',
        section: 'A',
        capacity: 30,
        teacherId: teacher1Profile.id
      }
    });

    const class2 = await prisma.class.create({
      data: {
        name: 'Class 10',
        section: 'B',
        capacity: 30,
        teacherId: teacher2Profile.id
      }
    });

    const class3 = await prisma.class.create({
      data: {
        name: 'Class 11',
        section: 'A',
        capacity: 25,
        teacherId: teacher3Profile.id
      }
    });

    console.log('✅ Classes created');

    // Create subjects
    console.log('📚 Creating subjects...');
    const mathSubject = await prisma.subject.create({
      data: {
        name: 'Mathematics',
        code: 'MATH101',
        classId: class1.id,
        teacherId: teacher1Profile.id
      }
    });

    const englishSubject = await prisma.subject.create({
      data: {
        name: 'English',
        code: 'ENG101',
        classId: class1.id,
        teacherId: teacher2Profile.id
      }
    });

    const scienceSubject = await prisma.subject.create({
      data: {
        name: 'Science',
        code: 'SCI101',
        classId: class1.id,
        teacherId: teacher3Profile.id
      }
    });

    console.log('✅ Subjects created');

    // Create student users
    console.log('👨‍🎓 Creating student users...');
    const studentPassword = await bcrypt.hash('student123', 10);
    
    const students = [];
    for (let i = 1; i <= 10; i++) {
      const student = await prisma.user.create({
        data: {
          name: `Student ${i}`,
          email: `student${i}@erp.com`,
          password: studentPassword,
          role: 'student',
          isActive: true
        }
      });
      students.push(student);
    }

    console.log('✅ Student users created');

    // Create student profiles
    console.log('👨‍🎓 Creating student profiles...');
    for (let i = 0; i < students.length; i++) {
      const student = students[i];
      const classId = i < 5 ? class1.id : class2.id;
      const section = i < 5 ? 'A' : 'B';
      
      await prisma.student.create({
        data: {
          userId: student.id,
          name: student.name,
          email: student.email,
          rollNo: `S${String(i + 1).padStart(3, '0')}`,
          classId: classId,
          section: section,
          phone: `+1234567${String(i + 1).padStart(3, '0')}`,
          address: `${i + 1} Student St, City`,
          bloodGroup: ['A+', 'B+', 'O+', 'AB+'][i % 4],
          parentName: `Parent of ${student.name}`,
          parentPhone: `+1234567${String(i + 1).padStart(3, '0')}`
        }
      });
    }

    console.log('✅ Student profiles created');

    // Create announcements
    console.log('📢 Creating announcements...');
    await prisma.announcement.create({
      data: {
        title: 'Welcome to New Academic Year',
        content: 'Welcome back students! We hope you had a great summer break. The new academic year begins with exciting opportunities and challenges.',
        authorId: adminUser.id,
        priority: 'high'
      }
    });

    await prisma.announcement.create({
      data: {
        title: 'Parent-Teacher Meeting',
        content: 'Parent-Teacher meeting will be held on Friday, 15th September. All parents are requested to attend.',
        authorId: adminUser.id,
        priority: 'normal'
      }
    });

    await prisma.announcement.create({
      data: {
        title: 'Annual Sports Day',
        content: 'Annual Sports Day will be celebrated on 20th October. Students can register for various sports events.',
        authorId: adminUser.id,
        priority: 'normal'
      }
    });

    console.log('✅ Announcements created');

    // Create sample attendance records
    console.log('📊 Creating sample attendance records...');
    const today = new Date();
    const allStudents = await prisma.student.findMany();
    
    for (const student of allStudents) {
      await prisma.attendance.create({
        data: {
          studentId: student.id,
          classId: student.classId,
          teacherId: teacher1Profile.id,
          date: today,
          status: Math.random() > 0.1 ? 'present' : 'absent',
          remarks: Math.random() > 0.8 ? 'Late arrival' : null
        }
      });
    }

    console.log('✅ Sample attendance records created');

    // Create sample results
    console.log('📈 Creating sample results...');
    for (const student of allStudents) {
      await prisma.result.create({
        data: {
          studentId: student.id,
          subjectId: mathSubject.id,
          examType: 'midterm',
          marks: Math.floor(Math.random() * 20) + 80, // 80-100
          totalMarks: 100,
          percentage: Math.floor(Math.random() * 20) + 80,
          grade: 'A',
          remarks: 'Good performance'
        }
      });
    }

    console.log('✅ Sample results created');

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📋 Summary:');
    console.log(`- Admin users: 1`);
    console.log(`- Teacher users: 3`);
    console.log(`- Student users: 10`);
    console.log(`- Classes: 3`);
    console.log(`- Subjects: 3`);
    console.log(`- Announcements: 3`);
    console.log(`- Sample attendance records: ${allStudents.length}`);
    console.log(`- Sample results: ${allStudents.length}`);
    
    console.log('\n🔑 Default Login Credentials:');
    console.log('Admin: admin@erp.com / admin123');
    console.log('Teacher: john.smith@erp.com / teacher123');
    console.log('Student: student1@erp.com / student123');

  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  }); 