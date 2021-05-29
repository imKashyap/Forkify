import axios from "axios";

export default class Search{
    constructor(query){
        this.query=query;
    }

    async getResults(){
        const api='https://forkify-api.herokuapp.com/api/';
        const searchUrl=api+`search?q=${this.query}`;
        try{
            const res=await axios(searchUrl);
            this.result=res.data;
            console.log(this.result);
        }
        catch(error){
            alert(error);
        }
    }
}