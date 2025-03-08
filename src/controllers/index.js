const { z } = require("zod");
const { PrismaClient } = require("@prisma/client");
const { calculateDistance } = require("../util/index");
const prisma = new PrismaClient();

const schoolSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(3, "Address is required"),
  latitude: z
    .number()
    .refine((val) => val >= -90 && val <= 90, "Invalid latitude"),
  longitude: z // ✅ Corrected spelling
    .number()
    .refine((val) => val >= -180 && val <= 180, "Invalid longitude"),
});

exports.addSchool = async (req, res) => {
  try {
    const validatedData = schoolSchema.parse(req.body);
    const school = await prisma.school.create({
      data: validatedData,
    });

    res.status(201).json({ message: "School added successfully", school });
  } catch (err) {
    res.status(400).json({ message: err.errors || "Invalid Input" });
  }
};

// List school API
// http://localhost:4000/listSchools?la=22.5726&lon=88.3639

exports.listSchools = async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) {
    return res
      .status(400)
      .json({ error: "Latitude and Longitude are required" });
  }

  try {
    const schools = await prisma.school.findMany();
    const sortedSchools = schools
      .map((school) => ({
        ...school,
        distance: calculateDistance(
          Number(lat),
          Number(lon),
          school.latitude,
          school.longitude
        ),
      }))
      .sort((a, b) => a.distance - b.distance);

    return res.json(sortedSchools);
  } catch (err) {
    return res.status(500).json({ error: "Database error", detail: err });
  }
};
