import { t } from "i18next";
import Picture from "@/components/Picture";
import React from "react";

interface ProjectCardProps {
    title: string;
    description: string;
    image: string;
    link?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = (props) => {
    return (
        <div className="relative group rounded-card bg-surface text-ink shadow-card border border-line overflow-hidden my-12">
            <div className="overflow-hidden rounded-t-2xl">
                <Picture
                    src={props.image}
                    alt={props.title}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="h-72 w-full object-cover object-top "
                />
            </div>

            <div className="lg:p-4 h-36 flex flex-col justify-center">
                <h3 className="lg:text-lg text-sm font-bold text-ink group-hover:text-primary">
                    {props.title}
                </h3>
            </div>

            <div className="absolute flex flex-col items-center inset-0 bg-[#0E1B2C]/85 rounded-card opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="lg:text-sm text-xs break-words my-2 text-white px-4">
                    {props.description}
                </p>
                <a
                    href={props.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lg:px-6 px-1 lg:py-3 py-1 lg:text-sm text-xs bg-accent text-accent-on rounded-full hover:bg-accent-hover transition-all"
                >
                    {t("projects.button-more")}
                </a>
            </div>
        </div>
    );
};

export default ProjectCard;
