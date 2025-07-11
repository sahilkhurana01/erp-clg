import { Day, PrismaClient, UserSex, Grade, Subject, Class } from "@prisma/client";
import type { Teacher } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    // Clear existing data first to avoid unique constraint violations
    console.log("Clearing existing data...");
    await prisma.attandance.deleteMany();
    await prisma.result.deleteMany();
    await prisma.event.deleteMany();
    await prisma.announcement.deleteMany();
    await prisma.exam.deleteMany();
    await prisma.assignment.deleteMany();
    await prisma.lesson.deleteMany();
    await prisma.student.deleteMany();
    await prisma.parent.deleteMany();
    await prisma.class.deleteMany();
    await prisma.teacher.deleteMany();
    await prisma.subject.deleteMany();
    await prisma.grade.deleteMany();
    await prisma.admin.deleteMany();

    console.log("Creating admins...");
    // ADMIN
    await prisma.admin.create({
      data: {
        id: "admin1",
        username: "admin1",
      },
    });
    await prisma.admin.create({
      data: {
        id: "admin2",
        username: "admin2",
      },
    });

    console.log("Creating grades...");
    // GRADE
    const gradeRecords: Grade[] = [];
    for (let i = 1; i <= 6; i++) {
      const grade = await prisma.grade.create({
        data: {
          level: i,
        },
      });
      gradeRecords.push(grade);
    }

    console.log("Creating subjects...");
    // SUBJECT
    const subjectData = [
      { name: "Mathematics" },
      { name: "Science" },
      { name: "English" },
      { name: "History" },
      { name: "Geography" },
      { name: "Physics" },
      { name: "Chemistry" },
      { name: "Biology" },
      { name: "Computer Science" },
      { name: "Art" },
    ];

    const subjectRecords: Subject[] = [];
    for (const subject of subjectData) {
      const createdSubject = await prisma.subject.create({ data: subject });
      subjectRecords.push(createdSubject);
    }

    console.log("Creating teachers...");
    const teachers: Teacher[] = [];

    // TEACHERS FIRST
    for (let i = 1; i <= 15; i++) {
      const teacher = await prisma.teacher.create({
        data: {
          id: `teacher${i}`,
          username: `teacher${i}`,
          name: `TName${i}`,
          surname: `TSurname${i}`,
          email: `teacher${i}@example.com`,
          phone: `123-456-789${i}`,
          address: `Address${i}`,
          bloodType: "A+",
          sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
          img: null,
          createAt: new Date(),
        },
      });

      teachers.push(teacher);
    }

    console.log("Creating classes...");
    // CLASS
    const classRecords: Class[] = [];
    for (let i = 1; i <= 6; i++) {
      const createdClass = await prisma.class.create({
        data: {
          name: `${i}A`,
          gradeId: gradeRecords[i - 1].id,
          capacity: Math.floor(Math.random() * (20 - 15 + 1)) + 15,
          supervisorId: teachers[i - 1].id,
        },
      });
      classRecords.push(createdClass);
    }

    console.log("Creating lessons...");
    // LESSON
    const lessonRecords: any[] = [];
    for (let i = 1; i <= 30; i++) {
      const lesson = await prisma.lesson.create({
        data: {
          name: `Lesson${i}`,
          day: Day[
            Object.keys(Day)[
              Math.floor(Math.random() * Object.keys(Day).length)
            ] as keyof typeof Day
          ],
          startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
          endTime: new Date(new Date().setHours(new Date().getHours() + 3)),
          subjectId: subjectRecords[(i - 1) % subjectRecords.length].id,
          classId: classRecords[(i - 1) % classRecords.length].id,
          teacherId: `teacher${(i % 15) + 1}`,
        },
      });
      lessonRecords.push(lesson);
    }

    console.log("Creating parents...");
    // PARENT
    for (let i = 1; i <= 25; i++) {
      await prisma.parent.create({
        data: {
          id: `parentId${i}`,
          username: `parentId${i}`,
          name: `PName ${i}`,
          surname: `PSurname ${i}`,
          email: `parent${i}@example.com`,
          phone: `123-456-789${i}`,
          address: `Address${i}`,
        },
      });
    }

    console.log("Creating students...");
    // STUDENT
    for (let i = 1; i <= 50; i++) {
      const parentId = `parentId${Math.ceil(i / 2) % 25 || 25}`;
      
      console.log(`Creating student ${i} with parentId: ${parentId}`);
      
      await prisma.student.create({
        data: {
          id: `student${i}`,
          username: `student${i}`,
          name: `SName${i}`,
          surname: `SSurname ${i}`,
          email: `student${i}@example.com`,
          phone: `987-654-321${i}`,
          address: `Address${i}`,
          bloodType: "O-",
          sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
          parentId: parentId,
          gradeId: gradeRecords[(i - 1) % gradeRecords.length].id,
          classId: classRecords[(i - 1) % classRecords.length].id,
        },
      });
    }

    console.log("Creating exams...");
    // EXAM
    const examRecords: any[] = [];
    for (let i = 1; i <= 10; i++) {
      const exam = await prisma.exam.create({
        data: {
          title: `Exam ${i}`,
          startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
          endTime: new Date(new Date().setHours(new Date().getHours() + 2)),
          lessonId: lessonRecords[(i - 1) % lessonRecords.length].id,
        },
      });
      examRecords.push(exam);
    }

    console.log("Creating assignments...");
    // ASSIGNMENT
    const assignmentRecords: any[] = [];
    for (let i = 1; i <= 10; i++) {
      const assignment = await prisma.assignment.create({
        data: {
          title: `Assignment ${i}`,
          startDate: new Date(new Date().setHours(new Date().getHours() + 1)),
          dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
          lessonId: lessonRecords[(i - 1) % lessonRecords.length].id,
        },
      });
      assignmentRecords.push(assignment);
    }

    console.log("Creating results...");
    // RESULT
    for (let i = 1; i <= 10; i++) {
      await prisma.result.create({
        data: {
          score: 90,
          studentId: `student${i}`,
          ...(i <= 5 ? { examId: examRecords[i - 1].id } : { assignmentId: assignmentRecords[i - 6].id }),
        },
      });
    }

    console.log("Creating attendance records...");
    // ATTENDANCE
    for (let i = 1; i <= 10; i++) {
      await prisma.attandance.create({
        data: {
          date: new Date(),
          present: true,
          studentId: `student${i}`,
          lessonId: lessonRecords[(i - 1) % lessonRecords.length].id,
        },
      });
    }

    console.log("Creating events...");
    // EVENT
    for (let i = 1; i <= 5; i++) {
      await prisma.event.create({
        data: {
          title: `Event ${i}`,
          description: `Description for Event ${i}`,
          startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
          endTime: new Date(new Date().setHours(new Date().getHours() + 2)),
          classId: classRecords[(i - 1) % classRecords.length].id,
        },
      });
    }

    console.log("Creating announcements...");
    // ANNOUNCEMENT
    for (let i = 1; i <= 5; i++) {
      await prisma.announcement.create({
        data: {
          title: `Announcement ${i}`,
          description: `Description for Announcement ${i}`,
          date: new Date(),
          classId: classRecords[(i - 1) % classRecords.length].id,
        },
      });
    }

    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Error during seeding:", error);
    throw error;
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });