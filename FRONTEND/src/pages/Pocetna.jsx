import React from 'react';
import { Container } from 'react-bootstrap';

export default function Pocetna(){

    return(
        <>
           <Container style={styles.container}>
               
           </Container>
        </>
    );
}

const styles = {
    container: {
        backgroundImage: "url('/giphy.gif')",
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        color: 'white',
        padding: '520px', 
        borderRadius: '10px',
        animation: 'fadeIn 1s ease',
        width: '90%', 
        margin: 'auto' 
    },
    '@keyframes fadeIn': {
        from: {
            opacity: 0
        },
        to: {
            opacity: 1
        }
    }
};
