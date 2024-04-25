import Filmovi from "../pages/filmovi/Filmovi";
import {HttpService} from "./HttpService"

const ime = '/Filmovi'

async function get(){
    return await HttpService.get(ime)
    .then((odgovor)=>{
        //console.table(odgovor.data);
        return odgovor.data;
    })
    .catch((e)=>{
        //console.log(e);
        return e;
    })
}

async function post(film){
    return await HttpService.post(ime, film)
    .then((odgovor)=>{
      // console.table(odgovor.data);
        return {greska: false, poruka: odgovor.data};
    })
    .catch((e)=>{
        //console.log(e);
        return {greska: true, poruka: e};
    })
}

async function put(id,film){
    return await HttpService.put(ime + '/'+id,film)
    .then((odgovor)=>{
        //console.table(odgovor.data);
        return {greska: false, poruka: odgovor.data};
    })
    .catch((e)=>{
        //console.log(e);
        return {greska: true, poruka: e};
    })
}

async function _delete(idFilma){
    return await HttpService.delete(ime + '/'+idFilma)
    .then((odgovor)=>{
        //console.table(odgovor.data);
        return {greska: false, poruka: odgovor.data.poruka};
    })
    .catch((e)=>{
        //console.log(e);
        return {greska: true, poruka: e};
    })
}

async function getById(id){
    return await HttpService.get(ime+'/'+id)
    .then((o)=>{
        return {greska: false, poruka: o.data}
    })
    .catch((e)=>{
        return {greska: true, poruka: e}
    });
}


export default{
    get,
    post,
    _delete,
    getById,
    put
}