import { profiles } from "../data";

self.onmessage = (e)=>{
    if(e.data ){
         const findData = profiles.length
        console.log(e.data)
        return self.postMessage(findData)
    }
}
