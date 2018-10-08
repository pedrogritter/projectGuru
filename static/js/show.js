//Interaction Control


function toggleStuff(id,class_toggle) {
  var element = document.getElementById(id);
  if (element.classList) {
        element.classList.toggle(class_toggle);
        }
  }

function addListeners() {
  	document.querySelectorAll(".submit").forEach(function(elem) {
  		elem.addEventListener("click", function() {
        showprojects();
  		});
  	});
  }

// Markup builder helpers
function getTextInputValue(input_id) {
  var input_value = document.getElementById(input_id).value;
  return input_value
}

function getSelectValue(selector_id) {
  var selector = document.getElementById(selector_id);
  console.log(selector_id);
  console.log(selector);
  var value = selector[selector.selectedIndex].value;
  return value
}

function getProjects(){
  return JSON.parse(localStorage.getItem('projects'))
}

function getProjectTasks(project) {
  projectList = getProjects();
  return projectList[project].tasks
}

function progress(project_name){
  project = getProjects()[project_name];
  tasks = project.tasks
  tasks_status_list = []
  tasks.forEach(function (task) {

  });
}



function showprojectList(){
  allProjects = Object.keys(projects);

  markup = `<select id="project_delete_select">
  <option>Select Project</option>`

  allProjects.forEach(function (project) {
    markup += `
    <option value="${project}">${project}</option>`
  });

  markup += `
  </select>`

  var modal_container = document.getElementById("delete_project_select_container");
  modal_container.innerHTML = ""
  modal_container.insertAdjacentHTML("beforeend", markup);
  return markup
}

function showtaskList(projectName,give_id) {
  project= getProjects()[projectName];
  tasks = project.tasks;

  markup = `<select id=${give_id}>
  <option>Select Task</option>`

  tasks.forEach(function (task) {
    markup += `
    <option value="${task.name}">${task.name}</option>`
  });

  markup += `
  </select>`
  console.log(markup);
  return markup

}

function showtasks(projectName) {
  projects = getProjects();
  tasks = projects[projectName].tasks;
  markup = `<table class="table is-fullwidth is-hoverable">
            <thead>
              <tr>
                <th><abbr title="taskID">ID</abbr></th>
                <th>Name</th>
                <th><abbr title="Assigned">Assigned</abbr></th>
                <th><abbr title="Start">Start</abbr></th>
                <th><abbr title="Finish">Finish</abbr></th>
                <th><abbr title="Progress">Progress</abbr></th>
                <th><abbr title="Description">Description</abbr></th>
              </tr>
            </thead>
            <tbody>
              `;

  tasks.forEach(function (task) {
    markup += `
            <tr>
            <th>${tasks.indexOf(task) + 1}</th>
            <td>${task.name}</td>
            <td>${task.assigned}</td>
            <td>${task.start}</td>
            <td>${task.finish}</td>
            <td>${task.progress}</td>
            <td>${task.description}</td>
                  `;
});

markup += `</tbody></table>`

return markup
}

function showprojects() {
  projects = getProjects();
  var container = document.getElementById('projectContainer');
  container.innerHTML = "";

  allProjects = Object.keys(projects);

  console.log(allProjects);

  allProjects.forEach(function (projectName) {
    var container = document.getElementById('projectContainer');

    var project = projects[projectName];

    projectInfo = {
      projectCard: projects[projectName].name.replace(/\s+/, "") .toLowerCase()+"_card",
      projectModal: projects[projectName].name.replace(/\s+/, "") .toLowerCase()+"_modal",
      projectCreateTaskModal: projects[projectName].name.replace(/\s+/, "") .toLowerCase()+"_createtaskmodal",
      projectDeleteTaskModal: projects[projectName].name.replace(/\s+/, "") .toLowerCase()+"_deletetaskmodal",
      projectDeleteTaskSelect: projects[projectName].name.replace(/\s+/, "") .toLowerCase()+"_deletetaskselect",
      projectStartProgressModal: projects[projectName].name.replace(/\s+/, "") .toLowerCase()+"_startprogressmodal",
      projectStartProgressSelect: projects[projectName].name.replace(/\s+/, "") .toLowerCase()+"_startprogressselect",
      projectFinishProgressModal: projects[projectName].name.replace(/\s+/, "") .toLowerCase()+"_finishprogressselect",
      projectFinishProgressSelect: projects[projectName].name.replace(/\s+/, "") .toLowerCase()+"_finishprogressselect",
    }

    console.log(projectInfo.projectStartProgressSelect);

    var markup = `
                  <!-- JS ADDED HTML -->
                  <div class="card" id= ${projectInfo.projectCard}>
                      <header class="card-header">
                        <p class="card-header-title">
                          ${projectName}
                        </p>
                        <a href="#" class="card-header-icon" aria-label="more options">
                                    <span class="icon">
                                      <i class="fas fa-angle-down" aria-hidden="true"></i>
                                    </span>
                                  </a>
                      </header>
                      <div class="card-content">
                        <div class="content">
                          ${project.description}
                          <br>
                          <b>Time Frame: </b>
                          <time datetime="2018-1-1">${project.start}</time> -
                          <time datetime="2018-1-1">${project.finish}</time>
                          <br>
                          <b>Progress: </b>
                          <br>
                          <progress class="progress is-medium" value="15" max="100">45%</progress>



                        </div>
                      </div>
                      <footer class="card-footer">
                        <a href="#" class="card-footer-item" onclick="toggleStuff('${projectInfo.projectModal}','is-active')">Details</a>
                      </footer>
                    </div>
                    <br>

                  <!-- Project ${projectName} MODAL -->
                  <div class="modal" id='${projectInfo.projectModal}'>
                      <div class="modal-background"></div>
                      <div  class="modal-card">
                        <header class="modal-card-head">
                          <p class="modal-card-title">${projectName}</p>
                          <button class="delete" aria-label="close" onclick="toggleStuff('${projectInfo.projectModal}','is-active')"></button>
                        </header>
                        <section class="modal-card-body">
                          <!-- Content ... -->
                          <!-- For Every task Create an elememtn JS -->
                          ${showtasks(projectName)}
                        </section>
                        <footer class="modal-card-foot">
                          <button class="button is-success" onclick="toggleStuff('${projectInfo.projectCreateTaskModal}','is-active')">New Task</button>
                          <button class="button is-warning" onclick="toggleStuff('${projectInfo.projectStartProgressModal}','is-active')">Start Task</button>
                          <button class="button is-warning" onclick="toggleStuff('${projectInfo.projectFinishProgressModal}','is-active')">Finish Task</button>
                          <button class="button is-danger" onclick="toggleStuff('${projectInfo.projectModal}','is-active');toggleStuff('${projectInfo.projectDeleteTaskModal}','is-active')">Delete Task</button>
                          <button class="button" onclick="toggleStuff('${projectInfo.projectModal}','is-active')">Cancel</button>
                        </footer>
                      </div>
                    </div>
                    <!-- JS TASK Create MODAL CARD 1 -->

                    <div class="modal" id='${projectInfo.projectCreateTaskModal}'>
                      <div class="modal-background"></div>
                        <div  class="modal-card">
                          <header class="modal-card-head">
                            <p class="modal-card-title">Create task</p>
                            <button class="delete" aria-label="close" onclick="toggleStuff('${projectInfo.projectCreateTaskModal}','is-active')"></button>
                          </header>
                          <section class="modal-card-body">
                            <!-- Content ... -->
                            <div class="field">
                                <label class="label">Task Name</label>
                                <div class="control">
                                  <input class="input" id="taskNameInput" type="text" placeholder="Name">
                                </div>
                              </div>
                              <div class="field">
                              <label class="label">Manager</label>
                              <div class="control">
                                <input class="input" id="taskManagerInput" type="text" placeholder="Text input">
                              </div>
                              </div>
                              <div class="field">
                              <label class="label">Start</label>
                              <div class="control">
                                <input class="input" id="taskStartInput" type="date" placeholder="date input">
                              </div>
                              </div>
                              <div class="field">
                                <label class="label">End</label>
                                <div class="control">
                                  <input class="input" id="taskFinishInput" type="date" placeholder="date input">
                                </div>
                              </div>
                              <div class="field">
                              <label class="label">Description</label>
                              <div class="control">
                                  <textarea class="textarea" id="taskDescriptionInput" placeholder="Describe the context of your project"></textarea>
                              </div>
                              </div>
                          </section>
                          <footer class="modal-card-foot">
                            <button class="button is-danger submit" onclick="createTask('${projectName}',getTextInputValue('taskNameInput'),getTextInputValue('taskManagerInput'),getTextInputValue('taskStartInput'),getTextInputValue('taskFinishInput'),getTextInputValue('taskDescriptionInput'));toggleStuff('${projectInfo.projectCreateTaskModal}','is-active');showprojects()">Submit</button>
                            <button class="button" onclick="toggleStuff('${projectInfo.projectCreateTaskModal}','is-active')">Cancel</button>
                          </footer>
                          </div>
                      </div>

                    <!-- JS TASK DELETE MODAL CARD -->
                    <div class="modal" id="${projectInfo.projectDeleteTaskModal}">
                      <div class="modal-background"></div>
                        <div  class="modal-card">
                          <header class="modal-card-head">
                            <p class="modal-card-title">Delete task</p>
                            <button class="delete" aria-label="close" onclick="toggleStuff('${projectInfo.projectDeleteTaskModal}','is-active')"></button>
                          </header>
                          <section class="modal-card-body">
                            <!-- Content ... -->
                            <div class="field is-horizontal">
                            <div class="control">
                                <div class="select is-medium">
                                  ${showtaskList(projectName,projectInfo.projectDeleteTaskSelect)}
                                </div>
                              </div>
                          </div>
                          </section>
                          <footer class="modal-card-foot">
                            <button class="button is-danger submit" onclick="deleteTask(getSelectValue('${projectInfo.projectDeleteTaskSelect}'),'${projectName}')">Submit</button>
                            <button class="button" onclick="toggleStuff('${projectInfo.projectDeleteTaskModal}','is-active')">Cancel</button>
                          </footer>
                          </div>
                      </div>


                    <!-- JS START TASK MODAL CARD -->
                    <div class="modal" id="${projectInfo.projectStartProgressModal}">
                      <div class="modal-background"></div>
                        <div  class="modal-card">
                          <header class="modal-card-head">
                            <p class="modal-card-title">Start task</p>
                            <button class="delete" aria-label="close" onclick="toggleStuff('${projectInfo.projectStartProgressModal}','is-active')"></button>
                          </header>
                          <section class="modal-card-body">
                            <!-- Content ... -->
                            <div class="field is-horizontal">
                            <div class="control">
                                <div class="select is-medium">
                                  ${showtaskList(projectName, projectInfo.projectStartProgressSelect)}
                                </div>
                              </div>
                          </div>
                          </section>
                          <footer class="modal-card-foot">
                            <button class="button is-danger submit" onclick="change_progress_status('In Progress','${projectName}',getSelectValue('${projectInfo.projectStartProgressSelect}'))">Submit</button>
                            <button class="button" onclick="toggleStuff('${projectInfo.projectStartProgressModal}','is-active')">Cancel</button>
                          </footer>
                          </div>
                      </div>


                    <!-- JS Finish TASK MODAL CARD -->
                    <div class="modal" id='${projectInfo.projectFinishProgressModal}'>
                      <div class="modal-background"></div>
                        <div  class="modal-card">
                          <header class="modal-card-head">
                            <p class="modal-card-title">Finish task</p>
                            <button class="delete" aria-label="close" onclick="toggleStuff('${projectInfo.projectFinishProgressModal}','is-active')"></button>
                          </header>
                          <section class="modal-card-body">
                            <!-- Content ... -->
                            <div class="field is-horizontal">
                            <div class="control">
                                <div class="select is-medium">
                                  ${showtaskList(projectName, projectInfo.projectFinishProgressSelect)}
                                </div>
                              </div>
                          </div>
                          </section>
                          <footer class="modal-card-foot">
                            <button class="button is-danger submit" onclick="change_progress_status('Done','${projectName}',getSelectValue('${projectInfo.projectFinishProgressSelect}'))">Submit</button>
                            <button class="button" onclick="toggleStuff('${projectInfo.projectFinishProgressModal}','is-active')">Cancel</button>
                          </footer>
                          </div>
                      </div>
                      <br>
                      `
          container.insertAdjacentHTML('beforeend', markup);

  });
  showprojectList();
  addListeners();
}

window.onload = function() {

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
      projects = getProjects();
      showprojects();
    }
  }
