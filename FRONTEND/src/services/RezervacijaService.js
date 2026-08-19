import {HttpService} from "./HttpService"

const ime = '/Rezervacije'

async function get(){
    return await HttpService.get(ime)
    .then((odgovor)=>{
        return odgovor.data;
    })
    .catch((e)=>{
        return e;
    })
}

async function post(rezervacija){
    return await HttpService.post(ime, rezervacija)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data};
    })
    .catch((e)=>{
        return {greska: true, poruka: e};
    })
}

async function put(id, rezervacija){
    return await HttpService.put(ime + '/' + id, rezervacija)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data};
    })
    .catch((e)=>{
        return {greska: true, poruka: e};
    })
}

async function promjeni(id, rezervacija){
    return await put(id, rezervacija);
}

async function _delete(idRezervacije){
    return await HttpService.delete(ime + '/' + idRezervacije)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data.poruka};
    })
    .catch((e)=>{
        return {greska: true, poruka: e};
    })
}

async function getById(id){
    return await HttpService.get(ime + '/' + id)
    .then((o)=>{
        return {greska: false, poruka: o.data};
    })
    .catch((e)=>{
        return {greska: true, poruka: e};
    });
}

export default{
    get,
    post,
    dodaj: post,
    put,
    promjeni,
    _delete,
    getById
}