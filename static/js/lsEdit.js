localStorage.clear();



var storage = (function() {
  	var uid = new Date;
  	var result;
  	try {
  		localStorage.setItem(uid, uid);
  		result = localStorage.getItem(uid) == uid;
  		localStorage.removeItem(uid);
  		return result && localStorage;
  	} catch (exception) {}
  }());


if (storage){
  let projects;
  if (localStorage.getItem('projects')) {
    console.log("catch from local storage");
    projects = JSON.parse(localStorage.getItem('projects'));
  } else {
    projects = {};
    localStorage.setItem('projects',JSON.stringify(projects));
  }
} else{
  console.log("Application not supported on this browser")
}



function remove(array, element) {
    const index = array.indexOf(element);

    if (index !== -1) {
        array.splice(index, 1);
    }
}

const deleteObj = (data, column, search) => {
  let result = data.filter(m => m[column] !== search);

  return result;
}

function getProjects(){
   return JSON.parse(localStorage.getItem('projects'))
}


function createProject(name,manager,start,finish,description) {
  projectName = name;
  projects = getProjects();
  project = {
      "name":name,
      "manager": manager,
      "start": start,
      "finish": finish,
      "description": description,
      tasks:[],
      progress: null,
    }

  projects[projectName] = project;
  console.log("Saved: " + project["name"]);
  localStorage.setItem('projects',JSON.stringify(projects));
}

function deleteProject(project_to_delete){
  projects = getProjects();
  delete projects[project_to_delete];
  localStorage.removeItem('projects');
  localStorage.setItem('projects',JSON.stringify(projects));
  console.log("Project Deleted: " + project_to_delete);
}

function clearAllProjects() {
  projects = {};
  localStorage.setItem('projects',JSON.stringify(projects));
  console.log("Cleared all project objects")
}

function createTask(parent_project, name, assigned, start, finish, description) {
  projects = getProjects();
  taskName = name;
  task = {
    "name": name,
    "assigned": assigned,
    "description": description,
    "start": start,
    "finish": finish,
    "progress": null,
  }

  // projects[parent_project].tasks[taskName] = task;
  projects[parent_project].tasks.push(task);
  console.log("Saved: " + task["name"]);
  localStorage.setItem('projects',JSON.stringify(projects));

}

function change_progress_status(state,project_name, taskname) {
  projects = getProjects();
  tasks = projects[project_name].tasks;
  tasks.forEach(function (task) {
    projects = getProjects();
    if (taskname == task["name"]){
      task_id = tasks.indexOf(task)
      tasks[task_id].progress = state;
      projects[project_name].tasks = tasks
      console.log(projects);
      localStorage.setItem('projects',JSON.stringify(projects));
    }
  });

}

function deleteTask(taskname, projectname){
  projects = getProjects();
  tasks = deleteObj(projects[projectname].tasks, "name", taskname);
  projects[projectname].tasks = tasks;

  localStorage.removeItem('projects');
  localStorage.setItem('projects',JSON.stringify(projects));
  console.log("Deleted task:" + taskname);
}


createProject("Cactus","Raul","21-05-18","21-05-18","Some kind of project");
// console.log(storage);
//
//deleteProject("OpalTapion");
createTask("Cactus", "Clean wine cellar", "Jimenez", "21-05-18","21-05-18", "Sweep, Mop and Dance");
createTask("Cactus", "Call the electrician", "Juarez", "21-05-18","21-05-18", "Call to ShockLtd");
createTask("Cactus", "Clean the gutter", "Jimenez", "21-05-18","21-05-18", "Kill all talking roaches");
change_progress_status("In progress","Cactus", "Clean the gutter");
