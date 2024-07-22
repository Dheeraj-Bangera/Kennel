import React from "react";
import teamImage from "../../../../assets/paws_team.png";

const TeamInfo = () => {
  return (
    <div>
      <h1 className="text-5xl font-bold text-center justify-center font-[Knewave]  mb-8">Meet Our Team</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center justify-center">
          <img
            src={teamImage}
            className="rounded-full shadow-lg md:h-96 md:w-96 h-72 w-72"
            alt="Our Team"
          />
        </div>
        <div className="p-4">
          <p className="text-lg md:text-xl font-noto-sans mb-4">
            "We are a dedicated team passionate about making a difference in the
            lives of animals. Our goal is to ensure that every pet finds a
            loving home where they can thrive. With a combined experience in
            animal care, veterinary science, and animal behavior, we work
            tirelessly to create a positive impact on both pets and their future
            families."
          </p>
          <p className="text-lg md:text-xl font-noto-sans mb-4">
            Our team consists of skilled professionals who are not only experts
            in their fields but also genuinely care about the well-being of each
            animal. We believe in the power of compassion and strive to provide
            the highest level of care and support to ensure successful
            adoptions.
          </p>
          <div className="mt-6">
            <h2 className="text-2xl font-bold font-noto-sans mb-2">
              Meet the Team
            </h2>
            <ul className="list-disc list-inside">
              <li>
                <strong>Dr. Jane Doe</strong> - Veterinarian: Specializes in
                animal health and wellness.
              </li>
              <li>
                <strong>Muskan Pandey</strong> - Adoption Coordinator: Ensures
                every pet finds the perfect home.
              </li>
              <li>
                <strong>Emily Johnson</strong> - Animal Behaviorist: Expert in
                understanding and training pets.
              </li>
              <li>
                <strong>Michael Brown</strong> - Volunteer Coordinator: Manages
                volunteer activities and outreach.
              </li>
            </ul>
          </div>
          <div className="mt-12 items-center ">
            <h2 className="text-2xl font-bold font-noto-sans mb-4">
              Get in Touch
            </h2>
            <p className="text-lg font-noto-sans mb-2">
              Have any questions or want to learn more about our team? Feel free
              to reach out to us!
            </p>
            <p className="text-lg font-noto-sans">
              Email:{" "}
              <a
                href="mailto:info@ourteam.com"
                className="text-blue-500 hover:underline"
              >
                info@ourteam.com
              </a>
            </p>
          </div>
          </div>
       
      </div>
    </div>
  );
};

export default TeamInfo;
