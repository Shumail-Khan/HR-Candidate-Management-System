// src/pages/Applicant/ViewApplicantProfile.jsx
import React, { useEffect, useState } from "react";
import { getMyProfile } from "../../api/applicantApi";

const ViewApplicantProfile = () => {
    const [profile, setProfile] = useState(null);

    const load = async () => {
        try {
            const res = await getMyProfile();
            setProfile(res.data);
        } catch {
            console.log("No profile found");
        }
    };

    useEffect(() => {
        load();
    }, []);

    if (!profile)
        return (
            <p className="p-6 text-center">
                No profile found. Please create your profile.
            </p>
        );

    return (
        <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">My Profile</h2>

            <p><strong>Name:</strong> {profile.fullName}</p>
            <p><strong>Phone:</strong> {profile.phone}</p>
            <p><strong>Address:</strong> {profile.address}</p>

            {profile.cvFile && (
                <iframe
                    src={`${import.meta.env.VITE_API_BASE_URL}${encodeURI(profile.cvFile)}`}
                    title="CV Preview"
                    width="100%"
                    height="600px"
                    className="border mt-2"
                ></iframe>
            )}
        </div>
    );
};

export default ViewApplicantProfile;
