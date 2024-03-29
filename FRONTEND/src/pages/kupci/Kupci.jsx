import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Button, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { RoutesNames } from '../../constants';
import KupacService from '../../services/KupacService';


export default function Kupci() {
    const [kupci, setKupci] = useState();
    const navigate = useNavigate();


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
            <Button variant='warning'>
                         <Link to={RoutesNames.KUPAC_NOVI}> Unos novog kupca </Link>
            </Button>
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
    <div style={{ marginBottom: '5px' }}>
        <Button
            onClick={() => obrisi(kupac.id)}
            variant='danger'
            style={{ width: '100%', marginBottom: '5px' }}
        >
            Obriši
        </Button>
    </div>
    <div>
        <Button
            onClick={() => navigate(`/kupci/${kupac.id}`)}
            style={{ width: '100%' }}
        >
            Promjeni
        </Button>
    </div>
</td>

                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
}