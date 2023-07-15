
import { Store } from "tauri-plugin-store-api";

var FILE = "data.dat";


function getStore() {
    console.log("Get store")
    const store = new Store(FILE);
    return store;
}

export async function getBuckets() { 
    let store = getStore();
    let val = await store.get("buckets");
    console.log(val);
    if(val == undefined || val == null) {
        return [];
    }
    val.sort(function(a, b) { 
        return a.position - b.position;
    })
    return val;
}


export async function updateBuckets(buckets) {
    const store = getStore();
    await store.set("buckets", buckets);
    await store.save();
    return true;
}

export async function getTasksOfBucket(bucketId) {
    const store = getStore();
    let val = await store.get("tasks");

    if(val == null) {
        return [];
    }
    val = val.filter(function(task) {
        return task.bucket == bucketId;
      })
    return val;
} 


//updates all Tasks of a bucket
export async function updateTasksOfBucket(bucketID, tasks) {

    console.log("start")
    //First get all tasks
    const store = getStore();
    let val = await store.get("tasks");

    //Get Highest ID
    let newId = 1;
    for(const task in tasks) {
        if(task.id > newId) {
            newId = task.id
        }
    }

    newId = newId + 1;

    if(val != null) {
    //remove all with bucket id of tasks
    val = val.filter(function(task) {
        return task.bucket != bucketID;
      })
      console.log(val);
    }
    else {
        val = [];
    }

    //add the tasks (which are only the ones from the bucket)
    for(let task of tasks) {
        task.id = newId;
        newId = newId +1;
        val.push(task);
    }

    //console.log(val);
    //and store it
    await store.set("tasks", val);
    await store.save();


    console.log("end")

    return true;
    
}