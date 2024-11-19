import React from "react";

const Home: React.FC = () => {
    return (
        <div>
            <div className="relative bg-blue-600 text-white h-screen flex items-center justify-center text-center">
                <div className="space-y-6">
                    <h1 className="text-5xl font-extrabold">
                        Together We Are Strong
                    </h1>
                    <p className="text-xl">
                        Empowering communities to create lasting change. Join us
                        today.
                    </p>
                    <button className="mt-4 px-8 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500">
                        Get Involved
                    </button>
                </div>

                <div className="absolute inset-0 bg-black opacity-30"></div>
            </div>

            <div className="bg-gray-100 py-16">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-8 text-gray-800">
                        Featured Campaigns
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <img
                                src="https://www.lifeatspotify.com/images/470x500/WhoWeAre-c-940.jpg"
                                alt="Campaign"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-bold">
                                    Campaign Title
                                </h3>
                                <p className="text-gray-600 mt-2">
                                    Brief description of the campaign's purpose
                                    and impact.
                                </p>
                                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                    Learn More
                                </button>
                            </div>
                        </div>
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <img
                                src="https://www.lifeatspotify.com/images/470x500/WhoWeAre-c-940.jpg"
                                alt="Campaign"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-bold">
                                    Campaign Title
                                </h3>
                                <p className="text-gray-600 mt-2">
                                    Brief description of the campaign's purpose
                                    and impact.
                                </p>
                                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                    Learn More
                                </button>
                            </div>
                        </div>
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <img
                                src="https://www.lifeatspotify.com/images/470x500/WhoWeAre-c-940.jpg"
                                alt="Campaign"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-bold">
                                    Campaign Title
                                </h3>
                                <p className="text-gray-600 mt-2">
                                    Brief description of the campaign's purpose
                                    and impact.
                                </p>
                                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                    Learn More
                                </button>
                            </div>
                        </div>
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <img
                                src="https://www.lifeatspotify.com/images/470x500/WhoWeAre-c-940.jpg"
                                alt="Campaign"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-bold">
                                    Campaign Title
                                </h3>
                                <p className="text-gray-600 mt-2">
                                    Brief description of the campaign's purpose
                                    and impact.
                                </p>
                                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
