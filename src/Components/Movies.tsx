import Grid from "@mui/joy/Grid";
import { useEffect, useState } from "react";
import Card from "@mui/joy/Card";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import Characters from "./Characters";

interface MoviesProps {
    movies: any[];
    setModalOpen: (open:boolean) => void;
    modalOpen: boolean;
    searchTerm: string;

}

const Movies = (props:MoviesProps) => {

    const {movies, setModalOpen, modalOpen, searchTerm} = props;


return (
    <Grid container sx={{width:"90%"}} spacing={1}>
        {movies.filter(movie=>movie.title.toUpperCase().startsWith(searchTerm)).map((movie, index) => {
            return <Grid key={index} maxWidth={"20vw"} position={"relative"} >
                <Card sx={{height:"100%", justifyContent:"space-between"}}>

                    <Stack direction={"column"} alignItems={"center"} justifyContent={"center"}>
                        <Typography level="title-lg">{movie.title}</Typography>
                        <Typography level="title-md">{movie.release_date}</Typography>
                        <Typography level="body-xs">{movie.opening_crawl}</Typography>
                        <Typography level="title-md">{movie.director}</Typography>
                        <Typography level="title-md">{movie.producer}</Typography>
                    </Stack>
                    <Button onClick={() => setModalOpen(true)}>Characters</Button>
                    <Characters peopleUrls={movie.characters} open={modalOpen} setOpen={setModalOpen}/>

                </Card>

            </Grid>
        })}
    </Grid>
)

}

export default Movies;