class ToDoService { 
    getAll(){
        console.log("Get all desde la API");
        return [];
    }

    get(id){

    }

    delete(){

    }

    create(){ 

    }

    update(){

    }    
}

class ToDoServiceMock extends ToDoService {

    getAll(){
        console.log("Get all desde el Mock");

        return JSON.parse(localStorage.getItem("TODO"));


    }

    get(id){

    }

    delete(){

    }

    create(){ 

      
    }

    update(){

    }   
}
