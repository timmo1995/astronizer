
import { Store } from "tauri-plugin-store-api";

var FILE = "data.dat";



var INIT_BUCKETS = [{id:1,name:"Open",position:1},{id:2,name:"In Progress",position:2}]

var INIT_TASKS  = [{bucket:1,color:"green",dueDate:"2023-08-04T18:33:00.000Z",id:1,position:1,title:"Sleep"},{bucket:2,color:"red",dueDate:"2023-08-07T18:33:00.000Z",id:3,position:2,title:"Deploy"}]


var INIT_NOTES = [{id:1, title:"Your First Node", text:"Some Placeholder for your notes "}]

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


export async function updateTasksOfBucketsAfterDragAndDrop(draggedID,bucketId) {
    const store = getStore();
    let val = await store.get("tasks");

    for(let task of val) {
        if(task.id==draggedID) {
            task.bucket = bucketId;
        }
    }

    //ToDo: Update All the positions of all other buckets (because one is now false) and update to the new position of the dragged Item
    //sort everything
    val = val.sort((a,b)=> (a.bucket - b.bucket ||  a.position - b.position ));
    for(let i=0;i<val.length;i++) {
        if(val.at(i).bucket == bucketId) {
            continue
        }
        if(i==0) {
            val.at(i).position = 1
        }
        else if(val.at(i).bucketId == val.at(i-1).bucketId) {
            val.at(i).position = val.at(i-1).position + 1;
        }
        else {
            val.at(i).position = 1;
        }
    }

    
    await store.set("tasks", val);
    await store.save();

    return true;
}


export async function updateTasksOfBucket(tasks,bucketId) {
    const store = getStore();
    let val = await store.get("tasks");

    //First remove all with bucket Id and the one from the old bucket with the draggedID
    val = val.filter(function(task) {
        return task.bucket != bucketId;
      })

    //And now push all to val

    for(let task of tasks) {
            task.bucket = bucketId;
            val.push(task)
    }


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


export async function updateTaskTitleAndColorInNVM(task) {
    const store = getStore();
    let val = await store.get("tasks");

    for(let iterTask of val) {
        if(iterTask.id==task.id) {
            iterTask.title = task.title
            iterTask.color = task.color;
            iterTask.dueDate = task.dueDate;
        }
    }
    await store.set("tasks",val);
    await store.save();

    return true;
}



export async function deleteAllTaskFromOneBucket(bucketId) {
    const store = getStore();
    let val = await store.get("tasks");

    val = val.filter(function(task) {
        return task.bucket != bucketId;
      })

      await store.set("tasks",val);
      await store.save();
  
      return true;


} 


//get history

export async function getHistory() {
    const store = getStore();
    var val = await store.get("taskHistory");
    console.log(val);
    //Check if null and if yes introduce
    if(val==null) {
        let date = new Date();
        date.setDate(date.getDate() -1);
        val = {
            overallTasks: Array(30).fill(0),
            lastUpdate: date
        }
        await store.set("taskHistory",val);
        await store.save();
    }

    return val;
    

}

//Set History
export async function setHistory(newHistory) {
    const store = getStore();
    await store.set("taskHistory",newHistory);
    await store.save();
    return;
}


export async function getAllTasks() {
    const store = getStore();
    var val = await store.get("tasks");
    return val;
}


export async function initFile() {
    const store = getStore();
    let buckets = await store.get("buckets");
    let tasks = await store.get("tasks");

    console.log(store.path);

    //If all of them are zero its init startup time
    if(buckets==null && tasks == null) {
        store.set("tasks",INIT_TASKS);
        store.set("buckets",INIT_BUCKETS);
    }

    await store.save();

}

export async function initNotesOnInitialStart() {
    const store  = getStore();
    let notes  = await store.get("notes");

    if(notes==null) {
        store.set("notes",INIT_NOTES);
    }

    await store.save();
    return;
}

export async function getNotes() {
    const store = getStore();
    let notes = await store.get("notes");
    
    return notes;

}


export async function updateNotes(updatedNotes) {
    const store = getStore();

    store.set("notes",updatedNotes)
    store.save();

    return;
}
