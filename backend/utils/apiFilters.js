

class ApiFilters{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
    }
    search(){
        const keyword=this.queryStr.keyword ? {

        name:{                               //"name filter"
            $regex:this.queryStr.keyword, //$regex,$options etc arevmongoose operators the name doesnt have to the exact match with the keyword
            $options:'i'           // this search is case sensitive could be uppercase or lowercase it doesnt matter
        }
    }
    :{}  //no match

    this.query=this.query.find({...keyword})
    return this;

    }

    filter(){

        const queryCopy={...this.queryStr};
 
   

        const fieldToRemove=['keyword','page'];
        fieldToRemove.forEach((i)=>delete queryCopy[i]);
        // console.log(queryCopy); on 
        // console.log(this.queryStr);
        
        //filter for price,rating etc....

        let queryStr=JSON.stringify(queryCopy);

        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(match)=>`$${match}`)

        this.query=this.query.find(JSON.parse(queryStr));
return this;

    }

    //pagination

    pagination(rePerPage){
        const currentPage=Number(this.queryStr.page)  || 1
        const skip=rePerPage *(currentPage-1);

        this.query=this.query.limit(rePerPage).skip(skip);
        return this;
    }
}

export default ApiFilters;