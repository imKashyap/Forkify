import axios from "axios";
import api from '../config';
 
export default class Search{
    constructor(query){
        this.query=query;
    }

    async getResults(){
        const searchUrl=api+`search?q=${this.query}`;
        try{
            const res=await axios(searchUrl);
            this.result=res.data.recipes;
        }
        catch(error){
            alert(error);
        }
    }
}