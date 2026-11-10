import React from "react";
import Picture from "@/components/Picture";

interface TeamCardProps {
    name: string;
    position: string;
    image: string;
    description: string;
    className?: string;
}

const TeamCard: React.FC<TeamCardProps> = (props) => {
    return (
        <div
            className={
                "relative group rounded-card bg-surface text-ink shadow-card border border-line overflow-hidden" +
                " " +
                props.className
            }
        >
            {/* Image Section */}
            <div className="overflow-hidden rounded-t-2xl">
                <Picture
                    src={props.image}
                    alt={props.name}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="h-72 w-full object-cover object-top "
                />
            </div>

            {/* Content Section */}
            <div className="p-4">
                <p className="text-lg font-medium text-primary">
                    {props.position}
                </p>
                <h3 className="text-xl font-bold mt-2 group-hover:text-primary">
                    {props.name}
                </h3>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-[#0E1B2C]/85 rounded-card opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center px-4">
                    <p className="text-lg font-semibold text-white">
                        {props.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TeamCard;
