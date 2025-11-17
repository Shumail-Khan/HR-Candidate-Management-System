import { useEffect } from "react";
import { processQueue } from "../utils/offlineQueue";
import {
  createOpportunityAdmin,
  createOpportunityHR,
  deleteOpportunityAdmin,
} from "../api/opportunityApi";
import { addHR, deleteHR } from "../api/adminApi";
import { applyToOpportunity, upsertMyProfile } from "../api/applicantApi";
import { selectApplicant, rejectApplicant } from "../api/hrApi";

// API functions for offline processing
const apiFunctions = {
  create: {
    opportunityAdmin: createOpportunityAdmin,
    opportunityHR: createOpportunityHR,
    applyToOpportunity: applyToOpportunity,
    addHR: addHR,
  },
  update: {
    upsertMyProfile: upsertMyProfile,
    selectApplicant: selectApplicant,
    rejectApplicant: rejectApplicant,
  },
  delete: {
    deleteOpportunityAdmin: deleteOpportunityAdmin,
    deleteHR: deleteHR,
  },
};

const SyncHandler = () => {
  useEffect(() => {
    const handleSync = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.token) {
        console.log("SyncHandler: No user logged in. Skipping offline queue.");
        return;
      }

      console.log("SyncHandler: Online - processing offline queue...");
      await processQueue(apiFunctions);
    };

    // Try processing immediately if online
    if (navigator.onLine) handleSync();

    // Process whenever back online
    window.addEventListener("online", handleSync);
    return () => window.removeEventListener("online", handleSync);
  }, []);

  return null;
};

export default SyncHandler;
