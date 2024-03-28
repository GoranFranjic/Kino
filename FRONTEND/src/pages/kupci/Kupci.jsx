import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RoutesNames } from '../../constants';
import KupacService from '../../services/KupacService';



export default function Kupci() {
    const [kupci, setKupci] = useState();

    async function dohvatiKupce() {
        await KupacService.get()
            .then((odg) => {
                setKupci(odg);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    useEffect(() => {
        dohvatiKupce();
    }, []);

    async function obrisiAsync(id) {
        const odgovor = await KupacService._delete(id);
        if (odgovor.greska) {
            console.log(odgovor.poruka);
            alert('Pogledaj konzolu');
            return;
        }
        dohvatiKupce();
    }

    function obrisi(id) {
        obrisiAsync(id);
    }

    return (
        <>
            <Container>
                <Link to={RoutesNames.KUPAC_NOVI}> Dodaj </Link>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Ime</th>
                            <th>Prezime</th>
                            <th>email</th>
                            <th>Broj_telefona</th>
                        </tr>
                    </thead>
                    <tbody>
                    {kupci && typeof kupci === 'object' && Array.isArray(kupci) && kupci.map((kupac, index) => (
                            <tr key={index}>
                                <td>{kupac.ime}</td>
                                <td>{kupac.prezime}</td>
                                <td>{kupac.email}</td>
                                <td>{kupac.broj_telefona}</td>
                                <td>
                                    <Button
                                        onClick={() => obrisi(kupac.id)}
                                        variant='danger'
                                    >
                                        Obriši
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
}
