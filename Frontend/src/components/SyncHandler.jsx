import { useEffect } from "react";
import localforage from "localforage";
import api from "../api/axiosInstance";

const SyncHandler = () => {
    useEffect(() => {
        const sync = async () => {
            const keys = await localforage.keys();
            for (const k of keys) {
                if (k.startsWith("offline-op-")) {
                    const data = await localforage.getItem(k);
                    try {
                        // if created by HR -> /hr/opportunity else /admin/opportunity
                        if (data.createdByRole === "hr") {
                            await api.post("/hr/opportunity", data);
                        } else {
                            await api.post("/admin/opportunity", data);
                        }
                        await localforage.removeItem(k);
                    } catch {
                        // still offline or server error
                    }
                }
            }
        };
        window.addEventListener("online", sync);
        return () => window.removeEventListener("online", sync);
    }, []);
    return null;
};

export default SyncHandler;
