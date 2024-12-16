import React from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";

interface CampaignCardProps {
    title: string;
    description: string;
    image: string;
    link?: string;
}

const CampaignCard: React.FC<CampaignCardProps> = (props) => {
    return (
        <Card className="rounded-2xl bg-background text-typography font-poppins">
            <CardHeader className="p-0 rounded-2xl">
                <p>{props.title}</p>
            </CardHeader>
            <CardContent>
                <p>{props.description}</p>
            </CardContent>
            <CardFooter>
                <img
                    className="rounded-2xl h-96 w-full object-cover object-top"
                    src={props.image}
                    alt={props.title}
                />
            </CardFooter>
        </Card>
    );
};

export default CampaignCard;
