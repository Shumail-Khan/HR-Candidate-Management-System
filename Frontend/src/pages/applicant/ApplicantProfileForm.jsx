// src/pages/Applicant/ApplicantProfileForm.jsx
import React, { useEffect, useState } from "react";
import { getMyProfile, upsertMyProfile } from "../../api/applicantApi";
import { toast } from "react-toastify";

const ApplicantProfileForm = () => {
    const [profile, setProfile] = useState({
        fullName: "",
        phone: "",
        address: "",
        cvFile: null,
    });

    const loadProfile = async () => {
        try {
            const res = await getMyProfile();
            if (res.data) {
                setProfile({
                    fullName: res.data.fullName || "",
                    phone: res.data.phone || "",
                    address: res.data.address || "",
                    cvFile: res.data.cvFile || null,
                });
            }
        } catch {
            console.log("No existing profile.");
        }
    };

    useEffect(() => {
        loadProfile();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fd = new FormData();
        fd.append("fullName", profile.fullName);
        fd.append("phone", profile.phone);
        fd.append("address", profile.address);
        if (profile.cvFile) fd.append("cvFile", profile.cvFile);

        try {
            await upsertMyProfile(fd);
            toast.success("Profile saved!");
        } catch (err) {
            toast.error("Failed to save profile");
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-xl font-bold mb-4">My Profile</h2>
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow space-y-4"
            >
                <input
                    type="text"
                    placeholder="Full Name"
                    value={profile.fullName}
                    onChange={(e) =>
                        setProfile({ ...profile, fullName: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                />

                <input
                    type="text"
                    placeholder="Phone"
                    value={profile.phone}
                    onChange={(e) =>
                        setProfile({ ...profile, phone: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                />

                <input
                    type="text"
                    placeholder="Address"
                    value={profile.address}
                    onChange={(e) =>
                        setProfile({ ...profile, address: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                />

                <input
                    type="file"
                    onChange={(e) =>
                        setProfile({ ...profile, cvFile: e.target.files[0] })
                    }
                    className="w-full border p-2 rounded"
                />

                <button className="bg-green-600 text-white px-4 py-2 rounded">
                    Save Profile
                </button>
            </form>
        </div>
    );
};

export default ApplicantProfileForm;
