import React from "react";

const Campaigns: React.FC = () => {
    return (
        <section id="campaigns" className="bg-lightGray py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-6">
                    Our Campaigns
                </h2>
                <p className="text-center text-lg mb-8">
                    Explore our ongoing and past campaigns dedicated to making a
                    difference.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Example campaign card */}
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <img
                            src="/path/to/campaign-image.jpg"
                            alt="Campaign 1"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">
                                Campaign Title 1
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Brief description of the campaign and its
                                purpose.
                            </p>
                            <a
                                href="#"
                                className="text-primaryBlue font-medium hover:underline"
                            >
                                Learn More
                            </a>
                        </div>
                    </div>
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <img
                            src="/path/to/campaign-image-2.jpg"
                            alt="Campaign 2"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">
                                Campaign Title 2
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Description of the second campaign and its
                                goals.
                            </p>
                            <a
                                href="#"
                                className="text-primaryBlue font-medium hover:underline"
                            >
                                Learn More
                            </a>
                        </div>
                    </div>
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <img
                            src="/path/to/campaign-image-3.jpg"
                            alt="Campaign 3"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">
                                Campaign Title 3
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Details about the third campaign and how to get
                                involved.
                            </p>
                            <a
                                href="#"
                                className="text-primaryBlue font-medium hover:underline"
                            >
                                Learn More
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Campaigns;
