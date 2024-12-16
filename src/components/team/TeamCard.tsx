import React from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";

interface TeamCardProps {
    name: string;
    position: string;
    image: string;
}

const TeamCard: React.FC<TeamCardProps> = (props) => {
    return (
        <Card className="rounded-2xl bg-background text-typography font-poppins">
            <CardHeader className="p-0 rounded-2xl">
                <img
                    className="rounded-t-2xl h-96 object-cover object-top"
                    src={props.image}
                    alt={props.name}
                />
            </CardHeader>
            <CardContent>
                <p>{props.position}</p>
            </CardContent>
            <CardFooter>
                <p>{props.name}</p>
            </CardFooter>
        </Card>
    );
};

export default TeamCard;
