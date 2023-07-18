
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


export async function updateTasksOfBucketsAfterDragAndDrop(tasks,bucketId) {
    const store = getStore();
    let val = await store.get("tasks");

    // console.log(val);
    // let taskIds = tasks.map(function(task) { return task.id })

    // console.log(taskIds);
    // //Delete all from val
    // val = val.filter(function(storedTask) {
    //     return taskIds.includes(storedTask.id)
    // })
    
    // console.log(val);



    //First remove all with bucket Id
    console.log("BEFORE " + bucketId)
    console.log(val)
    val = val.filter(function(task) {
        return task.bucket != bucketId;
      })

    //And now push all to val
    console.log(val)

for(let task of tasks) {
        task.bucket = bucketId;
        val.push(task)
}

console.log(val);

    // console.log("NEW")
    // console.log(val)
    
    await store.set("tasks", val);
    await store.save();

    return true;
}


//adds a Task
export async function addTaskToBucket(task) {

    console.log("start")
    //First get all tasks
    const store = getStore();
    let val = await store.get("tasks");

    if(val == null) {
        val = [];
    }
    //Get Highest ID
    let newId = 0;
    console.log(val)
    for(const task of val) {
        if(task['id'] > newId) {
            newId = task.id
        }
    }
    newId = newId + 1;
    console.log('New id is ' + newId)
    //add the tasks (which are only the ones from the bucket)
    task.id = newId;
    console.log(val);
    val.push(task);

    //console.log(val);
    //and store it
    await store.set("tasks", val);
    await store.save();


    console.log("end")

    return true;
    
}

//delets a task
export async function deleteTask(idToDelete) {
    const store = getStore();
    let val = await store.get("tasks");

    val = val.filter(function(task) {
        return task.id != idToDelete;
      })

    console.log('Id To Delete is ' + idToDelete)
    console.log(val)
    await store.set("tasks",val);
    await store.save();

    return true;

}