import { Router } from "express";
import {
  addComplaint,
  getComplaint,
  getComplaints,
  updateComplaint,
} from "../Model/Queries/complain_queries";
const router = Router();

router.post("/add", async (req, res) => {
  try {
    const { date, ...complaintData } = req.body;
    await addComplaint(complaintData);
    res.status(201).send("Complaint added successfully");
  } catch (error) {
    res.status(500).send("error creating complaint");
  }
});
router.patch("/update/:complaintId", async (req, res) => {
  try {
    const complaintId = req.params.complaintId;
    await updateComplaint(complaintId, req.body);

    res.status(201).send("Complaint updated successfully");
  } catch (error) {
    res.status(500).send("error updating complaint");
  }
});

router.get("/", async (req, res) => {
  try {
    const complaints = await getComplaints();
    res.status(200).send(complaints);
  } catch (error) {
    res.status(500).send("error getting complaints");
  }
});
router.get("/:complaintId", async (req, res) => {
  try {
    const complaintId = req.params.complaintId;
    const complaint = await getComplaint(complaintId);
    res.status(200).send(complaint);
  } catch (error) {
    res.status(500).send("error getting complaint");
  }
});

export default router;
