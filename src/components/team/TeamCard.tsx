import React from "react";
import { Button } from "../ui/button";

interface TeamCardProps {
    name: string;
    position: string;
    image: string;
}

const TeamCard: React.FC<TeamCardProps> = (props) => {
    return (
        <div className="relative group rounded-2xl bg-background text-white font-poppins shadow-lg hover:shadow-xl transition-all duration-300">
            {/* Image Section */}
            <div className="overflow-hidden rounded-t-2xl">
                <img
                    src={props.image}
                    alt={props.name}
                    className="h-72 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            {/* Content Section */}
            <div className="p-4">
                <p className="text-lg font-medium text-primary-light">
                    {props.position}
                </p>
                <h3 className="text-xl font-bold mt-2 group-hover:text-secondary-light">
                    {props.name}
                </h3>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-70 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center px-4">
                    <p className="text-lg font-semibold">
                        Passionate about making a difference.
                    </p>
                    <Button className="mt-4 px-6 py-2 bg-secondary text-black rounded-full hover:bg-secondary-dark transition-all">
                        Learn More
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TeamCard;
