
const headers= {
    "Accept": "application/json",
    "Content-type": "application/json",
}
function joinURL(baseURL, url){
    return `${baseURL}/${url}`;
}


export default class APIService{
    static classInstance=null;
    static getAPIServiceInstance(){
        if(APIService.classInstance==null){
            APIService.classInstance=new APIService();
        }
        return this.classInstance;
    }
    constructor(){
        this.domain= 'http://localhost:3000/'
    }


    request(url,method='POST',data=null){
        url= joinURL=(this.domain,url);
        const options={
            headers,
            method
        }
        if(data){
            options.body= JSON.stringify({...data})
        }
        return fetch(url,options);
    }
    post(url,data){
        const method = 'POST';
        return this.request(url,method,data)
        .then(response=> response.json())
        .catch(error =>console.log(error));
    }
    get(url,id){
        const method ="GET";
        if(id){
            //fetch single record
            url = `${url}/${id}`;
        }
        return this.request(url,method)
        .then(response => response.json())
        .catch(error => console.log(error));
    }
    delete(url,id){
        const method = 'DELETE';
        if(id){
            url= `${url}/${id}`;
        }
        return this.request(url,method)
        .then(response => response.json())
        .catch(error => console.log(error));
    }

}