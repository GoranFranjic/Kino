import {HttpService} from "./HttpService"

const ime = '/Kupci'

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

async function post(kupac){
    return await HttpService.post(ime, kupac)
    .then((odgovor)=>{
      // console.table(odgovor.data);
        return {greska: false, poruka: odgovor.data};
    })
    .catch((e)=>{
        //console.log(e);
        return {greska: true, poruka: e};
    })
}

async function put(id,kupac){
    return await HttpService.put(ime + '/'+id,kupac)
    .then((odgovor)=>{
        //console.table(odgovor.data);
        return {greska: false, poruka: odgovor.data};
    })
    .catch((e)=>{
        //console.log(e);
        return {greska: true, poruka: e};
    })
}

async function _delete(idKupca){
    return await HttpService.delete(ime + '/'+idKupca)
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