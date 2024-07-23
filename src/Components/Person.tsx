import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import { useEffect, useState, useRef } from "react";

interface PersonProps {
    personUrl: string;
}

const Person = (props:PersonProps) => {

    const {personUrl} = props;

    const [person, setPerson] = useState<any>({});
    const TimeoutFetch = useRef<any>();

    useEffect(() => {

        TimeoutFetch.current = setTimeout(() => {
            fetch(personUrl).then(response => response.json()).then(data => {
                setPerson(data);
            })

        }, 200);

        return () => {
            clearTimeout(TimeoutFetch.current)
        }


    }, [personUrl]);

    return (
        <Card sx={{maxWidth:"20vw"}}>
            <Typography level="title-lg">{person.name}</Typography>
            <Typography level="title-md">Height: {person.height}</Typography>
            <Typography level="title-md">Mass: {person.mass}</Typography>
            <Typography level="title-md">Hair color: {person.hair_color}</Typography>
            <Typography level="title-md">Skin color: {person.skin_color}</Typography>
            <Typography level="title-md">Eye color: {person.eye_color}</Typography>
            <Typography level="title-md">Birth year: {person.birth_year}</Typography>

        </Card>
    )

}

export default Person;