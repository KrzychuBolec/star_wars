import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import { useEffect, useRef, useState } from 'react';
import Grid from '@mui/joy/Grid';
import Button from '@mui/joy/Button';
import Characters from './Characters';
import SearchBar from './SearchBar';
import Card from '@mui/joy/Card';

const Dashboard = () => {

    const [movies, setMovies] = useState<any[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const TimeoutFetch = useRef<any>();

    useEffect(() => {

        const url = "https://swapi.dev/api/films"

        TimeoutFetch.current = setTimeout(() => {
            fetch(url).then(response => response.json()).then(data => {
                setMovies(data.results);
            })

        }, 1000);

        return () => {
            clearTimeout(TimeoutFetch.current)
        }

    }, []);

    const onSearch = (searchTerm:string) => {

        setSearchTerm(searchTerm.toUpperCase());

    }


        return (
            <Stack direction={"column"} sx={{background:"white", height:"100%", width:"100%"}} spacing={1} >
                <SearchBar onSearch={onSearch}/>
                <Stack direction={"column"} sx={{width:"100%", height:"100%", overflow:"auto"}} alignItems={"center"}>
                    <Grid container sx={{width:"90%"}} spacing={1}>
                        {movies.filter(movie=>movie.title.toUpperCase().startsWith(searchTerm)).map((movie, index) => {
                            return <Grid key={index} maxWidth={"20vw"} sx={{overflow:"auto"}} >
                                <Card>
                                    <Typography level="title-lg">{movie.title}</Typography>
                                    <Typography level="title-md">{movie.release_date}</Typography>
                                    <Typography level="body-xs">{movie.opening_crawl}</Typography>
                                    <Typography level="title-md">{movie.director}</Typography>
                                    <Typography level="title-md">{movie.producer}</Typography>
                                    <Button onClick={() => setModalOpen(true)}>Characters</Button>
                                    <Characters peopleUrls={movie.characters} open={modalOpen} setOpen={setModalOpen}/>

                                </Card>

                            </Grid>
                        })}
                    </Grid>

                </Stack>
            </Stack>  
        )


}

export default Dashboard;