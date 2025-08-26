const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get attendance for a specific class on a specific date or date range
exports.getClassAttendance = async (req, res) => {
  try {
    const { classId } = req.params;
    const { date, startDate, endDate, history } = req.query;
    
    let whereClause = { classId: classId };
    
    if (history === 'true' && startDate && endDate) {
      // Historical data with date range
      whereClause.date = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      };
    } else if (date) {
      // Specific date
      whereClause.date = new Date(date);
    } else {
      // Default to today
      whereClause.date = new Date();
    }
    
    const attendance = await prisma.attendance.findMany({
      where: whereClause,
      include: {
        student: true,
        teacher: true
      },
      orderBy: history === 'true' ? { date: 'desc' } : { createdAt: 'desc' }
    });
    
    res.json({
      success: true,
      data: attendance,
      type: history === 'true' ? 'historical' : 'current'
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
};

// Mark attendance for students
exports.markAttendance = async (req, res) => {
  try {
    const attendanceData = req.body;
    
    // Create or update attendance records
    const attendance = await prisma.attendance.create({
      data: attendanceData
    });
    
    res.status(201).json({
      success: true,
      data: attendance
    });
  } catch (err) {
    res.status(400).json({ 
      success: false,
      error: err.message 
    });
  }
};

// Update attendance record
exports.updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const attendance = await prisma.attendance.update({
      where: { id: id },
      data: updateData
    });
    
    res.json({
      success: true,
      data: attendance
    });
  } catch (err) {
    res.status(400).json({ 
      success: false,
      error: err.message 
    });
  }
};

// Get attendance history for a specific student
exports.getStudentAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { startDate, endDate } = req.query;
    
    const whereClause = { studentId: studentId };
    if (startDate && endDate) {
      whereClause.date = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      };
    }
    
    const attendance = await prisma.attendance.findMany({
      where: whereClause,
      include: {
        class: true,
        teacher: true
      },
      orderBy: { date: 'desc' }
    });
    
    res.json({
      success: true,
      data: attendance
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
};

// Get attendance history for a specific class
exports.getClassAttendanceHistory = async (req, res) => {
  try {
    const { classId } = req.params;
    const { startDate, endDate } = req.query;
    
    const whereClause = { classId: classId };
    if (startDate && endDate) {
      whereClause.date = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      };
    }
    
    const attendance = await prisma.attendance.findMany({
      where: whereClause,
      include: {
        student: true,
        teacher: true
      },
      orderBy: { date: 'desc' }
    });
    
    res.json({
      success: true,
      data: attendance
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
};

// Legacy functions for backward compatibility
exports.getAllAttendance = async (req, res) => {
  try {
    const attendance = await prisma.attendance.findMany({
      include: {
        student: true,
        class: true,
        teacher: true
      }
    });
    res.json({
      success: true,
      data: attendance
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
};

exports.getAttendanceById = async (req, res) => {
  try {
    const { id } = req.params;
    const attendance = await prisma.attendance.findUnique({ 
      where: { id: id },
      include: {
        student: true,
        class: true,
        teacher: true
      }
    });
    
    if (!attendance) {
      return res.status(404).json({ 
        success: false,
        error: 'Attendance not found' 
      });
    }
    
    res.json({
      success: true,
      data: attendance
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
};

exports.createAttendance = async (req, res) => {
  try {
    const attendance = await prisma.attendance.create({ 
      data: req.body,
      include: {
        student: true,
        class: true,
        teacher: true
      }
    });
    res.status(201).json({
      success: true,
      data: attendance
    });
  } catch (err) {
    res.status(400).json({ 
      success: false,
      error: err.message 
    });
  }
};

exports.deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.attendance.delete({ where: { id: id } });
    res.json({ 
      success: true,
      message: 'Attendance deleted successfully' 
    });
  } catch (err) {
    res.status(400).json({ 
      success: false,
      error: err.message 
    });
  }
};