import { useEffect } from "react";
import axios from "../services/api";
import localforage from "localforage";

const SyncHandler = () => {
  useEffect(() => {
    const syncData = async () => {
      const keys = await localforage.keys();
      for (const key of keys) {
        if (key.startsWith("offline-")) {
          const data = await localforage.getItem(key);
          try {
            await axios.post("/candidates", data);
            await localforage.removeItem(key);
            console.log("✅ Synced:", data.name);
          } catch {
            console.log("⚠️ Still offline...");
          }
        }
      }
    };

    window.addEventListener("online", syncData);
    return () => window.removeEventListener("online", syncData);
  }, []);

  return null;
};

export default SyncHandler;
