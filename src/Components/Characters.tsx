import { useEffect } from "react";
import { useState } from "react";
import Modal from "@mui/joy/Modal";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import Person from "./Person";
import { ModalClose } from "@mui/joy";
import Grid from "@mui/joy/Grid";
import ModalDialog from "@mui/joy/ModalDialog";

interface CharacterProps {

    peopleUrls: string[];
    open: boolean;
    setOpen: (open:boolean) => void;

}

const Characters = (props:CharacterProps) => {

    const {peopleUrls, open, setOpen} = props;
    
    return (

        <Modal open={open} sx={{justifyContent:"center", alignItems:"center"}}>
            <ModalDialog>

            <Stack direction={"column"} sx={{height:"100%", width:"100%"}} overflow={"auto"} alignItems={"center"} >
                <Typography level="h1" color="primary">Characters</Typography>
                <Grid container sx={{width:"100%", height:"100%"}} spacing={1}>
                    {peopleUrls.map((personUrl, index) => {
                        return (
                            <Grid>
                                <Person key={index} personUrl={personUrl}/>
                            </Grid>
                        )
                    })}
                </Grid>
                <ModalClose onClick={() => setOpen(false)}/>
            </Stack>
            </ModalDialog>
            

        </Modal>

    )


}

export default Characters;